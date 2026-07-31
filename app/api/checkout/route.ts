import { NextResponse } from "next/server"
import { writeClient } from "@/sanity/lib/client"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { customerName, tipoDocumento, cedula, email, phone, address, city, items, subtotal, total } = body

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

    // TODO: MERCADO PAGO INTEGRATION
    // Una vez que tengas las credenciales de Mercado Pago:
    // 1. Instala el SDK: npm install mercadopago
    // 2. Importa e inicializa: 
    //    import { MercadoPagoConfig, Preference } from 'mercadopago';
    //    const mpClient = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });
    // 3. Crea la preferencia:
    /*
    const preference = new Preference(mpClient);
    const prefResult = await preference.create({
      body: {
        items: items.map((item: any) => ({
          id: item.productId,
          title: item.referencia || 'Producto',
          quantity: Number(item.quantity),
          unit_price: Number(item.price),
        })),
        payer: {
          name: customerName,
          email: email,
        },
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_SITE_URL}/gracias?order_id=${result._id}`,
          failure: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout?error=payment_failed`,
          pending: `${process.env.NEXT_PUBLIC_SITE_URL}/gracias?order_id=${result._id}&pending=true`,
        },
        auto_return: "approved",
        notification_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/webhook/mercadopago`,
        external_reference: result._id,
      }
    });
    
    // Y luego retornar el init_point para redirigir al cliente:
    // return NextResponse.json({ success: true, id: result._id, init_point: prefResult.init_point });
    */

    return NextResponse.json({ success: true, id: result._id })
  } catch (error: any) {
    console.error("Error creating sale in Sanity:", error)
    return NextResponse.json(
      { error: "Ocurrió un error al procesar tu compra. Inténtelo más tarde." },
      { status: 500 }
    )
  }
}
