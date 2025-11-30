// lib/sanity.js
import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false
})





// import { createClient } from '@sanity/client'

// export const sanityClient = createClient({
//   projectId: 'q48vvl2o',
//   dataset: 'production',
//   apiVersion: '2025-10-24',
//   token: 'sk2xrDhO5QcIQoglDRxDV5SS9CQlJtAyRQTb8qN9bqUAu18sToM64Ks5ItL0q8YdpNY4L5D9VcbwTpuHfb4WCC2sAJtv8vTuRfKMNX6GgSCRAzPAdB6Ct8dIHHuARrLO5lwMyyCED210tmZGuHBLjeCpbhQS1KXqIdMucqVkWr5c94NzHZSb',
//   useCdn: false,
//   apiHost: 'https://api.sanity.io'


// })





// app/api/sanity.js
// import { createClient } from '@sanity/client'

// export const sanityClient = createClient({
//   projectId: 'q48vvl2o',
//   dataset: 'production', 
//   apiVersion: '2025-10-24',
//   token: 'sk2xrDhO5QcIQoglDRxDV5SS9CQlJtAyRQTb8qN9bqUAu18sToM64Ks5ItL0q8YdpNY4L5D9VcbwTpuHfb4WCC2sAJtv8vTuRfKMNX6GgSCRAzPAdB6Ct8dIHHuARrLO5lwMyyCED210tmZGuHBLjeCpbhQS1KXqIdMucqVkWr5c94NzHZSb',
//   useCdn: false,
//   withCredentials: true,
//   apiHost: 'https://api.sanity.io'
// })