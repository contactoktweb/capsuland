import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { createClient } from "@sanity/client"

// Read environment variables
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.join(__dirname, "..")
const envFile = fs.readFileSync(path.join(projectRoot, ".env.local"), "utf8")

const envVars = {}
envFile.split("\n").forEach((line) => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/)
  if (match) {
    let value = match[2] ? match[2].trim() : ""
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.substring(1, value.length - 1)
    } else if (value.startsWith("'") && value.endsWith("'")) {
      value = value.substring(1, value.length - 1)
    }
    envVars[match[1]] = value
  }
})

const projectId = envVars.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = envVars.NEXT_PUBLIC_SANITY_DATASET
const token = envVars.SANITY_API_WRITE_TOKEN

if (!projectId || !dataset || !token) {
  console.error("Missing Sanity environment variables in .env.local")
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-05-26",
  token,
  useCdn: false,
})

// Current static categories list
const PRODUCT_CATEGORIES = [
  "Vitaminas",
  "Ácidos Grasos",
  "Proteínas",
  "Proteínas y Vitaminas",
  "Antioxidantes",
  "Minerales",
  "Minerales y Vitaminas",
  "Bienestar Digestivo",
  "Bienestar Femenino",
]

// Current static products list
const products = [
  {
    referencia: "BIOTINA 900 mcg",
    slug: "biotina-900-mcg",
    categoria: "Vitaminas",
    registroInvima: "SD2013-0002993",
    beneficios:
      "Aporta biotina, nutriente que contribuye al mantenimiento normal de la piel, el cabello y las uñas.",
    descripcion:
      "Favorecen el metabolismo energético, ayuda al mantenimiento de piel y mucosas, función normal del sistema nervioso y mantenimiento del cabello. La Biotina es una vitamina B, que se encuentra en muchos alimentos y ayudan a convertir los carbohidratos, las grasas y las proteínas que consume, en energía que usted necesita.",
    advertencia:
      "Este producto es un suplemento dietario, no es un medicamento y no suple una alimentación equilibrada. Puede causar hipersensibilidad. No consumir en estado de embarazo y lactancia. Mantener fuera del alcance de los niños. Almacenar a temperatura inferior a 30°C y humedad relativa menor a 75%.",
    modoDeUso: "Adultos, tomar 1 cápsula blanda al día",
    cantidad: "Cantidad x 60 cápsulas blandas",
    price: 32900,
    originalPrice: 45000,
    gallery: [
      "/productos/Biotina/Biotina-frontal.png",
      "/productos/Biotina/Biotina-Frasco-Frontal.png",
      "/productos/Biotina/Biotina-Perfil.png",
      "/productos/Biotina/Biotina-Frasco-Izq.png",
      "/productos/Biotina/Biotina-back.png",
      "/productos/Biotina/Biotina-Frasco-Barcode.png",
    ],
  },
  {
    referencia: "CALCIO 400 mg + VITAMINA D3",
    slug: "calcio-400-vitamina-d3",
    categoria: "Minerales",
    registroInvima: "SD2013-0003063",
    beneficios:
      "Aporta calcio y vitamina D3, nutrientes que contribuyen al mantenimiento normal de los huesos, los dientes y al adecuado aprovechamiento del calcio en el organismo.",
    descripcion:
      "La vitamina D ayuda al cuerpo absorber el calcio y contribuye al funcionamiento normal del sistema inmune. El Calcio contribuye al mantenimiento normal de los huesos y al funcionamiento normal del sistema nervioso y muscular.",
    advertencia:
      "Este producto es un suplemento dietario, no es un medicamento y no suple una alimentación equilibrada. Puede causar hipersensibilidad. No consumir en estado de embarazo y lactancia. Mantener fuera del alcance de los niños. Almacenar a temperatura inferior a 30°C y humedad relativa menor a 75%.",
    modoDeUso: "Adultos, tomar 2 cápsulas blandas al día",
    cantidad: "Cantidad x 60 cápsulas blandas",
    price: 28900,
    gallery: [
      "/productos/Calcio 400/Calcio-400-frontal.png",
      "/productos/Calcio 400/Calcio-Frasco-Frontal.png",
      "/productos/Calcio 400/Calcio-400-perfil.png",
      "/productos/Calcio 400/Calcio-Frasco-Izq.png",
      "/productos/Calcio 400/Calcio-400-back.png",
      "/productos/Calcio 400/Calcio-Frasco--Barcode.png",
    ],
  },
  {
    referencia: "CLA 1000 mg",
    slug: "cla-1000-mg",
    categoria: "Ácidos Grasos",
    registroInvima: "SD2024-0001728-R1",
    beneficios:
      "Aporta CLA, ácido graso que acompaña el metabolismo de las grasas dentro de una alimentación equilibrada y un estilo de vida saludable.",
    descripcion:
      "Contribuye al mantenimiento de un peso corporal saludable cuando se acompaña de una alimentación equilibrada y un estilo de vida activo. Apoya el mantenimiento de niveles saludables de colesterol y triglicéridos. Sus componentes pueden favorecer la respuesta inmunológica y contribuir con el bienestar del sistema inflamatorio.",
    advertencia:
      "Este producto es un suplemento dietario, no es un medicamento y no suple una alimentación equilibrada. Puede causar hipersensibilidad. No consumir en estado de embarazo y lactancia. Mantener fuera del alcance de los niños. Almacenar a temperatura inferior a 30°C y humedad relativa menor a 75%.",
    modoDeUso: "Adultos, tomar 2 cápsulas blandas al día",
    cantidad: "Cantidad x 60 cápsulas blandas",
    price: 35900,
    gallery: [],
  },
  {
    referencia: "COLÁGENO 500 mg",
    slug: "colageno-500-mg",
    categoria: "Proteínas",
    registroInvima: "SD2014-0003101",
    beneficios:
      "Aporta colágeno, proteína presente de forma natural en el organismo que forma parte de estructuras como la piel, cartílagos y tejidos conectivos.",
    descripcion:
      "Juega un papel importante en la construcción del cartílago articular. Estimula la regeneración de los tejidos, mejora la elasticidad y firmeza de la piel. Ayuda a mantener la masa muscular.",
    advertencia:
      "Este producto es un suplemento dietario, no es un medicamento y no suple una alimentación equilibrada. Puede causar hipersensibilidad. No consumir en estado de embarazo y lactancia. Mantener fuera del alcance de los niños. Almacenar a temperatura inferior a 30°C y humedad relativa menor a 75%.",
    modoDeUso: "Adultos, tomar 2 cápsulas blandas al día",
    cantidad: "Cantidad x 60 cápsulas blandas",
    price: 34900,
    gallery: [
      "/productos/Colageno/Colageno-frontal.png",
      "/productos/Colageno/Colageno-Frasco-frontal.png",
      "/productos/Colageno/Colageno-perfil.png",
      "/productos/Colageno/Colageno-Frasco-izq.png",
      "/productos/Colageno/Colageno-back.png",
      "/productos/Colageno/Colageno-Frasco-der.png",
    ],
  },
  {
    referencia: "COLÁGENO 200 mg + BIOTINA 900 mcg",
    slug: "colageno-200-biotina-900",
    categoria: "Proteínas y Vitaminas",
    registroInvima: "SD2020-0004523",
    beneficios:
      "Aporta colágeno y biotina, nutrientes que contribuyen al mantenimiento normal de la piel, el cabello y las uñas.",
    descripcion:
      "Es una vitamina que se usa para el fortalecimiento del cabello y las uñas frágiles. Juega un papel importante en la construcción del cartílago articular. Estimula la regeneración de los tejidos, mejora la elasticidad y firmeza de la piel. Ayuda a mantener la masa muscular. Aporta vitalidad al organismo.",
    advertencia:
      "Este producto es un suplemento dietario, no es un medicamento y no suple una alimentación equilibrada. Puede causar hipersensibilidad. No consumir en estado de embarazo y lactancia. Mantener fuera del alcance de los niños. Almacenar a temperatura inferior a 30°C y humedad relativa menor a 75%.",
    modoDeUso: "Adultos, tomar 1 cápsula blanda al día",
    cantidad: "Cantidad x 60 cápsulas blandas",
    price: 38900,
    originalPrice: 52000,
    gallery: [
      "/productos/Colageno + Biotina/Colageno-+-Biotina-Frontal.png",
      "/productos/Colageno + Biotina/Colageno-+-Biotina-Frasco-Frontal.png",
      "/productos/Colageno + Biotina/Colageno-+-Biotina-Perfil.png",
      "/productos/Colageno + Biotina/Colageno-+-Biotina-Frasco-Iz.png",
      "/productos/Colageno + Biotina/Colageno-+-Biotina-back.png",
      "/productos/Colageno + Biotina/Colageno-+-Biotina-Frasco-Barcode.png",
    ],
  },
  {
    referencia: "COMPLEJO B + ZINC + VITAMINA D3",
    slug: "complejo-b-zinc-vitamina-d3",
    categoria: "Minerales y Vitaminas",
    registroInvima: "SD2017-0004113",
    beneficios:
      "Aporta vitaminas del complejo B, zinc y vitamina D3, nutrientes que contribuyen al metabolismo energético normal y al funcionamiento normal del sistema nervioso e inmune.",
    descripcion:
      "Contribuye al metabolismo energético y sistema nervioso normal, ayuda a sobreponerse del desgaste energético. Contribuye a la formación normal de glóbulos rojos. Apoya el metabolismo normal de azúcares, grasas y proteínas.",
    advertencia:
      "Este producto es un suplemento dietario, no es un medicamento y no suple una alimentación equilibrada. Puede causar hipersensibilidad. No consumir en estado de embarazo y lactancia. Mantener fuera del alcance de los niños. Almacenar a temperatura inferior a 30°C y humedad relativa menor a 75%.",
    modoDeUso: "Adultos, tomar 2 cápsulas blandas al día",
    cantidad: "Cantidad x 60 cápsulas blandas",
    price: 31900,
    gallery: [
      "/productos/Complejo B/Complejo-B-Frontal.png",
      "/productos/Complejo B/Complejo-B-Frasco-Frontal.png",
      "/productos/Complejo B/Complejo-B-Perfil.png",
      "/productos/Complejo B/Complejo-B-Frasco-Izq.png",
      "/productos/Complejo B/Complejo-B-Back.png",
      "/productos/Complejo B/Complejo-B-Frasco-barcode.png",
    ],
  },
  {
    referencia: "FIBRA DE NARANJA, ESPIRULINA, VITAMINA C, VITAMINA A Y L-CARNITINA",
    slug: "fibra-naranja-espirulina-vitaminas",
    categoria: "Bienestar Digestivo",
    registroInvima: "SD2024-0001759 - R1",
    beneficios:
      "Con fibra de naranja que acompaña el bienestar digestivo. Espirulina fuente natural de nutrientes. Vitamina C que contribuye al funcionamiento normal del sistema inmune. Vitamina A que contribuye al mantenimiento normal de la visión. L-carnitina que participa en el metabolismo energético.",
    descripcion:
      "Contribuye al mantenimiento de una función intestinal saludable y favorece el tránsito digestivo. Actúa como fuente de antioxidantes, apoya el funcionamiento normal del sistema inmune y contribuye al mantenimiento de la salud visual, así como al desarrollo normal de huesos, dientes y tejidos blandos. Favorece el metabolismo energético y apoya el rendimiento físico, la recuperación después de la actividad y el mantenimiento de un peso corporal saludable, cuando se acompaña de una alimentación balanceada y actividad física regular.",
    advertencia:
      "Este producto es un suplemento dietario, no es un medicamento y no suple una alimentación equilibrada. Puede causar hipersensibilidad. No consumir en estado de embarazo y lactancia. Mantener fuera del alcance de los niños. Almacenar a temperatura inferior a 30°C y humedad relativa menor a 75%.",
    modoDeUso: "Adultos, tomar 2 cápsulas blandas al día",
    cantidad: "Cantidad x 60 cápsulas blandas",
    price: 36900,
    gallery: [],
  },
  {
    referencia: "GLUTATIÓN",
    slug: "glutation",
    categoria: "Antioxidantes",
    registroInvima: "SD2024-0004811",
    beneficios:
      "Aporta glutatión, antioxidante presente de forma natural en el organismo y que participa en los procesos naturales de protección y equilibrio celular del organismo.",
    descripcion:
      "Actúa como un potente antioxidante, ayudando a contrarrestar el estrés oxidativo y contribuyendo a la protección celular frente a los radicales libres. Su función en los procesos de detoxificación celular apoya el equilibrio y la depuración del organismo, lo que favorece el bienestar general y la salud integral. Contribuye al funcionamiento normal del sistema nervioso y al equilibrio de los procesos metabólicos relacionados con el envejecimiento celular.",
    advertencia:
      "Este producto es un suplemento dietario, no es un medicamento y no suple una alimentación equilibrada. Puede causar hipersensibilidad. No consumir en estado de embarazo y lactancia. Mantener fuera del alcance de los niños. Almacenar a temperatura inferior a 30°C y humedad relativa menor a 75%.",
    modoDeUso: "Adultos, tomar 2 cápsulas blandas al día",
    cantidad: "Cantidad x 60 cápsulas blandas",
    price: 42900,
    gallery: [],
  },
  {
    referencia: "ISOFLAVONA DE SOYA 16 mg + CALCIO + VITAMINA D3",
    slug: "isoflavona-soya-calcio-vitamina-d3",
    categoria: "Bienestar Femenino",
    registroInvima: "SD2016-0003814",
    beneficios:
      "Aporta Isoflavonas de soya, compuestos vegetales que acompañan el bienestar general. Calcio, que contribuye al mantenimiento normal de los huesos y dientes. Vitamina D3 que contribuye a la absorción y utilización normal del calcio.",
    descripcion:
      "Isoflavonas de soya, compuestos de origen vegetal asociados al bienestar femenino, además acompañan durante etapas de cambios hormonales como la menopausia. Contiene calcio y vitamina D3, nutrientes importantes para el mantenimiento normal de los huesos. La vitamina D3 favorece el adecuado aprovechamiento del calcio en el organismo.",
    advertencia:
      "Este producto es un suplemento dietario, no es un medicamento y no suple una alimentación equilibrada. Puede causar hipersensibilidad. No consumir en estado de embarazo y lactancia. Mantener fuera del alcance de los niños. Almacenar a temperatura inferior a 30°C y humedad relativa menor a 75%.",
    modoDeUso: "Adultos, tomar 1 cápsula blanda al día",
    cantidad: "Cantidad x 60 cápsulas blandas",
    price: 33900,
    gallery: [
      "/productos/Isoflavonas/Isoflavona-frontal.png",
      "/productos/Isoflavonas/Isoflavonas-Frasco-Frontal.png",
      "/productos/Isoflavonas/Isoflavona-perfil.png",
      "/productos/Isoflavonas/Isoflavonas-Frasco-Izq.png",
      "/productos/Isoflavonas/Isoflavona-back.png",
      "/productos/Isoflavonas/Isoflavonas-Frasco-Der.png",
    ],
  },
  {
    referencia: "LECITINA DE SOYA 1200 mg",
    slug: "lecitina-soya-1200-mg",
    categoria: "Ácidos Grasos",
    registroInvima: "SD2023-0001466 - R1",
    beneficios:
      "Fuente de fosfolípidos, compuestos que participan en el metabolismo de las grasas dentro del organismo.",
    descripcion:
      "Fuente natural de fosfolípidos que contribuyen al metabolismo normal de las grasas en el organismo. Como parte de una dieta equilibrada y un estilo de vida saludable, puede apoyar el equilibrio de los lípidos en el cuerpo y favorecer el bienestar general. Compuestos asociados al bienestar del sistema cardiovascular y el metabolismo energético.",
    advertencia:
      "Este producto es un suplemento dietario, no es un medicamento y no suple una alimentación equilibrada. Puede causar hipersensibilidad. No consumir en estado de embarazo y lactancia. Mantener fuera del alcance de los niños. Almacenar a temperatura inferior a 30°C y humedad relativa menor a 75%.",
    modoDeUso: "Adultos, tomar 2 cápsulas blandas al día",
    cantidad: "Cantidad x 60 cápsulas blandas",
    price: 29900,
    gallery: [],
  },
  {
    referencia: "MULTIVITAMÍNICO CON MINERALES",
    slug: "multivitaminico-minerales",
    categoria: "Minerales y Vitaminas",
    registroInvima: "SD2025-0004870",
    beneficios:
      "Contribuye al funcionamiento normal del sistema inmunológico, la salud ósea, la producción de energía celular y el metabolismo de nutrientes.",
    descripcion:
      "Contribuye al funcionamiento normal del sistema inmunológico, la salud ósea, la producción de energía celular y el metabolismo de nutrientes. El fósforo es esencial para el funcionamiento normal de los músculos y del sistema nervioso. La vitamina K apoya a la coagulación normal de la sangre y participa en el uso adecuado del calcio en huesos y tejidos, en sinergia con la vitamina D3, el calcio y el fósforo. El yodo favorece la producción normal de hormonas tiroideas, que participan en el metabolismo energético y el desarrollo neurológico.",
    advertencia:
      "Este producto es un suplemento dietario, no es un medicamento y no suple una alimentación equilibrada. Puede causar hipersensibilidad. No consumir en estado de embarazo y lactancia. Mantener fuera del alcance de los niños. Almacenar a temperatura inferior a 30°C y humedad relativa menor a 75%.",
    modoDeUso: "Adultos, tomar 1 cápsula blanda al día",
    cantidad: "Cantidad x 60 cápsulas blandas",
    price: 34900,
    gallery: [],
  },
  {
    referencia: "OMEGA 3",
    slug: "omega-3",
    categoria: "Ácidos Grasos",
    registroInvima: "SD2019-0004443",
    beneficios:
      "Aporta ácidos grasos omega 3 (EPA y DHA), nutrientes asociados al bienestar cardiovascular y que forman parte de procesos relacionados con el funcionamiento normal del cerebro y la visión.",
    descripcion:
      "Los ácidos grasos omega 3 (EPA y DHA) son nutrientes esenciales que forman parte de una alimentación equilibrada. Su consumo se asocia al bienestar cardiovascular y a procesos relacionados con el funcionamiento normal del organismo. Además, participan en el equilibrio del organismo y en procesos naturales del cuerpo dentro de hábitos de vida saludables.",
    advertencia:
      "Este producto es un suplemento dietario, no es un medicamento y no suple una alimentación equilibrada. Puede causar hipersensibilidad. No consumir en estado de embarazo y lactancia. Mantener fuera del alcance de los niños. Almacenar a temperatura inferior a 30°C y humedad relativa menor a 75%.",
    modoDeUso: "Adultos, tomar 2 cápsulas blandas al día",
    cantidad: "Cantidad x 60 cápsulas blandas",
    price: 32900,
    gallery: [
      "/productos/Omega 3/Omega-3-frontal.png",
      "/productos/Omega 3/Omega-3-Frasco-Frontal.png",
      "/productos/Omega 3/Omega-3-Perfil.png",
      "/productos/Omega 3/Omega-3-Frasco-izq.png",
      "/productos/Omega 3/Omega-3-back.png",
      "/productos/Omega 3/Omega-3-Frasco-der.png",
    ],
  },
  {
    referencia: "OMEGA 3,6,9",
    slug: "omega-3-6-9",
    categoria: "Ácidos Grasos",
    registroInvima: "SD2021-0004618",
    beneficios:
      "Aporta ácidos grasos omega 3,6,9 nutrientes que forman parte de procesos relacionados con el bienestar cardiovascular, el metabolismo de las grasas y el equilibrio nutricional del organismo.",
    descripcion:
      "Los ácidos grasos omega 3 y omega 6 son ácidos grasos esenciales que el organismo no puede producir por sí mismo y deben obtenerse a través de la alimentación. Junto con el Omega 9, forman parte del grupo de grasas insaturadas presentes de manera natural en algunos alimentos de origen vegetal como la linaza. Estos ácidos grasos participan en distintos procesos fisiológicos del organismo y se asocian al bienestar cardiovascular dentro de una alimentación equilibrada y hábitos de vida saludables.",
    advertencia:
      "Este producto es un suplemento dietario, no es un medicamento y no suple una alimentación equilibrada. Puede causar hipersensibilidad. No consumir en estado de embarazo y lactancia. Mantener fuera del alcance de los niños. Almacenar a temperatura inferior a 30°C y humedad relativa menor a 75%.",
    modoDeUso: "Adultos, tomar 1 cápsula blanda al día",
    cantidad: "Cantidad x 60 cápsulas blandas",
    price: 35900,
    gallery: [
      "/productos/Omega 3, 6 y 9/Omega-3-6-9-frontal.png",
      "/productos/Omega 3, 6 y 9/Omega-3-6-y-9-Frasco-Frontal.png",
      "/productos/Omega 3, 6 y 9/Omega-3-6-9--perfil.png",
      "/productos/Omega 3, 6 y 9/Omega-3-6-y-9-Frasco-Izq.png",
      "/productos/Omega 3, 6 y 9/Omega-3-6-9-back.png",
      "/productos/Omega 3, 6 y 9/Omega-3-6-y-9-Frasco-Barcode.png",
      "/productos/Omega 3, 6 y 9/Omega-3-6-9.png",
    ],
  },
  {
    referencia: "SPIRULINA 500 mg",
    slug: "spirulina-500-mg",
    categoria: "Antioxidantes",
    registroInvima: "SD2023-0001733-R1",
    beneficios:
      "Aporta espirulina, microalga de origen natural reconocida por su contenido de proteínas, vitaminas, minerales y compuestos antioxidantes que forman parte de una nutrición equilibrada orientada al bienestar general.",
    descripcion:
      "Contiene espirulina, microalga reconocida por su contenido natural de proteínas, vitaminas y minerales. Fuente de compuestos antioxidantes que forman parte de los procesos de protección celular frente al estrés oxidativo. Complementa la nutrición diaria, aportando nutrientes de origen natural dentro de una alimentación equilibrada.",
    advertencia:
      "Este producto es un suplemento dietario, no es un medicamento y no suple una alimentación equilibrada. Puede causar hipersensibilidad. No consumir en estado de embarazo y lactancia. Mantener fuera del alcance de los niños. Almacenar a temperatura inferior a 30°C y humedad relativa menor a 75%.",
    modoDeUso: "Adultos, tomar 2 capsulas blandas al día",
    cantidad: "Cantidad x 60 cápsulas blandas",
    price: 31900,
    gallery: [],
  },
  {
    referencia: "VITAMINA E 1000 UI + SELENIO 35 mcg",
    slug: "vitamina-e-1000-selenio-35",
    categoria: "Antioxidantes",
    registroInvima: "SD2014-0003099",
    beneficios:
      "Aporta protección antioxidante frente al estrés oxidativo. Acompaña el bienestar celular y la vitalidad general. Contribuye al mantenimiento normal de la piel y a su apariencia saludable. El Selenio potencia la acción antioxidante de la Vitamina E. Contribuye al bienestar de los tejidos.",
    descripcion:
      "La vitamina E actúa de forma sinérgica con el selenio, ampliando su capacidad antioxidante, participando en la protección de las células frente al estrés oxidativo. Además, forman parte de procesos relacionados con el funcionamiento normal del sistema inmunológico y con el bienestar general del organismo.",
    advertencia:
      "Este producto es un suplemento dietario, no es un medicamento y no suple una alimentación equilibrada. Puede causar hipersensibilidad. No consumir en estado de embarazo y lactancia. Mantener fuera del alcance de los niños. Almacenar a temperatura inferior a 30°C y humedad relativa menor a 75%.",
    modoDeUso: "Adultos, tomar 1 cápsula blanda al día",
    cantidad: "Cantidad x 60 cápsulas blandas",
    price: 34900,
    gallery: [
      "/productos/Vita E 1000/Vita-E-1000-Plus-Selenium-Frontal.png",
      "/productos/Vita E 1000/Vitamina-E-1000-Frontal.png",
      "/productos/Vita E 1000/Vita-E-1000-Plus-Selenium-perfil.png",
      "/productos/Vita E 1000/Vitamina-E-1000-Izq.png",
      "/productos/Vita E 1000/Vita-E-1000-Plus-Selenium-BACK.png",
      "/productos/Vita E 1000/Vitamina-E-1000-barcode.png",
    ],
  },
  {
    referencia: "VITAMINA E 400 UI + SELENIO 70 mcg",
    slug: "vitamina-e-400-selenio-70",
    categoria: "Antioxidantes",
    registroInvima: "SD2016-0003799",
    beneficios:
      "Aporta protección antioxidante frente al estrés oxidativo. Acompaña el bienestar celular y la vitalidad general. Contribuye al mantenimiento normal de la piel y a su apariencia saludable. El Selenio potencia la acción antioxidante de la Vitamina E. Contribuye al bienestar de los tejidos.",
    descripcion:
      "La vitamina E actúa de forma sinérgica con el selenio, ampliando su capacidad antioxidante, participando en la protección de las células frente al estrés oxidativo. Además, forman parte de procesos relacionados con el funcionamiento normal del sistema inmunológico y con el bienestar general del organismo.",
    advertencia:
      "Este producto es un suplemento dietario, no es un medicamento y no suple una alimentación equilibrada. Puede causar hipersensibilidad. No consumir en estado de embarazo y lactancia. Mantener fuera del alcance de los niños. Almacenar a temperatura inferior a 30°C y humedad relativa menor a 75%.",
    modoDeUso: "Adultos, tomar 1 cápsula blanda al día",
    cantidad: "Cantidad x 60 cápsulas blandas",
    price: 29900,
    gallery: [
      "/productos/Vita E 400/Vita-E-400-frontal.png",
      "/productos/Vita E 400/Vitamina-E-400-Frontal.png",
      "/productos/Vita E 400/Vita-E-400-perfil.png",
      "/productos/Vita E 400/Vitamina-E-400-izq.png",
      "/productos/Vita E 400/Vita-E-400-back.png",
      "/productos/Vita E 400/Vitamina-E-400-Barcode.png",
    ],
  },
]

// Function to upload a local image to Sanity and return an image field ref
async function uploadImageIfExists(localPath) {
  if (!localPath) return null
  const decodedPath = decodeURIComponent(localPath).trim()
  const publicPath = path.join(projectRoot, "public", decodedPath)
  const relativePath = path.join(projectRoot, decodedPath)

  let finalPath = ""
  if (fs.existsSync(publicPath)) {
    finalPath = publicPath
  } else if (fs.existsSync(relativePath)) {
    finalPath = relativePath
  } else {
    console.log(`Image not found: ${localPath}`)
    return null
  }

  try {
    const filename = path.basename(finalPath)
    console.log(`Uploading ${filename}...`)
    const asset = await client.assets.upload("image", fs.createReadStream(finalPath), {
      filename,
    })
    console.log(`Uploaded successfully: ${asset._id}`)
    return {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: asset._id,
      },
    }
  } catch (err) {
    console.error(`Failed to upload ${localPath}:`, err.message)
    return null
  }
}

async function runMigration() {
  console.log("Starting Sanity Migration...")

  // 1. Create categories
  const categoryIds = {}
  for (const catName of PRODUCT_CATEGORIES) {
    const doc = {
      _type: "category",
      _id: `cat-${catName.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
      name: catName,
      slug: {
        _type: "slug",
        current: catName.toLowerCase().replace(/[^a-z0-9]/g, "-"),
      },
    }
    console.log(`Creating category: ${catName}...`)
    const res = await client.createOrReplace(doc)
    categoryIds[catName] = res._id
  }

  // 2. Create products
  for (const prod of products) {
    const galleryRefs = []
    for (const imgPath of prod.gallery) {
      const imgRef = await uploadImageIfExists(imgPath)
      if (imgRef) galleryRefs.push(imgRef)
    }

    const doc = {
      _type: "product",
      _id: `prod-${prod.slug}`,
      referencia: prod.referencia,
      slug: {
        _type: "slug",
        current: prod.slug,
      },
      categoria: {
        _type: "reference",
        _ref: categoryIds[prod.categoria],
      },
      registroInvima: prod.registroInvima,
      beneficios: prod.beneficios,
      descripcion: prod.descripcion,
      advertencia: prod.advertencia,
      modoDeUso: prod.modoDeUso,
      cantidad: prod.cantidad,
      price: prod.price,
      originalPrice: prod.originalPrice || undefined,
      gallery: galleryRefs.length > 0 ? galleryRefs : undefined,
    }

    console.log(`Creating product: ${prod.referencia}...`)
    await client.createOrReplace(doc)
  }

  // 3. Create default Global Settings
  console.log("Creating default Global Settings...")
  const logoImage = await uploadImageIfExists("/images/logo.png")
  const globalDoc = {
    _type: "global",
    _id: "global-settings",
    siteTitle: "Capsuland Suplementos",
    siteDescription: "Suplementos alimenticios de la más alta calidad con certificación INVIMA y BPM.",
    logo: logoImage || undefined,
    email: "contacto@capsuland.co",
    phone: "+57 321 456 7890",
    address: "Bogotá, Colombia",
    socials: [
      { _key: "fb", platform: "Facebook", url: "https://facebook.com/capsuland" },
      { _key: "ig", platform: "Instagram", url: "https://instagram.com/capsuland" },
      { _key: "wa", platform: "WhatsApp", url: "https://wa.me/573214567890" },
    ],
    seoGeo: {
      region: "CO-DC",
      placename: "Bogotá",
      position: "4.6097100;-74.0817500",
    }
  }
  await client.createOrReplace(globalDoc)

  // 4. Create default Homepage content
  console.log("Creating default Homepage content...")
  const heroBgImage = await uploadImageIfExists("/images/maquila.jpg")
  const scientistImage = await uploadImageIfExists("/images/scientist.jpg")
  const capsuleDetailImage = await uploadImageIfExists("/images/hero-capsule.jpg")

  const homepageDoc = {
    _type: "homepage",
    _id: "homepage-content",
    hero: {
      badge: "Líderes en Maquila y Suplementos",
      titleLine1: "Nutrimos su marca,",
      titleLine2: "impulsamos su éxito",
      titleLine3: "con calidad premium.",
      subtitle:
        "Somos laboratorios expertos en maquila, diseño y fabricación de suplementos dietarios y vitaminas de alta calidad.",
      backgroundImage: heroBgImage || undefined,
      stats: [
        { _key: "s1", value: 20, suffix: "M+", label: "Cápsulas al Año" },
        { _key: "s2", value: 15, suffix: "+", label: "Años de Experiencia" },
        { _key: "s3", value: 100, suffix: "%", label: "Cumplimiento BPM" },
      ],
    },
    trustMarquee: {
      logos: [],
    },
    services: {
      badge: "Nuestros Servicios",
      title: "Soluciones Integrales para su Negocio",
      items: [
        {
          _key: "sv1",
          title: "Maquila de Suplementos",
          description: "Fabricación de suplementos y vitaminas a gran escala con los más altos estándares.",
          benefits: ["Desarrollo personalizado", "Certificación BPM", "Empaque final premium"],
          iconName: "FlaskConical",
        },
        {
          _key: "sv2",
          title: "Asesoría Regulatoria",
          description: "Le acompañamos en todo el proceso de registro ante el INVIMA y normatividad vigente.",
          benefits: ["Trámite ágil", "Revisión técnica completa", "Tranquilidad legal"],
          iconName: "ShieldCheck",
        },
      ],
    },
    about: {
      badge: "Nuestra Trayectoria",
      title: "Con alcance global, operamos desde 2011.",
      quote: "Somos el aliado estratégico que garantiza calidad y respaldo continuo para su negocio.",
      features: [
        {
          _key: "f1",
          title: "Innovación Constante",
          description: "Desarrollamos formulaciones avanzadas que marcan tendencia en la industria.",
          iconName: "FlaskConical",
        },
        {
          _key: "f2",
          title: "Calidad Certificada",
          description: "Cumplimos con los estándares BPM más estrictos para garantizar seguridad total.",
          iconName: "CheckCircle2",
        },
      ],
      mainImage: scientistImage || undefined,
      secondaryImage: capsuleDetailImage || undefined,
      yearsOfExperience: "15+",
    },
    process: {
      badge: "Cómo Trabajamos",
      title: "Nuestro Proceso de Fabricación",
      steps: [
        { _key: "step1", stepNumber: "01", title: "Diseño & Formulación", description: "Definimos la fórmula ideal." },
        { _key: "step2", stepNumber: "02", title: "Fabricación BPM", description: "Producción bajo estrictos controles." },
        { _key: "step3", stepNumber: "03", title: "Control de Calidad", description: "Validación de cada lote fabricado." },
      ],
    },
    testimonials: {
      badge: "Testimonios",
      title: "Lo que Dicen Nuestros Clientes",
      reviews: [
        {
          _key: "r1",
          name: "Carlos Mendoza",
          role: "Gerente de NutriLife",
          comment: "Excelente servicio de maquila. La calidad de las cápsulas y el empaque superó nuestras expectativas.",
          rating: 5,
        },
      ],
    },
  }
  await client.createOrReplace(homepageDoc)

  console.log("Migration finished successfully! All static content is now inside Sanity!")
}

runMigration().catch((err) => {
  console.error("Migration failed:", err)
})
