import type { FC } from 'react'
import Link from 'next/link'
import { MailIcon } from '@heroicons/react/solid'

const Footer: FC = () => {
  return (
    <footer className='absolute bottom-0 flex flex-col items-center w-full py-1 bg-slate-100/20 backdrop-blur-[1.5px] dark:bg-slate-100/5'>
      <a
        className='text-sm text-blue-700 hover:text-blue-800'
        href='https://gator.sh'
        target='_blank'
        rel='noreferrer'
      >
        Gator
      </a>
      <div className='flex space-x-2'>
        <a
          href='https://github.com/gatorsh/to'
          className='text-slate-500 hover:text-slate-900 dark:text-slate-100 dark:hover:text-slate-400'
          target='_blank'
          rel='noreferrer'
        >
          <svg
            className='w-5 h-5'
            fill='currentColor'
            viewBox='0 0 24 24'
            aria-hidden='true'
          >
            <path
              fillRule='evenodd'
              d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z'
              clipRule='evenodd'
            />
          </svg>
          <span className='sr-only'>GitHub account</span>
        </a>
        <a
          href='mailto:vijay@vijaystroup.com'
          className='text-slate-500 hover:text-slate-900 dark:text-slate-100 dark:hover:text-slate-400'
        >
          <MailIcon className='w-5 h-5' />
          <span className='sr-only'>Email</span>
        </a>
      </div>
    </footer>
  )
}

export default Footer
