import { NextResponse } from "next/server"
import supabase from "../../../lib/supabase"

const MAX_RETRIES = 3
const RETRY_DELAY = 1000 // 1 second

async function retryOperation(operation, retries = MAX_RETRIES) {
  for (let i = 0; i < retries; i++) {
    try {
      return await operation()
    } catch (error) {
      if (i === retries - 1) throw error
      console.log(`Attempt ${i + 1} failed, retrying in ${RETRY_DELAY}ms...`)
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY))
    }
  }
}

export async function GET() {
  console.log("Iniciando GET request a /api/todo_categorias")
  try {
    const { data: products, error } = await retryOperation(() => 
      supabase
        .from('Product')
        .select('categoría, tipo, marca, nombre, código, modelo, diseños, hojas, cantidadCaja, heroImg, img1, img2, texto')
    )

    if (error) throw error;

    console.log(`Productos obtenidos: ${products?.length}`)

    if (!products || products.length === 0) {
      console.log("No se encontraron productos")
      return NextResponse.json({ message: "No se encontraron productos" }, { status: 404 })
    }

    const serializedProducts = products.map((product) => ({
      ...product,
      diseños: Array.isArray(product.diseños) ? product.diseños : product.diseños ? product.diseños.split(",") : [],
      img2: Array.isArray(product.img2) ? product.img2 : product.img2 ? product.img2.split(",") : []
    }))

    console.log("Productos serializados correctamente")

    const response = NextResponse.json(serializedProducts)
    response.headers.set("Access-Control-Allow-Origin", "*")
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization")
    return response
  } catch (error) {
    console.error("Error detallado al obtener los productos:", error)
    return NextResponse.json(
      {
        message: "Error al obtener los productos",
        error: error.toString(),
        stack: error.stack
      },
      { status: 500 }
    )
  }
}

export async function OPTIONS() {
  const response = NextResponse.json({})
  response.headers.set("Access-Control-Allow-Origin", "*")
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization")
  return response
}