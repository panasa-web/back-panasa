'use client';

import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

export default function DeleteProduct() {
  const { toast } = useToast();
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
    setIsDialogOpen(true);
  };

  const handleDelete = () => {
    toast({
      title: "¿Estás seguro?",
      description: "Esta acción eliminará el producto permanentemente.",
      action: (
        <Button onClick={confirmDelete} variant="destructive">
          Eliminar
        </Button>
      ),
    });
  };

  const confirmDelete = async () => {
    try {
        const response = await fetch(`/api/products/${selectedProduct.código}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast({
          title: "Producto eliminado",
          description: "El producto se ha eliminado correctamente.",
        });
        setIsDialogOpen(false);
        fetchProducts();
      } else {
        throw new Error('Error al eliminar el producto');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo eliminar el producto.",
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
            <DialogTitle>{selectedProduct?.nombre}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <img src={selectedProduct?.img1} alt={selectedProduct?.nombre} className="w-full h-auto" />
            </div>
            <div>
              {Object.entries(selectedProduct || {}).map(([key, value]) => (
                <div key={key} className="mb-2">
                  <strong>{key}:</strong> {value}
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsDialogOpen(false)}>Atrás</Button>
            <Button onClick={handleDelete} variant="destructive">Eliminar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

