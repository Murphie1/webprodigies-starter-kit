// File: app/api/simulations/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { topic } = await req.json();

  // Example: Generate simulation steps for balancing equations
  if (topic === 'chemistry') {
    return NextResponse.json({
      simulation: {
        title: 'Balance the Equation',
        problem: 'H2 + O2 → H2O',
        steps: [
          { id: 1, description: 'Add coefficients to balance H atoms.' },
          { id: 2, description: 'Add coefficients to balance O atoms.' },
        ],
      },
    });
  }

  return NextResponse.json({ error: 'Topic not supported' }, { status: 400 });
  }
