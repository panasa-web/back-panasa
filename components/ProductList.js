'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/todo_categorias')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <Card key={product.código}>
          <CardHeader>
            <CardTitle>{product.nombre}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Categoría: {product.categoría}</p>
            <p>Marca: {product.marca}</p>
            <p>Modelo: {product.modelo}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

