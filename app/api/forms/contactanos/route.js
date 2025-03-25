// ruta: app/api/forms/contactanos/route.js
import { NextResponse } from 'next/server';
import supabase from '../../../../lib/supabase';

function addCORSHeaders(response) {
  response.headers.set('Access-Control-Allow-Origin', 'https://panasa-demo.orange-360.com');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Origin');
  response.headers.set('Content-Type', 'application/json'); // Añadir esta línea
  return response;
}

export async function POST(request) {
  if (request.method === 'OPTIONS') {
    return handleOptions();
  }

  try {
    const newForm = await request.json();
    
    // Solo validar campos obligatorios
    if (!newForm || !newForm.nombre || !newForm.telefono || !newForm.mensaje) {
      return addCORSHeaders(
        NextResponse.json(
          { message: 'Faltan campos requeridos (nombre, teléfono y mensaje son obligatorios)' },
          { status: 400 }
        )
      );
    }

    const { data: form, error } = await supabase
      .from('Contactanos')
      .insert([{
        nombre: newForm.nombre,
        apellido: newForm.apellido ?? null, // Usar null si no existe
        telefono: newForm.telefono,
        correo: newForm.correo ?? null, // Usar null si no existe
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
      .from('Contactanos')
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
  return addCORSHeaders(
    NextResponse.json({}, { status: 200 })
  );
}

export async function DELETE(request, { params }) {
  try {
    const { error } = await supabase
      .from('Contactanos')
      .delete()
      .eq('id', parseInt(params.id));

    if (error) throw error;

    return addCORSHeaders(
      NextResponse.json({ message: 'Formulario eliminado exitosamente' })
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