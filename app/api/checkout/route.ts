import { NextResponse } from "next/server"
import { writeClient } from "@/sanity/lib/client"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { customerName, email, phone, address, city, items, subtotal, total } = body

    if (!customerName || !email || !phone || !address || !city || !items || !items.length) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios para procesar el pedido." },
        { status: 400 }
      )
    }

    // Map cart items to Sanity references
    const sanityItems = items.map((item: any) => ({
      _key: Math.random().toString(36).substring(2, 9),
      product: {
        _type: "reference",
        _ref: item.productId,
      },
      quantity: Number(item.quantity),
      price: Number(item.price),
    }))

    const doc = {
      _type: "sale",
      customerName,
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

    return NextResponse.json({ success: true, id: result._id })
  } catch (error: any) {
    console.error("Error creating sale in Sanity:", error)
    return NextResponse.json(
      { error: "Ocurrió un error al procesar tu compra. Inténtelo más tarde." },
      { status: 500 }
    )
  }
}
