import type { FC } from 'react'
import Link from 'next/link'
import SEO from './seo'
import Theme from './theme'

const Header: FC = () => {
  return (
    <>
      <SEO />

      <header className='flex items-center justify-between p-2'>
        <h1 className='text-4xl text-blue-700'>
          <Link href='/'>
            <a>to</a>
          </Link>
        </h1>
        <Theme />
      </header>
    </>
  )
}

export default Header
