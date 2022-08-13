import type { FC } from 'react'
import Link from 'next/link'

const Header: FC = () => {
  return (
    // TODO: add next-seo

    <header>
      <h1 className='p-2 text-4xl text-blue-700'>
        <Link href='/'>
          <a>to</a>
        </Link>
      </h1>
    </header>
  )
}

export default Header
