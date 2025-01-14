// ruta: components/Home.js
'use client'

import Link from 'next/link'
import { Card } from "@/components/ui/card"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-100 to-white relative flex items-center justify-center">
      <div className="absolute inset-0">
        <img 
          src="https://i.ibb.co/85x9PHS/Dise-o-sin-t-tulo.png" 
          alt="Background" 
          className="w-full h-full object-cover opacity-30" 
        />
      </div>
      <div className="relative container mx-auto px-4 py-16">
        <h1 className="text-7xl font-bold text-black text-center mb-8">
          Gestión de Datos Panasa
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Link href="/productos">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer bg-white border-sky-200">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-[#2200CC] mb-3">
                  Gestionar Productos
                </h2>
                <p className="text-black">
                  Administra el catálogo de productos
                </p>
              </div>
            </Card>
          </Link>

          <Link href="/formularios">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer bg-white border-sky-200">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-[#2200CC] mb-3">
                  Gestionar Formularios
                </h2>
                <p className="text-black">
                  Visualiza y administra los formularios recibidos
                </p>
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </main>
  )
}