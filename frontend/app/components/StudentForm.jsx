"use client";

import { useState, useEffect } from "react";

const emptyForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  enrollmentDate: "",
};

export default function StudentForm({ student, onSubmit, onCancel }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const isEdit = Boolean(student);

  useEffect(() => {
    if (student) {
      setForm({
        firstName: student.firstName || "",
        lastName: student.lastName || "",
        email: student.email || "",
        phone: student.phone || "",
        enrollmentDate: student.enrollmentDate
          ? student.enrollmentDate.slice(0, 10)
          : "",
      });
    } else {
      setForm(emptyForm);
    }
    setErrors({});
  }, [student]);

  function validate() {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = "First name is required";
    else if (form.firstName.length > 100)
      errs.firstName = "Max 100 characters";

    if (!form.lastName.trim()) errs.lastName = "Last name is required";
    else if (form.lastName.length > 100) errs.lastName = "Max 100 characters";

    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Invalid email format";

    if (!form.phone.trim()) errs.phone = "Phone is required";
    else if (form.phone.length > 20) errs.phone = "Max 20 characters";

    if (!form.enrollmentDate)
      errs.enrollmentDate = "Enrollment date is required";

    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      await onSubmit({
        ...form,
        enrollmentDate: new Date(form.enrollmentDate).toISOString(),
      });
    } finally {
      setSubmitting(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  const fields = [
    { name: "firstName", label: "First Name", type: "text", placeholder: "John" },
    { name: "lastName", label: "Last Name", type: "text", placeholder: "Doe" },
    { name: "email", label: "Email", type: "email", placeholder: "john.doe@example.com" },
    { name: "phone", label: "Phone", type: "text", placeholder: "+33 6 12 34 56 78" },
    { name: "enrollmentDate", label: "Enrollment Date", type: "date" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {isEdit ? "Edit Student" : "Add New Student"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map((f) => (
            <div key={f.name}>
              <label
                htmlFor={f.name}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {f.label} <span className="text-red-500">*</span>
              </label>
              <input
                id={f.name}
                name={f.name}
                type={f.type}
                placeholder={f.placeholder}
                value={form[f.name]}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors[f.name] ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors[f.name] && (
                <p className="mt-1 text-xs text-red-600">{errors[f.name]}</p>
              )}
            </div>
          ))}
        </div>
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {submitting
              ? "Saving..."
              : isEdit
                ? "Update Student"
                : "Add Student"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
