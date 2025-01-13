'use client';

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ContactanosForm() {
  const [form, setForm] = useState({
    nombre: '',
    telefono: '',
    mensaje: '',
    apellido: '',
    correo: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/forms/contactanos', {
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
      <Input name="telefono" placeholder="Teléfono" onChange={handleChange} value={form.telefono} />
      <textarea name="mensaje" placeholder="Mensaje" onChange={handleChange} value={form.mensaje}></textarea>
      <Input name="apellido" placeholder="Apellido" onChange={handleChange} value={form.apellido} />
      <Input name="correo" placeholder="Correo" onChange={handleChange} value={form.correo} />
      <Button type="submit">Enviar</Button>
    </form>
  );
}