import { useState } from "react";
import {
  createFolder,
  uploadFile,
  listFiles,
  deleteFile,
  findFolderByCedula,
} from "./services/driveService";

function App() {
  const [cedula, setCedula] = useState("");
  const [folderId, setFolderId] = useState("");
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState(""); // 👈 mensaje dinámico
  const [messageColor, setMessageColor] = useState("black");

  // --- Crear carpeta ---
  const handleCreateFolder = async () => {
    if (!cedula.trim()) {
      setMessage("⚠️ Ingresa una cédula antes de crear la carpeta.");
      setMessageColor("orange");
      return;
    }

    try {
      const res = await createFolder(cedula);

      if (res.message === "Carpeta ya existente") {
        setMessage("⚠️ Esta cédula ya tiene una carpeta creada.");
        setMessageColor("orange");
      } else if (res.message === "Carpeta creada exitosamente") {
        setMessage("✅ Carpeta creada con éxito.");
        setMessageColor("green");
      }

      setFolderId(res.folderId);

      // borrar mensaje después de 4 segundos
      setTimeout(() => setMessage(""), 4000);
    } catch (err) {
      setMessage("❌ Error al crear carpeta.");
      setMessageColor("red");
      console.error(err);
    }
  };

  // --- Buscar carpeta ---
  const handleFindFolder = async () => {
    if (!cedula.trim()) {
      setMessage("⚠️ Ingresa una cédula para buscar.");
      setMessageColor("orange");
      return;
    }

    try {
      const res = await findFolderByCedula(cedula);

      // Guardar el ID de la carpeta
      setFolderId(res.folderId);

      // Mostrar mensaje de éxito
      setMessage(`✅ Carpeta encontrada: ${res.name}`);
      setMessageColor("green");

      // 🔥 NUEVO: listar automáticamente los archivos
      const filesList = await listFiles(res.folderId);
      setFiles(filesList);

      setTimeout(() => setMessage(""), 4000);
    } catch (err) {
      setMessage("❌ Carpeta no encontrada.");
      setMessageColor("red");
      console.error(err);
    }
  };

  // --- Subir archivo ---
  const handleUploadFile = async () => {
    if (!folderId || !file) {
      setMessage("⚠️ Selecciona una carpeta y un archivo primero.");
      setMessageColor("orange");
      return;
    }

    try {
      await uploadFile(folderId, file);
      setMessage("✅ Archivo subido correctamente.");
      setMessageColor("green");
      setTimeout(() => setMessage(""), 4000);
    } catch (err) {
      setMessage("❌ Error al subir archivo.");
      setMessageColor("red");
      console.error(err);
    }
  };

  // --- Listar archivos ---
  const handleListFiles = async () => {
    if (!folderId) {
      setMessage("⚠️ Ingresa un folderId primero.");
      setMessageColor("orange");
      return;
    }

    try {
      const filesList = await listFiles(folderId);
      setFiles(filesList);
      setMessage("✅ Archivos listados correctamente.");
      setMessageColor("green");
      setTimeout(() => setMessage(""), 4000);
    } catch (err) {
      setMessage("❌ Error al listar archivos.");
      setMessageColor("red");
      console.error(err);
    }
  };

  // --- Eliminar archivo ---
  const handleDeleteFile = async (fileId) => {
    if (!window.confirm("¿Seguro que deseas eliminar este archivo?")) return;

    try {
      await deleteFile(fileId);
      setMessage("✅ Archivo eliminado correctamente.");
      setMessageColor("green");
      handleListFiles();
      setTimeout(() => setMessage(""), 4000);
    } catch (err) {
      setMessage("❌ Error al eliminar archivo.");
      setMessageColor("red");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>📁 Gestor de Google Drive</h1>

      {/* --- Crear o buscar carpeta --- */}
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Cédula"
          value={cedula}
          onChange={(e) => setCedula(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleFindFolder()} // 🔥 nuevo
          style={{ marginRight: "0.5rem" }}
        />
        <button onClick={handleCreateFolder}>Crear Carpeta</button>
        <button style={{ marginLeft: "0.5rem" }} onClick={handleFindFolder}>
          Buscar Carpeta
        </button>
      </div>

      {/* --- Mensaje dinámico --- */}
      {message && (
        <p style={{ color: messageColor, fontWeight: "bold" }}>{message}</p>
      )}

      {/* --- Subir archivo --- */}
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Folder ID"
          value={folderId}
          onChange={(e) => setFolderId(e.target.value)}
          style={{ marginRight: "0.5rem" }}
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          style={{ marginRight: "0.5rem" }}
        />
        <button onClick={handleUploadFile}>Subir Archivo</button>
      </div>

      {/* --- Listar archivos --- */}
      <div style={{ marginBottom: "1rem" }}>
        <button onClick={handleListFiles}>Listar Archivos</button>
      </div>

      {/* --- Mostrar archivos --- */}
      {files.length > 0 && (
        <ul>
          {files.map((f) => (
            <li key={f.id}>
              {f.name}

              {/* 🟢 Botón para descargar */}
              <button
                style={{
                  marginLeft: "1rem",
                  color: "white",
                  background: "green",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={() =>
                  window.open(`http://localhost:4000/api/download/${f.id}`)
                }
              >
                ⬇️ Descargar
              </button>

              {/* 🔴 Botón para eliminar */}
              <button
                style={{
                  marginLeft: "1rem",
                  color: "white",
                  background: "red",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={() => handleDeleteFile(f.id)}
              >
                🗑️ Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
