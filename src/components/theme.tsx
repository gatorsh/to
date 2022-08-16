import type { FC } from 'react'
import { useState, useEffect } from 'react'
import { SunIcon, MoonIcon } from '@heroicons/react/solid'

const Theme: FC = () => {
  const sunClass = 'w-8 h-8 text-yellow-500'
  const moonClass = 'w-8 h-8 text-slate-500'

  const [theme, setTheme] = useState('light')
  const [themeIcon, setThemeIcon] = useState(<MoonIcon className={moonClass} />)

  // get theme
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const theme = localStorage.getItem('theme')
      if (theme) {
        document.documentElement.classList.add(theme)
        setTheme('dark')
        setThemeIcon(<SunIcon className={sunClass} />)
      }
    }
  }, [])

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light')
      setThemeIcon(<MoonIcon className={moonClass} />)
      document.documentElement.classList.remove('dark')
      localStorage.removeItem('theme')
    } else {
      setTheme('dark')
      setThemeIcon(<SunIcon className={sunClass} />)
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    }
  }

  return (
    <div className='flex justify-center'>
      <button onClick={toggleTheme} className='rounded-full'>
        {themeIcon}
      </button>
    </div>
  )
}

export default Theme
