import type { FC } from 'react'
import Link from 'next/link'
import SEO from './seo'

const Header: FC = () => {
  return (
    <>
      <SEO />

      <header>
        <h1 className='p-2 text-4xl text-blue-700'>
          <Link href='/'>
            <a>to</a>
          </Link>
        </h1>
      </header>
    </>
  )
}

export default Header
