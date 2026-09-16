export type ProductCategory =
  | "Vitaminas"
  | "Ácidos Grasos"
  | "Proteínas"
  | "Antioxidantes"
  | "Minerales"
  | "Minerales y Vitaminas"
  | "Proteínas y Vitaminas"
  | "Bienestar Digestivo"
  | "Bienestar Femenino"

export const PRODUCT_CATEGORIES: ProductCategory[] = [
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

export interface ProductPresentation {
  nombre: string
  formato?: string
  precio: number
  precioOriginal?: number
  peso?: string
  cantidad?: string
}

export interface Product {
  _id?: string
  referencia: string
  slug: any // can be string or slug object
  registroInvima?: string
  beneficios?: string
  descripcion?: string
  advertencia?: string
  modoDeUso?: string
  cantidad?: string
  price: number
  originalPrice?: number
  presentaciones?: ProductPresentation[]
  selectedPresentation?: string
  gallery?: string[]
  images?: any[]
  categoria: any
}

export const products: Product[] = [
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
    price: 28074,
    originalPrice: 31193,
    presentaciones: [
      {
        nombre: "30 Cápsulas",
        formato: "Caja Plegadiza",
        precio: 28074,
        precioOriginal: 31193,
        peso: "31,93g",
        cantidad: "30 cápsulas blandas (Caja Plegadiza)",
      },
      {
        nombre: "60 Cápsulas",
        formato: "Frasco",
        precio: 50533,
        precioOriginal: 56148,
        peso: "78g",
        cantidad: "60 cápsulas blandas (Frasco)",
      },
    ],
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
      "Este producto es un suplemento dietario, no es un medicamento and no suple una alimentación equilibrada. Puede causar hipersensibilidad. No consumir en estado de embarazo y lactancia. Mantener fuera del alcance de los niños. Almacenar a temperatura inferior a 30°C y humedad relativa menor a 75%.",
    modoDeUso: "Adultos, tomar 2 cápsulas blandas al día",
    cantidad: "Cantidad x 60 cápsulas blandas",
    price: 28074,
    originalPrice: 31193,
    presentaciones: [
      {
        nombre: "30 Cápsulas",
        formato: "Caja Plegadiza",
        precio: 28074,
        precioOriginal: 31193,
        peso: "31,5g",
        cantidad: "30 cápsulas blandas (Caja Plegadiza)",
      },
      {
        nombre: "60 Cápsulas",
        formato: "Frasco",
        precio: 50533,
        precioOriginal: 56148,
        peso: "75g",
        cantidad: "60 cápsulas blandas (Frasco)",
      },
    ],
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
    referencia: "CALOSTRO BOVINO",
    slug: "calostro-bovino",
    categoria: "Proteínas",
    registroInvima: "SD2024-0001722-R1",
    beneficios:
      "Aporta calostro bovino, fuente natural de proteínas y compuestos bioactivos que contribuyen a complementar la nutrición y al bienestar del sistema inmune.",
    descripcion:
      "Fuente natural de proteínas, vitaminas, minerales, ácidos grasos y péptidos bioactivos que contribuyen al soporte nutricional general del organismo. Apoya el equilibrio del sistema inmune y puede favorecer la función digestiva, especialmente en etapas que requieren un mayor aporte nutricional. Contribuye al mantenimiento de la vitalidad y al bienestar general, como parte de una alimentación balanceada.",
    advertencia:
      "Este producto es un suplemento dietario, no es un medicamento y no suple una alimentación equilibrada. Puede causar hipersensibilidad. No consumir en estado de embarazo y lactancia. Mantener fuera del alcance de los niños. Almacenar a temperatura inferior a 30°C y humedad relativa menor a 75%.",
    modoDeUso: "Adultos, tomar 2 cápsulas blandas al día",
    cantidad: "Cantidad x 60 cápsulas blandas",
    price: 31419,
    originalPrice: 34910,
    presentaciones: [
      {
        nombre: "30 Cápsulas",
        formato: "Caja Plegadiza",
        precio: 31419,
        precioOriginal: 34910,
        peso: "56g",
        cantidad: "30 cápsulas blandas (Caja Plegadiza)",
      },
      {
        nombre: "60 Cápsulas",
        formato: "Frasco",
        precio: 56554,
        precioOriginal: 62838,
        peso: "aun no disp",
        cantidad: "60 cápsulas blandas (Frasco)",
      },
    ],
    gallery: [],
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
    price: 34561,
    originalPrice: 38401,
    presentaciones: [
      {
        nombre: "30 Cápsulas",
        formato: "Caja Plegadiza",
        precio: 34561,
        precioOriginal: 38401,
        peso: "aun no disp",
        cantidad: "30 cápsulas blandas (Caja Plegadiza)",
      },
      {
        nombre: "60 Cápsulas",
        formato: "Frasco",
        precio: 62210,
        precioOriginal: 69122,
        peso: "aun no disp",
        cantidad: "60 cápsulas blandas (Frasco)",
      },
    ],
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
    price: 28074,
    originalPrice: 31193,
    presentaciones: [
      {
        nombre: "30 Cápsulas",
        formato: "Caja Plegadiza",
        precio: 28074,
        precioOriginal: 31193,
        peso: "31,93g",
        cantidad: "30 cápsulas blandas (Caja Plegadiza)",
      },
      {
        nombre: "60 Cápsulas",
        formato: "Frasco",
        precio: 50533,
        precioOriginal: 56148,
        peso: "74g",
        cantidad: "60 cápsulas blandas (Frasco)",
      },
    ],
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
    price: 28074,
    originalPrice: 31193,
    presentaciones: [
      {
        nombre: "30 Cápsulas",
        formato: "Caja Plegadiza",
        precio: 28074,
        precioOriginal: 31193,
        peso: "38,54g",
        cantidad: "30 cápsulas blandas (Caja Plegadiza)",
      },
      {
        nombre: "60 Cápsulas",
        formato: "Frasco",
        precio: 50533,
        precioOriginal: 56148,
        peso: "81g",
        cantidad: "60 cápsulas blandas (Frasco)",
      },
    ],
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
    price: 28365,
    originalPrice: 31517,
    presentaciones: [
      {
        nombre: "30 Cápsulas",
        formato: "Caja Plegadiza",
        precio: 28365,
        precioOriginal: 31517,
        peso: "55g",
        cantidad: "30 cápsulas blandas (Caja Plegadiza)",
      },
      {
        nombre: "60 Cápsulas",
        formato: "Frasco",
        precio: 51057,
        precioOriginal: 56730,
        peso: "116g",
        cantidad: "60 cápsulas blandas (Frasco)",
      },
    ],
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
    price: 34561,
    originalPrice: 38401,
    presentaciones: [
      {
        nombre: "30 Cápsulas",
        formato: "Caja Plegadiza",
        precio: 34561,
        precioOriginal: 38401,
        peso: "aun no disp",
        cantidad: "30 cápsulas blandas (Caja Plegadiza)",
      },
      {
        nombre: "60 Cápsulas",
        formato: "Frasco",
        precio: 62210,
        precioOriginal: 69122,
        peso: "aun no disp",
        cantidad: "60 cápsulas blandas (Frasco)",
      },
    ],
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
    price: 165892,
    originalPrice: 184325,
    presentaciones: [
      {
        nombre: "30 Cápsulas",
        formato: "Caja Plegadiza",
        precio: 165892,
        precioOriginal: 184325,
        peso: "aun no disp",
        cantidad: "30 cápsulas blandas (Caja Plegadiza)",
      },
      {
        nombre: "60 Cápsulas",
        formato: "Frasco",
        precio: 298606,
        precioOriginal: 331785,
        peso: "aun no disp",
        cantidad: "60 cápsulas blandas (Frasco)",
      },
    ],
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
    price: 31419,
    originalPrice: 34910,
    presentaciones: [
      {
        nombre: "30 Cápsulas",
        formato: "Caja Plegadiza",
        precio: 31419,
        precioOriginal: 34910,
        peso: "34,59g",
        cantidad: "30 cápsulas blandas (Caja Plegadiza)",
      },
      {
        nombre: "60 Cápsulas",
        formato: "Frasco",
        precio: 56554,
        precioOriginal: 62838,
        peso: "72g",
        cantidad: "60 cápsulas blandas (Frasco)",
      },
    ],
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
    price: 34561,
    originalPrice: 38401,
    presentaciones: [
      {
        nombre: "30 Cápsulas",
        formato: "Caja Plegadiza",
        precio: 34561,
        precioOriginal: 38401,
        peso: "aun no disp",
        cantidad: "30 cápsulas blandas (Caja Plegadiza)",
      },
      {
        nombre: "60 Cápsulas",
        formato: "Frasco",
        precio: 62210,
        precioOriginal: 69122,
        peso: "aun no disp",
        cantidad: "60 cápsulas blandas (Frasco)",
      },
    ],
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
    price: 31419,
    originalPrice: 34910,
    presentaciones: [
      {
        nombre: "30 Cápsulas",
        formato: "Caja Plegadiza",
        precio: 31419,
        precioOriginal: 34910,
        peso: "64g",
        cantidad: "30 cápsulas blandas (Caja Plegadiza)",
      },
      {
        nombre: "60 Cápsulas",
        formato: "Frasco",
        precio: 56554,
        precioOriginal: 62838,
        peso: "aun no disp",
        cantidad: "60 cápsulas blandas (Frasco)",
      },
    ],
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
    price: 28374,
    originalPrice: 31527,
    presentaciones: [
      {
        nombre: "30 Cápsulas",
        formato: "Caja Plegadiza",
        precio: 28374,
        precioOriginal: 31527,
        peso: "54,49g",
        cantidad: "30 cápsulas blandas (Caja Plegadiza)",
      },
      {
        nombre: "60 Cápsulas",
        formato: "Frasco",
        precio: 51073,
        precioOriginal: 56748,
        peso: "116g",
        cantidad: "60 cápsulas blandas (Frasco)",
      },
    ],
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
    price: 33561,
    originalPrice: 37290,
    presentaciones: [
      {
        nombre: "30 Cápsulas",
        formato: "Caja Plegadiza",
        precio: 33561,
        precioOriginal: 37290,
        peso: "54,49g",
        cantidad: "30 cápsulas blandas (Caja Plegadiza)",
      },
      {
        nombre: "60 Cápsulas",
        formato: "Frasco",
        precio: 60410,
        precioOriginal: 67122,
        peso: "121g",
        cantidad: "60 cápsulas blandas (Frasco)",
      },
    ],
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
    modoDeUso: "Adultos, tomar 2 cápsulas blandas al día",
    cantidad: "Cantidad x 60 cápsulas blandas",
    price: 34561,
    originalPrice: 38401,
    presentaciones: [
      {
        nombre: "30 Cápsulas",
        formato: "Caja Plegadiza",
        precio: 34561,
        precioOriginal: 38401,
        peso: "aun no disp",
        cantidad: "30 cápsulas blandas (Caja Plegadiza)",
      },
      {
        nombre: "60 Cápsulas",
        formato: "Frasco",
        precio: 62210,
        precioOriginal: 69122,
        peso: "aun no disp",
        cantidad: "60 cápsulas blandas (Frasco)",
      },
    ],
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
    price: 32721,
    originalPrice: 36357,
    presentaciones: [
      {
        nombre: "30 Cápsulas",
        formato: "Caja Plegadiza",
        precio: 32721,
        precioOriginal: 36357,
        peso: "62,94g",
        cantidad: "30 cápsulas blandas (Caja Plegadiza)",
      },
      {
        nombre: "60 Cápsulas",
        formato: "Frasco",
        precio: 58898,
        precioOriginal: 65442,
        peso: "118g",
        cantidad: "60 cápsulas blandas (Frasco)",
      },
    ],
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
    price: 31419,
    originalPrice: 34910,
    presentaciones: [
      {
        nombre: "30 Cápsulas",
        formato: "Caja Plegadiza",
        precio: 31419,
        precioOriginal: 34910,
        peso: "40,06g",
        cantidad: "30 cápsulas blandas (Caja Plegadiza)",
      },
      {
        nombre: "60 Cápsulas",
        formato: "Frasco",
        precio: 56554,
        precioOriginal: 62838,
        peso: "75g",
        cantidad: "60 cápsulas blandas (Frasco)",
      },
    ],
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

/** Mapeo de slug a imagen del combo para productos sin galería propia */
const COMBO_FALLBACK: Record<string, string> = {
  "biotina-900-mcg": "/productos/Capsuland Combo/Biotina.png",
  "calcio-400-vitamina-d3": "/productos/Capsuland Combo/Calcio 400.png",
  "colageno-500-mg": "/productos/Capsuland Combo/Colageno.png",
  "colageno-200-biotina-900": "/productos/Capsuland Combo/Colageno y Biotina.png",
  "complejo-b-zinc-vitamina-d3": "/productos/Capsuland Combo/Complejo B.png",
  "isoflavona-soya-calcio-vitamina-d3": "/productos/Capsuland Combo/Isoflavona.png",
  "omega-3": "/productos/Capsuland Combo/Omega 3.png",
  "omega-3-6-9": "/productos/Capsuland Combo/Omega 3, 6 y 9.png",
  "vitamina-e-1000-selenio-35": "/productos/Capsuland Combo/Vita E 1000.png",
  "vitamina-e-400-selenio-70": "/productos/Capsuland Combo/Vita E 400.png",
}

import { urlFor } from "@/sanity/lib/image"

/** Obtiene la imagen principal del producto (frontal o fallback del combo) */
export function getMainImage(product: any): string | null {
  if (!product) return null
  if (product.images && product.images.length > 0) {
    try {
      const url = urlFor(product.images[0]).url()
      if (url) return url
    } catch (e) {
      // Ignore URL build errors
    }
  }
  if (product.gallery && product.gallery.length > 0 && product.gallery[0]) {
    return product.gallery[0]
  }
  const slug = typeof product.slug === "object" ? product.slug?.current : product.slug
  if (slug && COMBO_FALLBACK[slug]) return COMBO_FALLBACK[slug]
  return null
}

/** Comprueba si el producto tiene al menos una imagen válida */
export function hasProductImage(product: any): boolean {
  if (!product) return false
  const img = getMainImage(product)
  return Boolean(img && typeof img === "string" && img.trim().length > 0)
}

/** Busca un producto por su slug */
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

/** Devuelve N productos aleatorios que tengan imagen disponible */
export function getFeaturedProducts(count: number): Product[] {
  const withImages = products.filter(hasProductImage)
  const shuffled = [...withImages].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

