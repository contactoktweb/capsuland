import { NextResponse } from "next/server"
import { writeClient } from "@/sanity/lib/client"
import { sendOrderAdminNotification, sendOrderCustomerConfirmation } from "@/lib/resend"

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

    return NextResponse.json({ success: true, id: result._id })
  } catch (error: any) {
    console.error("Error creating sale in Sanity:", error)
    return NextResponse.json(
      { error: "Ocurrió un error al procesar tu compra. Inténtelo más tarde." },
      { status: 500 }
    )
  }
}
