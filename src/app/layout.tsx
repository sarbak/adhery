import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Instrument_Serif } from 'next/font/google';
import './globals.css';

const funktional = localFont({
  src: [
    { path: '../../public/fonts/FunktionalGrotesk-Light.ttf', weight: '300' },
    { path: '../../public/fonts/FunktionalGrotesk-Book.ttf', weight: '400' },
    { path: '../../public/fonts/FunktionalGrotesk-Regular.ttf', weight: '450' },
    { path: '../../public/fonts/FunktionalGrotesk-Medium.ttf', weight: '500' },
    { path: '../../public/fonts/FunktionalGrotesk-Semibold.ttf', weight: '600' },
    { path: '../../public/fonts/FunktionalGrotesk-Bold.ttf', weight: '700' },
  ],
  variable: '--font-funktional',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-instrument-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Adhery - AI-Powered Drug Adherence Platform',
  description:
    'Multi-channel patient outreach platform combining AI-powered SMS, voice calls, and mail to improve medication adherence for pharma companies and specialty pharmacies.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${funktional.variable} ${instrumentSerif.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
