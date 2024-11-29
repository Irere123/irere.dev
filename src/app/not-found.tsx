import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen justify-center items-center flex-col">
      <div className="max-w-md">
        <h2 className="font-bold text-3xl">Not Found</h2>
        <p>Could not find requested resource</p>
        <Link href="/" className="underline">
          Return Home
        </Link>
      </div>
    </div>
  );
}
