import { type SchemaTypeDefinition } from 'sanity'
import { ProductType } from './product'
import { CategoryType } from './category'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [ProductType , CategoryType],
}
