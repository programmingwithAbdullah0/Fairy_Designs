// import { createClient } from 'next-sanity'

// import { apiVersion, dataset, projectId } from '../env'

// export const client = createClient({
//   projectId,
//   dataset,
//   apiVersion,
//   useCdn: false, 
// })

import { createClient } from '@sanity/client'
import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset, 
  apiVersion,
  useCdn: false,
})