import { NextResponse } from 'next/server';
import { getAllDocuments, connectDatabase, updateDocument } from '@/services/mongo';

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

export async function PATCH(request: Request) {
    const body = await request.json();
    const client = await connectDatabase();
    const update = { model_name: body.model_name, color: body.color, plate_number: body.plate_number };
    const result = await updateDocument(client, 'cars', body._id, update);
    return NextResponse.json(result);
}
