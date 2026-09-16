import { NextResponse } from "next/server"
import { writeClient } from "@/sanity/lib/client"
import { sendContactEmail } from "@/lib/resend"

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

    // Enviar correo de notificación a coordinadorcomercial@capsuland.com
    try {
      await sendContactEmail({
        name,
        email,
        phone,
        company,
        message,
      })
    } catch (emailErr) {
      console.error("Error al enviar email de contacto con Resend:", emailErr)
      // No bloqueamos la respuesta al cliente si el registro en Sanity ya se creó
    }

    return NextResponse.json({ success: true, id: result._id })
  } catch (error: any) {
    console.error("Error creating contact message in Sanity:", error)
    return NextResponse.json(
      { error: "Ocurrió un error al enviar el mensaje. Inténtelo más tarde." },
      { status: 500 }
    )
  }
}
