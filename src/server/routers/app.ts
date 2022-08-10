import { createRouter } from '../createRouter'
import { userRouter } from './user'
import { linkRouter } from './link'

export const appRouter = createRouter()
  .merge('user.', userRouter)
  .merge('link.', linkRouter)

export type AppRouter = typeof appRouter
