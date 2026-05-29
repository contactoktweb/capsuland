import { type SchemaTypeDefinition } from 'sanity'
import global from './schemaTypes/global'
import homepage from './schemaTypes/homepage'
import category from './schemaTypes/category'
import product from './schemaTypes/product'
import sale from './schemaTypes/sale'
import message from './schemaTypes/message'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [global, homepage, category, product, sale, message],
}

