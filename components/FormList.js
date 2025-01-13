'use client';

import { useState, useEffect } from 'react';

export default function FormList() {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    fetch('/api/forms')
      .then(response => response.json())
      .then(data => setForms(data));
  }, []);

  return (
    <div>
      <h1>Formularios</h1>
      <ul>
        {forms.map(form => (
          <li key={form.id}>
            <p>Tipo: {form.formType}</p>
            <p>Nombre: {form.nombre}</p>
            <p>Apellido: {form.apellido}</p>
            <p>Teléfono: {form.telefono}</p>
            <p>Correo: {form.correo}</p>
            <p>Mensaje: {form.mensaje}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}