'use client';

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

export default function CreateProduct() {
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState({
    categoría: '',
    tipo: '',
    marca: '',
    nombre: '',
    código: '',
    modelo: '',
    diseños: [], // Cambiar a array
    hojas: '',
    cantidadCaja: '',
    img1: '',
    img2: [],
    texto: ''
  });

  const handleChange = (e) => {
    if (e.target.name === 'img2' || e.target.name === 'diseños') {
      setProduct({ ...product, [e.target.name]: e.target.value.split(',') });
    } else {
      setProduct({ ...product, [e.target.name]: e.target.value });
    }
  };

  const validateForm = () => {
    return Object.entries(product).every(([key, value]) => {
      if (key === 'img2') {
        return Array.isArray(value) ? value.length > 0 : value !== '';
      }
      if (key === 'diseños') {
        return true; // Permitir que "diseños" esté vacío
      }
      return value !== '';
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast({
        title: "Error",
        description: "Por favor, llena todos los campos.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    try {
        const response = await fetch('/api/products/[code]', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        toast({
          title: "Éxito",
          description: "El producto se ha creado correctamente.",
        });
        setProduct({
          categoría: '',
          tipo: '',
          marca: '',
          nombre: '',
          código: '',
          modelo: '',
          diseños: '',
          hojas: '',
          cantidadCaja: '',
          img1: '',
          img2: [],
          texto: ''
        });
      } else {
        throw new Error('Error al crear el producto');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo crear el producto. Por favor, intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input name="categoría" placeholder="Categoría" onChange={handleChange} value={product.categoría} />
      <Input name="tipo" placeholder="Tipo" onChange={handleChange} value={product.tipo} />
      <Input name="marca" placeholder="Marca" onChange={handleChange} value={product.marca} />
      <Input name="nombre" placeholder="Nombre" onChange={handleChange} value={product.nombre} />
      <Input name="código" placeholder="Código" onChange={handleChange} value={product.código} />
      <Input name="modelo" placeholder="Modelo" onChange={handleChange} value={product.modelo} />
      <Input 
        name="diseños" 
        placeholder="URLs de diseños (separadas por comas)" 
        onChange={handleChange} 
        value={Array.isArray(product.diseños) ? product.diseños.join(',') : product.diseños} 
      />
      <Input name="hojas" placeholder="Hojas" onChange={handleChange} value={product.hojas} />
      <Input name="cantidadCaja" placeholder="Cantidad por Caja" onChange={handleChange} value={product.cantidadCaja} />
      <Input name="img1" placeholder="URL de la imagen principal" onChange={handleChange} value={product.img1} />
      <Input 
        name="img2" 
        placeholder="URLs de imágenes adicionales (separadas por comas)" 
        onChange={handleChange} 
        value={Array.isArray(product.img2) ? product.img2.join(',') : product.img2} 
      />
      <Input name="texto" placeholder="Descripción" onChange={handleChange} value={product.texto} />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Creando...' : 'Crear Producto'}
      </Button>
    </form>
  );
}

