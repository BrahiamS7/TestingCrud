import { useState } from "react";
import { createFolder } from "../services/driveService";

export default function CreateFolder() {
  const [cedula, setCedula] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createFolder(cedula);
      alert("Carpeta creada con éxito");
      setCedula("");
    } catch (error) {
      alert("Error al crear carpeta");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={cedula}
        onChange={(e) => setCedula(e.target.value)}
        placeholder="Cédula del usuario"
        required
      />
      <button type="submit">Crear carpeta</button>
    </form>
  );
}
