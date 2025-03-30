import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '로또',
  description: '퇴사 기원 로또',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, maximum-scale=1'
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
