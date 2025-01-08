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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implementar la lógica para guardar el producto aquí
    // Validar que los campos obligatorios estén llenos
    const requiredFields = ['categoría', 'tipo', 'marca', 'nombre', 'código', 'modelo', 'hojas', 'cantidadCaja', 'img1'];
    const isValid = requiredFields.every(field => product[field] !== '');

    if (!isValid) {
      // Mostrar un mensaje de error si algún campo obligatorio está vacío
      alert('Por favor, llena todos los campos obligatorios.');
      return;
    }

    // Lógica para guardar el producto
    console.log('Producto guardado:', product);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input name="categoría" placeholder="Categoría" onChange={handleChange} />
      <Input name="tipo" placeholder="Tipo" onChange={handleChange} />
      <Input name="marca" placeholder="Marca" onChange={handleChange} />
      <Input name="nombre" placeholder="Nombre" onChange={handleChange} />
      <Input name="código" placeholder="Código" onChange={handleChange} />
      <Input name="modelo" placeholder="Modelo" onChange={handleChange} />
      <Input 
        name="diseños" 
        placeholder="URLs de diseños (separadas por comas)" 
        onChange={handleChange} 
        value={Array.isArray(product.diseños) ? product.diseños.join(',') : product.diseños} 
      />
      <Input name="hojas" placeholder="Hojas" onChange={handleChange} />
      <Input name="cantidadCaja" placeholder="Cantidad por Caja" onChange={handleChange} />
      <Input name="img1" placeholder="URL de la imagen principal" onChange={handleChange} />
      <Input 
        name="img2" 
        placeholder="URLs de imágenes adicionales (separadas por comas)" 
        onChange={handleChange} 
        value={Array.isArray(product.img2) ? product.img2.join(',') : product.img2} 
      />
      <Input name="texto" placeholder="Descripción" onChange={handleChange} />
      <Button type="submit">Guardar Producto</Button>
    </form>
  );
}

