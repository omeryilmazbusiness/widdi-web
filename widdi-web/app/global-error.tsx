'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log critical error
    console.error('Critical application error:', error);
    
    // Send to error tracking service
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'exception', {
        description: `Global Error: ${error.message}`,
        fatal: true,
      });
    }
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-red-500/20 flex items-center justify-center">
              <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Critical Error</h1>
            <p className="text-lg text-gray-400 mb-8">
              A critical error occurred. Please refresh the page or contact support.
            </p>
            <button
              onClick={reset}
              className="px-8 py-4 bg-linear-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold shadow-lg"
            >
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
