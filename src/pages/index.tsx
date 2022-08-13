import type { NextPage } from 'next'
import { useCallback, useState } from 'react'
import { trpc } from '../utils/trpc'
import {
  LinkIcon,
  ClipboardCopyIcon,
  ClipboardCheckIcon
} from '@heroicons/react/solid'
import copy from 'copy-to-clipboard'
import Header from '../components/header'
import Footer from '../components/footer'

const Home: NextPage = () => {
  const [destination, setDestination] = useState('')
  const [slug, setSlug] = useState<string | null>('asdf1')
  const [error, setError] = useState<string | null>(null)
  const [coppied, setCoppied] = useState(false)

  const { mutate } = trpc.useMutation(['link.new'])

  const submit = useCallback(() => {
    mutate(
      {
        destination
      },
      {
        onSuccess: (slug) => {
          setError(null)
          setSlug(slug)
        },
        onError: (e) => {
          if (e.data?.code === 'CONFLICT') {
            // TODO: retry
          }

          setError(e.message)
        }
      }
    )
  }, [destination, slug])

  return (
    <>
      <Header />

      <main className='flex flex-col items-center mt-24'>
        <div className=''>
          <label htmlFor='destination' className='text-xs text-slate-500'>
            URL To Shorten
          </label>
          <div className='flex justify-center'>
            <input
              type='input'
              id='destination'
              className='px-2.5 text-md bg-transparent border backdrop-blur-[1.5px] rounded-l-lg placeholder-slate-300'
              placeholder='https://www.gator.sh/...'
              required
              value={destination}
              onChange={(e) => setDestination(e.currentTarget.value)}
            />
            <button
              type='submit'
              className='p-2.5 text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800'
              onClick={submit}
            >
              <LinkIcon className='w-5 h-5' />
            </button>
          </div>
        </div>

        {slug && (
          <div className='flex flex-col mt-10'>
            <p className='text-xs text-slate-500'>Shortened URL</p>
            <div className='flex'>
              <span className='inline-flex items-center px-2.5 text-md text-slate-400 bg-slate-300 rounded-l-lg'>
                to.gator.sh/
              </span>
              <span className='px-2.5 bg-transparent border backdrop-blur-[1.5px] text-blue-700 flex items-center text-lg'>
                {slug}
              </span>
              <button
                type='submit'
                className='p-2.5 text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800'
                onClick={() => {
                  copy(`http://localhost:3000/${slug}`)
                  setCoppied(true)
                }}
              >
                {coppied && <ClipboardCheckIcon className='w-5 h-5' />}
                {!coppied && <ClipboardCopyIcon className='w-5 h-5' />}
              </button>
            </div>
          </div>
        )}

        {error && <p>{error}</p>}
      </main>

      <Footer />
    </>
  )
}

export default Home
