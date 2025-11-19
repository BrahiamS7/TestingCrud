import { useEffect, useState } from "react";
import { listFiles, deleteFile } from "../services/driveService";

export default function FileList() {
  const [files, setFiles] = useState([]);

  const loadFiles = async () => {
    try {
      const res = await listFiles();
      setFiles(res.data.files || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadFiles();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteFile(id);
      alert("Archivo eliminado");
      loadFiles();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h3>Archivos en Google Drive</h3>
      <ul>
        {files.map((file) => (
          <li key={file.id}>
            {file.name}{" "}
            <button onClick={() => handleDelete(file.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
