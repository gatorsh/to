import type { NextPage, GetServerSideProps } from 'next'
import { prisma } from '../utils/prisma'
import dayjs from 'dayjs'
import Link from 'next/link'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.query

  const link = await prisma.link.findUnique({
    where: { slug: slug as string }
  })

  if (link && link.updatedAt > dayjs().subtract(3, 'day').toDate()) {
    await prisma.link.update({
      where: { slug: slug as string },
      data: { clicks: { increment: 1 } }
    })

    return {
      redirect: {
        destination: link.destination,
        permanent: false
      }
    }
  }

  return {
    props: {
      slug
    }
  }
}

interface SlugProps {
  slug: string
}

const Slug: NextPage<SlugProps> = ({ slug }) => {
  return (
    <main className='flex flex-col items-center mt-24'>
      <h1 className='text-3xl text-center'>
        <span className='text-blue-700'>{slug}</span> doesn't go to anywhere :(
      </h1>
      <Link href='/'>
        <a className='mt-10 hover:underline'>Go Back / To Shorten URL</a>
      </Link>
    </main>
  )
}

export default Slug
