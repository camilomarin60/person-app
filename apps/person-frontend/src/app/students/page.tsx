"use client";

import { useState, useEffect } from "react";
import { Student } from "@/types";
import { apiService } from "@/services/api";
import StudentCard from "@/components/StudentCard";
import StudentForm from "@/components/StudentForm";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getStudents();
      setStudents(data);
    } catch (err) {
      setError("Error al cargar los estudiantes");
      console.error("Error loading students:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateStudent = async (student: Student) => {
    try {
      await apiService.createStudent(student);
      await loadStudents();
      setShowForm(false);
    } catch (err) {
      setError("Error al crear el estudiante");
      console.error("Error creating student:", err);
    }
  };

  const handleUpdateStudent = async (id: number, student: Student) => {
    try {
      await apiService.updateStudent(id, student);
      await loadStudents();
      setEditingStudent(null);
    } catch (err) {
      setError("Error al actualizar el estudiante");
      console.error("Error updating student:", err);
    }
  };

  const handleDeleteStudent = async (id: number) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este estudiante?")) {
      return;
    }

    try {
      await apiService.deleteStudent(id);
      await loadStudents();
    } catch (err) {
      setError("Error al eliminar el estudiante");
      console.error("Error deleting student:", err);
    }
  };

  const filteredStudents = students.filter(
    (student) =>
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Estudiantes</h1>
          <p className="text-gray-600 mt-2">
            Gestiona la información de los estudiantes y sus calificaciones
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
        >
          + Nuevo Estudiante
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar estudiantes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      {filteredStudents.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎓</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {searchTerm
              ? "No se encontraron estudiantes"
              : "No hay estudiantes registrados"}
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm
              ? "Intenta con otros términos de búsqueda"
              : "Comienza agregando un nuevo estudiante al sistema"}
          </p>
          {!searchTerm && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Agregar Primer Estudiante
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              onEdit={setEditingStudent}
              onDelete={handleDeleteStudent}
            />
          ))}
        </div>
      )}

      {showForm && (
        <StudentForm
          student={null}
          onSubmit={handleCreateStudent}
          onCancel={() => setShowForm(false)}
        />
      )}

      {editingStudent && (
        <StudentForm
          student={editingStudent}
          onSubmit={(student) =>
            handleUpdateStudent(editingStudent.id!, student)
          }
          onCancel={() => setEditingStudent(null)}
        />
      )}
    </div>
  );
}
