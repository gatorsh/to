import { createRouter } from '../createRouter'
import { linkRouter } from './link'

export const appRouter = createRouter().merge('link.', linkRouter)

export type AppRouter = typeof appRouter
