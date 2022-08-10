import { router } from '@trpc/server'
import { Context } from './context'

export const createRouter = () => {
  return router<Context>()
}
