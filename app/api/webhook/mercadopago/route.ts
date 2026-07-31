import { NextResponse } from "next/server"
import { writeClient } from "@/sanity/lib/client"

export async function POST(req: Request) {
  try {
    const url = new URL(req.url)
    const topic = url.searchParams.get("topic") || url.searchParams.get("type")
    const id = url.searchParams.get("id") || url.searchParams.get("data.id")

    if (topic === "payment" && id) {
      // 1. Obtener la información del pago de Mercado Pago
      /*
      import { MercadoPagoConfig, Payment } from 'mercadopago';
      const mpClient = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });
      const payment = new Payment(mpClient);
      const paymentData = await payment.get({ id });

      if (paymentData.status === "approved") {
        const orderId = paymentData.external_reference;
        
        // 2. Actualizar el estado en Sanity
        if (orderId) {
          await writeClient
            .patch(orderId)
            .set({ status: 'pagado' })
            .commit();
            
          console.log(`Order ${orderId} marked as pagado.`);
        }
      }
      */
      console.log(`Recibido webhook de MercadoPago para el pago ${id}`);
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error processing Mercado Pago webhook:", error)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 })
  }
}
