"use client";

import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";

interface HistoryItem {
  id: string;
  code: string;
  timestamp: number;
}

export default function AnalyzePage() {
  const [code, setCode] = useState("const express = require('express');\nconst app = express();\n\napp.get('/', (req, res) => res.send('Hola'));\napp.post('/users', (req, res) => res.send('Crear'));\napp.delete('/users/:id', (req, res) => res.send('Borrar'));");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [githubUrl, setGithubUrl] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  
  // Estados para el Gist de GitHub
  const [githubToken, setGithubToken] = useState("");
  const [gistUrl, setGistUrl] = useState("");

  // Cargar historial al iniciar
  useEffect(() => {
    const saved = localStorage.getItem("monolith_history");
    if (saved) {
      try { setHistory(JSON.parse(saved)); } catch (e) {}
    }
  }, []);

  // Guardar en historial
  const saveToHistory = (codeText: string) => {
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      code: codeText,
      timestamp: Date.now()
    };
    const updated = [newItem, ...history].slice(0, 5);
    setHistory(updated);
    localStorage.setItem("monolith_history", JSON.stringify(updated));
  };

  const handleAnalyze = async (codeToAnalyze = code) => {
    setLoading(true);
    setResult(null);
    setGistUrl(""); // Limpiar el gist anterior

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: codeToAnalyze }),
      });

      const data = await response.json();
      if (data.success) {
        setResult(data);
        saveToHistory(codeToAnalyze);
      } else {
        alert('Error al analizar el código.');
      }
    } catch (error) {
      alert('Error de conexión.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setCode(content);
      handleAnalyze(content);
    };
    reader.readAsText(file);
  };

  const handleGithubAnalyze = async () => {
    if (!githubUrl) return;
    setLoading(true);
    setResult(null);
    setGistUrl("");

    try {
      let fetchUrl = githubUrl;
      if (githubUrl.includes('github.com') && githubUrl.includes('/blob/')) {
        const regex = /github\.com\/([^/]+)\/([^/]+)\/blob\/([^/]+)\/(.+)/;
        const match = githubUrl.match(regex);
        if (match) {
          const [, user, repo, branch, filePath] = match;
          fetchUrl = `https://raw.githubusercontent.com/${user}/${repo}/${branch}/${filePath}`;
        } else {
          throw new Error('El enlace de GitHub no tiene un formato válido.');
        }
      }

      const response = await fetch(fetchUrl);
      if (!response.ok) throw new Error('No se pudo descargar el archivo de GitHub.');
      const content = await response.text();
      
      if (content.trim().startsWith('<!DOCTYPE html>')) {
        throw new Error('El enlace apunta a una página web, no a un archivo de código.');
      }

      setCode(content); 
      handleAnalyze(content);
    } catch (error: any) {
      alert(error.message || 'Error al descargar el archivo de GitHub.');
      setLoading(false);
    }
  };

  const downloadFile = (content: string, filename: string) => {
    const element = document.createElement("a");
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
  };

  // NUEVA FUNCIÓN: Crear Gist en GitHub
  const createGist = async (content: string, filename: string) => {
    if (!githubToken) {
      alert("Por favor, ingresa tu token de GitHub primero.");
      return;
    }

    try {
      const response = await fetch('/api/gist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: githubToken, filename, content }),
      });

      const data = await response.json();
      if (data.success) {
        setGistUrl(data.url);
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      alert("Error de conexión al crear el Gist.");
    }
  };

  const loadFromHistory = (item: HistoryItem) => {
    setCode(item.code);
    setResult(null);
    setGistUrl("");
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Analizar mi API</h1>
        
        <div className="bg-[#111] border border-gray-800 rounded-xl p-6 mb-8">
          
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-400 mb-2">Subir archivo .js</label>
              <input 
                type="file" 
                accept=".js,.ts"
                onChange={handleFileUpload}
                className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-400 mb-2">O pega un enlace de GitHub</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="https://github.com/usuario/repo/blob/main/server.js"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  className="flex-1 bg-[#0a0a0c] border border-gray-800 rounded-lg p-2 text-sm text-gray-100 focus:outline-none focus:border-purple-500"
                />
                <button 
                  onClick={handleGithubAnalyze}
                  className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                >
                  Analizar
                </button>
              </div>
            </div>
          </div>

          <label className="block text-sm font-medium text-gray-400 mb-2">O pega el código directamente</label>
          
          <div className="rounded-lg overflow-hidden border border-gray-800 mb-4">
            <Editor
              height="300px"
              defaultLanguage="javascript"
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || "")}
              options={{ minimap: { enabled: false }, fontSize: 14, padding: { top: 16 }, scrollBeyondLastLine: false }}
            />
          </div>
          
          <button
            onClick={() => handleAnalyze()}
            disabled={loading || !code}
            className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            {loading ? "Analizando..." : "Analizar Código"}
          </button>
        </div>

        {/* Historial */}
        {history.length > 0 && (
          <div className="bg-[#111] border border-gray-800 rounded-xl p-6 mb-8">
            <h2 className="text-lg font-bold mb-4 text-gray-300">Historial Reciente</h2>
            <div className="flex flex-col gap-2">
              {history.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => loadFromHistory(item)}
                  className="text-left text-sm text-gray-400 hover:text-white bg-[#0a0a0c] p-3 rounded-lg border border-gray-800 hover:border-purple-500 transition-all"
                >
                  <span className="font-mono text-xs text-purple-400 block mb-1">
                    {new Date(item.timestamp).toLocaleString()}
                  </span>
                  {item.code.substring(0, 80)}...
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Resultados */}
        {result && (
          <div className="bg-[#111] border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4 text-green-400">✅ Análisis Completado</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-gray-400 mb-2">Rutas Detectadas:</h3>
                <ul className="space-y-1">
                  {result.routes.map((route: any, i: number) => (
                    <li key={i} className="text-sm font-mono text-gray-300">
                      <span className={`inline-block w-16 font-bold ${
                        route.method === 'GET' ? 'text-green-400' : 
                        route.method === 'POST' ? 'text-blue-400' : 
                        'text-red-400'
                      }`}>{route.method}</span>
                      {route.path}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="pt-4 border-t border-gray-800 flex flex-col gap-4">
                {/* Botones de descarga */}
                <div className="flex gap-4">
                  <button onClick={() => downloadFile(result.files.swagger, 'swagger.json')} className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-lg text-sm font-semibold transition-colors">Descargar Swagger.json</button>
                  <button onClick={() => downloadFile(result.files.tests, 'api.test.js')} className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-lg text-sm font-semibold transition-colors">Descargar Tests</button>
                </div>
                
                {/* Exportación a GitHub Gist */}
                <div className="flex gap-2 items-center mt-2">
                  <input 
                    type="password" 
                    placeholder="Token de GitHub (opcional)"
                    value={githubToken}
                    onChange={(e) => setGithubToken(e.target.value)}
                    className="flex-1 bg-[#0a0a0c] border border-gray-800 rounded-lg p-2 text-sm text-gray-100 focus:outline-none focus:border-purple-500"
                  />
                  <button 
                    onClick={() => createGist(result.files.swagger, 'swagger.json')}
                    className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg text-sm font-semibold transition-colors"
                  >
                    Guardar en GitHub
                  </button>
                </div>
                
                {gistUrl && (
                  <p className="text-sm text-green-400">
                    ✅ Gist creado: <a href={gistUrl} target="_blank" rel="noopener noreferrer" className="underline">{gistUrl}</a>
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}