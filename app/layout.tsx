import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {Inter as FontSans} from "next/font/google"
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import { dark } from "@clerk/themes";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Live docs ",
  description: "My first Real time app",
};

const fontSans = FontSans({
subsets:["latin"],
variable:"--font-sans"
})

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) 
{
  return (
    <ClerkProvider
    appearance={{
      baseTheme:dark,
      variables:{
        colorPrimary:'#3371FF',
        fontSize:'16px'
      }
    }}
    >
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
