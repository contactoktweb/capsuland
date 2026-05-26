import { type SchemaTypeDefinition } from 'sanity'
import global from './global'
import homepage from './homepage'
import category from './category'
import product from './product'
import sale from './sale'
import message from './message'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [global, homepage, category, product, sale, message],
}

