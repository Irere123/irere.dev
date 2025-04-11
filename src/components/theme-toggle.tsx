import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon } from '@phosphor-icons/react';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const handleToggle = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  if (!mounted) {
    return (
      <button
        type="button"
        className="flex items-center py-2 px-4 justify-center rounded-3xl bg-[#f4f4f4] transition-all hover:ring-2 dark:bg-neutral-800 dark:ring-neutral-700"
        aria-label="Toggle theme"
        disabled
      >
        <div className="h-5 w-5" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="flex py-2 px-4 items-center justify-center rounded-3xl bg-[#f4f4f4] hover:bg-neutral-200 transition-all dark:bg-neutral-800 dark:hover:bg-neutral-700"
      aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {resolvedTheme === 'dark' ? (
          <motion.div
            key="moon"
            initial={{ y: -20, opacity: 0, rotate: -90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 20, opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            <Moon
              size={20}
              weight="fill"
              className="text-neutral-700 dark:text-neutral-300"
            />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ y: -20, opacity: 0, rotate: 90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 20, opacity: 0, rotate: -90 }}
            transition={{ duration: 0.2 }}
          >
            <Sun
              size={20}
              weight="fill"
              className="text-neutral-700 dark:text-neutral-300"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
