import AppProvider from '@/components/app-provider';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import TopNav from '../components/layout/TopNav';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Social App - Connect with Friends',
    template: '%s | Social App',
  },
  description:
    'A modern social media platform to connect with friends and share moments.',
  keywords: [
    'social media',
    'instagram clone',
    'photo sharing',
    'social network',
  ],
  authors: [{ name: 'Social App Team' }],
  creator: 'Social App',
  publisher: 'Social App',
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'https://your-domain.com',
    siteName: 'Social App',
    title: 'Social App - Connect with Friends',
    description:
      'A modern social media platform to connect with friends and share moments.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Social App',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Social App - Connect with Friends',
    description:
      'A modern social media platform to connect with friends and share moments.',
    creator: '@socialapp',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Josefin+Sans:ital,wght@0,100..700;1,100..700&family=Jura:wght@300..700&family=Roboto+Slab:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <TopNav />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TopNav />
            {children}
            <Toaster />
            <Analytics />
            <SpeedInsights />
          </ThemeProvider>
        </AppProvider>
      </body>
    </html>
  );
}
