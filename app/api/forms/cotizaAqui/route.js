import { NextResponse } from 'next/server';
import supabase from '../../../../lib/supabase';

function addCORSHeaders(response) {
  response.headers.set('Access-Control-Allow-Origin', 'https://panasa-demo.orange-360.com');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  return response;
}

export async function POST(request) {
  if (request.method === 'OPTIONS') {
    return handleOptions();
  }

  try {
    const newForm = await request.json();
    
    if (!newForm.nombre || !newForm.apellido || !newForm.cargo || !newForm.empresa || !newForm.ruc || !newForm.industria || !newForm.pais || !newForm.ciudad || !newForm.telefono || !newForm.correo || !newForm.mensaje || !newForm.preferencia) {
      return addCORSHeaders(
        NextResponse.json(
          { message: 'Faltan campos requeridos' },
          { status: 400 }
        )
      );
    }

    const { data: form, error } = await supabase
      .from('CotizaAqui')
      .insert([{
        nombre: newForm.nombre,
        apellido: newForm.apellido,
        cargo: newForm.cargo,
        empresa: newForm.empresa,
        ruc: newForm.ruc,
        industria: newForm.industria,
        pais: newForm.pais,
        ciudad: newForm.ciudad,
        telefono: newForm.telefono,
        correo: newForm.correo,
        mensaje: newForm.mensaje,
        preferencia: newForm.preferencia,
        productos: newForm.productos || null
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
        { message: 'Formulario enviado exitosamente', form: serializedForm },
        { status: 201 }
      )
    );
  } catch (error) {
    console.error('Error al enviar el formulario:', error);
    return addCORSHeaders(
      NextResponse.json(
        { message: 'Error al enviar el formulario' },
        { status: 500 }
      )
    );
  }
}

export async function GET() {
  try {
    const { data: forms, error } = await supabase
      .from('CotizaAqui')
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
  return handleOptions();
}

function handleOptions() {
  return addCORSHeaders(
    new NextResponse(null, { status: 204 })
  );
}