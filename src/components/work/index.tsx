import { Link } from '@tanstack/react-router'
import { type ReactNode, useLayoutEffect, useRef, useState } from 'react'

import type { Article } from '@/lib/work'
import { Geometry, Notebook } from '@/svg'
import { Articles } from './articles'
import { Projects } from './projects'

type WorkTab = 'articles' | 'projects'

const TABS: { work: WorkTab; label: string; icon: ReactNode }[] = [
  { work: 'articles', label: 'Articles', icon: <Notebook className='h-5 w-5' /> },
  { work: 'projects', label: 'Projects', icon: <Geometry className='h-5 w-5' /> },
]

export function Work({ work, articles }: { work: string; articles: Article[] }) {
  const activeWork: WorkTab = work === 'projects' ? 'projects' : 'articles'
  const activeIndex = TABS.findIndex((tab) => tab.work === activeWork)

  return (
    <div className='flex flex-col gap-3'>
      <WorkTabs activeWork={activeWork} />
      {/* Both panels share one grid cell, so the section keeps the taller panel's height and
          switching never shifts the page. CSS transitions retarget mid-way on rapid clicks.
          The outgoing list is almost gone before the new one starts (two lists of text
          crossfading on top of each other read as a mess), and an inactive panel waits on
          its side of the active one, in tab order, so the new list slides in from the tab
          that was picked. */}
      <div className='grid'>
        {TABS.map((tab, index) => {
          const isActive = index === activeIndex
          const restingSide = index < activeIndex ? '-translate-x-3' : 'translate-x-3'

          return (
            <div
              key={tab.work}
              inert={!isActive}
              className={`col-start-1 row-start-1 transition-[opacity,translate,visibility] ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:translate-x-0 ${
                isActive
                  ? 'visible translate-x-0 opacity-100 delay-75 duration-200'
                  : `invisible opacity-0 duration-120 ${restingSide}`
              }`}
            >
              {tab.work === 'articles' ? (
                <Articles articles={articles} linkPreload='viewport' />
              ) : (
                <Projects />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function WorkTabs({ activeWork }: { activeWork: WorkTab }) {
  const listRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef(new Map<WorkTab, HTMLAnchorElement>())
  const [activeClip, setActiveClip] = useState<string | null>(null)

  // A dark copy of the tab row sits on top, clipped to the active tab. Sliding the clip
  // changes background and label together, where a moving pill plus per-tab colour
  // transitions never line up. The dark fill spans the whole copy (gaps included), so the
  // clip reads as one pill mid-slide. Until it's measured, the active tab styles itself.
  useLayoutEffect(() => {
    const list = listRef.current
    if (!list) {
      return
    }

    const measure = () => {
      const tab = tabRefs.current.get(activeWork)
      if (!tab) {
        return
      }
      const right = list.offsetWidth - tab.offsetLeft - tab.offsetWidth
      const bottom = list.offsetHeight - tab.offsetTop - tab.offsetHeight
      setActiveClip(
        `inset(${tab.offsetTop}px ${right}px ${bottom}px ${tab.offsetLeft}px round 9999px)`
      )
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(list)

    return () => observer.disconnect()
  }, [activeWork])

  return (
    <div ref={listRef} className='relative flex flex-wrap gap-2'>
      {TABS.map((tab) => {
        const isActive = tab.work === activeWork

        return (
          <Link
            key={tab.work}
            ref={(node) => {
              if (node) {
                tabRefs.current.set(tab.work, node)
              }
            }}
            to='/'
            search={{ work: tab.work }}
            // Switching tabs is not a page change: keep the scroll position and don't
            // stack history entries for Back to walk through.
            replace
            resetScroll={false}
            aria-current={isActive ? 'page' : undefined}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors ${
              isActive && !activeClip
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-500 hover:text-gray-900'
            }`}
          >
            {tab.icon}
            {tab.label}
          </Link>
        )
      })}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 flex flex-wrap gap-2 bg-gray-900 transition-[clip-path] duration-250 ease-[cubic-bezier(0.77,0,0.175,1)] motion-reduce:transition-none ${
          activeClip ? '' : 'invisible'
        }`}
        style={{ clipPath: activeClip ?? undefined }}
      >
        {TABS.map((tab) => (
          <span key={tab.work} className='flex items-center gap-2 px-4 py-2 text-sm text-white'>
            {tab.icon}
            {tab.label}
          </span>
        ))}
      </div>
    </div>
  )
}
