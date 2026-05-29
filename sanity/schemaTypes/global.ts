import { defineField, defineType } from "sanity"

export default defineType({
  name: "global",
  title: "Configuración Global",
  type: "document",
  fields: [
    defineField({
      name: "siteTitle",
      title: "Título del Sitio",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "siteDescription",
      title: "Descripción del Sitio (SEO)",
      type: "text",
    }),
    defineField({
      name: "logo",
      title: "Logo Principal",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "email",
      title: "Correo de Contacto",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Teléfono Principal",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Dirección",
      type: "string",
    }),
    defineField({
      name: "socials",
      title: "Redes Sociales",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "platform", title: "Plataforma", type: "string" },
            { name: "url", title: "URL", type: "url" },
          ],
        },
      ],
    }),
    defineField({
      name: "favicon",
      title: "Favicon (Ícono del navegador - 32x32 recomendado)",
      type: "image",
    }),
    defineField({
      name: "appleIcon",
      title: "Apple Touch Icon (Ícono para iOS - 180x180 recomendado)",
      type: "image",
    }),
    defineField({
      name: "seoGeo",
      title: "Configuración SEO GEO (Ubicación Geográfica)",
      type: "object",
      fields: [
        {
          name: "region",
          title: "Región (ej: CO-DC para Bogotá, Colombia)",
          type: "string",
        },
        {
          name: "placename",
          title: "Nombre del Lugar (ej: Bogotá)",
          type: "string",
        },
        {
          name: "position",
          title: "Coordenadas (Latitud;Longitud, ej: 4.6097100;-74.0817500)",
          type: "string",
        },
      ],
    }),
  ],
})
