"use client";

import { useState, useEffect } from "react";
import { Person } from "@/types";
import { apiService } from "@/services/api";
import PersonCard from "@/components/PersonCard";
import PersonForm from "@/components/PersonForm";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function PersonsPage() {
  const [persons, setPersons] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingPerson, setEditingPerson] = useState<Person | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadPersons();
  }, []);

  const loadPersons = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getPersons();
      setPersons(data);
    } catch (err) {
      setError("Error al cargar las personas");
      console.error("Error loading persons:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePerson = async (person: Person) => {
    try {
      await apiService.createPerson(person);
      await loadPersons();
      setShowForm(false);
    } catch (err) {
      setError("Error al crear la persona");
      console.error("Error creating person:", err);
    }
  };

  const handleUpdatePerson = async (id: number, person: Person) => {
    try {
      await apiService.updatePerson(id, person);
      await loadPersons();
      setEditingPerson(null);
    } catch (err) {
      setError("Error al actualizar la persona");
      console.error("Error updating person:", err);
    }
  };

  const handleDeletePerson = async (id: number) => {
    if (!confirm("¿Estás seguro de que quieres eliminar esta persona?")) {
      return;
    }

    try {
      await apiService.deletePerson(id);
      await loadPersons();
    } catch (err) {
      setError("Error al eliminar la persona");
      console.error("Error deleting person:", err);
    }
  };

  const filteredPersons = persons.filter(
    (person) =>
      person.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Personas</h1>
          <p className="text-gray-600 mt-2">
            Gestiona la información de las personas en el sistema
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
        >
          + Nueva Persona
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
          placeholder="Buscar personas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {filteredPersons.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">👥</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {searchTerm
              ? "No se encontraron personas"
              : "No hay personas registradas"}
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm
              ? "Intenta con otros términos de búsqueda"
              : "Comienza agregando una nueva persona al sistema"}
          </p>
          {!searchTerm && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Agregar Primera Persona
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPersons.map((person) => (
            <PersonCard
              key={person.id}
              person={person}
              onEdit={setEditingPerson}
              onDelete={handleDeletePerson}
            />
          ))}
        </div>
      )}

      {showForm && (
        <PersonForm
          person={null}
          onSubmit={handleCreatePerson}
          onCancel={() => setShowForm(false)}
        />
      )}

      {editingPerson && (
        <PersonForm
          person={editingPerson}
          onSubmit={(person) => handleUpdatePerson(editingPerson.id!, person)}
          onCancel={() => setEditingPerson(null)}
        />
      )}
    </div>
  );
}
