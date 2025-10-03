"use client";

import { Professor } from "@/types";

interface ProfessorCardProps {
  professor: Professor;
  onEdit: (professor: Professor) => void;
  onDelete: (id: number) => void;
}

const ProfessorCard = ({ professor, onEdit, onDelete }: ProfessorCardProps) => {
  const formatSalary = (salary: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(salary);
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">
            {professor.firstName} {professor.lastName}
          </h3>
          <p className="text-gray-600 text-sm">{professor.email}</p>
          {professor.age && (
            <p className="text-gray-500 text-sm">Edad: {professor.age} años</p>
          )}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(professor)}
            className="text-blue-600 hover:text-blue-800 p-1"
            title="Editar"
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete(professor.id!)}
            className="text-red-600 hover:text-red-800 p-1"
            title="Eliminar"
          >
            🗑️
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Salario:</span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            {formatSalary(professor.salary)}
          </span>
        </div>
      </div>

      {professor.address && (
        <div className="border-t border-gray-200 pt-4 mt-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Dirección:</h4>
          <p className="text-sm text-gray-600">
            {professor.address.street}, {professor.address.city}
            {professor.address.state && `, ${professor.address.state}`}
          </p>
          <p className="text-sm text-gray-600">
            {professor.address.postalCode}, {professor.address.country}
          </p>
        </div>
      )}

      {professor.purchaseParkingPass && (
        <div className="mt-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            🅿️ Pase de Estacionamiento
          </span>
        </div>
      )}
    </div>
  );
};

export default ProfessorCard;
