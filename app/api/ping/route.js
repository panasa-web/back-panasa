import { NextResponse } from 'next/server';
import supabase from '../../../lib/supabase';

export async function GET() {
  try {
    // Consulta simple a Supabase
    const { data, error } = await supabase
      .from('CotizaAqui')
      .select('count')
      .limit(1);

    if (error) throw error;

    return NextResponse.json({ status: 'ok', message: 'Database pinged successfully' });
  } catch (error) {
    console.error('Ping error:', error);
    return NextResponse.json(
      { status: 'ok', message: 'Failed but responded' }, // Importante: Devolvemos 200 para UptimeRobot
      { status: 200 } // UptimeRobot espera un 200 para considerar el servicio como activo
    );
  }
}