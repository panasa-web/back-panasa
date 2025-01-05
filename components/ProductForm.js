'use client';

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ProductForm() {
  const [product, setProduct] = useState({
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

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implementar la lógica para guardar el producto aquí
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input name="categoría" placeholder="Categoría" onChange={handleChange} />
      <Input name="tipo" placeholder="Tipo" onChange={handleChange} />
      <Input name="marca" placeholder="Marca" onChange={handleChange} />
      <Input name="nombre" placeholder="Nombre" onChange={handleChange} />
      <Input name="código" placeholder="Código" onChange={handleChange} />
      <Input name="modelo" placeholder="Modelo" onChange={handleChange} />
      <Input name="diseños" placeholder="Diseños" onChange={handleChange} />
      <Input name="hojas" placeholder="Hojas" onChange={handleChange} />
      <Input name="cantidadCaja" placeholder="Cantidad por Caja" onChange={handleChange} />
      <Input name="img1" placeholder="URL de la imagen principal" onChange={handleChange} />
      <Input name="img2" placeholder="URLs de imágenes adicionales (separadas por comas)" onChange={handleChange} />
      <Input name="texto" placeholder="Descripción" onChange={handleChange} />
      <Button type="submit">Guardar Producto</Button>
    </form>
  );
}

