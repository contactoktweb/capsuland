import { defineField, defineType } from "sanity"

export default defineType({
  name: "homepage",
  title: "Página de Inicio",
  type: "document",
  fields: [
    // --- HERO SECTION ---
    defineField({
      name: "hero",
      title: "Sección Hero",
      type: "object",
      fields: [
        defineField({
          name: "badge",
          title: "Insignia / Badge",
          type: "string",
        }),
        defineField({
          name: "titleLine1",
          title: "Título Línea 1 (Blanco)",
          type: "string",
        }),
        defineField({
          name: "titleLine2",
          title: "Título Línea 2 (Contorno)",
          type: "string",
        }),
        defineField({
          name: "titleLine3",
          title: "Título Línea 3 (Naranja)",
          type: "string",
        }),
        defineField({
          name: "subtitle",
          title: "Subtítulo",
          type: "text",
        }),
        defineField({
          name: "backgroundImage",
          title: "Imagen de Fondo",
          type: "image",
          options: { hotspot: true },
        }),
        defineField({
          name: "stats",
          title: "Estadísticas del Hero",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "value", title: "Valor (Número)", type: "number" },
                { name: "suffix", title: "Sufijo (ej: %, M+)", type: "string" },
                { name: "label", title: "Etiqueta", type: "string" },
              ],
            },
          ],
        }),
      ],
    }),

    // --- TRUST MARQUEE ---
    defineField({
      name: "trustMarquee",
      title: "Carrusel de Marcas / Certificaciones",
      type: "object",
      fields: [
        defineField({
          name: "logos",
          title: "Logos",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "name", title: "Nombre de la Marca/Logo", type: "string" },
                { name: "logoImage", title: "Imagen del Logo", type: "image" },
              ],
            },
          ],
        }),
      ],
    }),

    // --- SERVICES SECTION ---
    defineField({
      name: "services",
      title: "Sección Servicios",
      type: "object",
      fields: [
        defineField({
          name: "badge",
          title: "Insignia",
          type: "string",
        }),
        defineField({
          name: "title",
          title: "Título Principal",
          type: "string",
        }),
        defineField({
          name: "items",
          title: "Servicios",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "title", title: "Título del Servicio", type: "string" },
                { name: "description", title: "Descripción", type: "text" },
                {
                  name: "benefits",
                  title: "Beneficios / Características",
                  type: "array",
                  of: [{ type: "string" }],
                },
                { name: "iconName", title: "Nombre del Icono (Iconify)", type: "string" },
                { name: "image", title: "Imagen Ilustrativa (Opcional)", type: "image" },
              ],
            },
          ],
        }),
      ],
    }),

    // --- ABOUT SECTION ---
    defineField({
      name: "about",
      title: "Sección Nosotros",
      type: "object",
      fields: [
        defineField({
          name: "badge",
          title: "Insignia",
          type: "string",
        }),
        defineField({
          name: "title",
          title: "Título Principal",
          type: "string",
        }),
        defineField({
          name: "quote",
          title: "Frase Destacada (Cita)",
          type: "string",
        }),
        defineField({
          name: "features",
          title: "Características Destacadas",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "title", title: "Título", type: "string" },
                { name: "description", title: "Descripción", type: "text" },
                { name: "iconName", title: "Icono (Lucide o Iconify)", type: "string" },
              ],
            },
          ],
        }),
        defineField({
          name: "mainImage",
          title: "Imagen Principal (Científica/Laboratorio)",
          type: "image",
          options: { hotspot: true },
        }),
        defineField({
          name: "secondaryImage",
          title: "Imagen Secundaria (Flotante)",
          type: "image",
          options: { hotspot: true },
        }),
        defineField({
          name: "yearsOfExperience",
          title: "Años de Experiencia",
          type: "string",
        }),
      ],
    }),

    // --- PROCESS SECTION ---
    defineField({
      name: "process",
      title: "Sección Nuestro Proceso",
      type: "object",
      fields: [
        defineField({
          name: "badge",
          title: "Insignia",
          type: "string",
        }),
        defineField({
          name: "title",
          title: "Título Principal",
          type: "string",
        }),
        defineField({
          name: "steps",
          title: "Pasos del Proceso",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "stepNumber", title: "Número de Paso", type: "string" },
                { name: "title", title: "Título del Paso", type: "string" },
                { name: "description", title: "Descripción", type: "text" },
              ],
            },
          ],
        }),
      ],
    }),

    // --- TESTIMONIALS SECTION ---
    defineField({
      name: "testimonials",
      title: "Sección Testimonios",
      type: "object",
      fields: [
        defineField({
          name: "badge",
          title: "Insignia",
          type: "string",
        }),
        defineField({
          name: "title",
          title: "Título Principal",
          type: "string",
        }),
        defineField({
          name: "reviews",
          title: "Opiniones / Reseñas",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "name", title: "Nombre del Cliente", type: "string" },
                { name: "role", title: "Cargo / Empresa", type: "string" },
                { name: "comment", title: "Testimonio", type: "text" },
                { name: "avatar", title: "Avatar (Imagen)", type: "image" },
                { name: "rating", title: "Calificación (Estrellas)", type: "number", initialValue: 5 },
              ],
            },
          ],
        }),
      ],
    }),
  ],
})
