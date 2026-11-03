import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-3xl text-center">
        <h1 className="text-5xl font-extrabold tracking-tight mb-6">
          Documenta tu API en <span className="text-purple-500">segundos</span>.
        </h1>
        <p className="text-xl text-gray-400 mb-10">
          Monolith Dashboard analiza tu código, genera Swagger, tests y un SDK de TypeScript sin que muevas un dedo.
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <Link 
            href="/analyze" 
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Comenzar Ahora
          </Link>
          
          <Link 
            href="/pricing" 
            className="bg-transparent border border-gray-600 hover:border-gray-400 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Ver Precios
          </Link>

          <Link 
            href="/docs" 
            className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Ver Documentación
          </Link>
        </div>
      </div>
    </main>
  );
}