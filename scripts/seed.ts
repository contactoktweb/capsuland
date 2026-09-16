import { createClient } from "next-sanity";
import { readFileSync } from "fs";
import { resolve } from "path";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset || !token) {
  console.error("Missing required environment variables.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-05-26",
  useCdn: false,
  token,
});

async function uploadImage(filePath: string) {
  try {
    const absolutePath = resolve(process.cwd(), filePath);
    const buffer = readFileSync(absolutePath);
    const asset = await client.assets.upload("image", buffer, {
      filename: filePath.split("/").pop(),
    });
    console.log(`Uploaded image: ${filePath} -> ${asset._id}`);
    return {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: asset._id,
      },
    };
  } catch (error) {
    console.warn(`Failed to upload image ${filePath}:`, error);
    return undefined;
  }
}

async function seed() {
  console.log("Starting seed process...");

  // Upload images
  const heroImage = await uploadImage("public/images/hero-capsule.jpg");
  const logoImage = await uploadImage("public/images/logo.png");
  const scientistImage = await uploadImage("public/images/scientist.jpg");
  const maquilaImage = await uploadImage("public/images/maquila.jpg");

  // Create Global Settings
  const globalDoc = {
    _type: "global",
    _id: "global-config", // Fixed ID to always overwrite/update the same document
    siteTitle: "Capsuland",
    siteDescription: "Fabricamos capsulas blandas de gelatina con los mas altos estandares internacionales de calidad.",
    logo: logoImage,
    email: "comercial2@capsuland.com",
    emailSecondary: "coordinadorcomercial@capsuland.com",
    phone: "+57 310 304 7673",
    address: "Bogotá, Colombia",
    socials: [
      {
        _key: "instagram-link",
        platform: "Instagram",
        url: "https://instagram.com",
      },
      {
        _key: "linkedin-link",
        platform: "LinkedIn",
        url: "https://linkedin.com",
      },
    ],
    seoGeo: {
      region: "CO-DC",
      placename: "Bogotá",
      position: "4.6097100;-74.0817500",
    }
  };

  console.log("Creating/Updating Global Settings...");
  await client.createOrReplace(globalDoc);

  // Create Homepage
  const homepageDoc = {
    _type: "homepage",
    _id: "homepage-content", // Fixed ID
    hero: {
      badge: "Laboratorio Farmaceutico",
      titleLine1: "Ciencia",
      titleLine2: "Encuentra",
      titleLine3: "Innovacion.",
      subtitle: "Fabricamos capsulas blandas de gelatina con los mas altos estandares internacionales de calidad.",
      backgroundImage: heroImage,
      stats: [
        { _key: "stat1", value: 20, suffix: "M+", label: "Capsulas / Ano" },
        { _key: "stat2", value: 15, suffix: "+", label: "Años Experiencia" },
        { _key: "stat3", value: 98, suffix: "%", label: "Satisfaccion" },
        { _key: "stat4", value: 2, suffix: "", label: "Certificaciones" },
      ],
    },
    trustMarquee: {
      logos: [
        { _key: "tm1", name: "INVIMA" },
        { _key: "tm2", name: "BPM" },
        { _key: "tm3", name: "FDA" },
        { _key: "tm4", name: "Registro Sanitario" },
      ],
    },
    services: {
      badge: "Nuestros Servicios",
      title: "Soluciones integrales en capsula blanda",
      items: [
        {
          _key: "srv1",
          title: "Maquila y Desarrollo",
          description: "Servicio completo de manufactura de capsulas blandas con formulacion personalizada y control de calidad riguroso.",
          benefits: [
            "Desarrollo de formulaciones personalizadas",
            "Control de calidad en cada etapa",
            "Capacidad de produccion escalable",
            "Soporte regulatorio integral",
          ],
          iconName: "Factory",
          image: maquilaImage,
        },
        {
          _key: "srv2",
          title: "Suplementos",
          description: "Suplementos dietarios en capsula blanda. Omega-3, vitaminas, antioxidantes y composiciones integrales.",
          iconName: "Leaf",
        },
        {
          _key: "srv3",
          title: "Asuntos Regulatorios",
          description: "Gestion de registros sanitarios, permisos INVIMA y cumplimiento de normatividad farmaceutica.",
          iconName: "FileText",
        },
      ],
    },
    about: {
      badge: "Nuestra Trayectoria",
      title: "Con alcance global, operamos desde 2011.",
      quote: "Somos el aliado estrategico que garantiza calidad y respaldo continuo para su negocio.",
      features: [
        {
          _key: "feat1",
          title: "Innovacion Constante",
          description: "Desarrollamos formulaciones avanzadas que marcan tendencia en la industria farmaceutica.",
          iconName: "FlaskConical",
        },
        {
          _key: "feat2",
          title: "Calidad Certificada",
          description: "Cumplimos con los estandares BPM mas estrictos para garantizar seguridad total.",
          iconName: "CheckCircle2",
        },
      ],
      mainImage: scientistImage,
      secondaryImage: heroImage,
      yearsOfExperience: "15+",
    },
    process: {
      badge: "Metodologia",
      title: "Nuestro Proceso",
      steps: [
        { _key: "stp1", stepNumber: "01", title: "Necesidades", description: "Identificamos los requerimientos especificos de cada cliente y producto." },
        { _key: "stp2", stepNumber: "02", title: "Formulacion", description: "Nuestro equipo de I+D desarrolla la formulacion optima para cada capsula." },
        { _key: "stp3", stepNumber: "03", title: "Materia Prima", description: "Seleccion y verificacion de materias primas con los mas altos estandares." },
        { _key: "stp4", stepNumber: "04", title: "Produccion", description: "Manufactura en lineas certificadas con control de calidad en cada etapa." },
        { _key: "stp5", stepNumber: "05", title: "Control de Calidad", description: "Analisis de calidad de producto terminado para garantizar la excelencia." },
        { _key: "stp6", stepNumber: "06", title: "Empaque", description: "Empaque primario y secundario segun especificaciones del cliente." },
        { _key: "stp7", stepNumber: "07", title: "INVIMA", description: "Gestion completa de registros sanitarios y aprobacion regulatoria." },
      ],
    },
    testimonials: {
      badge: "Estructura Organizacional",
      title: "Nuestro equipo de trabajo",
      reviews: [
         {
           _key: "rev1",
           name: "Cliente Satisfecho",
           role: "Gerente B2B",
           comment: "Excelente calidad y tiempos de respuesta. Un aliado estratégico sin duda.",
           rating: 5,
         }
      ]
    },
  };

  console.log("Creating/Updating Homepage Content...");
  await client.createOrReplace(homepageDoc);

  console.log("Seed process finished successfully!");
}

seed().catch((err) => {
  console.error("Error during seed:", err);
  process.exit(1);
});
