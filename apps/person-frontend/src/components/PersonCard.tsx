"use client";

import { Person } from "@/types";

interface PersonCardProps {
  person: Person;
  onEdit: (person: Person) => void;
  onDelete: (id: number) => void;
}

const PersonCard = ({ person, onEdit, onDelete }: PersonCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">
            {person.firstName} {person.lastName}
          </h3>
          <p className="text-gray-600 text-sm">{person.email}</p>
          {person.age && (
            <p className="text-gray-500 text-sm">Edad: {person.age} años</p>
          )}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(person)}
            className="text-blue-600 hover:text-blue-800 p-1"
            title="Editar"
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete(person.id!)}
            className="text-red-600 hover:text-red-800 p-1"
            title="Eliminar"
          >
            🗑️
          </button>
        </div>
      </div>

      {person.address && (
        <div className="border-t border-gray-200 pt-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Dirección:</h4>
          <p className="text-sm text-gray-600">
            {person.address.street}, {person.address.city}
            {person.address.state && `, ${person.address.state}`}
          </p>
          <p className="text-sm text-gray-600">
            {person.address.postalCode}, {person.address.country}
          </p>
        </div>
      )}

      {person.purchaseParkingPass && (
        <div className="mt-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            🅿️ Pase de Estacionamiento
          </span>
        </div>
      )}
    </div>
  );
};

export default PersonCard;
