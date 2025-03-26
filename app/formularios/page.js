'use client'

import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FormulariosList from '@/components/FormulariosList/FormulariosList'
import Link from 'next/link'
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';

export default function FormulariosPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // o un indicador de carga
  }

  return <AuthenticatedFormulariosContent />;
}

function AuthenticatedFormulariosContent() {
  const { user, error, isLoading } = useUser();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("cotizaAqui");

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/api/auth/login');
    }
  }, [isLoading, user, router]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (!user) {
    return null; // No renderizar nada mientras se redirecciona
  }

  return (
    <main className="min-h-screen bg-white flex items-center justify-center p-8">
      <div className="w-[90%] min-h-[80vh] mx-auto">
        <div className="h-full bg-[#eeeeee] rounded-[40px] p-12">
          <Link 
            href="/" 
            className="text-[#2100c8] hover:underline font-outfit font-bold mb-8 block"
          >
            &larr; Regresar a la página principal
          </Link>
          
          <h1 className="text-5xl font-bold text-[#2100c8] text-center mb-8 font-outfit">
            Gestión de Formularios
          </h1>
          
          <div className="max-w-4xl mx-auto mb-4">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="flex w-full bg-white p-1 rounded-[10px]"> 
                <TabsTrigger 
                  value="cotizaAqui" 
                  className="rounded-[10px] flex-1 text-lg py-2 px-6 text-center font-outfit transition-all"
                >
                  COTIZA AQUÍ
                </TabsTrigger>
                <TabsTrigger 
                  value="contactanos" 
                  className="rounded-[10px] flex-1 text-lg py-2 px-6 text-center font-outfit transition-all"
                >
                  CONTÁCTANOS
                </TabsTrigger>
                <TabsTrigger 
                  value="reclamaAqui" 
                  className="rounded-[10px] flex-1 text-lg py-2 px-6 text-center font-outfit transition-all"
                >
                  PETICIONES/RECLAMOS
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="w-full max-w-6xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsContent value="cotizaAqui">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <FormulariosList type="cotizaAqui" />
                </div>
              </TabsContent>
              <TabsContent value="contactanos">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <FormulariosList type="contactanos" />
                </div>
              </TabsContent>
              <TabsContent value="reclamaAqui">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <FormulariosList type="reclamaAqui" />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </main>
  )
}