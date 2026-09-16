import { NextResponse } from "next/server"
import { writeClient } from "@/sanity/lib/client"
import { MercadoPagoConfig, Payment } from "mercadopago"

export async function POST(req: Request) {
  try {
    const url = new URL(req.url)
    const topic = url.searchParams.get("topic") || url.searchParams.get("type")
    const id = url.searchParams.get("id") || url.searchParams.get("data.id")

    const mpToken = process.env.MP_ACCESS_TOKEN?.trim()

    if (topic === "payment" && id && mpToken && !mpToken.includes("TU_ACCESS_TOKEN")) {
      const mpClient = new MercadoPagoConfig({ accessToken: mpToken })
      const payment = new Payment(mpClient)
      const paymentData = await payment.get({ id })

      if (paymentData.status === "approved") {
        const orderId = paymentData.external_reference
        if (orderId) {
          await writeClient
            .patch(orderId)
            .set({
              status: "pagado",
              paymentId: String(id),
              paymentMethod: paymentData.payment_type_id || "mercadopago",
              paidAt: new Date().toISOString(),
            })
            .commit()

          console.log(`[MercadoPago Webhook] Pedido ${orderId} marcado como pagado.`);
        }
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error processing Mercado Pago webhook:", error)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 })
  }
}
