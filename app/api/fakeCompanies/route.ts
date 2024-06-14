import { NextResponse } from 'next/server';
import fakeCompanies from '@/data/fakeCompanies.json';

export async function GET() {
  return NextResponse.json(fakeCompanies);
}
