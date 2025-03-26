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
    <main className="min-h-screen bg-white flex items-center justify-center p-8">
      <div className="w-[90%] h-[80vh] mx-auto">
        <div className="h-full bg-[#eeeeee] rounded-[40px] p-12 flex flex-col justify-center">
          <h1 className="text-[#2100c8] text-6xl font-bold mb-12 text-center font-outfit">
            Gestión de Datos Panasa
          </h1>

          <div className="max-w-md mx-auto w-full">
            <div className="text-center mb-8">
              <p className="text-black text-2xl font-outfit mb-6">
                Bienvenido, {user.name || user.email}
              </p>
              <button 
                onClick={handleLogout} 
                className="w-1/2 px-4 py-3 bg-[#2b2b2b] text-white font-outfit font-bold rounded-lg hover:bg-[#3b3b3b] transition mb-8">
                Cerrar Sesión
              </button>
            </div>
            
            <div className="flex flex-col items-center">
              <Link href="/formularios" className="w-3/4">
                <button className="w-full bg-[#2100c8] text-white font-outfit font-bold text-xl py-4 px-6 rounded-lg hover:bg-[#1a0096] transition mb-0">
                  Gestionar Formularios
                </button>
              </Link>
              <div className="w-3/4 bg-white rounded-lg p-4 text-[#2100c8] font-outfit text-center text-sm">
                Visualiza y administra los formularios recibidos
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
