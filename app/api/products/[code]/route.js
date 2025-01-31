import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export async function GET(request, { params }) {
  try {
    const { searchParams } = new URL(request.url);
    const searchName = searchParams.get('name');
    const searchCode = searchParams.get('code');

    // Búsqueda por nombre
    if (searchName) {
      const products = await prisma.product.findMany({
        where: {
          nombre: {
            contains: searchName,
            mode: 'insensitive'
          }
        }
      });
      const response = NextResponse.json(products);
      response.headers.set('Access-Control-Allow-Origin', '*');
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      return response;
    }

    // Búsqueda por código en searchParams
    if (searchCode) {
      const products = await prisma.product.findMany({
        where: {
          código: {
            contains: searchCode,
            mode: 'insensitive'
          }
        }
      });
      const response = NextResponse.json(products);
      response.headers.set('Access-Control-Allow-Origin', '*');
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      return response;
    }

    // Búsqueda por código en params (original)
    const product = await prisma.product.findUnique({ where: { código: params.code } });
    if (!product) {
      return NextResponse.json({ message: 'Producto no encontrado' }, { status: 404 });
    }
    const response = NextResponse.json(product);
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return response;
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    const response = NextResponse.json({ message: 'Error al obtener el producto' }, { status: 500 });
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return response;
  }
}

// ... resto del código existente ...

export async function POST(request) {
  try {
    const newProduct = await request.json();
    const product = await prisma.product.create({ data: newProduct });
    
    // Serializar el producto creado
    const serializedProduct = {
      ...product,
      id: product.id.toString()
    };

    const response = NextResponse.json(
      { message: 'Producto creado exitosamente', product: serializedProduct }, 
      { status: 201 }
    );
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return response;
  } catch (error) {
    console.error('Error al crear el producto:', error);
    const response = NextResponse.json({ message: 'Error al crear el producto' }, { status: 500 });
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return response;
  }
}

export async function PUT(request, { params }) {
  try {
    const code = params.code;
    const updatedProduct = await request.json();

    console.log('Código del producto:', code);
    console.log('Datos recibidos:', updatedProduct);

    if (!updatedProduct) {
      return NextResponse.json({ message: 'No se proporcionaron datos para actualizar' }, { status: 400 });
    }

    const product = await prisma.product.update({
      where: { código: code },
      data: updatedProduct,
    });

    // Serializar el producto actualizado
    const serializedProduct = {
      ...product,
      id: product.id.toString()
    };

    const response = NextResponse.json(
      { message: 'Producto actualizado exitosamente', product: serializedProduct }
    );
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return response;
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    return NextResponse.json({ message: 'Error al actualizar el producto', error: error.message }, { status: 500 });
  }
}




export async function DELETE(request, { params }) {
  try {
    await prisma.product.delete({ where: { código: params.code } });
    const response = NextResponse.json({ message: 'Producto eliminado exitosamente' });
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return response;
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    const response = NextResponse.json({ message: 'Error al eliminar el producto' }, { status: 500 });
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return response;
  }
}

// Manejar solicitudes OPTIONS para CORS
export async function OPTIONS() {
  const response = NextResponse.json({});
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return response;
}