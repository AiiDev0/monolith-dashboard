import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-purple-400 hover:text-purple-300 mb-8 inline-block">&larr; Volver al inicio</Link>
        
        <h1 className="text-4xl font-extrabold mb-6">Aviso de Privacidad</h1>
        <div className="space-y-4 text-gray-300">
          <p>Este sitio web (Monolith Dashboard) no utiliza cookies de rastreo ni recolecta información personal de los visitantes.</p>
          <p>El código que pegas o subes es procesado localmente en tu navegador o en el servidor de la aplicación, pero <strong>no se almacena</strong> en ninguna base de datos. Tu propiedad intelectual está segura.</p>
          <p>Los enlaces a Gumroad y Discord se rigen por sus propias políticas de privacidad.</p>
        </div>
      </div>
    </main>
  );
}