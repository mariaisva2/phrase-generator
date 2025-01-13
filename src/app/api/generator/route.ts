import { NextResponse } from 'next/server';

export async function GET() {
  const phrases = [
    { subject: "The dog", predicate: "runs fast" },
    { subject: "The turtle", predicate: "is very wise" },
    { subject: "My friend", predicate: "loves coding" },
    { subject: "Maria", predicate: "sings poorly" },
  ];

  const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];

  return NextResponse.json(randomPhrase);
}
