'use client';

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CotizaAquiForm() {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    cargo: '',
    empresa: '',
    ruc: '',
    industria: '',
    pais: '',
    ciudad: '',
    telefono: '',
    correo: '',
    mensaje: '',
    preferencia: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/forms/cotizaAqui', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        alert('Formulario enviado exitosamente');
      } else {
        alert('Error al enviar el formulario');
      }
    } catch (error) {
      alert('Error al enviar el formulario');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input name="nombre" placeholder="Nombre" onChange={handleChange} value={form.nombre} />
      <Input name="apellido" placeholder="Apellido" onChange={handleChange} value={form.apellido} />
      <Input name="cargo" placeholder="Cargo" onChange={handleChange} value={form.cargo} />
      <Input name="empresa" placeholder="Empresa" onChange={handleChange} value={form.empresa} />
      <Input name="ruc" placeholder="RUC / DNI / CE / PAS" onChange={handleChange} value={form.ruc} />
      <Input name="industria" placeholder="Rubro" onChange={handleChange} value={form.industria} />
      <Input name="pais" placeholder="País" onChange={handleChange} value={form.pais} />
      <Input name="ciudad" placeholder="Ciudad" onChange={handleChange} value={form.ciudad} />
      <Input name="telefono" placeholder="Teléfono" onChange={handleChange} value={form.telefono} />
      <Input name="correo" placeholder="Correo electrónico" onChange={handleChange} value={form.correo} />
      <textarea name="mensaje" placeholder="Solicitud" onChange={handleChange} value={form.mensaje}></textarea>
      <div>
        <p>Formas de preferencia de contacto:</p>
        <label>
          <input type="radio" name="preferencia" value="telefono" onChange={handleChange} /> Teléfono
        </label>
        <label>
          <input type="radio" name="preferencia" value="correo" onChange={handleChange} /> Correo
        </label>
      </div>
      <Button type="submit">Enviar</Button>
    </form>
  );
}