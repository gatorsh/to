import { z } from 'zod'

export const newLink = z.object({
  destination: z.string().url()
})
