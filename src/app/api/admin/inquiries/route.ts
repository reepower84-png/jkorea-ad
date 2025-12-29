import { NextRequest, NextResponse } from 'next/server';
import { getAllInquiries, markAsRead, deleteInquiry } from '@/lib/supabase';

export async function GET() {
  try {
    const inquiries = await getAllInquiries();
    return NextResponse.json({ inquiries });
  } catch (error) {
    console.error('문의 조회 오류:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'ID가 필요합니다.' },
        { status: 400 }
      );
    }

    await markAsRead(id);
    return NextResponse.json({ message: '읽음 처리되었습니다.' });
  } catch (error) {
    console.error('읽음 처리 오류:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'ID가 필요합니다.' },
        { status: 400 }
      );
    }

    await deleteInquiry(id);
    return NextResponse.json({ message: '삭제되었습니다.' });
  } catch (error) {
    console.error('삭제 오류:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
