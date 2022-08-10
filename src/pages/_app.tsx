import type { AppType } from 'next/dist/shared/lib/utils'
import type { AppRouter } from '../server/routers/app'
import { withTRPC } from '@trpc/next'
import { httpLink } from '@trpc/client/links/httpLink'
import '../styles/global.css'

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api`
      : 'http://localhost:3000/api'

    const links = [
      httpLink({
        url
      })
    ]

    return {
      queryClientConfig: {
        defaultOptions: {
          queries: {
            staleTime: 1
          }
        }
      },
      headers() {
        if (ctx?.req) {
          return {
            ...ctx.req.headers,
            'x-ssr': '1'
          }
        }
        return {}
      },
      links
    }
  },
  ssr: true
})(MyApp)
