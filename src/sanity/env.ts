// function assertValue<T>(v: T | undefined, errorMessage: string): T {
//   if (v === undefined) {
//     throw new Error(errorMessage)
//   }

//   return v
// }

// export const apiVersion =
//   process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-10-24'

// export const dataset = assertValue(
//   process.env.NEXT_PUBLIC_SANITY_DATASET,
//   'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
// )

// export const projectId = assertValue(
//   process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
//   'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
// )

// sanity/env.ts
export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "u8xdxkk9";

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-10-24";

// yahi se SANITY_API_TOKEN uthayenge
export const token = process.env.SANITY_API_TOKEN;
