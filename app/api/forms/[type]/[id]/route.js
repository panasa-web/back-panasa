import { NextResponse } from 'next/server';
import supabase from '../../../../../lib/supabase';

function addCORSHeaders(response) {
  response.headers.set('Access-Control-Allow-Origin', 'https://panasa-demo.orange-360.com');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return response;
}

export async function DELETE(request, { params }) {
  const { type, id } = params;
  
  try {
    let { data: result, error } = await supabase
      .from(type)
      .delete()
      .eq('id', parseInt(id))
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return addCORSHeaders(
          NextResponse.json(
            { message: 'Tipo de formulario no válido' },
            { status: 400 }
          )
        );
      }
      throw error;
    }

    const serializedResult = {
      ...result,
      id: result.id.toString(),
      createdAt: new Date(result.createdAt).toISOString()
    };

    return addCORSHeaders(
      NextResponse.json({ 
        message: 'Formulario eliminado correctamente',
        result: serializedResult
      })
    );
  } catch (error) {
    console.error('Error al eliminar:', error);
    return addCORSHeaders(
      NextResponse.json(
        { message: 'Error al eliminar el formulario' },
        { status: 500 }
      )
    );
  }
}

export async function OPTIONS() {
  return addCORSHeaders(
    NextResponse.json({}, { status: 200 })
  );
}