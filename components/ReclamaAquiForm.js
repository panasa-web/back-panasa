'use client';

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ReclamaAquiForm() {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    ruc: '',
    telefono: '',
    correo: '',
    mensaje: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/forms/reclamaAqui', {
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
      <Input name="ruc" placeholder="RUC / DNI / CE / PAS" onChange={handleChange} value={form.ruc} />
      <Input name="telefono" placeholder="Teléfono" onChange={handleChange} value={form.telefono} />
      <Input name="correo" placeholder="Correo electrónico" onChange={handleChange} value={form.correo} />
      <textarea name="mensaje" placeholder="Mensaje" onChange={handleChange} value={form.mensaje}></textarea>
      <Button type="submit">Enviar</Button>
    </form>
  );
}