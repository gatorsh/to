import { createRouter } from '../createRouter'
import { nanoid } from 'nanoid'

export const linkRouter = createRouter().query('new', {
  resolve: async () => {
    const slug = nanoid(5)
    return slug
  }
})
