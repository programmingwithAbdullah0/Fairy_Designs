// src/sanity/lib/client.ts ← replace poora file isi se

import { createClient } from '@sanity/client'

// Public client (frontend ke liye - fast + CDN)
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-10-24',
  useCdn: true,
  perspective: 'published',
})

// Private write client (sirf server-side API routes ke liye)
export const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-10-24',
  token: process.env.SANITY_API_TOKEN,   // ← ab NEXT_PUBLIC_ nahi hai!
  useCdn: false,
})