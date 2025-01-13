// File: app/simulations/[topic]/page.tsx
'use client';

import { useState, useEffect } from 'react';

type Step = {
  id: number;
  description: string;
};

export default function SimulationPage({ params }: { params: { topic: string } }) {
  const [simulation, setSimulation] = useState<{
    title: string;
    problem: string;
    steps: Step[];
  } | null>(null);

  const [currentStep, setCurrentStep] = useState<number>(0);

  useEffect(() => {
    async function fetchSimulation() {
      const res = await fetch('/api/simulations', {
        method: 'POST',
        body: JSON.stringify({ topic: params.topic }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.ok) {
        const data = await res.json();
        setSimulation(data.simulation);
      }
    }

    fetchSimulation();
  }, [params.topic]);

  if (!simulation) return <div>Loading simulation...</div>;

  const handleNextStep = () => {
    if (currentStep < simulation.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      alert('Simulation Complete!');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{simulation.title}</h1>
      <p className="mt-2 text-lg">{simulation.problem}</p>
      <div className="mt-4">
        <p className="text-md">{simulation.steps[currentStep].description}</p>
        <button
          onClick={handleNextStep}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next Step
        </button>
      </div>
    </div>
  );
    }
