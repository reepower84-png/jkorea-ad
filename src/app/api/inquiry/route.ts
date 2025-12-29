import { NextRequest, NextResponse } from 'next/server';
import { createInquiry } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, message } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: '이름과 전화번호는 필수입니다.' },
        { status: 400 }
      );
    }

    const phoneRegex = /^[0-9-]+$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { error: '올바른 전화번호 형식이 아닙니다.' },
        { status: 400 }
      );
    }

    const inquiry = await createInquiry(name, phone, message || '');

    return NextResponse.json(
      { message: '문의가 성공적으로 접수되었습니다.', inquiry },
      { status: 201 }
    );
  } catch (error) {
    console.error('문의 접수 오류:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
