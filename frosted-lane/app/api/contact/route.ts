import { prisma } from '@/lib/prisma';
import { successResponse, errorResponse, rateLimit, getClientIp } from '@/lib/api-utils';
import { NextRequest } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    phone: z.string().min(10, 'Phone must be at least 10 digits'),
    message: z.string().min(5, 'Message must be at least 5 characters'),
});

// POST /api/contact - Save a contact message
export async function POST(request: NextRequest) {
    try {
        const ip = getClientIp(request);
        if (!rateLimit(ip, 5, 60000)) {
            return errorResponse('Too many requests. Please try again later.', 429);
        }

        const body = await request.json();
        const validation = contactSchema.safeParse(body);

        if (!validation.success) {
            return errorResponse(validation.error.issues[0].message);
        }

        const message = await prisma.contactMessage.create({
            data: validation.data,
        });

        return successResponse(message, 201);
    } catch (error) {
        console.error('Error saving contact message:', error);
        return errorResponse('Failed to save message', 500);
    }
}
