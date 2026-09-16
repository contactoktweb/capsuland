import { Resend } from "resend"
import { client } from "@/sanity/lib/client"

export const SENDER_EMAIL = process.env.RESEND_FROM_EMAIL || "Capsuland <no-reply@capsuland.com>"
export const ADMIN_EMAIL = process.env.RESEND_ADMIN_EMAIL || "coordinadorcomercial@capsuland.com"

/** Inicialización de cliente Resend con la variable de entorno */
export function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn("⚠️ [Resend] Variable RESEND_API_KEY no configurada en .env.local.")
    return null
  }
  return new Resend(apiKey)
}

/** Obtiene dinámicamente el logo de la página configurado en Sanity */
export async function getSanityLogoUrl(): Promise<string> {
  try {
    const data = await client.fetch(`*[_type == "global"][0]{ "logo": logo.asset->url }`)
    if (data?.logo) return data.logo
  } catch (err) {
    console.error("Error al obtener logo desde Sanity para correo:", err)
  }
  return "https://cdn.sanity.io/images/uzifkako/production/519909c8659dceaaf4e8651cd5009f86215e01df-135x50.png"
}

/** Wrapper base con estilos minimalistas y branding oficial */
function emailBaseLayout({
  title,
  preheader,
  logoUrl,
  contentHtml,
}: {
  title: string
  preheader: string
  logoUrl: string
  contentHtml: string
}): string {
  const currentYear = new Date().getFullYear()

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f7f9fa;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #1e242b;
      -webkit-font-smoothing: antialiased;
    }
    table { border-collapse: collapse; width: 100%; }
    img { border: 0; display: block; }
    a { color: #00838f; text-decoration: none; }
  </style>
</head>
<body style="margin: 0; padding: 32px 12px; background-color: #f7f9fa;">
  <!-- Preheader invisible -->
  <span style="display: none !important; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0; font-size: 0px; line-height: 0px;">
    ${preheader}
  </span>

  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #eef0f2; box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
    
    <!-- Header con Logo desde Sanity -->
    <div style="padding: 32px 24px; text-align: center; border-bottom: 1px solid #f0f2f4; background-color: #ffffff;">
      <a href="https://capsuland.com" target="_blank" style="display: inline-block;">
        <img src="${logoUrl}" alt="Capsuland" style="max-height: 44px; width: auto; margin: 0 auto;" />
      </a>
    </div>

    <!-- Contenido Principal -->
    <div style="padding: 36px 32px;">
      ${contentHtml}
    </div>

    <!-- Footer Minimalista -->
    <div style="background-color: #fafbfc; border-top: 1px solid #f0f2f4; padding: 28px 24px; text-align: center; font-size: 12px; color: #78828a; line-height: 1.6;">
      <p style="margin: 0 0 8px 0; font-weight: 600; color: #1e242b;">
        Capsuland — Laboratorio Farmacéutico
      </p>
      <p style="margin: 0 0 16px 0;">
        Km 3,5 Vía Funza - Siberia Parque Industrial San José Bodega 4B<br>
        Certificación BPM INVIMA | Suplementos dietarios de alta calidad
      </p>

      <div style="padding-top: 14px; border-top: 1px solid #eef0f2; font-size: 11px; color: #9aa2a9;">
        <span>© ${currentYear} Capsuland. Todos los derechos reservados.</span>
        <div style="margin-top: 6px;">
          <a href="https://www.kytcode.lat" target="_blank" style="color: #1e242b; text-decoration: none; font-weight: 500;">
            Desarrollado por K&amp;T <span style="color: #000000;">&#9829;</span>
          </a>
        </div>
      </div>
    </div>

  </div>
</body>
</html>
  `
}

/* =========================================================================
   1. CORREO DE CONTACTO (Para coordinadorcomercial@capsuland.com)
   ========================================================================= */
export interface ContactEmailData {
  name: string
  email: string
  phone?: string
  company?: string
  message: string
}

export async function sendContactEmail(data: ContactEmailData) {
  const resend = getResendClient()
  if (!resend) return { success: false, error: "RESEND_API_KEY no encontrada" }

  const logoUrl = await getSanityLogoUrl()
  const dateFormatted = new Intl.DateTimeFormat("es-CO", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "America/Bogota",
  }).format(new Date())

  const contentHtml = `
    <div style="text-align: center; margin-bottom: 24px;">
      <span style="display: inline-block; background-color: #e0f2f1; color: #00695c; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; padding: 6px 14px; rounded: 9999px; border-radius: 9999px;">
        Nuevo Mensaje de Contacto
      </span>
      <h1 style="font-size: 22px; font-weight: 800; color: #1e242b; margin: 16px 0 6px 0;">
        Consulta recibida desde la web
      </h1>
      <p style="font-size: 13px; color: #6b7280; margin: 0;">
        ${dateFormatted}
      </p>
    </div>

    <!-- Tarjeta de Detalles del Remitente -->
    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px 24px; margin-bottom: 24px;">
      <table style="width: 100%; font-size: 14px;">
        <tr>
          <td style="padding: 6px 0; color: #64748b; width: 120px; font-weight: 600;">Nombre:</td>
          <td style="padding: 6px 0; color: #0f172a; font-weight: 700;">${data.name}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Correo:</td>
          <td style="padding: 6px 0;">
            <a href="mailto:${data.email}" style="color: #00838f; font-weight: 600; text-decoration: underline;">
              ${data.email}
            </a>
          </td>
        </tr>
        ${
          data.phone
            ? `<tr>
                <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Teléfono:</td>
                <td style="padding: 6px 0; color: #0f172a; font-weight: 600;">
                  <a href="tel:${data.phone}" style="color: #0f172a; text-decoration: none;">${data.phone}</a>
                </td>
              </tr>`
            : ""
        }
        ${
          data.company
            ? `<tr>
                <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Empresa:</td>
                <td style="padding: 6px 0; color: #0f172a; font-weight: 600;">${data.company}</td>
              </tr>`
            : ""
        }
      </table>
    </div>

    <!-- Mensaje -->
    <div style="margin-bottom: 28px;">
      <h3 style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin: 0 0 10px 0;">
        Mensaje del Cliente:
      </h3>
      <div style="background-color: #ffffff; border-left: 4px solid #00838f; border: 1px solid #e2e8f0; border-left-width: 4px; border-radius: 8px; padding: 18px 20px; font-size: 14px; line-height: 1.65; color: #334155; white-space: pre-wrap;">
${data.message}
      </div>
    </div>

    <!-- Botón de Respuesta Rápida -->
    <div style="text-align: center; margin-top: 24px;">
      <a href="mailto:${data.email}?subject=Respuesta%20a%20tu%20consulta%20-%20Capsuland" 
         style="display: inline-block; background-color: #00838f; color: #ffffff; font-size: 13px; font-weight: 700; padding: 12px 28px; border-radius: 9999px; text-decoration: none; box-shadow: 0 4px 12px rgba(0,131,143,0.25);">
        Responder al Cliente
      </a>
    </div>
  `

  const html = emailBaseLayout({
    title: `Nuevo Mensaje: ${data.name}`,
    preheader: `Mensaje de ${data.name} (${data.email}) recibido a través de la web`,
    logoUrl,
    contentHtml,
  })

  try {
    const result = await resend.emails.send({
      from: SENDER_EMAIL,
      to: [ADMIN_EMAIL],
      replyTo: data.email,
      subject: `Nuevo mensaje de contacto web — ${data.name}${data.company ? ` (${data.company})` : ""}`,
      html,
    })
    return { success: true, result }
  } catch (error) {
    console.error("Error al enviar email de contacto con Resend:", error)
    return { success: false, error }
  }
}

/* =========================================================================
   2. CONFIRMACIÓN DE COMPRA (INTERNO + AL CLIENTE)
   ========================================================================= */
export interface OrderItemData {
  productId?: string
  referencia: string
  presentation?: string
  quantity: number
  price: number
  image?: string
}

export interface OrderEmailData {
  orderId: string
  customerName: string
  tipoDocumento?: string
  cedula?: string
  email: string
  phone: string
  address: string
  city: string
  departamento?: string
  notas?: string
  items: OrderItemData[]
  subtotal: number
  total: number
}

function renderItemsTable(items: OrderItemData[]): string {
  return `
    <table style="width: 100%; border-collapse: collapse; margin-top: 12px; margin-bottom: 16px;">
      <thead>
        <tr style="border-bottom: 2px solid #eef0f2; font-size: 11px; text-transform: uppercase; color: #64748b; letter-spacing: 0.05em; text-align: left;">
          <th style="padding: 8px 0; font-weight: 700;">Producto</th>
          <th style="padding: 8px 12px; font-weight: 700; text-align: center;">Cant.</th>
          <th style="padding: 8px 0; font-weight: 700; text-align: right;">Total</th>
        </tr>
      </thead>
      <tbody>
        ${items
          .map(
            (item) => `
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 12px 0;">
              <div style="font-size: 13px; font-weight: 700; color: #0f172a; line-height: 1.4;">
                ${item.referencia}
              </div>
              ${
                item.presentation
                  ? `<span style="display: inline-block; background-color: #f1f5f9; color: #475569; font-size: 10px; font-weight: 600; padding: 2px 8px; border-radius: 4px; margin-top: 4px;">
                      ${item.presentation}
                    </span>`
                  : ""
              }
              <div style="font-size: 11px; color: #64748b; margin-top: 2px;">
                $${Number(item.price).toLocaleString("es-CO")} c/u
              </div>
            </td>
            <td style="padding: 12px; text-align: center; font-size: 13px; font-weight: 700; color: #334155;">
              x${item.quantity}
            </td>
            <td style="padding: 12px 0; text-align: right; font-size: 13px; font-weight: 700; color: #0f172a;">
              $${(Number(item.price) * Number(item.quantity)).toLocaleString("es-CO")}
            </td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
  `
}

/** 2A. Correo para el Administrador (coordinadorcomercial@capsuland.com) */
export async function sendOrderAdminNotification(order: OrderEmailData) {
  const resend = getResendClient()
  if (!resend) return { success: false, error: "RESEND_API_KEY no configurada" }

  const logoUrl = await getSanityLogoUrl()
  const shortOrderId = order.orderId ? order.orderId.slice(-8).toUpperCase() : "N/A"
  const dateFormatted = new Intl.DateTimeFormat("es-CO", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "America/Bogota",
  }).format(new Date())

  const contentHtml = `
    <div style="text-align: center; margin-bottom: 24px;">
      <span style="display: inline-block; background-color: #fff7ed; color: #c2410c; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; padding: 6px 14px; border-radius: 9999px;">
        🛒 Nueva Orden Recibida
      </span>
      <h1 style="font-size: 22px; font-weight: 800; color: #1e242b; margin: 16px 0 4px 0;">
        Pedido #${shortOrderId}
      </h1>
      <p style="font-size: 13px; color: #6b7280; margin: 0;">
        ${dateFormatted}
      </p>
    </div>

    <!-- Datos del Cliente -->
    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px 22px; margin-bottom: 24px;">
      <h3 style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b; margin: 0 0 12px 0;">
        Información del Comprador
      </h3>
      <table style="width: 100%; font-size: 13px; line-height: 1.5;">
        <tr>
          <td style="padding: 4px 0; color: #64748b; width: 110px;">Cliente:</td>
          <td style="padding: 4px 0; color: #0f172a; font-weight: 700;">${order.customerName}</td>
        </tr>
        ${
          order.cedula
            ? `<tr>
                <td style="padding: 4px 0; color: #64748b;">Documento:</td>
                <td style="padding: 4px 0; color: #0f172a; font-weight: 600;">${order.tipoDocumento || "CC"} ${order.cedula}</td>
              </tr>`
            : ""
        }
        <tr>
          <td style="padding: 4px 0; color: #64748b;">Correo:</td>
          <td style="padding: 4px 0;">
            <a href="mailto:${order.email}" style="color: #00838f; font-weight: 600;">${order.email}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 4px 0; color: #64748b;">Teléfono:</td>
          <td style="padding: 4px 0; color: #0f172a; font-weight: 600;">
            <a href="tel:${order.phone}" style="color: #0f172a; text-decoration: none;">${order.phone}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 4px 0; color: #64748b;">Dirección:</td>
          <td style="padding: 4px 0; color: #0f172a; font-weight: 600;">${order.address}</td>
        </tr>
        <tr>
          <td style="padding: 4px 0; color: #64748b;">Ciudad:</td>
          <td style="padding: 4px 0; color: #0f172a; font-weight: 600;">${order.city}${order.departamento ? `, ${order.departamento}` : ""}</td>
        </tr>
        ${
          order.notas
            ? `<tr>
                <td style="padding: 4px 0; color: #64748b;">Notas:</td>
                <td style="padding: 4px 0; color: #0f172a; font-style: italic;">${order.notas}</td>
              </tr>`
            : ""
        }
      </table>
    </div>

    <!-- Detalle de Productos -->
    <div style="margin-bottom: 24px;">
      <h3 style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b; margin: 0 0 8px 0;">
        Productos Solicitados
      </h3>
      ${renderItemsTable(order.items)}

      <!-- Total -->
      <div style="background-color: #f1f5f9; border-radius: 8px; padding: 14px 18px; display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 14px; font-weight: 700; color: #0f172a;">Total a Pagar / Registrado:</span>
        <span style="font-size: 18px; font-weight: 800; color: #00838f; float: right;">
          $${Number(order.total).toLocaleString("es-CO")}
        </span>
        <div style="clear: both;"></div>
      </div>
    </div>

    <!-- Botón Contactar Comprador -->
    <div style="text-align: center; margin-top: 28px;">
      <a href="mailto:${order.email}?subject=Confirmaci%C3%B3n%20de%20tu%20pedido%20%23${shortOrderId}%20-%20Capsuland" 
         style="display: inline-block; background-color: #1e242b; color: #ffffff; font-size: 13px; font-weight: 700; padding: 12px 26px; border-radius: 9999px; text-decoration: none;">
        Contactar Comprador
      </a>
    </div>
  `

  const html = emailBaseLayout({
    title: `Nuevo Pedido #${shortOrderId}`,
    preheader: `Nueva compra recibida de ${order.customerName} por valor de $${Number(order.total).toLocaleString("es-CO")}`,
    logoUrl,
    contentHtml,
  })

  try {
    const result = await resend.emails.send({
      from: SENDER_EMAIL,
      to: [ADMIN_EMAIL],
      replyTo: order.email,
      subject: `🛒 Nuevo pedido #${shortOrderId} — ${order.customerName} ($${Number(order.total).toLocaleString("es-CO")})`,
      html,
    })
    return { success: true, result }
  } catch (error) {
    console.error("Error al enviar notificación de orden al administrador:", error)
    return { success: false, error }
  }
}

/** 2B. Correo de Confirmación para el Cliente Comprador */
export async function sendOrderCustomerConfirmation(order: OrderEmailData) {
  const resend = getResendClient()
  if (!resend) return { success: false, error: "RESEND_API_KEY no configurada" }

  const logoUrl = await getSanityLogoUrl()
  const shortOrderId = order.orderId ? order.orderId.slice(-8).toUpperCase() : "N/A"

  const contentHtml = `
    <!-- Encabezado de Éxito -->
    <div style="text-align: center; margin-bottom: 28px;">
      <div style="width: 52px; height: 52px; background-color: #e0f2f1; color: #00838f; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 24px; line-height: 52px; text-align: center; margin-bottom: 16px;">
        ✓
      </div>
      <h1 style="font-size: 24px; font-weight: 800; color: #1e242b; margin: 0 0 8px 0;">
        ¡Gracias por tu compra, ${order.customerName}!
      </h1>
      <p style="font-size: 14px; color: #64748b; line-height: 1.5; margin: 0 auto; max-width: 440px;">
        Hemos recibido tu pedido <strong style="color: #00838f;">#${shortOrderId}</strong>. Nuestro equipo de laboratorio ya está preparando tus suplementos con los más altos estándares de calidad BPM INVIMA.
      </p>
    </div>

    <!-- Caja Resumen del Pedido -->
    <div style="background-color: #fafbfc; border: 1px solid #eef0f2; border-radius: 12px; padding: 22px; margin-bottom: 24px;">
      <h3 style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b; margin: 0 0 10px 0;">
        Resumen de Productos
      </h3>

      ${renderItemsTable(order.items)}

      <!-- Totales -->
      <table style="width: 100%; font-size: 13px; line-height: 1.6; border-top: 1px solid #e2e8f0; padding-top: 12px;">
        <tr>
          <td style="color: #64748b;">Subtotal:</td>
          <td style="text-align: right; color: #0f172a; font-weight: 600;">
            $${Number(order.subtotal || order.total).toLocaleString("es-CO")}
          </td>
        </tr>
        <tr>
          <td style="color: #64748b;">Envío nacional:</td>
          <td style="text-align: right; color: #00838f; font-weight: 700;">
            ¡Gratis!
          </td>
        </tr>
        <tr style="font-size: 16px;">
          <td style="padding-top: 10px; font-weight: 800; color: #1e242b;">Total:</td>
          <td style="padding-top: 10px; text-align: right; font-weight: 800; color: #00838f;">
            $${Number(order.total).toLocaleString("es-CO")}
          </td>
        </tr>
      </table>
    </div>

    <!-- Datos de Envío -->
    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px 22px; margin-bottom: 28px;">
      <h3 style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b; margin: 0 0 10px 0;">
        Dirección de Envío
      </h3>
      <p style="margin: 0; font-size: 13px; color: #334155; line-height: 1.5;">
        <strong>${order.address}</strong><br>
        ${order.city}${order.departamento ? `, ${order.departamento}` : ""}<br>
        Teléfono de contacto: ${order.phone}
      </p>
    </div>

    <!-- Asistencia y Contacto -->
    <div style="background-color: #f0fdfa; border: 1px solid #ccfbf1; border-radius: 12px; padding: 18px 22px; text-align: center;">
      <p style="margin: 0 0 6px 0; font-size: 13px; font-weight: 700; color: #0f766e;">
        ¿Tienes alguna pregunta sobre tu entrega?
      </p>
      <p style="margin: 0; font-size: 12px; color: #115e59; line-height: 1.5;">
        Estamos atentos para ayudarte. Escríbenos a 
        <a href="mailto:${ADMIN_EMAIL}" style="color: #0f766e; font-weight: 700; text-decoration: underline;">
          ${ADMIN_EMAIL}
        </a>.
      </p>
    </div>
  `

  const html = emailBaseLayout({
    title: `Confirmación de tu compra #${shortOrderId} — Capsuland`,
    preheader: `¡Gracias por tu compra en Capsuland! Hemos recibido tu pedido #${shortOrderId}`,
    logoUrl,
    contentHtml,
  })

  try {
    const result = await resend.emails.send({
      from: SENDER_EMAIL,
      to: [order.email],
      replyTo: ADMIN_EMAIL,
      subject: `¡Confirmación de tu compra en Capsuland! — Pedido #${shortOrderId}`,
      html,
    })
    return { success: true, result }
  } catch (error) {
    console.error("Error al enviar confirmación de compra al cliente:", error)
    return { success: false, error }
  }
}
