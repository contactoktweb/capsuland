import { defineField, defineType } from "sanity"

export default defineType({
  name: "product",
  title: "Productos",
  type: "document",
  fields: [
    defineField({
      name: "referencia",
      title: "Referencia (Nombre del Producto)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "referencia",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "categoria",
      title: "Categoría",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "registroInvima",
      title: "Registro INVIMA",
      type: "string",
    }),
    defineField({
      name: "beneficios",
      title: "Beneficios",
      type: "text",
    }),
    defineField({
      name: "descripcion",
      title: "Descripción",
      type: "text",
    }),
    defineField({
      name: "advertencia",
      title: "Advertencia",
      type: "text",
    }),
    defineField({
      name: "modoDeUso",
      title: "Modo de Uso",
      type: "string",
    }),
    defineField({
      name: "cantidad",
      title: "Cantidad",
      type: "string",
    }),
    defineField({
      name: "price",
      title: "Precio",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "originalPrice",
      title: "Precio Original (Antes)",
      type: "number",
    }),
    defineField({
      name: "gallery",
      title: "Galería de Imágenes",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
  ],
})
