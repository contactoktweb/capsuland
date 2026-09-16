import { NextResponse } from "next/server"
import { writeClient } from "@/sanity/lib/client"
import { sendOrderAdminNotification, sendOrderCustomerConfirmation } from "@/lib/resend"
import { MercadoPagoConfig, Preference } from "mercadopago"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      customerName,
      tipoDocumento,
      cedula,
      email,
      phone,
      address,
      city,
      departamento,
      notas,
      items,
      subtotal,
      total,
    } = body

    if (!customerName || !email || !phone || !address || !city || !items || !items.length) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios para procesar el pedido." },
        { status: 400 }
      )
    }

    // Map cart items to Sanity references
    const sanityItems = items.map((item: any) => {
      let refId = item.productId
      if (refId && !refId.startsWith("prod-") && !refId.includes(".")) {
        refId = `prod-${refId}`
      }
      return {
        _key: Math.random().toString(36).substring(2, 9),
        product: {
          _type: "reference",
          _ref: refId,
        },
        quantity: Number(item.quantity),
        price: Number(item.price),
      }
    })

    const doc = {
      _type: "sale",
      customerName,
      tipoDocumento,
      cedula,
      email,
      phone,
      address,
      city,
      items: sanityItems,
      subtotal: Number(subtotal),
      total: Number(total),
      status: "pendiente",
      createdAt: new Date().toISOString(),
    }

    const result = await writeClient.create(doc)

    // Enviar correos de confirmación en paralelo con Resend
    try {
      const emailPayload = {
        orderId: result._id,
        customerName,
        tipoDocumento,
        cedula,
        email,
        phone,
        address,
        city,
        departamento,
        notas,
        items: items.map((i: any) => ({
          productId: i.productId,
          referencia: i.referencia || "Suplemento Capsuland",
          presentation: i.presentation || "",
          quantity: Number(i.quantity),
          price: Number(i.price),
          image: i.image || "",
        })),
        subtotal: Number(subtotal),
        total: Number(total),
      }

      await Promise.allSettled([
        sendOrderAdminNotification(emailPayload),
        sendOrderCustomerConfirmation(emailPayload),
      ])
    } catch (emailErr) {
      console.error("Error al despachar correos de confirmación con Resend:", emailErr)
    }

    // -------------------------------------------------------------
    // Mercado Pago Checkout Pro (Redirección Externa)
    // -------------------------------------------------------------
    let initPoint: string | null = null

    const mpToken = process.env.MP_ACCESS_TOKEN?.trim()
    if (mpToken && !mpToken.includes("TU_ACCESS_TOKEN")) {
      try {
        const mpClient = new MercadoPagoConfig({ accessToken: mpToken })
        const preference = new Preference(mpClient)

        const siteUrl = (
          process.env.NEXT_PUBLIC_SITE_URL ||
          "http://localhost:3000"
        ).replace(/\/$/, "")

        const prefResult = await preference.create({
          body: {
            items: items.map((item: any) => ({
              id: item.productId || "capsuland-item",
              title: item.referencia ? `${item.referencia} - pago desde capsuland` : "pago desde capsuland",
              description: "pago desde capsuland",
              quantity: Number(item.quantity) || 1,
              unit_price: Number(item.price),
              currency_id: "COP",
            })),
            payer: {
              name: customerName,
              email: email,
              phone: {
                number: phone,
              },
              identification: {
                type: tipoDocumento || "CC",
                number: cedula || "",
              },
              address: {
                street_name: address,
              },
            },
            back_urls: {
              success: `${siteUrl}/gracias?order_id=${result._id}&status=approved`,
              pending: `${siteUrl}/gracias?order_id=${result._id}&status=pending`,
              failure: `${siteUrl}/checkout?error=payment_failed&order_id=${result._id}`,
            },
            auto_return: "approved",
            statement_descriptor: "pago desde capsuland",
            notification_url: `${siteUrl}/api/webhook/mercadopago`,
            external_reference: result._id,
          },
        })

        initPoint = prefResult.init_point || prefResult.sandbox_init_point || null
      } catch (mpError) {
        console.error("Error al crear preferencia de Mercado Pago:", mpError)
      }
    }

    return NextResponse.json({
      success: true,
      id: result._id,
      init_point: initPoint,
    })
  } catch (error: any) {
    console.error("Error creating sale in Sanity:", error)
    return NextResponse.json(
      { error: "Ocurrió un error al procesar tu compra. Inténtelo más tarde." },
      { status: 500 }
    )
  }
}
