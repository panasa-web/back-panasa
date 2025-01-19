import './globals.css'
import { UserProvider } from '@auth0/nextjs-auth0/client';

export const metadata = {
  title: 'Gestión de Productos',
  description: 'Aplicación para gestionar productos',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  )
}