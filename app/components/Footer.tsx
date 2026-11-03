import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-8 border-t border-gray-800 bg-[#0a0a0c] mt-auto">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
        <p>&copy; 2026 Aiberson Montilla. Todos los derechos reservados.</p>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-purple-400 transition-colors">Privacidad</Link>
          <Link href="/docs" className="hover:text-purple-400 transition-colors">Documentación</Link>
        </div>
      </div>
    </footer>
  );
}