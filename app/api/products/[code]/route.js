import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const productsFilePath = path.join(process.cwd(), 'data', 'products.json');

export async function GET() {
  try {
    const fileContents = await fs.readFile(productsFilePath, 'utf8');
    const products = JSON.parse(fileContents);
    return NextResponse.json(products);
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
    return NextResponse.json({ message: 'Producto creado exitosamente', product: newProduct }, { status: 201 });
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
        return NextResponse.json({ message: 'Producto no encontrado' }, { status: 404 });
      }
      products[productIndex] = updatedProduct;
      await fs.writeFile(productsFilePath, JSON.stringify(products, null, 2));
      return NextResponse.json({ message: 'Producto actualizado exitosamente', product: updatedProduct }, { status: 200 });
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
        return NextResponse.json({ message: 'Producto no encontrado' }, { status: 404 });
      }
      await fs.writeFile(productsFilePath, JSON.stringify(updatedProducts, null, 2));
      return NextResponse.json({ message: 'Producto eliminado exitosamente' }, { status: 200 });
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      return NextResponse.json({ message: 'Error al eliminar el producto' }, { status: 500 });
    }
  }