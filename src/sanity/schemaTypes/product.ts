// import { TagIcon } from "@sanity/icons"
// import { defineField, defineType } from "sanity"

// import { TagIcon } from "lucide-react";
import { TagIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

// export const ProductType = defineType({
//   name: "product",
//   title: "Product",
//   type: "document",
//   icon: TagIcon,
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
//       name: "price",
//       title: "Price",
//       type: "number",
//       validation: (Rule) => Rule.required().min(0),
//     }),
//     defineField({
//       name: "image",
//       title: "Product Image",
//       type: "image",
//       options: {
//         hotspot: true,
//       },
//       validation: (Rule) => Rule.required(),
//     }),
//    defineField({
//       name: "category",
//       title: "Category",
//       type: "array",
//       of: [{ type: "reference", to: [{ type: "category" }] }],
//       validation: (Rule) =>
//         Rule.required().min(1).error("At least one category is required"),
//     }),
//     defineField({
//       name: "description",
//       title: "Description",
//       type: "text",
//       validation: (Rule) => Rule.max(500),
//     }),
//   ],
// product range without any protocol

// import { TagIcon } from "lucide-react";

// export const ProductType = defineType({
//   name: "product",
//   title: "Product",
//   type: "document",
//   icon: TagIcon,
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
//       name: "price",
//       title: "Price Range",
//       type: "string",
//       description: "Enter like: $50 - $100 or $150 only",
//       validation: (Rule) => Rule.required(),
//     }),
//     defineField({
//       name: "image",
//       title: "Product Image",
//       type: "image",
//       options: {
//         hotspot: true,
//       },
//       validation: (Rule) => Rule.required(),
//     }),
//     defineField({
//       name: "category",
//       title: "Category",
//       type: "reference",
//       to: [{ type: "category" }],
//       validation: (Rule) => Rule.required(),
//     }),
//     defineField({
//       name: "description",
//       title: "Description",
//       type: "text",
//       validation: (Rule) => Rule.max(500),
//     }),
//   ],
// })

export const ProductType = defineType({
  name: "product",
  title: "Product",
  type: "document",
  icon: TagIcon,
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