import { createRouter } from '../createRouter'

export const userRouter = createRouter().query('me', {
  resolve: async () => {
    return 'me'
  }
})
