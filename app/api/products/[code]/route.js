import { NextResponse } from 'next/server';
import supabase from '../../../../lib/supabase';

export async function GET(request, { params }) {
  try {
    const { data, error } = await supabase
      .from('Product')
      .select('*')
      .eq('código', params.code)
      .single();

    if (error) throw error;
    if (!data) {
      return NextResponse.json({ message: 'Producto no encontrado' }, { status: 404 });
    }

    const serializedProduct = {
      ...data,
      diseños: Array.isArray(data.diseños) ? data.diseños : data.diseños ? data.diseños.split(',') : [],
      img2: Array.isArray(data.img2) ? data.img2 : data.img2 ? data.img2.split(',') : []
    };

    const response = NextResponse.json(serializedProduct);
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return response;
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const newProduct = await request.json();
    
    // Format arrays before inserting
    const formattedProduct = {
      ...newProduct,
      diseños: Array.isArray(newProduct.diseños) ? newProduct.diseños : [],
      img2: Array.isArray(newProduct.img2) ? newProduct.img2 : []
    };

    const { data, error } = await supabase
      .from('Product')
      .insert(formattedProduct)
      .select()
      .single();

    if (error) throw error;

    const response = NextResponse.json(
      { message: 'Producto creado exitosamente', product: data },
      { status: 201 }
    );
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return response;
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const code = params.code;
    const updatedProduct = await request.json();

    if (!updatedProduct) {
      return NextResponse.json({ message: 'No se proporcionaron datos para actualizar' }, { status: 400 });
    }

    const formattedProduct = {
      ...updatedProduct,
      diseños: Array.isArray(updatedProduct.diseños) ? updatedProduct.diseños : [],
      img2: Array.isArray(updatedProduct.img2) ? updatedProduct.img2 : []
    };

    const { data, error } = await supabase
      .from('Product')
      .update(formattedProduct)
      .eq('código', code)
      .select()
      .single();

    if (error) throw error;

    const response = NextResponse.json(
      { message: 'Producto actualizado exitosamente', product: data }
    );
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return response;
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { error } = await supabase
      .from('Product')
      .delete()
      .eq('código', params.code);

    if (error) throw error;

    const response = NextResponse.json({ message: 'Producto eliminado exitosamente' });
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return response;
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function OPTIONS() {
  const response = NextResponse.json({});
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return response;
}