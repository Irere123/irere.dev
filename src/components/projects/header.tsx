import { Link } from '@tanstack/react-router';

export default function Header() {
  return (
    <div className="flex bg-white sticky top-0 z-50 justify-between items-center py-6">
      <h3 className="text-neutral-800 mb-3 text-2xl font-semibold">Projects</h3>

      <p>
        Got an Idea for a Project?{' '}
        <Link
          to="/services"
          className="text-neutral-800 underline font-semibold"
        >
          Let&apos;s build it
        </Link>
      </p>
    </div>
  );
}
