import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const productsFilePath = path.join(process.cwd(), 'data', 'products.json');

export async function GET(request, { params }) {
  try {
    const { searchParams } = new URL(request.url);
    const productName = searchParams.get('nombre');
    const fileContents = await fs.readFile(productsFilePath, 'utf8');
    const products = JSON.parse(fileContents);
    const productCode = params.code;

    let response;

    // Si el código en la URL es 'search', buscar por nombre
    if (productCode === 'search' && productName) {
      const filteredProducts = products.filter(p => p.nombre === productName);
      if (filteredProducts.length === 0) {
        response = NextResponse.json({ message: 'Producto no encontrado' }, { status: 404 });
      } else {
        response = NextResponse.json(filteredProducts);
      }
    } else if (productCode) {
      // Buscar por código
      const product = products.find(p => p.código === productCode);
      if (!product) {
        response = NextResponse.json({ message: 'Producto no encontrado' }, { status: 404 });
      } else {
        response = NextResponse.json(product);
      }
    } else {
      response = NextResponse.json(products);
    }

    // Añadir encabezados CORS
    response.headers.set('Access-Control-Allow-Origin', 'http://localhost');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    return response;
  } catch (error) {
    console.error('Error al leer los productos:', error);
    return NextResponse.json({ message: 'Error al leer los productos' }, { status: 500 });
  }
}


export async function POST(request) {
  try {
    const newProduct = await request.json();
    const fileContents = await fs.readFile(productsFilePath, 'utf8');
    const products = JSON.parse(fileContents);
    products.push(newProduct);
    await fs.writeFile(productsFilePath, JSON.stringify(products, null, 2));
    const response = NextResponse.json({ message: 'Producto creado exitosamente', product: newProduct }, { status: 201 });

    // Añadir encabezados CORS
    response.headers.set('Access-Control-Allow-Origin', 'http://localhost');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    return response;
  } catch (error) {
    console.error('Error al crear el producto:', error);
    return NextResponse.json({ message: 'Error al crear el producto' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const updatedProduct = await request.json();
    const fileContents = await fs.readFile(productsFilePath, 'utf8');
    const products = JSON.parse(fileContents);
    const productIndex = products.findIndex(product => product.código === updatedProduct.código);
    if (productIndex === -1) {
      const response = NextResponse.json({ message: 'Producto no encontrado' }, { status: 404 });

      // Añadir encabezados CORS
      response.headers.set('Access-Control-Allow-Origin', 'http://localhost');
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

      return response;
    }
    products[productIndex] = updatedProduct;
    await fs.writeFile(productsFilePath, JSON.stringify(products, null, 2));
    const response = NextResponse.json({ message: 'Producto actualizado exitosamente', product: updatedProduct }, { status: 200 });

    // Añadir encabezados CORS
    response.headers.set('Access-Control-Allow-Origin', 'http://localhost');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    return response;
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    return NextResponse.json({ message: 'Error al actualizar el producto' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const productCode = params.code;
    const fileContents = await fs.readFile(productsFilePath, 'utf8');
    const products = JSON.parse(fileContents);
    const updatedProducts = products.filter(product => product.código !== productCode);
    if (products.length === updatedProducts.length) {
      const response = NextResponse.json({ message: 'Producto no encontrado' }, { status: 404 });

      // Añadir encabezados CORS
      response.headers.set('Access-Control-Allow-Origin', 'http://localhost');
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

      return response;
    }
    await fs.writeFile(productsFilePath, JSON.stringify(updatedProducts, null, 2));
    const response = NextResponse.json({ message: 'Producto eliminado exitosamente' }, { status: 200 });

    // Añadir encabezados CORS
    response.headers.set('Access-Control-Allow-Origin', 'http://localhost');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    return response;
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    return NextResponse.json({ message: 'Error al eliminar el producto' }, { status: 500 });
  }
}