"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "./services/api";
import StudentList from "./components/StudentList";
import StudentForm from "./components/StudentForm";
import DeleteModal from "./components/DeleteModal";
import Toast from "./components/Toast";

export default function Home() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [deletingStudent, setDeletingStudent] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toast, setToast] = useState(null);

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllStudents();
      setStudents(data);
    } catch (err) {
      setToast({ message: "Failed to load students", type: "error" });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  async function handleCreate(data) {
    try {
      await createStudent(data);
      setToast({ message: "Student added successfully", type: "success" });
      setShowForm(false);
      await fetchStudents();
    } catch (err) {
      const msg =
        err.response?.data?.error ||
        err.response?.data?.errors?.[0]?.msg ||
        "Failed to add student";
      setToast({ message: msg, type: "error" });
    }
  }

  async function handleUpdate(data) {
    try {
      await updateStudent(editingStudent.id, data);
      setToast({ message: "Student updated successfully", type: "success" });
      setEditingStudent(null);
      setShowForm(false);
      await fetchStudents();
    } catch (err) {
      const msg =
        err.response?.data?.error ||
        err.response?.data?.errors?.[0]?.msg ||
        "Failed to update student";
      setToast({ message: msg, type: "error" });
    }
  }

  function handleEdit(student) {
    setEditingStudent(student);
    setShowForm(true);
  }

  function handleCancelForm() {
    setShowForm(false);
    setEditingStudent(null);
  }

  async function handleConfirmDelete() {
    setIsDeleting(true);
    try {
      await deleteStudent(deletingStudent.id);
      setToast({ message: "Student deleted successfully", type: "success" });
      setDeletingStudent(null);
      await fetchStudents();
    } catch (err) {
      setToast({ message: "Failed to delete student", type: "error" });
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <main className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Student Management
        </h1>
        <p className="text-gray-500 mt-1">
          Manage your students database
        </p>
      </div>

      {/* Stats bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm px-5 py-3 inline-flex items-center gap-2">
          <span className="text-sm text-gray-500">Total students:</span>
          <span className="text-lg font-semibold text-blue-600">
            {loading ? "..." : students.length}
          </span>
        </div>
        {!showForm && (
          <button
            onClick={() => {
              setEditingStudent(null);
              setShowForm(true);
            }}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
          >
            <span className="text-lg leading-none">+</span> Add Student
          </button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <div className="mb-6">
          <StudentForm
            student={editingStudent}
            onSubmit={editingStudent ? handleUpdate : handleCreate}
            onCancel={handleCancelForm}
          />
        </div>
      )}

      {/* Student list */}
      <StudentList
        students={students}
        loading={loading}
        onEdit={handleEdit}
        onDelete={(s) => setDeletingStudent(s)}
      />

      {/* Delete confirmation modal */}
      <DeleteModal
        student={deletingStudent}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingStudent(null)}
        deleting={isDeleting}
      />

      {/* Toast notifications */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </main>
  );
}
