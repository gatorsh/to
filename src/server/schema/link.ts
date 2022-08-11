import { z } from 'zod'

export const newLink = z.object({
  slug: z.string().optional(),
  destination: z.string().url()
})
