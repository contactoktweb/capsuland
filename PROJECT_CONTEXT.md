# Contexto del Proyecto: Capsuland

## Descripción
**Capsuland** es una plataforma e-commerce de suplementos dietarios y nutricionales en Colombia. El proyecto está construido sobre Next.js (App Router), React 19, Tailwind CSS y Sanity CMS como backend de contenido y gestión de pedidos.

## Stack Tecnológico
- **Framework:** Next.js 16 (App Router)
- **Lenguaje:** TypeScript
- **CMS / Base de Datos:** Sanity CMS (schemas: `sale`, `product`, `category`, `homepage`, `message`, `global`)
- **Estilos:** Tailwind CSS v4, Lucide Icons, Iconify
- **Email:** Resend
- **Pasarela de Pagos:** Mercado Pago (Checkout Pro y Webhooks)

## Integración con Mercado Pago
- **Variables de Entorno (`.env.local`):**
  - `MP_CLIENT_ID`: Identificador de cliente Mercado Pago.
  - `MP_PUBLIC_KEY` / `NEXT_PUBLIC_MP_PUBLIC_KEY`: Clave pública de prueba / producción.
  - `MP_ACCESS_TOKEN`: Token de acceso para la creación de preferencias y consulta de pagos.
  - `NEXT_PUBLIC_SITE_URL`: URL base de la aplicación para retornos y webhooks.
- **Rutas clave:**
  - `app/api/checkout/route.ts`: Creación de la orden en Sanity, despacho de correos y generación de la preferencia de pago en Mercado Pago con descriptor `CAPSULAND` y especificación clara de motivo de compra.
  - `app/api/checkout/verify/route.ts`: Endpoint seguro de verificación inmediata del pago que actualiza el estado de la venta a `pagado` cuando el usuario retorna a `/gracias`.
  - `app/api/webhook/mercadopago/route.ts`: Webhook receptor de notificaciones IPN/Webhooks de Mercado Pago.
  - `app/checkout/page.tsx`: Formulario de checkout y redirección a Mercado Pago.
  - `app/gracias/page.tsx`: Pantalla de confirmación con estado de la transacción y verificación automática.
