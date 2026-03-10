import { prisma } from '@/lib/prisma';
import { successResponse, errorResponse, rateLimit, getClientIp } from '@/lib/api-utils';
import { NextRequest } from 'next/server';
import { z } from 'zod';

const orderSchema = z.object({
    customerName: z.string().min(2, 'Name must be at least 2 characters'),
    phone: z.string().min(10, 'Phone must be at least 10 digits'),
    pickupTime: z.string().min(1, 'Pickup time is required'),
    items: z.array(z.object({
        menuItemId: z.string(),
        quantity: z.number().int().min(1),
        price: z.number().min(0),
    })).min(1, 'At least one item is required'),
});

// POST /api/orders - Create a new order
export async function POST(request: NextRequest) {
    try {
        const ip = getClientIp(request);
        if (!rateLimit(ip, 10, 60000)) {
            return errorResponse('Too many requests. Please try again later.', 429);
        }

        const body = await request.json();
        const validation = orderSchema.safeParse(body);

        if (!validation.success) {
            return errorResponse(validation.error.issues[0].message);
        }

        const { customerName, phone, pickupTime, items } = validation.data;
        const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

        const order = await prisma.order.create({
            data: {
                customerName,
                phone,
                pickupTime,
                total,
                items: {
                    create: items.map((item) => ({
                        menuItemId: item.menuItemId,
                        quantity: item.quantity,
                        price: item.price,
                    })),
                },
            },
            include: {
                items: {
                    include: { menuItem: true },
                },
            },
        });

        return successResponse(order, 201);
    } catch (error) {
        console.error('Error creating order:', error);
        return errorResponse('Failed to create order', 500);
    }
}
