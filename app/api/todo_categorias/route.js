import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function GET() {
  try {
    const products = await prisma.product.findMany();

  
    const serializedProducts = products.map(product => ({
      ...product,
      id: product.id.toString(),
      diseños: typeof product.diseños === 'string' ? product.diseños.split(',') : product.diseños,
      img2: typeof product.img2 === 'string' ? product.img2.split(',') : product.img2
    }));

    const response = NextResponse.json(serializedProducts);    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return response;
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    return NextResponse.json({ message: 'Error al obtener los productos' }, { status: 500 });
  }
}

export async function OPTIONS() {
  const response = NextResponse.json({});
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return response;
}