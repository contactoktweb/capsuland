import { groq } from "next-sanity"

// Fetch global configurations
export const globalSettingsQuery = groq`
  *[_type == "global"][0] {
    siteTitle,
    siteDescription,
    "logo": logo.asset->url,
    email,
    phone,
    address,
    socials[] {
      platform,
      url
    }
  }
`

// Fetch homepage content
export const homepageQuery = groq`
  *[_type == "homepage"][0] {
    hero {
      badge,
      titleLine1,
      titleLine2,
      titleLine3,
      subtitle,
      "backgroundImage": backgroundImage.asset->url,
      stats[] {
        value,
        suffix,
        label
      }
    },
    trustMarquee {
      logos[] {
        name,
        "logoImage": logoImage.asset->url
      }
    },
    services {
      badge,
      title,
      items[] {
        title,
        description,
        benefits,
        iconName,
        "image": image.asset->url
      }
    },
    about {
      badge,
      title,
      quote,
      features[] {
        title,
        description,
        iconName
      },
      "mainImage": mainImage.asset->url,
      "secondaryImage": secondaryImage.asset->url,
      yearsOfExperience
    },
    process {
      badge,
      title,
      steps[] {
        stepNumber,
        title,
        description
      }
    },
    testimonials {
      badge,
      title,
      reviews[] {
        name,
        role,
        comment,
        "avatar": avatar.asset->url,
        rating
      }
    }
  }
`

// Fetch all categories
export const categoriesQuery = groq`
  *[_type == "category"] {
    _id,
    name,
    "slug": slug.current,
    description
  }
`

// Fetch all products
export const productsQuery = groq`
  *[_type == "product"] {
    _id,
    referencia,
    "slug": slug.current,
    "categoria": categoria->name,
    registroInvima,
    beneficios,
    descripcion,
    advertencia,
    modoDeUso,
    cantidad,
    price,
    originalPrice,
    "gallery": gallery[].asset->url
  }
`

// Fetch a single product by slug
export const productBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    referencia,
    "slug": slug.current,
    "categoria": categoria->name,
    registroInvima,
    beneficios,
    descripcion,
    advertencia,
    modoDeUso,
    cantidad,
    price,
    originalPrice,
    "gallery": gallery[].asset->url
  }
`

