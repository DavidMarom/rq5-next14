import { NextResponse } from 'next/server';
import { deleteDocument, connectDatabase } from '@/services/mongo';

export async function DELETE(request: Request) {
    
    const client = await connectDatabase();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
        return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    const result = await deleteDocument(client, 'cars', id);
    return NextResponse.json(result);
}