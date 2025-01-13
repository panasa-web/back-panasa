// ruta: components/CreateProductForm.js
'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast";

export default function CreateProductForm() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [product, setProduct] = useState({
    categoría: '',
    tipo: '',
    marca: '',
    nombre: '',
    código: '',
    modelo: '',
    diseños: [],
    hojas: '',
    cantidadCaja: '',
    img1: '',
    img2: [],
    texto: '',
    heroImg: '' // Nuevo campo añadido
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'img2' || name === 'diseños') {
      setProduct({ ...product, [name]: value.split(',') })
    } else {
      setProduct({ ...product, [name]: value })
    }
  }

  const validateForm = () => {
    return Object.entries(product).every(([key, value]) => {
      if (key === 'img2' || key === 'diseños') {
        return Array.isArray(value)
      }
      return value !== ''
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive"
      })
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/products/[code]', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      })

      if (response.ok) {
        toast({
          title: "Éxito",
          description: "Producto creado correctamente"
        })
        // Limpiar formulario
        setProduct({
          categoría: '',
          tipo: '',
          marca: '',
          nombre: '',
          código: '',
          modelo: '',
          diseños: [],
          hojas: '',
          cantidadCaja: '',
          img1: '',
          img2: [],
          texto: '',
          heroImg: ''
        })
      } else {
        throw new Error('Error al crear el producto')
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo crear el producto",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="categoría">Categoría</Label>
          <Input
            id="categoría"
            name="categoría"
            value={product.categoría}
            onChange={handleChange}
            placeholder="Ingresa la categoría"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tipo">Tipo</Label>
          <Input
            id="tipo"
            name="tipo"
            value={product.tipo}
            onChange={handleChange}
            placeholder="Ingresa el tipo"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="marca">Marca</Label>
          <Input
            id="marca"
            name="marca"
            value={product.marca}
            onChange={handleChange}
            placeholder="Ingresa la marca"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="nombre">Nombre</Label>
          <Input
            id="nombre"
            name="nombre"
            value={product.nombre}
            onChange={handleChange}
            placeholder="Ingresa el nombre"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="código">Código</Label>
          <Input
            id="código"
            name="código"
            value={product.código}
            onChange={handleChange}
            placeholder="Ingresa el código"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="modelo">Modelo</Label>
          <Input
            id="modelo"
            name="modelo"
            value={product.modelo}
            onChange={handleChange}
            placeholder="Ingresa el modelo"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="hojas">Hojas</Label>
          <Input
            id="hojas"
            name="hojas"
            value={product.hojas}
            onChange={handleChange}
            placeholder="Ingresa el número de hojas"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cantidadCaja">Cantidad por Caja</Label>
          <Input
            id="cantidadCaja"
            name="cantidadCaja"
            value={product.cantidadCaja}
            onChange={handleChange}
            placeholder="Ingresa la cantidad por caja"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="img1">Imagen Principal</Label>
          <Input
            id="img1"
            name="img1"
            value={product.img1}
            onChange={handleChange}
            placeholder="Ingresa la URL de la imagen principal"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="heroImg">Imagen Hero</Label>
          <Input
            id="heroImg"
            name="heroImg"
            value={product.heroImg}
            onChange={handleChange}
            placeholder="Ingresa la URL de la imagen hero"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="diseños">Diseños (separados por coma)</Label>
        <Textarea
          id="diseños"
          name="diseños"
          value={Array.isArray(product.diseños) ? product.diseños.join(',') : ''}
          onChange={handleChange}
          placeholder="Ingresa las URLs de los diseños separadas por comas"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="img2">Imágenes Adicionales (separadas por coma)</Label>
        <Textarea
          id="img2"
          name="img2"
          value={Array.isArray(product.img2) ? product.img2.join(',') : ''}
          onChange={handleChange}
          placeholder="Ingresa las URLs de las imágenes adicionales separadas por comas"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="texto">Descripción</Label>
        <Textarea
          id="texto"
          name="texto"
          value={product.texto}
          onChange={handleChange}
          placeholder="Ingresa la descripción del producto"
          rows={4}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Creando..." : "Crear Producto"}
      </Button>
    </form>
  )
}