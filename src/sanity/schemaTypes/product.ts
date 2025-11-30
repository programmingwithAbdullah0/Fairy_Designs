// import { defineField, defineType } from "sanity";

// export const ProductType = defineType({
//   name: "product",
//   title: "Product",
//   type: "document",
//   // icon: TagIcon,
//   fields: [
//     defineField({
//       name: "name",         
//       title: "Product Name",
//       type: "string",
//       validation: (Rule) => Rule.required(),
//     }),
//     defineField({
//       name: "slug",         
//       title: "Slug",
//       type: "slug",
//       options: {
//         source: "name",     
//         maxLength: 96,
//       },
//       validation: (Rule) => Rule.required(),
//     }),
//     defineField({
//       name: "priceMin",       // Minimum Price
//       title: "Minimum Price ($)",
//       type: "number",
//       validation: (Rule) => Rule.required().min(0),
//     }),
//     defineField({
//       name: "priceMax",       // Maximum Price
//       title: "Maximum Price ($)", 
//       type: "number",
//       validation: (Rule) => Rule.required().min(Rule.valueOfField('priceMin')),
//     }),
//     defineField({
//       name: "image",          
//       title: "Product Image",
//       type: "image",
//       options: {
//         hotspot: true,
//       },
//     }),
//     defineField({
//   name: "category",
//   title: "Category", 
//   type: "reference",  
//   to: [{ type: "category" }],
// }),
//     defineField({
//       name: "description", 
//       title: "Description",
//       type: "text",
//     }),
//   ],
// })

// sanity/schemaTypes/product.ts
import { defineField, defineType } from "sanity";

export const ProductType = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "priceMin",
      title: "Minimum Price ($)",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),

    defineField({
      name: "priceMax",
      title: "Maximum Price ($)",
      type: "number",
      validation: (Rule) =>
        Rule.required().min(Rule.valueOfField("priceMin")),
    }),

    defineField({
      name: "image",
      title: "Product Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
  ],
});
