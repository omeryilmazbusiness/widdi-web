import type { ReactNode } from 'react';

// Root layout with required html and body tags
// The locale-specific layout will handle everything inside body
export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
