import { useEffect, useState } from 'react'

function KigaliTime() {
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    const format = () => {
      setTime(
        new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Africa/Kigali',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }).format(new Date())
      )
    }

    format()
    const interval = setInterval(format, 1000)
    return () => clearInterval(interval)
  }, [])

  if (time === null) return null

  return <span suppressHydrationWarning>{time} — Kigali, Rwanda</span>
}

export function Footer() {
  return (
    <footer className='flex justify-between gap-2 text-sm text-gray-500 max-w-2xl mx-auto w-full py-4 border-t border-gray-200'>
      <p>
        <KigaliTime />
      </p>
      <p className='text-gray-500 rounded-full bg-gray-100 px-2 py-1'>v4.0</p>
    </footer>
  )
}
