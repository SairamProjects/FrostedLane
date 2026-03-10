import { prisma } from '@/lib/prisma';
import { comparePassword, generateToken } from '@/lib/auth';
import { successResponse, errorResponse, rateLimit, getClientIp } from '@/lib/api-utils';
import { NextRequest } from 'next/server';
import { z } from 'zod';

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
});

// POST /api/admin/login - Admin login
export async function POST(request: NextRequest) {
    try {
        const ip = getClientIp(request);
        if (!rateLimit(ip, 5, 60000)) {
            return errorResponse('Too many login attempts. Please try again later.', 429);
        }

        const body = await request.json();
        const validation = loginSchema.safeParse(body);

        if (!validation.success) {
            return errorResponse(validation.error.issues[0].message);
        }

        const { email, password } = validation.data;

        // Auto-setup: If no users exist, create the default admin
        const userCount = await prisma.user.count();
        if (userCount === 0) {
            const adminEmail = process.env.ADMIN_EMAIL || 'admin@frostedlane.com';
            const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
            const { hashPassword } = await import('@/lib/auth');
            const hashedPassword = await hashPassword(adminPassword);

            await prisma.user.create({
                data: {
                    email: adminEmail,
                    password: hashedPassword,
                    name: 'Admin',
                    role: 'ADMIN',
                }
            });
            console.log('✅ Auto-created admin user');
        }

        let user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return errorResponse('Invalid credentials', 401);
        }

        const isValid = await comparePassword(password, user.password);
        if (!isValid) {
            return errorResponse('Invalid credentials', 401);
        }

        const token = generateToken({
            userId: user.id,
            email: user.email,
            role: user.role,
        });

        return successResponse({
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
        });
    } catch (error) {
        console.error('Error during login:', error);
        return errorResponse('Login failed', 500);
    }
}
