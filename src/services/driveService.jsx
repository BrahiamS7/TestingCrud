import axios from "axios";

const API_URL = "https://testingprotheger.onrender.com/api";


// Crear carpeta
export const createFolder = async (cedula) => {
  const res = await axios.post(`${API_URL}/folder/${cedula}`);
  return res.data;
};

// Subir archivo
export const uploadFile = async (folderId, file) => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await axios.post(`${API_URL}/upload/${folderId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// Listar archivos
export const listFiles = async (folderId) => {
  const res = await fetch(`${API_URL}/list/${folderId}`);
  return await res.json();
};

// Eliminar archivo
export const deleteFile = async (fileId) => {
  const res = await axios.delete(`${API_URL}/delete/${fileId}`);
  return res.data;
};

// Buscar carpeta por cédula
export const findFolderByCedula = async (cedula) => {
  const res = await axios.get(`${API_URL}/folder/${cedula}`);
  return res.data;
};