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
    <footer className='mx-auto flex w-full max-w-2xl justify-between gap-2 px-4 py-4 text-sm text-gray-500 sm:px-6'>
      <p>
        <KigaliTime />
      </p>
      <p>v4.0</p>
    </footer>
  )
}
