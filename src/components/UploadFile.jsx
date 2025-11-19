import { useState } from "react";
import { uploadFile } from "../services/driveService";

export default function UploadFile() {
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Selecciona un archivo");
    try {
      await uploadFile(file);
      alert("Archivo subido con éxito");
      setFile(null);
    } catch (error) {
      alert("Error al subir archivo");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button type="submit">Subir archivo</button>
    </form>
  );
}
