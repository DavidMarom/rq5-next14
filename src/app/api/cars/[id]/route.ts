import { NextResponse } from 'next/server';
import { deleteDocument, connectDatabase } from '@/services/mongo';

export async function DELETE(req: any, params: any) {
    console.log(params.params.id);
    const client = await connectDatabase();
    const result = await deleteDocument(client, 'cars', params.params.id);
    return NextResponse.json(result);
}
