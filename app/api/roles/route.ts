import { NextRequest, NextResponse } from 'next/server';
import { SALARY_DATA, getCategories, getRolesByCategory } from '@/lib/salary-data';
import { addSecurityHeaders } from '@/lib/api-auth';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    const roles = category ? getRolesByCategory(category) : SALARY_DATA;
    const categories = getCategories();

    const response = NextResponse.json({
      success: true,
      data: roles,
      meta: {
        total: roles.length,
        categories,
      },
    });
    return addSecurityHeaders(response);
  } catch (error) {
    console.error('Error in roles API:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch roles' },
      { status: 500 }
    );
  }
}
