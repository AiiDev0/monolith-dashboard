import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { token, filename, content } = await request.json();

    if (!token) {
      return NextResponse.json({ success: false, error: 'Token no proporcionado' }, { status: 401 });
    }

    const response = await fetch('https://api.github.com/gists', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: 'Generado por Monolith Dashboard',
        public: true,
        files: {
          [filename]: {
            content: content
          }
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al crear el Gist');
    }

    return NextResponse.json({ success: true, url: data.html_url });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}