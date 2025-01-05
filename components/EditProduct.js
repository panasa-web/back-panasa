'use client';

import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

export default function EditProduct() {
  const { toast } = useToast();
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editedProduct, setEditedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch('/api/todo_categorias');
    const data = await response.json();
    setProducts(data);
    setCategories([...new Set(data.map(product => product.categoría))]);
  };

  useEffect(() => {
    if (selectedCategory) {
      setTypes([...new Set(products.filter(product => product.categoría === selectedCategory).map(product => product.tipo))]);
    }
  }, [selectedCategory, products]);

  const filteredProducts = products.filter(product => 
    product.categoría === selectedCategory &&
    product.tipo === selectedType &&
    product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setEditedProduct({...product});
    setIsDialogOpen(true);
  };

  const handleInputChange = (e) => {
    if (e.target.name === 'img2') {
      setEditedProduct({ ...editedProduct, [e.target.name]: e.target.value.split(',') });
    } else {
      setEditedProduct({ ...editedProduct, [e.target.name]: e.target.value });
    }
  };

  const validateForm = () => {
    return Object.entries(editedProduct).every(([key, value]) => {
      if (key === 'img2') {
        return Array.isArray(value) ? value.length > 0 : value !== '';
      }
      return value !== '';
    });
  };

  const handleEdit = () => {
    if (!validateForm()) {
      toast({
        title: "Error",
        description: "Por favor, llena todos los campos.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "¿Estás seguro de editar?",
      description: "Esta acción actualizará la información del producto.",
      action: (
        <Button onClick={confirmEdit}>
          Aceptar
        </Button>
      ),
    });
  };

  const confirmEdit = async () => {
    if (!validateForm()) {
      toast({
        title: "Error",
        description: "Por favor, llena todos los campos.",
        variant: "destructive",
      });
      return;
    }
    try {
      const response = await fetch(`/api/products/${editedProduct.código}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedProduct),
      });

      if (response.ok) {
        toast({
          title: "Producto actualizado",
          description: "La información del producto se ha actualizado correctamente.",
        });
        setIsDialogOpen(false);
        fetchProducts();
      } else {
        throw new Error('Error al actualizar el producto');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo actualizar el producto.",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <Accordion type="single" collapsible>
        <AccordionItem value="category">
          <AccordionTrigger>Categoría</AccordionTrigger>
          <AccordionContent>
            {categories.map(category => (
              <Button key={category} onClick={() => setSelectedCategory(category)} variant="ghost">
                {category}
              </Button>
            ))}
          </AccordionContent>
        </AccordionItem>
        {selectedCategory && (
          <AccordionItem value="type">
            <AccordionTrigger>Tipo</AccordionTrigger>
            <AccordionContent>
              {types.map(type => (
                <Button key={type} onClick={() => setSelectedType(type)} variant="ghost">
                  {type}
                </Button>
              ))}
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>
      {selectedType && (
        <div className="mt-4">
          <Input
            placeholder="Buscar producto"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {filteredProducts.map(product => (
              <Card key={product.código} onClick={() => handleProductClick(product)} className="cursor-pointer">
                <CardContent className="p-4">
                  <img src={product.img1} alt={product.nombre} className="w-full h-48 object-cover mb-2" />
                  <h3 className="font-bold">{product.nombre}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Producto</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <img src={editedProduct?.img1} alt={editedProduct?.nombre} className="w-full h-auto" />
            </div>
            <div className="space-y-4">
              {editedProduct && Object.entries(editedProduct).map(([key, value]) => (
                <div key={key}>
                  <label htmlFor={key} className="block text-sm font-medium text-gray-700">{key}</label>
                  <Input
                    id={key}
                    name={key}
                    value={key === 'img2' ? (Array.isArray(value) ? value.join(',') : value) : value}
                    onChange={handleInputChange}
                  />
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleEdit}>Editar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

