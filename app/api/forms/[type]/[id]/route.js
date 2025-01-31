import { NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma';

export async function DELETE(request, { params }) {
  const { type, id } = params;
  
  try {
    let result;
    switch (type) {
      case 'contactanos':
        result = await prisma.contactanos.delete({
          where: { id: parseInt(id) }
        });
        break;
      case 'cotizaAqui':
        result = await prisma.cotizaAqui.delete({
          where: { id: parseInt(id) }
        });
        break;
      case 'reclamaAqui':
        result = await prisma.reclamaAqui.delete({
          where: { id: parseInt(id) }
        });
        break;
      default:
        return NextResponse.json(
          { message: 'Tipo de formulario no válido' },
          { status: 400 }
        );
    }

    const serializedResult = {
      ...result,
      id: result.id.toString(),
      createdAt: result.createdAt.toISOString()
    };

    return NextResponse.json({ 
      message: 'Formulario eliminado correctamente',
      result: serializedResult  
    });
  } catch (error) {
    console.error('Error al eliminar:', error);
    return NextResponse.json(
      { message: 'Error al eliminar el formulario' },
      { status: 500 }
    );
  }
}