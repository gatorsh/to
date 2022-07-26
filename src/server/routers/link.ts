import { createRouter } from '../createRouter'
import { customAlphabet } from 'nanoid'
import { newLink } from '../schema/link'
import { TRPCError } from '@trpc/server'
import dayjs from 'dayjs'

const alphabet = '0123456789abcdefghijklmnopqrstuvwxyz-_'
const nanoid = customAlphabet(alphabet, 5)

export const linkRouter = createRouter().mutation('new', {
  input: newLink,
  resolve: async ({ ctx, input }) => {
    let { destination } = input

    // transform destination to absolute url if needed
    if (!destination.startsWith('http')) destination = `https://${destination}`

    const slug = nanoid()

    const link = await ctx.prisma.link.findUnique({
      where: { slug }
    })

    if (link) {
      if (link.updatedAt > dayjs().subtract(3, 'day').toDate()) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'Slug already exists.'
        })
      }

      // TODO: generate new slug and retry
    }

    try {
      await ctx.prisma.link.upsert({
        where: { slug },
        update: {
          destination,
          clicks: 0
        },
        create: {
          slug,
          destination
        }
      })
    } catch (e) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Something went wrong.'
      })
    }

    return slug
  }
})
