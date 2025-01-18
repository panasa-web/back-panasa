import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

function addCORSHeaders(response) {
  response.headers.set('Access-Control-Allow-Origin', 'https://panasa-demo.orange-360.com');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return response;
}

export async function POST(request) {
  if (request.method === 'OPTIONS') {
    return handleOptions();
  }

  try {
    const newForm = await request.json();
    
    if (!newForm || !newForm.nombre || !newForm.apellido || !newForm.ruc || !newForm.telefono || !newForm.mensaje) {
      return addCORSHeaders(
        NextResponse.json(
          { message: 'Faltan campos requeridos' },
          { status: 400 }
        )
      );
    }

    const form = await prisma.reclamaAqui.create({
      data: {
        nombre: newForm.nombre,
        apellido: newForm.apellido,
        ruc: newForm.ruc,
        telefono: newForm.telefono,
        mensaje: newForm.mensaje
      }
    });

    return addCORSHeaders(
      NextResponse.json(
        { message: 'Formulario enviado exitosamente', form },
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
    const forms = await prisma.reclamaAqui.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return addCORSHeaders(NextResponse.json(forms));
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

function handleOptions() {
  return addCORSHeaders(
    NextResponse.json({}, { status: 200 })
  );
}

