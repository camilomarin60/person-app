import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Sistema de Gestión de Personas
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Administra personas, estudiantes y profesores de manera eficiente
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        <Link
          href="/persons"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 border border-gray-200"
        >
          <div className="text-center">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Personas
            </h3>
            <p className="text-gray-600 text-sm">
              Gestiona la información básica de las personas
            </p>
          </div>
        </Link>

        <Link
          href="/students"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 border border-gray-200"
        >
          <div className="text-center">
            <div className="text-4xl mb-4">🎓</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Estudiantes
            </h3>
            <p className="text-gray-600 text-sm">
              Administra estudiantes y sus calificaciones
            </p>
          </div>
        </Link>

        <Link
          href="/professors"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 border border-gray-200"
        >
          <div className="text-center">
            <div className="text-4xl mb-4">👨‍🏫</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Profesores
            </h3>
            <p className="text-gray-600 text-sm">
              Gestiona la información de los profesores
            </p>
          </div>
        </Link>

        <Link
          href="/addresses"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 border border-gray-200"
        >
          <div className="text-center">
            <div className="text-4xl mb-4">📍</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Direcciones
            </h3>
            <p className="text-gray-600 text-sm">
              Administra las direcciones de las personas
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
