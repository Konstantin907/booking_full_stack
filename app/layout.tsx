import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import Navbar from './components/navbar/Navbar'
import ClientOnly from './components/navbar/ClientOnly'
import RegisterModal from './components/modals/RegisterModal'
import ToasterProvider from "./providers/ToasterProvider"
import LoginModal from './components/modals/LoginModal'
import getCurrentUser from './actions/getCurrentUser'
import RentModal from './components/modals/RentModal'

const font = Roboto({
  subsets: ["latin"],
  weight: '500'
})

export const metadata: Metadata = {
  title: 'StayAway',
  description: 'Welcome to our website',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  //session:
  const currentUser = await getCurrentUser()
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <RentModal />
          <LoginModal />
          <RegisterModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        {/* ovjde pocinje displej za sve sto dodamo */}
        <div className='pb-20 pt-28'>

        </div>
        {children}</body>
    </html>
  )
}
