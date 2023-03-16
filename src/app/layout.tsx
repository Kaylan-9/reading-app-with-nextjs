import { ReactNode } from 'react';
import './globals.css';

export interface IRootLayout {
  children: ReactNode
}

export default function RootLayout({children}: IRootLayout) {
  return (
    <html lang="en">
      <head/>
      <body>{children}</body>
      <script>(adsbygoogle= window.adsbygoogle || []).push({});</script>
    </html>
  )
}
