import type { NextPage } from 'next'
import { useCallback, useState } from 'react'
import { trpc } from '../utils/trpc'
import {
  LinkIcon,
  CheckIcon,
  XIcon,
  DuplicateIcon
} from '@heroicons/react/solid'
import copy from 'copy-to-clipboard'
import Spinner from '../components/spinner'

const Home: NextPage = () => {
  const linkClassAttr = 'w-5 h-5'

  const [destination, setDestination] = useState('')
  const [slug, setSlug] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [linkIcon, setLinkIcon] = useState(
    <LinkIcon className={linkClassAttr} />
  )

  const { mutate } = trpc.useMutation(['link.new'])

  const submit = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault()

      setLinkIcon(<Spinner />)
      mutate(
        {
          destination
        },
        {
          onSuccess: (slug) => {
            setError(null)
            setSlug(slug)
            setLinkIcon(<CheckIcon className={linkClassAttr} />)
          },
          onError: (e) => {
            if (e.data?.code === 'CONFLICT') {
              // TODO: retry
            }

            const error = JSON.parse(e.message)[0]

            setError(error.message)
            setLinkIcon(<XIcon className={linkClassAttr + ' text-red-600'} />)
          }
        }
      )
    },
    [mutate, destination]
  )

  return (
    <main className='flex flex-col items-center mt-24'>
      <form onSubmit={submit}>
        <label
          htmlFor='destination'
          className='text-xs text-slate-500 dark:text-slate-300'
        >
          URL To Shorten
        </label>
        <div className='flex justify-center'>
          <input
            type='input'
            id='destination'
            className={`px-2.5 text-md bg-transparent border backdrop-blur-[1.5px] rounded-l-lg placeholder-slate-300 dark:placeholder-slate-300/25 dark:border-white/10 ${
              error ? 'border-red-600' : ''
            }`}
            placeholder='https://www.gator.sh/...'
            required
            value={destination}
            onChange={(e) => {
              setDestination(e.currentTarget.value)
              if (error) {
                setError(null)
                setLinkIcon(<LinkIcon className={linkClassAttr} />)
              }
            }}
          />
          <button
            type='submit'
            className='p-2.5 text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800'
          >
            {linkIcon}
          </button>
        </div>
      </form>

      {error && <p className='text-red-600'>{error}</p>}

      {slug && (
        <div className='flex flex-col mt-10'>
          <p className='text-xs text-slate-500 dark:text-slate-300'>
            Shortened URL
          </p>
          <div className='flex'>
            <span className='inline-flex items-center px-2.5 text-md text-slate-400 bg-slate-300 rounded-l-lg dark:text-slate-600 dark:bg-slate-800'>
              to.gator.sh/
            </span>
            <span className='px-2.5 bg-transparent border backdrop-blur-[1.5px] text-blue-700 flex items-center text-lg dark:border-white/10'>
              {slug}
            </span>
            <button
              type='submit'
              className='p-2.5 text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800'
              onClick={() => {
                copy(`https://to.gator.sh/${slug}`)
                setCopied(true)
              }}
            >
              {!copied && <DuplicateIcon className='w-5 h-5' />}
              {copied && <CheckIcon className='w-5 h-5' />}
            </button>
          </div>
        </div>
      )}
    </main>
  )
}

export default Home
