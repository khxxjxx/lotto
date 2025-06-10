import type { Metadata } from 'next';
import Body from '../Body';

export const metadata: Metadata = {
  title: '행운 희진 로또',
  description: '행운 희진 로또',
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
      <Body>{children}</Body>
    </html>
  );
}
