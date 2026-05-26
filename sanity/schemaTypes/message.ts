import { defineField, defineType } from "sanity"

export default defineType({
  name: "message",
  title: "Mensajes de Contacto",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nombre",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Correo",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "phone",
      title: "Teléfono",
      type: "string",
    }),
    defineField({
      name: "subject",
      title: "Asunto / Servicio",
      type: "string",
    }),
    defineField({
      name: "text",
      title: "Mensaje",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      title: "Estado",
      type: "string",
      options: {
        list: [
          { title: "No Leído", value: "unread" },
          { title: "Leído", value: "read" },
          { title: "Respondido", value: "replied" },
        ],
      },
      initialValue: "unread",
    }),
    defineField({
      name: "createdAt",
      title: "Fecha de Recibo",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "subject",
      createdAt: "createdAt",
    },
    prepare({ title, subtitle, createdAt }) {
      return {
        title,
        subtitle: `${subtitle || "Sin asunto"} - ${new Date(createdAt).toLocaleDateString()}`,
      }
    },
  },
})
