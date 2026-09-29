import { NextResponse } from "next/server"
import { writeClient } from "@/sanity/lib/client"
import { MercadoPagoConfig, Payment } from "mercadopago"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { paymentId, orderId } = body

    if (!paymentId || !orderId) {
      return NextResponse.json(
        { error: "paymentId y orderId son requeridos" },
        { status: 400 }
      )
    }

    const mpToken = process.env.MP_ACCESS_TOKEN?.trim()
    if (!mpToken) {
      return NextResponse.json(
        { error: "Mercado Pago no configurado" },
        { status: 500 }
      )
    }

    const mpClient = new MercadoPagoConfig({ accessToken: mpToken })
    const payment = new Payment(mpClient)
    const paymentData = await payment.get({ id: String(paymentId) })

    if (!paymentData) {
      return NextResponse.json({ error: "Pago no encontrado" }, { status: 404 })
    }

    // Verificar que la referencia externa corresponda a la orden
    if (paymentData.external_reference && paymentData.external_reference !== orderId) {
      return NextResponse.json(
        { error: "La referencia de pago no coincide con la orden" },
        { status: 400 }
      )
    }

    const isApproved = paymentData.status === "approved"
    const newStatus = isApproved
      ? "pagado"
      : paymentData.status === "rejected" || paymentData.status === "cancelled"
      ? "cancelado"
      : "pendiente"

    await writeClient
      .patch(orderId)
      .set({
        status: newStatus,
        paymentId: String(paymentId),
        paymentMethod:
          paymentData.payment_type_id ||
          paymentData.payment_method_id ||
          "mercadopago",
        paidAt: isApproved ? new Date().toISOString() : undefined,
      })
      .commit()

    return NextResponse.json({
      success: true,
      status: paymentData.status,
      isApproved,
    })
  } catch (error: any) {
    console.error("Error verificando pago en Mercado Pago:", error)
    return NextResponse.json(
      { error: error.message || "Error al verificar el pago" },
      { status: 500 }
    )
  }
}
