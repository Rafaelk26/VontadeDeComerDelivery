import type { Metadata } from "next";
import { Geist, Geist_Mono, Google_Sans_Flex } from "next/font/google";
import "./globals.css";

// Providers
import { ToastProvider } from "@/provider/ToastProvider";
import { CartProvider } from "@/context/Cart/useCart";
import { UserProvider } from "@/context/User/useUser";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const googleFlex = Google_Sans_Flex({
  variable: '--font-google-sans-flex',
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Vontade de Comer | Delivery",
  description: "Veja nossos cardápios e as novidades acessando agora mesmo!",
  icons: {
    icon: "/Logo.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-br"
      className={`${geistSans.variable} ${geistMono.variable} ${googleFlex.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <UserProvider>
          <CartProvider>
              {children}
            <ToastProvider />
          </CartProvider>
        </UserProvider>
      </body>
    </html>
  );
}
