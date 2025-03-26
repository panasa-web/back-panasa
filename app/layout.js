import './globals.css'
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { Outfit } from 'next/font/google';

const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-outfit',
});

export const metadata = {
  title: 'Gestión de Datos Papelera Nacional',
  description: 'Aplicación para gestionar datos y formularios',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={outfit.variable}>
      <body>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  )
}