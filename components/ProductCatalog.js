'use client'

import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast";

export default function ProductCatalog() {
  const BASE_URL = 'https://panasa-demo.orange-360.com'
  const { toast } = useToast()
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [types, setTypes] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [editedProduct, setEditedProduct] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    const response = await fetch('/api/todo_categorias')
    const data = await response.json()
    setProducts(data)
    setFilteredProducts(data)
    setCategories([...new Set(data.map(product => product.categoría))])
  }

  useEffect(() => {
    if (selectedCategory) {
      setTypes([...new Set(products
        .filter(product => product.categoría === selectedCategory)
        .map(product => product.tipo))])
    }
  }, [selectedCategory, products])

  useEffect(() => {
    let filtered = [...products]
    
    if (selectedCategory) {
      filtered = filtered.filter(product => product.categoría === selectedCategory)
    }
    
    if (selectedType) {
      filtered = filtered.filter(product => product.tipo === selectedType)
    }
    
    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.código.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    setFilteredProducts(filtered)
  }, [products, selectedCategory, selectedType, searchTerm])

  const handleProductClick = (product) => {
    setSelectedProduct(product)
    setEditedProduct({...product})
    setIsDialogOpen(true)
  }

  const handleInputChange = (e) => {
    if (e.target.name === 'img2' || e.target.name === 'diseños') {
      setEditedProduct({...editedProduct, [e.target.name]: e.target.value.split(',')})
    } else {
      setEditedProduct({...editedProduct, [e.target.name]: e.target.value})
    }
  }

  const handleSave = async () => {
    if (!editedProduct) {
      toast({
        title: "Error",
        description: "No hay producto para actualizar",
        variant: "destructive",
      });
      return;
    }
    if (confirm("¿Estás seguro de que deseas guardar los cambios?")) {
      try {
        console.log("Enviando editedProduct:", editedProduct);
        const response = await fetch(`/api/products/${editedProduct.código}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editedProduct),
        });
  
        if (!response.ok) {
          const result = await response.json();
          throw new Error(result.message || 'Error al actualizar el producto');
        }
  
        const result = await response.json();
        console.log("Respuesta del servidor:", result);
  
        toast({
          title: "Éxito",
          description: "Producto actualizado correctamente",
        });
        setIsDialogOpen(false);
        fetchProducts();
      } catch (error) {
        console.error("Error al actualizar:", error);
        toast({
          title: "Error",
          description: error.message || "No se pudo actualizar el producto",
          variant: "destructive",
        });
      }
    }
  };

  const handleDelete = async () => {
    if (confirm("¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer.")) {
      try {
        const response = await fetch(`/api/products/${selectedProduct.código}`, {
          method: 'DELETE',
        })

        if (response.ok) {
          toast({
            title: "Éxito",
            description: "Producto eliminado correctamente",
          })
          setIsDialogOpen(false)
          fetchProducts()
        } else {
          throw new Error('No se pudo eliminar el producto')
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudo eliminar el producto",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <div>
      <Input
        placeholder="Buscar por nombre o código"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      <Accordion type="single" collapsible>
        <AccordionItem value="category">
          <AccordionTrigger>Categoría</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        {selectedCategory && (
          <AccordionItem value="type">
            <AccordionTrigger>Tipo</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap gap-2">
                {types.map(type => (
                  <Button
                    key={type}
                    variant={selectedType === type ? "default" : "outline"}
                    onClick={() => setSelectedType(type)}
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {filteredProducts.slice(0, 24).map((product) => (
          <Card key={product.código} className="flex flex-col">
            <CardContent className="p-4">
              <img 
                src={`${BASE_URL}${product.img1}`} 
                alt={product.nombre}
                className="w-full h-40 object-cover mb-4"
              />
              <h3 className="font-bold truncate">{product.nombre}</h3>
              <p className="text-sm text-gray-600 mb-4">{product.código}</p>
              <Button 
                className="w-full"
                onClick={() => handleProductClick(product)}
              >
                Gestionar
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Gestionar Producto</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 overflow-y-auto pr-4">
            {editedProduct && Object.entries(editedProduct).map(([key, value]) => (
              <div key={key} className="grid gap-2">
                <label className="text-sm font-medium">{key}</label>
                <Input
                  name={key}
                  value={Array.isArray(value) ? value.join(',') : value}
                  onChange={handleInputChange}
                />
              </div>
            ))}
          </div>
          <DialogFooter className="gap-2 mt-4 border-t pt-4">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Volver
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Eliminar
            </Button>
            <Button onClick={handleSave}>
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}