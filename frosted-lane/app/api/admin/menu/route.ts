import { prisma } from '@/lib/prisma';
import { authenticateAdmin } from '@/lib/auth';
import { successResponse, errorResponse } from '@/lib/api-utils';
import { NextRequest } from 'next/server';
import { z } from 'zod';

const menuItemSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    price: z.number().min(0, 'Price must be positive'),
    categoryId: z.string().min(1, 'Category is required'),
    description: z.string().optional(),
    isPopular: z.boolean().optional(),
    isAvailable: z.boolean().optional(),
});

// GET /api/admin/menu - Get all menu items (admin)
export async function GET(request: NextRequest) {
    const auth = authenticateAdmin(request);
    if (!auth) return errorResponse('Unauthorized', 401);

    try {
        const categories = await prisma.category.findMany({
            orderBy: { sortOrder: 'asc' },
            include: {
                items: { orderBy: { name: 'asc' } },
            },
        });

        return successResponse(categories);
    } catch (error) {
        console.error('Error fetching admin menu:', error);
        return errorResponse('Failed to fetch menu', 500);
    }
}

// POST /api/admin/menu - Add a new menu item
export async function POST(request: NextRequest) {
    const auth = authenticateAdmin(request);
    if (!auth) return errorResponse('Unauthorized', 401);

    try {
        const body = await request.json();
        const validation = menuItemSchema.safeParse(body);

        if (!validation.success) {
            return errorResponse(validation.error.issues[0].message);
        }

        const item = await prisma.menuItem.create({
            data: validation.data,
            include: { category: true },
        });

        return successResponse(item, 201);
    } catch (error) {
        console.error('Error creating menu item:', error);
        return errorResponse('Failed to create menu item', 500);
    }
}

// PUT /api/admin/menu - Update a menu item
export async function PUT(request: NextRequest) {
    const auth = authenticateAdmin(request);
    if (!auth) return errorResponse('Unauthorized', 401);

    try {
        const body = await request.json();
        const { id, ...data } = body;

        if (!id) return errorResponse('Item ID is required');

        const item = await prisma.menuItem.update({
            where: { id },
            data,
            include: { category: true },
        });

        return successResponse(item);
    } catch (error) {
        console.error('Error updating menu item:', error);
        return errorResponse('Failed to update menu item', 500);
    }
}

// DELETE /api/admin/menu - Delete a menu item
export async function DELETE(request: NextRequest) {
    const auth = authenticateAdmin(request);
    if (!auth) return errorResponse('Unauthorized', 401);

    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) return errorResponse('Item ID is required');

        await prisma.menuItem.delete({ where: { id } });

        return successResponse({ deleted: true });
    } catch (error) {
        console.error('Error deleting menu item:', error);
        return errorResponse('Failed to delete menu item', 500);
    }
}
