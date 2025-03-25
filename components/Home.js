'use client'

import Link from 'next/link';
import { Card } from "@/components/ui/card";
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const handleLogout = () => {
    window.location.href = '/api/auth/logout';
  };

  if (!user) {
    router.push('/api/auth/login');
    return null;
  }

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

        <div className="text-center mb-8">
          <p className="text-xl font-semibold text-black mb-2">
            Bienvenido, {user.name || user.email}
          </p>
          <button 
            onClick={handleLogout} 
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
            Cerrar Sesión
          </button>
        </div>
        
        <div className="flex justify-center">
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
  );
}
