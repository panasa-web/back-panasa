import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'products.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const products = JSON.parse(fileContents);

    const response = NextResponse.json(products);

    // Añadir encabezados CORS
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    return response;
  } catch (error) {
    console.error('Error al leer los productos:', error);
    return NextResponse.json({ message: 'Error al leer los productos' }, { status: 500 });
  }
}