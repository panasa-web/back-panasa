import './globals.css'

export const metadata = {
  title: 'Gestión de Productos',
  description: 'Aplicación para gestionar productos',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}

