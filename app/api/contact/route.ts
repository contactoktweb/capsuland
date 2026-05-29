import { NextResponse } from "next/server"
import { writeClient } from "@/sanity/lib/client"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, phone, company, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Nombre, email y mensaje son campos obligatorios." },
        { status: 400 }
      )
    }

    const doc = {
      _type: "message",
      name,
      email,
      phone: phone || "",
      subject: company ? `Empresa: ${company}` : "Contacto desde Web",
      text: message,
      status: "unread",
      createdAt: new Date().toISOString(),
    }

    const result = await writeClient.create(doc)

    return NextResponse.json({ success: true, id: result._id })
  } catch (error: any) {
    console.error("Error creating contact message in Sanity:", error)
    return NextResponse.json(
      { error: "Ocurrió un error al enviar el mensaje. Inténtelo más tarde." },
      { status: 500 }
    )
  }
}
