"use client";

import { Student } from "@/types";

interface StudentCardProps {
  student: Student;
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
}

const StudentCard = ({ student, onEdit, onDelete }: StudentCardProps) => {
  const getGradeColor = (grade?: number) => {
    if (!grade) return "bg-gray-100 text-gray-800";
    if (grade >= 4.0) return "bg-green-100 text-green-800";
    if (grade >= 3.0) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const getEligibilityColor = (eligible?: boolean) => {
    if (eligible === undefined) return "bg-gray-100 text-gray-800";
    return eligible ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">
            {student.firstName} {student.lastName}
          </h3>
          <p className="text-gray-600 text-sm">{student.email}</p>
          <p className="text-blue-600 text-sm font-medium">
            #{student.studentNumber}
          </p>
          {student.age && (
            <p className="text-gray-500 text-sm">Edad: {student.age} años</p>
          )}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(student)}
            className="text-blue-600 hover:text-blue-800 p-1"
            title="Editar"
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete(student.id!)}
            className="text-red-600 hover:text-red-800 p-1"
            title="Eliminar"
          >
            🗑️
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {student.averageMark !== undefined && (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Promedio:</span>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getGradeColor(
                student.averageMark
              )}`}
            >
              {student.averageMark.toFixed(1)}
            </span>
          </div>
        )}

        {student.isEligibleToEnroll !== undefined && (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Elegible:</span>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEligibilityColor(
                student.isEligibleToEnroll
              )}`}
            >
              {student.isEligibleToEnroll ? "Sí" : "No"}
            </span>
          </div>
        )}
      </div>

      {student.address && (
        <div className="border-t border-gray-200 pt-4 mt-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Dirección:</h4>
          <p className="text-sm text-gray-600">
            {student.address.street}, {student.address.city}
            {student.address.state && `, ${student.address.state}`}
          </p>
          <p className="text-sm text-gray-600">
            {student.address.postalCode}, {student.address.country}
          </p>
        </div>
      )}

      {student.purchaseParkingPass && (
        <div className="mt-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            🅿️ Pase de Estacionamiento
          </span>
        </div>
      )}
    </div>
  );
};

export default StudentCard;
