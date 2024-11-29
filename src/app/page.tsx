import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="max-w-md space-y-3">
        <h1 className="text-2xl">Irere Emmanuel</h1>
        <p className="italic">Software engineer</p>
        <p>
          I&lsquo;m fluent in Go, Typescript, C, SQL, and English. I&lsquo;ve
          also written a good amount of JavaScript, HTML, C++, and Elixir. I
          learn quickly, care about detail, and love computer science and{" "}
          <Link href={`https://blog.irere.dev`} className="underline">
            writing about technical stuff.
          </Link>
        </p>
      </div>
    </div>
  );
}
