# Changelog AI

## [2026-09-29] - Flujo Completo de Pago: Redirección, Sanity, Resend

### ✅ Resultados del Test End-to-End
- Orden creada en Sanity con todos los campos rellenos (incluyendo `departamento`, `notas`, `presentation`, `paymentId`, `paymentMethod`, `paidAt`)
- Webhook actualiza el estado de `pendiente` → `pagado` con ID de transacción y fecha de pago
- Correos enviados con Resend: email admin + email cliente (ambos ✅)
- Preferencia Mercado Pago con `auto_return: "approved"` → redirige automáticamente a `https://capsuland.com/gracias?order_id=...&status=approved`

### Modificado
- [.env.local](file:///Users/keynerstebantri/Desktop/Trabajos/capsuland/.env.local):
  - `NEXT_PUBLIC_SITE_URL` cambiado a `https://capsuland.com` para que `auto_return` funcione y la redirección post-pago apunte a la web real.
  - Agregadas variables `RESEND_FROM_EMAIL="Capsuland <onboarding@resend.dev>"` y `RESEND_ADMIN_EMAIL="coordinadorcomercial@capsuland.com"`.
  - ⚠️ **Pendiente**: Cuando el dominio `capsuland.com` esté verificado en Resend, cambiar `RESEND_FROM_EMAIL` a `"Capsuland <no-reply@capsuland.com>"`.
- [app/api/checkout/route.ts](file:///Users/keynerstebantri/Desktop/Trabajos/capsuland/app/api/checkout/route.ts):
  - Ahora guarda `departamento`, `notas` y `presentation` de cada ítem en Sanity.
- [sanity/schemaTypes/sale.ts](file:///Users/keynerstebantri/Desktop/Trabajos/capsuland/sanity/schemaTypes/sale.ts):
  - Nuevos campos en el schema de venta: `departamento`, `notas`, `presentation` (en items), `paymentId`, `paymentMethod`, `paidAt`.

---

## [2026-09-29] - Integración de Pasarela de Pago Mercado Pago

### Añadido
- Configuración de credenciales de prueba en [.env.local](file:///Users/keynerstebantri/Desktop/Trabajos/capsuland/.env.local) y documentación en [.env.example](file:///Users/keynerstebantri/Desktop/Trabajos/capsuland/.env.example):
  - `MP_CLIENT_ID`
  - `MP_PUBLIC_KEY` / `NEXT_PUBLIC_MP_PUBLIC_KEY`
  - `MP_ACCESS_TOKEN`
- Nuevo endpoint de verificación [app/api/checkout/verify/route.ts](file:///Users/keynerstebantri/Desktop/Trabajos/capsuland/app/api/checkout/verify/route.ts) para consultar el estado del pago directamente con Mercado Pago y actualizar Sanity en tiempo real al retornar a la página de gracias.

### Modificado
- [app/api/checkout/route.ts](file:///Users/keynerstebantri/Desktop/Trabajos/capsuland/app/api/checkout/route.ts):
  - Especificación en el motivo/concepto de pago de que corresponde a **Capsuland**: prefijos en los títulos de productos (`Capsuland - ${item.referencia}`) y descripciones (`Pago de pedido en Capsuland: ...`).
  - Configuración de `statement_descriptor` a `"CAPSULAND"`.
  - Inclusión de metadatos de pedido con comercio y motivo explícito.
  - Corrección de `auto_return` para activarse únicamente en conexiones HTTPS según el requerimiento de la API de Mercado Pago (evitando el error 400 en localhost).
  - Manejo condicional de `notification_url` para URLs públicas.
- [app/api/webhook/mercadopago/route.ts](file:///Users/keynerstebantri/Desktop/Trabajos/capsuland/app/api/webhook/mercadopago/route.ts):
  - Soporte para notificaciones tanto vía query params (`data.id`) como payload JSON en el cuerpo de la petición.
  - Mapeo de estados (`pagado`, `cancelado`, `pendiente`).
  - Implementación de método GET para comprobaciones de estado/health check.
- [app/checkout/page.tsx](file:///Users/keynerstebantri/Desktop/Trabajos/capsuland/app/checkout/page.tsx):
  - Validación de respuesta del servidor antes de intentar redirigir.
  - Manejo de redirección hacia `init_point` de Mercado Pago.
- [app/gracias/page.tsx](file:///Users/keynerstebantri/Desktop/Trabajos/capsuland/app/gracias/page.tsx):
  - Invocación automática de sincronización de pago con `/api/checkout/verify` al detectar `payment_id` en los parámetros de retorno.
- [components/hero.tsx](file:///Users/keynerstebantri/Desktop/Trabajos/capsuland/components/hero.tsx) y Sanity (`homepage-content`):
  - Corrección de la etiqueta estadística de "Capsulas / Ano" a **"CAPSULAS / AÑO"** (tanto en el documento de Sanity CMS como mediante normalización en el render del componente).
