import { NextResponse } from "next/server"
import { writeClient } from "@/sanity/lib/client"
import { MercadoPagoConfig, Payment } from "mercadopago"

export async function GET() {
  return NextResponse.json({ status: "Mercado Pago webhook active" })
}

export async function POST(req: Request) {
  try {
    const url = new URL(req.url)
    let topic = url.searchParams.get("topic") || url.searchParams.get("type")
    let id = url.searchParams.get("id") || url.searchParams.get("data.id")

    // Si los parámetros no vienen en la URL, extraer del body JSON
    if (!id) {
      try {
        const body = await req.json()
        if (body?.data?.id) {
          id = String(body.data.id)
        }
        if (body?.type) {
          topic = body.type
        } else if (body?.action?.startsWith("payment")) {
          topic = "payment"
        }
      } catch {
        // Body no es JSON o está vacío
      }
    }

    const mpToken = process.env.MP_ACCESS_TOKEN?.trim()

    if ((topic === "payment" || !topic) && id && mpToken && !mpToken.includes("TU_ACCESS_TOKEN")) {
      const mpClient = new MercadoPagoConfig({ accessToken: mpToken })
      const payment = new Payment(mpClient)
      const paymentData = await payment.get({ id: String(id) })

      const orderId = paymentData?.external_reference
      if (orderId) {
        let status = "pendiente"
        if (paymentData.status === "approved") {
          status = "pagado"
        } else if (
          paymentData.status === "cancelled" ||
          paymentData.status === "rejected"
        ) {
          status = "cancelado"
        }

        await writeClient
          .patch(orderId)
          .set({
            status,
            paymentId: String(id),
            paymentMethod:
              paymentData.payment_type_id ||
              paymentData.payment_method_id ||
              "mercadopago",
            paidAt: paymentData.status === "approved" ? new Date().toISOString() : undefined,
          })
          .commit()

        console.log(`[MercadoPago Webhook] Pedido ${orderId} actualizado a estado '${status}'.`)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error processing Mercado Pago webhook:", error)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 })
  }
}
