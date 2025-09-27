import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "./StoreProvider";
import ToastProvider from "@/lib/react-toastify/ToastProvider";
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from "@/lib/context/UserContext";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GClient Admin Dashboard",
  description: "GClient Shop",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <StoreProvider>
      <html lang="en" >
        <body className={`${manrope.variable} antialiased`}>
          <ToastProvider>
            <UserProvider>
              {children}
            </UserProvider>
          </ToastProvider>
        </body>
      </html>
    </StoreProvider>
  );
}