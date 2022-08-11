import { createRouter } from '../createRouter'
import { customAlphabet } from 'nanoid'
import { newLink } from '../schema/link'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { TRPCError } from '@trpc/server'

const alphabet = '0123456789abcdefghijklmnopqrstuvwxyz'
const nanoid = customAlphabet(alphabet, 5)

export const linkRouter = createRouter().mutation('new', {
  input: newLink,
  resolve: async ({ ctx, input }) => {
    let { slug, destination } = input

    // TODO: check if user in session has access to make custom slug
    // get session on server in trpc context and check with ctx.user

    if (!slug) slug = nanoid()

    try {
      await ctx.prisma.link.create({
        data: {
          slug,
          destination
        }
      })
    } catch (e) {
      console.log(e)
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new TRPCError({
            code: 'CONFLICT',
            message: 'slug already exists.'
          })
        }
      }
    }

    return slug
  }
})
