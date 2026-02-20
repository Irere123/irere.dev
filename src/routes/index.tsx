import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <div className='min-h-screen w-full flex items-center justify-center h-full'>
      <p className='text-2xl font-bold'>Cooming soon</p>
    </div>
  )
}
