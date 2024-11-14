import { NextResponse } from 'next/server';
import { getAllDocuments, connectDatabase } from '@/services/mongo';


export async function GET() {
    const client = await connectDatabase();
    const books = await getAllDocuments(client, 'cars');
    return NextResponse.json(books);
}

export async function POST(request: Request) {
    const client = await connectDatabase();
    const body = await request.json();
    const result = await client.db('test').collection('cars').insertOne(body);
    return NextResponse.json(result);
}

export async function PUT(request: Request) {
    const client = await connectDatabase();
    const body = await request.json();
    const result = await client.db('test').collection('cars').updateOne({ _id: body._id }, { $set: body });
    return NextResponse.json(result);
}

