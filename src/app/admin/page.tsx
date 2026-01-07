"use client";

import { useState } from "react";
import Link from "next/link";

interface Contact {
  id: number;
  name: string;
  phone: string;
  message: string;
  created_at: string;
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [storedPassword, setStoredPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsAuthenticated(true);
        setContacts(data.data);
        setStoredPassword(password);
      } else {
        setError(data.error || "인증에 실패했습니다.");
      }
    } catch {
      setError("서버 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    try {
      const response = await fetch(`/api/admin?id=${id}`, {
        method: "DELETE",
        headers: {
          "x-admin-password": storedPassword,
        },
      });

      if (response.ok) {
        setContacts(contacts.filter((c) => c.id !== id));
      } else {
        alert("삭제에 실패했습니다.");
      }
    } catch {
      alert("서버 오류가 발생했습니다.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setContacts([]);
    setPassword("");
    setStoredPassword("");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="glass-effect rounded-3xl p-10">
            <div className="text-center mb-8">
              <Link href="/" className="text-3xl font-bold gradient-text">
                종합광고
              </Link>
              <h1 className="text-2xl font-bold mt-6 mb-2">관리자 로그인</h1>
              <p className="text-slate-400">비밀번호를 입력해주세요</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">
                  비밀번호
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-6 py-4 rounded-xl input-field text-white placeholder-slate-500"
                  placeholder="비밀번호 입력"
                />
              </div>

              {error && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 text-red-300 text-center">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary py-4 rounded-xl text-white text-lg font-semibold disabled:opacity-50"
              >
                {isLoading ? "로그인 중..." : "로그인"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link
                href="/"
                className="text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                ← 메인 페이지로 돌아가기
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div>
            <Link href="/" className="text-2xl font-bold gradient-text">
              종합광고
            </Link>
            <h1 className="text-3xl font-bold mt-2">문의 관리</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">
              총 {contacts.length}건의 문의
            </span>
            <button
              onClick={handleLogout}
              className="px-6 py-2 rounded-full glass-effect hover:bg-white/10 transition-all"
            >
              로그아웃
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="glass-effect rounded-2xl overflow-hidden">
          {contacts.length === 0 ? (
            <div className="p-16 text-center text-slate-400">
              <div className="text-5xl mb-4">📭</div>
              <p>아직 접수된 문의가 없습니다.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th className="rounded-tl-2xl">접수일시</th>
                    <th>이름</th>
                    <th>연락처</th>
                    <th>상담문의</th>
                    <th className="rounded-tr-2xl">관리</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact) => (
                    <tr key={contact.id}>
                      <td className="whitespace-nowrap">
                        {formatDate(contact.created_at)}
                      </td>
                      <td className="font-medium">{contact.name}</td>
                      <td className="whitespace-nowrap">{contact.phone}</td>
                      <td className="max-w-md">
                        <div className="line-clamp-3">{contact.message}</div>
                      </td>
                      <td>
                        <button
                          onClick={() => handleDelete(contact.id)}
                          className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                        >
                          삭제
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Mobile Cards */}
        <div className="mt-8 space-y-4 md:hidden">
          {contacts.map((contact) => (
            <div key={contact.id} className="glass-effect rounded-2xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="font-bold text-lg">{contact.name}</div>
                  <div className="text-slate-400">{contact.phone}</div>
                </div>
                <button
                  onClick={() => handleDelete(contact.id)}
                  className="px-3 py-1 rounded-lg bg-red-500/20 text-red-400 text-sm"
                >
                  삭제
                </button>
              </div>
              <div className="text-slate-300 mb-4">{contact.message}</div>
              <div className="text-sm text-slate-500">
                {formatDate(contact.created_at)}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-slate-500 text-sm">
          <Link href="/" className="hover:text-slate-300 transition-colors">
            ← 메인 페이지로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
