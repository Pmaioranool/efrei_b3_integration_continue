import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
  headers: { "Content-Type": "application/json" },
});

export async function getAllStudents(page = 1, limit = 50) {
  const res = await api.get("/api/students", { params: { page, limit } });
  return res.data;
}

export async function getStudent(id) {
  const res = await api.get(`/api/students/${id}`);
  return res.data;
}

export async function createStudent(data) {
  const res = await api.post("/api/students", data);
  return res.data;
}

export async function updateStudent(id, data) {
  const res = await api.put(`/api/students/${id}`, data);
  return res.data;
}

export async function deleteStudent(id) {
  await api.delete(`/api/students/${id}`);
}
