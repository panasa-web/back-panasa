// ruta: components/CreateProductForm.js
'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Plus, Minus } from 'lucide-react' // Import icons
import { useRouter } from 'next/navigation'

export default function CreateProductForm() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [diseñosInputs, setDiseñosInputs] = useState(['']) // Array for diseños inputs
  const [img2Inputs, setImg2Inputs] = useState(['']) // Array for img2 inputs
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
  const router = useRouter()

  // Handle single image inputs
  const handleChange = (e) => {
    const { name, value } = e.target
    setProduct({ ...product, [name]: value }) // Remover trim()
  }

  // Handle diseños array inputs
  const handleDiseñosChange = (index, value) => {
    const newDiseñosInputs = [...diseñosInputs]
    newDiseñosInputs[index] = value.trim()
    setDiseñosInputs(newDiseñosInputs)
    setProduct({ ...product, diseños: newDiseñosInputs.filter(Boolean) })
  }

  // Handle img2 array inputs
  const handleImg2Change = (index, value) => {
    const newImg2Inputs = [...img2Inputs]
    newImg2Inputs[index] = value.trim()
    setImg2Inputs(newImg2Inputs)
    setProduct({ ...product, img2: newImg2Inputs.filter(Boolean) })
  }

  // Add new input field
  const addInput = (type) => {
    if (type === 'diseños') {
      setDiseñosInputs([...diseñosInputs, ''])
    } else {
      setImg2Inputs([...img2Inputs, ''])
    }
  }

  // Remove input field
  const removeInput = (type, index) => {
    if (type === 'diseños') {
      const newInputs = diseñosInputs.filter((_, i) => i !== index)
      setDiseñosInputs(newInputs)
      setProduct({ ...product, diseños: newInputs.filter(Boolean) })
    } else {
      const newInputs = img2Inputs.filter((_, i) => i !== index)
      setImg2Inputs(newInputs)
      setProduct({ ...product, img2: newInputs.filter(Boolean) })
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
    
    const formattedProduct = {
      ...product,
      // Aplicar trim() aquí, al enviar
      categoría: product.categoría.trim(),
      tipo: product.tipo.trim(),
      marca: product.marca.trim(),
      nombre: product.nombre.trim(),
      código: product.código.trim(),
      modelo: product.modelo.trim(),
      hojas: product.hojas.trim(),
      cantidadCaja: product.cantidadCaja.trim(),
      img1: product.img1.trim(),
      heroImg: product.heroImg.trim(),
      texto: product.texto.trim(),
      diseños: diseñosInputs.filter(Boolean).map(d => d.trim()),
      img2: img2Inputs.filter(Boolean).map(i => i.trim())
    }

    setIsLoading(true)
    try {
      const response = await fetch(`/api/products/${product.código}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formattedProduct)
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
        setDiseñosInputs([''])
        setImg2Inputs([''])
        router.push('/productos')
        router.refresh()
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
        <div className="flex items-center justify-between">
          <Label>Diseños</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => addInput('diseños')}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        {diseñosInputs.map((input, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => handleDiseñosChange(index, e.target.value)}
              placeholder={`Pega el link del diseño ${index + 1}`}
            />
            {diseñosInputs.length > 1 && (
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => removeInput('diseños', index)}
              >
                <Minus className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Imágenes Adicionales</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => addInput('img2')}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        {img2Inputs.map((input, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => handleImg2Change(index, e.target.value)}
              placeholder={`Pega el link de la imagen adicional ${index + 1}`}
            />
            {img2Inputs.length > 1 && (
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => removeInput('img2', index)}
              >
                <Minus className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
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