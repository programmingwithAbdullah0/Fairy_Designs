// import { createClient } from '@sanity/client'
// import { apiVersion, dataset, projectId } from '../env'

// export const client = createClient({
//   projectId,
//   dataset, 
//   apiVersion,
//   useCdn: false,
//   token: process.env.SANITY_API_TOKEN,
// })
// sanity/lib/client.ts   ← yeh file exactly aisi bana do

import { createClient } from '@sanity/client'

// Read-only client (frontend ke liye - CDN use karta hai)
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-10-24',
  useCdn: true,                    // read ke liye fast
  perspective: 'published',
})

// Write client (add/edit/delete ke liye - token + no CDN)
export const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-10-24',
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN!,   // ← yeh zaroori hai
  useCdn: false,                   // mutations ke liye false hona chahiye
  perspective: 'published',
})