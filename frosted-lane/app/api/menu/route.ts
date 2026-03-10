import { prisma } from '@/lib/prisma';
import { successResponse, errorResponse } from '@/lib/api-utils';

// GET /api/menu - Get all menu items grouped by category
export async function GET() {
    try {
        const categories = await prisma.category.findMany({
            orderBy: { sortOrder: 'asc' },
            include: {
                items: {
                    where: { isAvailable: true },
                    orderBy: { name: 'asc' },
                },
            },
        });

        return successResponse(categories);
    } catch (error) {
        console.error('Error fetching menu:', error);
        return errorResponse('Failed to fetch menu', 500);
    }
}
