import { NextRequest, NextResponse } from 'next/server';
import { getRoleBySlug, SALARY_DATA } from '@/lib/salary-data';
import { addSecurityHeaders } from '@/lib/api-auth';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const role = getRoleBySlug(slug);

    if (!role) {
      return NextResponse.json(
        { success: false, error: 'Role not found' },
        { status: 404 }
      );
    }

    const relatedRoles = SALARY_DATA.filter(
      (r) => r.category === role.category && r.slug !== role.slug
    ).slice(0, 3);

    const response = NextResponse.json({
      success: true,
      data: {
        ...role,
        savings_percentage: Math.round(
          (1 - role.offshore_salary_avg / role.us_salary_avg) * 100
        ),
        related_roles: relatedRoles,
      },
    });
    return addSecurityHeaders(response);
  } catch (error) {
    console.error('Error in role detail API:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch role' },
      { status: 500 }
    );
  }
}
