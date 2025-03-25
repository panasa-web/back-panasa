import { NextResponse } from 'next/server';
import supabase from '../../../../lib/supabase';

function addCORSHeaders(response) {
  response.headers.set('Access-Control-Allow-Origin', 'https://panasa-demo.orange-360.com');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Origin, Accept');
  response.headers.set('Content-Type', 'application/json'); // Añadido
  return response;
}

export async function POST(request) {
  console.log('Recibiendo solicitud POST');
  
  if (request.method === 'OPTIONS') {
    return handleOptions();
  }

  try {
    const newForm = await request.json();
    console.log('Datos recibidos:', newForm);
    
    if (!newForm || !newForm.nombre || !newForm.apellido || !newForm.ruc || !newForm.telefono || !newForm.mensaje) {
      return addCORSHeaders(
        NextResponse.json(
          { message: 'Faltan campos requeridos' },
          { status: 400 }
        )
      );
    }

    const { data: form, error } = await supabase
      .from('ReclamaAqui')
      .insert([{
        nombre: newForm.nombre,
        apellido: newForm.apellido,
        ruc: newForm.ruc,
        telefono: newForm.telefono,
        mensaje: newForm.mensaje
      }])
      .select()
      .single();

    if (error) throw error;

    const serializedForm = {
      ...form,
      id: form.id.toString(),
      createdAt: new Date(form.createdAt).toISOString()
    };

    return addCORSHeaders(
      NextResponse.json(
        {
          success: true,
          message: 'Formulario enviado exitosamente',
          form: serializedForm
        },
        { status: 201 }
      )
    );
  } catch (error) {
    console.error('Error al procesar:', error);
    return addCORSHeaders(
      NextResponse.json(
        {
          success: false,
          message: 'Error al enviar el formulario',
          error: error.message
        },
        { status: 500 }
      )
    );
  }
}

export async function GET() {
  try {
    const { data: forms, error } = await supabase
      .from('ReclamaAqui')
      .select('*')
      .order('createdAt', { ascending: false });

    if (error) throw error;

    const serializedForms = forms.map(form => ({
      ...form,
      id: form.id.toString(),
      createdAt: new Date(form.createdAt).toISOString()
    }));

    return addCORSHeaders(NextResponse.json(serializedForms));
  } catch (error) {
    console.error('Error al obtener los formularios:', error);
    return addCORSHeaders(
      NextResponse.json(
        { message: 'Error al obtener los formularios' },
        { status: 500 }
      )
    );
  }
}

export async function OPTIONS() {
  const response = NextResponse.json({});
  response.headers.set('Access-Control-Allow-Origin', 'https://panasa-demo.orange-360.com');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return response;
}

function handleOptions() {
  return addCORSHeaders(
    NextResponse.json({}, { status: 200 })
  );
}
