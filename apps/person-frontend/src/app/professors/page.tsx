"use client";

import { useState, useEffect } from "react";
import { Professor } from "@/types";
import { apiService } from "@/services/api";
import ProfessorCard from "@/components/ProfessorCard";
import ProfessorForm from "@/components/ProfessorForm";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function ProfessorsPage() {
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingProfessor, setEditingProfessor] = useState<Professor | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadProfessors();
  }, []);

  const loadProfessors = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getProfessors();
      setProfessors(data);
    } catch (err) {
      setError("Error al cargar los profesores");
      console.error("Error loading professors:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProfessor = async (professor: Professor) => {
    try {
      await apiService.createProfessor(professor);
      await loadProfessors();
      setShowForm(false);
    } catch (err) {
      setError("Error al crear el profesor");
      console.error("Error creating professor:", err);
    }
  };

  const handleUpdateProfessor = async (id: number, professor: Professor) => {
    try {
      await apiService.updateProfessor(id, professor);
      await loadProfessors();
      setEditingProfessor(null);
    } catch (err) {
      setError("Error al actualizar el profesor");
      console.error("Error updating professor:", err);
    }
  };

  const handleDeleteProfessor = async (id: number) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este profesor?")) {
      return;
    }

    try {
      await apiService.deleteProfessor(id);
      await loadProfessors();
    } catch (err) {
      setError("Error al eliminar el profesor");
      console.error("Error deleting professor:", err);
    }
  };

  const filteredProfessors = professors.filter(
    (professor) =>
      professor.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      professor.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      professor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profesores</h1>
          <p className="text-gray-600 mt-2">
            Gestiona la información de los profesores y sus salarios
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
        >
          + Nuevo Profesor
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
          placeholder="Buscar profesores..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

      {filteredProfessors.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">👨‍🏫</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {searchTerm
              ? "No se encontraron profesores"
              : "No hay profesores registrados"}
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm
              ? "Intenta con otros términos de búsqueda"
              : "Comienza agregando un nuevo profesor al sistema"}
          </p>
          {!searchTerm && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Agregar Primer Profesor
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfessors.map((professor) => (
            <ProfessorCard
              key={professor.id}
              professor={professor}
              onEdit={setEditingProfessor}
              onDelete={handleDeleteProfessor}
            />
          ))}
        </div>
      )}

      {showForm && (
        <ProfessorForm
          professor={null}
          onSubmit={handleCreateProfessor}
          onCancel={() => setShowForm(false)}
        />
      )}

      {editingProfessor && (
        <ProfessorForm
          professor={editingProfessor}
          onSubmit={(professor) =>
            handleUpdateProfessor(editingProfessor.id!, professor)
          }
          onCancel={() => setEditingProfessor(null)}
        />
      )}
    </div>
  );
}
