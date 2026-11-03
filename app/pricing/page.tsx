import Link from "next/link";

export default function PricingPage() {
  return (
    <main className="min-h-screen p-8 flex flex-col items-center">
      <div className="max-w-5xl w-full text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-4">Elige tu Plan</h1>
        <p className="text-gray-400 text-lg">Empieza gratis con el Dashboard. Compra el código fuente cuando necesites más poder.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        
        {/* Plan Gratis */}
        <div className="bg-[#111] border border-gray-800 rounded-2xl p-8 flex flex-col">
          <h2 className="text-2xl font-bold mb-2">Starter</h2>
          <p className="text-gray-400 mb-6">Para proyectos personales en la web.</p>
          <div className="text-4xl font-extrabold mb-6">$0<span className="text-lg text-gray-500 font-normal">/siempre</span></div>
          
          <ul className="space-y-3 mb-8 flex-grow text-sm text-gray-300">
            <li>✅ Usa el Dashboard web gratis</li>
            <li>✅ Analiza tu código en el navegador</li>
            <li>✅ Generación de Swagger básico</li>
            <li>✅ Generación de Tests básicos</li>
            <li className="text-gray-600">❌ Acceso al código fuente del framework</li>
            <li className="text-gray-600">❌ Comandos avanzados de terminal (Docker, BD, etc.)</li>
          </ul>

          <Link href="/analyze" className="w-full text-center bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 rounded-lg transition-colors">
            Ir al Dashboard
          </Link>
        </div>

        {/* Plan PRO */}
        <div className="bg-[#111] border border-purple-500/50 rounded-2xl p-8 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">CÓDIGO FUENTE</div>
          
          <h2 className="text-2xl font-bold mb-2 text-purple-400">Monolith-Core PRO</h2>
          <p className="text-gray-400 mb-6">El framework para usar en tu propia PC.</p>
          <div className="text-4xl font-extrabold mb-6">$29<span className="text-lg text-gray-500 font-normal">/único pago</span></div>
          
          <ul className="space-y-3 mb-8 flex-grow text-sm text-gray-300">
            <li>✅ <strong>Descarga el código fuente</strong> del framework</li>
            <li>✅ Úsalo en tu terminal (npx monolith-core)</li>
            <li>✅ Generación de Dockerfile y CI/CD</li>
            <li>✅ Generación de Modelos de BD</li>
            <li>✅ SDK de TypeScript para Frontend</li>
            <li>✅ Diagramas visuales y Escáner de Seguridad</li>
            <li className="text-xs text-gray-500 mt-2">*(El Dashboard web sigue siendo gratuito, esto es un producto aparte)*</li>
          </ul>

          <a href="TU_LINK_GUMROAD_MONOLITH" target="_blank" className="w-full text-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition-colors shadow-lg shadow-purple-500/20">
            Comprar Código Fuente en Gumroad
          </a>
        </div>

      </div>
    </main>
  );
}