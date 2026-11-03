import Link from "next/link";

export default function DocsPage() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-purple-400 hover:text-purple-300 mb-8 inline-block">&larr; Volver al inicio</Link>
        
        <h1 className="text-4xl font-extrabold mb-6">Documentación Rápida</h1>
        
        <div className="space-y-6 text-gray-300">
          <section>
            <h2 className="text-2xl font-bold text-white mb-2">¿Qué es Monolith Dashboard?</h2>
            <p>Es una herramienta web que analiza tu código de Node.js (Express/Fastify) y extrae todas las rutas de tu API para generar documentación y tests automáticamente.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-2">¿Cómo usarlo?</h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>Ve a la sección <strong>Analizar</strong>.</li>
              <li>Pega tu código en el editor, sube un archivo <code>.js</code> o pega un enlace de GitHub.</li>
              <li>Haz clic en <strong>Analizar Código</strong>.</li>
              <li>Descarga el <code>swagger.json</code> o el archivo de tests generado.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-2">¿Necesitas más poder?</h2>
            <p>El Dashboard es gratuito y siempre lo será. Si necesitas generar Dockerfiles, modelos de base de datos o SDKs de TypeScript, necesitas el código fuente de <strong>Monolith-Core PRO</strong>.</p>
            <Link href="/pricing" className="inline-block mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
              Ver Planes
            </Link>
          </section>
        </div>
      </div>
    </main>
  );
}