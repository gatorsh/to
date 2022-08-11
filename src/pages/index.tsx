import type { NextPage } from 'next'
import { useCallback, useState } from 'react'
import { trpc } from '../utils/trpc'

const Home: NextPage = () => {
  const [destination, setDestination] = useState('')
  const [slug, setSlug] = useState<string | undefined>(undefined)
  const [showLink, setShowLink] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { mutate } = trpc.useMutation(['link.new'])

  const submit = useCallback(() => {
    mutate(
      {
        destination,
        slug
      },
      {
        onSuccess: (slug) => {
          setError(null)
          setSlug(slug)
          setShowLink(true)
        },
        onError: (e) => {
          setError(e.message)
        }
      }
    )
  }, [destination, slug])

  return (
    <>
      <p>destination</p>
      <input
        className='mb-4 border'
        placeholder='destination'
        value={destination}
        onChange={(e) => setDestination(e.currentTarget.value)}
      />
      <p>slug</p>
      <input
        className='border'
        placeholder='slug'
        value={slug}
        onChange={(e) => setSlug(e.currentTarget.value)}
      />
      <br />
      <button className='mt-5 border' onClick={submit}>
        Click this
      </button>
      <br />
      {showLink && (
        <a href={`http://localhost:3000/${slug}`}>
          http://localhost:3000/{slug}
        </a>
      )}
      {error && <p>{error}</p>}
    </>
  )
}

export default Home
