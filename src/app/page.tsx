'use client';

import { useState } from "react";

export default function Home() {
  const [subjects, setSubjects] = useState('');
  const [predicates, setPredicates] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/generator');

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || 'Something went wrong');
        setSubjects('Error');
      } else {
        const data = await response.json();
        setSubjects(data.subject);
        setPredicates(data.predicate);
        setError(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black px-6">
      <h1 className="text-5xl font-extrabold mb-8 text-center text-purple-700">
        Phrase Generator
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg shadow-2xl p-8 text-white max-w-md w-full"
      >
        <button
          type="submit"
          className="mt-6 w-full bg-purple-900 hover:bg-purple-900 text-white font-semibold rounded-lg py-3 transition transform hover:scale-105"
        >
          Generate Phrase
        </button>
      </form>

      {error && (
        <p className="bg-pink-600 text-white font-semibold rounded-lg py-2 px-6 mt-6 max-w-md w-full text-center text-lg">
          {error}
        </p>
      )}

      {subjects && (
        <div className="bg-white rounded-lg shadow-lg p-8 mt-8 text-black max-w-md w-full">
          <h3 className="text-3xl font-semibold mb-6 text-center text-purple-900">
            Result
          </h3>
          <p className="text-lg leading-relaxed">
            <span className="font-bold text-purple-700">Phrase: </span> {subjects + predicates}
          </p>
        </div>
      )}
    </div>
  );
}
