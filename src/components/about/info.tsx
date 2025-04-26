import { SealCheck } from '@phosphor-icons/react';

export default function AboutInfo() {
  return (
    <div className="max-w-screen-md mx-auto w-full mt-12">
      <div className="flex items-center flex-col gap-6">
        <div
          className={`relative flex items-center gap-4 h-24 w-24 border border-gray-300 dark:border-gray-700 rounded-full shadow-sm`}
        >
          <img
            src="/avatar.png"
            alt="Irere Emmanuel"
            className="rounded-full p-1"
          />
          <SealCheck
            weight="fill"
            size={34}
            className="absolute text-blue-400 -bottom-0.5 -right-1"
          />
        </div>
        <div className="text-balance text-center">
          <h2 className="text-3xl font-semibold">Here there!</h2>
          <h2 className="text-3xl font-semibold">I&lsquo;m Emmanuel</h2>
        </div>
        <div className="max-w-96 text-center text-xl text-neutral-500 dark:text-neutral-400 font-semibold">
          <p>
            I&lsquo;m a Software Engineer specializing in buildings apps and
            SaaS services. I love crafting visually appealing products that
            delight users.
          </p>
        </div>
        <div className="max-w-[400px] text-center font-medium text-lg text-neutral-500 dark:text-neutral-400">
          <p>
            I&lsquo;m currently{' '}
            <strong className="text-neutral-800 dark:text-neutral-200">
              coding
            </strong>
            . In my spare time, I work on personal side projects and create
            high-quality, free open-source software for the community.
          </p>
        </div>
      </div>
    </div>
  );
}
