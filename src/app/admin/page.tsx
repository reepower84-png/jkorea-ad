'use client';

import { useEffect, useState } from 'react';

interface Inquiry {
  id: number;
  name: string;
  phone: string;
  message: string | null;
  created_at: string;
  is_read: boolean;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  // 세션 확인
  useEffect(() => {
    const auth = sessionStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
    setIsAuthLoading(false);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      if (response.ok) {
        sessionStorage.setItem('adminAuth', 'true');
        setIsAuthenticated(true);
      } else {
        const data = await response.json();
        setAuthError(data.error || '로그인에 실패했습니다.');
      }
    } catch {
      setAuthError('서버 오류가 발생했습니다.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
    setPassword('');
  };

  const fetchInquiries = async () => {
    try {
      const response = await fetch('/api/admin/inquiries');
      if (!response.ok) throw new Error('데이터를 불러오는데 실패했습니다.');
      const data = await response.json();
      setInquiries(data.inquiries);
    } catch (err) {
      setError(err instanceof Error ? err.message : '오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchInquiries();
    }
  }, [isAuthenticated]);

  const handleMarkAsRead = async (id: number) => {
    try {
      await fetch('/api/admin/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      fetchInquiries();
    } catch (err) {
      console.error('읽음 처리 실패:', err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      await fetch('/api/admin/inquiries', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      setSelectedInquiry(null);
      fetchInquiries();
    } catch (err) {
      console.error('삭제 실패:', err);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // 인증 로딩 중
  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  // 로그인 폼
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">관리자 로그인</h1>
            <p className="text-gray-500 mt-2">비밀번호를 입력해주세요</p>
          </div>

          {authError && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                비밀번호
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all outline-none"
                placeholder="비밀번호 입력"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition-colors"
            >
              로그인
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="/" className="text-gray-500 hover:text-red-600 text-sm">
              ← 사이트로 돌아가기
            </a>
          </div>
        </div>
      </div>
    );
  }

  const unreadCount = inquiries.filter(i => !i.is_read).length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">관리자 페이지</h1>
              <p className="text-sm text-gray-500">문의 내역 관리</p>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="/"
                className="text-gray-600 hover:text-red-600 font-medium"
              >
                ← 사이트
              </a>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
            {error}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">전체 문의</p>
                <p className="text-2xl font-bold">{inquiries.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-lg">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">읽지 않은 문의</p>
                <p className="text-2xl font-bold text-red-600">{unreadCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">처리 완료</p>
                <p className="text-2xl font-bold text-green-600">{inquiries.length - unreadCount}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Inquiry List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold">문의 목록</h2>
              </div>

              {inquiries.length === 0 ? (
                <div className="p-12 text-center text-gray-500">
                  아직 접수된 문의가 없습니다.
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {inquiries.map((inquiry) => (
                    <div
                      key={inquiry.id}
                      onClick={() => {
                        setSelectedInquiry(inquiry);
                        if (!inquiry.is_read) handleMarkAsRead(inquiry.id);
                      }}
                      className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedInquiry?.id === inquiry.id ? 'bg-red-50' : ''
                      } ${!inquiry.is_read ? 'bg-yellow-50' : ''}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            {!inquiry.is_read && (
                              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                            )}
                            <span className="font-semibold">{inquiry.name}</span>
                            <span className="text-gray-500 text-sm">{inquiry.phone}</span>
                          </div>
                          <p className="text-gray-600 text-sm mt-1 line-clamp-1">
                            {inquiry.message || '(요청사항 없음)'}
                          </p>
                        </div>
                        <span className="text-xs text-gray-400 whitespace-nowrap ml-4">
                          {formatDate(inquiry.created_at)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Detail View */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-6">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold">상세 정보</h2>
              </div>

              {selectedInquiry ? (
                <div className="p-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-500">이름</label>
                      <p className="font-semibold text-lg">{selectedInquiry.name}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">전화번호</label>
                      <p className="font-semibold text-lg">
                        <a href={`tel:${selectedInquiry.phone}`} className="text-blue-600 hover:underline">
                          {selectedInquiry.phone}
                        </a>
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">요청사항</label>
                      <p className="mt-1 p-3 bg-gray-50 rounded-lg text-gray-700 whitespace-pre-wrap">
                        {selectedInquiry.message || '(요청사항 없음)'}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">접수일시</label>
                      <p className="font-medium">{formatDate(selectedInquiry.created_at)}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">상태</label>
                      <p>
                        {selectedInquiry.is_read ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            확인 완료
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            미확인
                          </span>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-2">
                    <a
                      href={`tel:${selectedInquiry.phone}`}
                      className="flex-1 bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      전화하기
                    </a>
                    <button
                      onClick={() => handleDelete(selectedInquiry.id)}
                      className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-12 text-center text-gray-500">
                  목록에서 문의를 선택하세요
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
