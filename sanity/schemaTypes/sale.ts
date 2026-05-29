import { defineField, defineType } from "sanity"

export default defineType({
  name: "sale",
  title: "Ventas",
  type: "document",
  fields: [
    defineField({
      name: "customerName",
      title: "Nombre del Cliente",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Correo Electrónico",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "phone",
      title: "Teléfono",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "address",
      title: "Dirección",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "city",
      title: "Ciudad",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "items",
      title: "Productos Comprados",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "product",
              title: "Producto",
              type: "reference",
              to: [{ type: "product" }],
            },
            {
              name: "quantity",
              title: "Cantidad",
              type: "number",
            },
            {
              name: "price",
              title: "Precio Unitario",
              type: "number",
            },
          ],
          preview: {
            select: {
              title: "product.referencia",
              quantity: "quantity",
              price: "price",
            },
            prepare({ title, quantity, price }) {
              return {
                title: `${quantity}x ${title || 'Producto desconocido'}`,
                subtitle: `$${price}`,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: "subtotal",
      title: "Subtotal",
      type: "number",
    }),
    defineField({
      name: "total",
      title: "Total",
      type: "number",
    }),
    defineField({
      name: "status",
      title: "Estado del Pedido",
      type: "string",
      options: {
        list: [
          { title: "Pendiente", value: "pendiente" },
          { title: "Pagado", value: "pagado" },
          { title: "Enviado", value: "enviado" },
          { title: "Entregado", value: "entregado" },
          { title: "Cancelado", value: "cancelado" },
        ],
        layout: "radio",
      },
      initialValue: "pendiente",
    }),
    defineField({
      name: "createdAt",
      title: "Fecha de Creación",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
})
