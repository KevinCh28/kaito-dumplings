'use client';
import Link from 'next/link';

const error = ({ error, reset }: { error: Error, reset: () => void }) => {
  return (
    <div>
      <button onClick={reset}>Try again</button>
      <button>
        <Link href="/">Go back home</Link>
      </button>
    </div>
  )
};

export default error;