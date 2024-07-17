/* eslint-disable */
// src/app/api/users/route.ts
import { getUsers, updateUser } from '@/data-access/users';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
	try {
		const users = await getUsers();
		return NextResponse.json(users);
	} catch (error) {
		console.error('Failed to fetch users:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch users' },
			{ status: 500 }
		);
	}
}

export async function POST(request: Request) {
	// Handle POST request if needed
	return NextResponse.json({ message: 'POST request received' });
}

export async function PUT(request: Request) {
	try {
		const updatedUser = await request.json();
		const userId = updatedUser.id;

		if (!userId) {
			return NextResponse.json(
				{ error: 'User ID is required' },
				{ status: 400 }
			);
		}

		const result = await updateUser(userId, updatedUser);
		return NextResponse.json(result);
	} catch (error) {
		console.error('Failed to update user:', error);
		return NextResponse.json(
			{ error: 'Failed to update user' },
			{ status: 500 }
		);
	}
}
