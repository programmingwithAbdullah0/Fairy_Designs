// import { TagIcon } from "@sanity/icons"
// import { defineField, defineType } from "sanity"

// export const CategoryType = defineType({
//   name: "category",
//   title: "Category",
//   type: "document",
//   icon: TagIcon,
//   fields: [
//     defineField({
//       name: "name",
//       title: "Category Name",
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
//       name: "description",
//       title: "Description",
//       type: "text",
//       rows: 3,
//       validation: (Rule) => Rule.max(300),
//     }),
//   ],
// })

// sanity/schemaTypes/category.ts
import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const CategoryType = defineType({
  name: "category",
  title: "Category",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "name",
      title: "Category Name",
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
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(300),
    }),
  ],
});
