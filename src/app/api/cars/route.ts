import { NextResponse } from 'next/server';
import { getAllDocuments, connectDatabase } from '@/services/mongo';

export async function GET() {
    const client = await connectDatabase();
    const cars = await getAllDocuments(client, 'cars');
    return NextResponse.json(cars);
}

export async function POST(request: Request) {
    const client = await connectDatabase();
    const body = await request.json();
    const result = await client.db('db01').collection('cars').insertOne(body);
    return NextResponse.json(result);
}

export async function PUT(request: Request) {
    const client = await connectDatabase();
    const body = await request.json();
    const result = await client.db('db01').collection('cars').updateOne({ _id: body._id }, { $set: body });
    return NextResponse.json(result);
}

