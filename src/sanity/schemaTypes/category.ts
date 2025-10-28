import { TagIcon } from "@sanity/icons"
import { defineField, defineType } from "sanity"

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
    // defineField({
    //   name: "image",
    //   title: "Category Image",
    //   type: "image",
    //   options: {
    //     hotspot: true,
    //   },
    // }),
  ],
})

// import { TagIcon } from "@sanity/icons"
// import { defineField, defineType } from "sanity"

// export default defineType({
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