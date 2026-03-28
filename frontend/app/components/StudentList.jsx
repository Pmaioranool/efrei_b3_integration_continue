"use client";

export default function StudentList({ students, onEdit, onDelete, loading }) {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-500">
        Loading students...
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-500">
        No students found. Add one to get started.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                First Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Last Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Email
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Phone
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Enrollment Date
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {students.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-sm text-gray-500">{s.id}</td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                  {s.firstName}
                </td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                  {s.lastName}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{s.email}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{s.phone}</td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {new Date(s.enrollmentDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => onEdit(s)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(s)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden divide-y divide-gray-200">
        {students.map((s) => (
          <div key={s.id} className="p-4 space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-gray-900">
                  {s.firstName} {s.lastName}
                </p>
                <p className="text-sm text-gray-500">ID: {s.id}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(s)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(s)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <p>{s.email}</p>
              <p>{s.phone}</p>
              <p>Enrolled: {new Date(s.enrollmentDate).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
