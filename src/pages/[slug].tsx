import type { NextPage, GetServerSideProps } from 'next'
import { prisma } from '../utils/prisma'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.query

  const link = await prisma.link.findUnique({
    where: {
      slug: slug as string
    }
  })

  if (link) {
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
  return <h1 className='text-5xl'>{slug}</h1>
}

export default Slug
