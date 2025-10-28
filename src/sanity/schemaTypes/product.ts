import { defineField, defineType } from "sanity";

export const ProductType = defineType({
  name: "product",
  title: "Product",
  type: "document",
  // icon: TagIcon,
  fields: [
    defineField({
      name: "name",           // Product Name
      title: "Product Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",           // Slug (auto-generate from name)
      title: "Slug",
      type: "slug",
      options: {
        source: "name",       // Name se automatically generate hoga
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "priceMin",       // Minimum Price
      title: "Minimum Price ($)",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "priceMax",       // Maximum Price
      title: "Maximum Price ($)", 
      type: "number",
      validation: (Rule) => Rule.required().min(Rule.valueOfField('priceMin')),
    }),
    defineField({
      name: "image",          // Product Image
      title: "Product Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
  name: "category",
  title: "Category", 
  type: "reference",  // Yeh SINGLE reference honi chahiye
  to: [{ type: "category" }],
}),
    defineField({
      name: "description",    // Description/About
      title: "Description",
      type: "text",
    }),
  ],
})