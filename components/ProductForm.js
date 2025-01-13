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
    img2: '',
    texto: ''
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      if (response.ok) {
        alert('Producto creado exitosamente');
      } else {
        alert('Error al crear el producto');
      }
    } catch (error) {
      alert('Error al crear el producto');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input name="categoría" placeholder="Categoría" onChange={handleChange} value={product.categoría} />
      <Input name="tipo" placeholder="Tipo" onChange={handleChange} value={product.tipo} />
      <Input name="marca" placeholder="Marca" onChange={handleChange} value={product.marca} />
      <Input name="nombre" placeholder="Nombre" onChange={handleChange} value={product.nombre} />
      <Input name="código" placeholder="Código" onChange={handleChange} value={product.código} />
      <Input name="modelo" placeholder="Modelo" onChange={handleChange} value={product.modelo} />
      <Input name="diseños" placeholder="URLs de diseños (separadas por comas)" onChange={handleChange} value={product.diseños} />
      <Input name="hojas" placeholder="Hojas" onChange={handleChange} value={product.hojas} />
      <Input name="cantidadCaja" placeholder="Cantidad por Caja" onChange={handleChange} value={product.cantidadCaja} />
      <Input name="img1" placeholder="URL de la imagen principal" onChange={handleChange} value={product.img1} />
      <Input name="img2" placeholder="URLs de imágenes (separadas por comas)" onChange={handleChange} value={product.img2} />
      <Input name="texto" placeholder="Texto" onChange={handleChange} value={product.texto} />
      <Button type="submit">Crear Producto</Button>
    </form>
  );
}