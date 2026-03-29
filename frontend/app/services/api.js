import axios from "axios";

const rawBaseUrl =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
const normalizedBaseUrl = rawBaseUrl.replace(/\/$/, "");

const api = axios.create({
  baseURL: normalizedBaseUrl,
  headers: { "Content-Type": "application/json" },
});

export async function getAllStudents(page = 1, limit = 50) {
  const res = await api.get("/students", { params: { page, limit } });
  return res.data;
}

export async function getStudent(id) {
  const res = await api.get(`/students/${id}`);
  return res.data;
}

export async function createStudent(data) {
  const res = await api.post("/students", data);
  return res.data;
}

export async function updateStudent(id, data) {
  const res = await api.put(`/students/${id}`, data);
  return res.data;
}

export async function deleteStudent(id) {
  await api.delete(`/students/${id}`);
}
