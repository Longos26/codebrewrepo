//layout.js dito sa homepage
import Header from "./components/Header";
import { Roboto } from 'next/font/google'
import './globals.css'
import { AppProvider } from "./components/AppContext";
import { Toaster } from "react-hot-toast";

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] })

export const metadata = {
  title: 'Tealerin Milktea',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={roboto.className}>
        <main className="max-w-4xl mx-auto p-4">
          <AppProvider>
            <Toaster/>
            <Header />
            {children}
            
            </AppProvider>
        </main>
      </body>
    </html>
  )
}