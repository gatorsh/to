import * as React from 'react'
import { DefaultSeo, NextSeo, NextSeoProps } from 'next-seo'
import Head from 'next/head'
import { DefaultSeoProps } from 'next-seo'

export interface Props extends NextSeoProps {
  title?: string
  description?: string
  image?: string
}

const title = 'To'
export const url = 'https://to.gator.sh'
const description = 'URL Shortener'
const image = 'https://to.gator.sh/og.png'

const config: DefaultSeoProps = {
  title,
  description,
  openGraph: {
    type: 'website',
    url,
    site_name: title,
    images: [{ url: image }]
  }
}

const SEO: React.FC<Props> = ({ image, ...props }) => {
  const title = props.title ?? config.title
  const description = props.description || config.description

  return (
    <>
      <DefaultSeo {...config} />

      <NextSeo
        {...props}
        {...(image == null
          ? {}
          : {
              openGraph: {
                images: [{ url: image }]
              }
            })}
      />

      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link rel='manifest' href='/site.webmanifest' />
        <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
        <meta name='msapplication-TileColor' content='#00aba9' />
        <meta name='theme-color' content='#ffffff'></meta>
      </Head>
    </>
  )
}

export default SEO
