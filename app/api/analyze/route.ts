import { NextResponse } from 'next/server';
import { Project } from 'ts-morph';

export async function POST(request: Request) {
  try {
    const { code } = await request.json();

    const project = new Project({ useInMemoryFileSystem: true });
    const sourceFile = project.createSourceFile('temp.js', code);

    const text = sourceFile.getFullText();
    const routes: any[] = [];
    
    const regex = /(app|router)\.(get|post|put|delete|patch)\(['"]([^'"]+)['"]/g;
    let match;
    
    while ((match = regex.exec(text)) !== null) {
      routes.push({
        method: match[2].toUpperCase(),
        path: match[3],
      });
    }

    // Generar Swagger
    const paths: any = {};
    routes.forEach(route => {
      if (!paths[route.path]) paths[route.path] = {};
      paths[route.path][route.method.toLowerCase()] = {
        summary: `Ruta ${route.method} ${route.path}`,
        responses: { '200': { description: 'Exitoso' } }
      };
    });
    const swagger = { openapi: '3.0.0', info: { title: 'API Docs', version: '1.0.0' }, paths };

    // Generar Tests
    let testsCode = `const request = require('supertest');\nconst app = require('./server');\n\n`;
    testsCode += `describe('API Tests', () => {\n`;
    routes.forEach(route => {
      testsCode += `  test('${route.method} ${route.path}', async () => {\n`;
      testsCode += `    await request(app).${route.method.toLowerCase()}('${route.path}').expect(200);\n  });\n\n`;
    });
    testsCode += `});\n`;

    return NextResponse.json({ 
      success: true, 
      routes,
      files: {
        swagger: JSON.stringify(swagger, null, 2),
        tests: testsCode
      }
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Error al analizar el código' }, { status: 500 });
  }
}