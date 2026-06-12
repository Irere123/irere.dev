import { useEffect, useState } from 'react'

// Constructing an Intl.DateTimeFormat is expensive (locale data lookup) — build it once,
// not on every tick.
const kigaliTimeFormatter = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Africa/Kigali',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
})

function KigaliTime() {
  const [time, setTime] = useState<string | null>(null)

  // The display only shows HH:mm, so tick once per minute, aligned to the minute boundary,
  // instead of re-rendering every second.
  useEffect(() => {
    let interval: number | undefined

    const update = () => setTime(kigaliTimeFormatter.format(new Date()))

    update()
    const timeout = window.setTimeout(
      () => {
        update()
        interval = window.setInterval(update, 60_000)
      },
      60_000 - (Date.now() % 60_000)
    )

    return () => {
      window.clearTimeout(timeout)
      window.clearInterval(interval)
    }
  }, [])

  if (time === null) return null

  return <span suppressHydrationWarning>{time} — Kigali, Rwanda</span>
}

export function Footer() {
  return (
    <footer className='flex justify-between gap-2 sm:px-0 px-2 text-sm text-gray-500 max-w-2xl mx-auto w-full py-4 border-t border-gray-200'>
      <p>
        <KigaliTime />
      </p>
      <p className='text-gray-500 rounded-full bg-gray-100 px-2 py-1'>v4.0</p>
    </footer>
  )
}
