import { NextResponse } from 'next/server';
import supabase from '../../../../../lib/supabase';

function addCORSHeaders(response) {
  response.headers.set('Access-Control-Allow-Origin', 'https://panasa-demo.orange-360.com');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return response;
}

export async function DELETE(request, { params }) {
  try {
    // Wait for params to be resolved
    const type = await params.type;
    const id = await params.id;

    console.log('DELETE Request params:', { type, id });
    
    // Convert type to proper case for table name
    const tableName = type.charAt(0).toUpperCase() + type.slice(1);
    console.log('Attempting to delete from table:', tableName);

    const { error } = await supabase
      .from(tableName)
      .delete()
      .eq('id', parseInt(id))
      .select();

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    return addCORSHeaders(
      NextResponse.json({ 
        message: 'Formulario eliminado exitosamente',
        deletedId: id 
      })
    );
  } catch (error) {
    console.error('Error completo al eliminar:', error);
    return addCORSHeaders(
      NextResponse.json(
        { 
          message: 'Error al eliminar el formulario',
          error: error.message 
        },
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