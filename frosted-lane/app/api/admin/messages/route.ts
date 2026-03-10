import { prisma } from '@/lib/prisma';
import { authenticateAdmin } from '@/lib/auth';
import { successResponse, errorResponse } from '@/lib/api-utils';
import { NextRequest } from 'next/server';

// GET /api/admin/messages - Get all contact messages
export async function GET(request: NextRequest) {
    const auth = authenticateAdmin(request);
    if (!auth) return errorResponse('Unauthorized', 401);

    try {
        const messages = await prisma.contactMessage.findMany({
            orderBy: { createdAt: 'desc' },
        });

        return successResponse(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        return errorResponse('Failed to fetch messages', 500);
    }
}

// PATCH /api/admin/messages - Mark message as read
export async function PATCH(request: NextRequest) {
    const auth = authenticateAdmin(request);
    if (!auth) return errorResponse('Unauthorized', 401);

    try {
        const { id } = await request.json();

        if (!id) return errorResponse('Message ID is required');

        const message = await prisma.contactMessage.update({
            where: { id },
            data: { isRead: true },
        });

        return successResponse(message);
    } catch (error) {
        console.error('Error updating message:', error);
        return errorResponse('Failed to update message', 500);
    }
}
