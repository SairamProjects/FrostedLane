import { prisma } from '@/lib/prisma';
import { authenticateAdmin } from '@/lib/auth';
import { successResponse, errorResponse } from '@/lib/api-utils';
import { NextRequest } from 'next/server';

// GET /api/admin/orders - Get all orders
export async function GET(request: NextRequest) {
    const auth = authenticateAdmin(request);
    if (!auth) return errorResponse('Unauthorized', 401);

    try {
        const orders = await prisma.order.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                items: {
                    include: { menuItem: true },
                },
            },
        });

        return successResponse(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        return errorResponse('Failed to fetch orders', 500);
    }
}

// PATCH /api/admin/orders - Update order status
export async function PATCH(request: NextRequest) {
    const auth = authenticateAdmin(request);
    if (!auth) return errorResponse('Unauthorized', 401);

    try {
        const { id, status } = await request.json();

        if (!id || !status) {
            return errorResponse('Order ID and status are required');
        }

        const validStatuses = ['PENDING', 'CONFIRMED', 'PREPARING', 'READY', 'COMPLETED', 'CANCELLED'];
        if (!validStatuses.includes(status)) {
            return errorResponse('Invalid status');
        }

        const order = await prisma.order.update({
            where: { id },
            data: { status },
            include: {
                items: { include: { menuItem: true } },
            },
        });

        return successResponse(order);
    } catch (error) {
        console.error('Error updating order:', error);
        return errorResponse('Failed to update order', 500);
    }
}
