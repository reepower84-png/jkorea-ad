"use client";

import { useState, useEffect } from "react";

// Service data
const services = [
  {
    category: "네이버 광고",
    icon: "N",
    color: "from-green-400 to-green-600",
    items: [
      { name: "파워링크 검색광고", desc: "네이버 검색 결과 상단 노출" },
      { name: "쇼핑검색 광고", desc: "네이버 쇼핑 상품 광고" },
      { name: "지도·플레이스 광고", desc: "네이버 지도 비즈니스 광고" },
    ],
  },
  {
    category: "당근마켓",
    icon: "🥕",
    color: "from-orange-400 to-orange-600",
    items: [
      { name: "지역광고", desc: "동네 기반 타겟 마케팅" },
    ],
    link: "https://carrot-ad.vercel.app/",
  },
  {
    category: "SNS 광고",
    icon: "📱",
    color: "from-pink-400 to-purple-600",
    items: [
      { name: "인스타그램 광고", desc: "비주얼 중심 브랜드 마케팅" },
      { name: "페이스북 광고", desc: "정교한 타겟팅 광고" },
    ],
  },
  {
    category: "영상 광고",
    icon: "▶",
    color: "from-red-400 to-red-600",
    items: [
      { name: "유튜브 광고", desc: "영상 기반 브랜드 홍보" },
      { name: "틱톡 광고", desc: "MZ세대 타겟 숏폼 광고" },
    ],
  },
  {
    category: "디스플레이",
    icon: "🖥",
    color: "from-blue-400 to-cyan-600",
    items: [
      { name: "디스플레이 광고", desc: "배너 및 네트워크 광고" },
    ],
  },
  {
    category: "콜 전환 광고",
    icon: "📞",
    color: "from-emerald-400 to-teal-600",
    items: [
      { name: "인바운드", desc: "광고로 들어온 고객 즉시 응대·상담" },
      { name: "아웃바운드", desc: "가망·재접촉 고객 대상 확정 고객만 연결하는 프리미엄 약속콜" },
    ],
    link: "https://link.inpock.co.kr/rocketcall",
  },
];

const stats = [
  { number: "500+", label: "누적 광고주" },
  { number: "98%", label: "고객 만족도" },
  { number: "24/7", label: "전담 서포트" },
  { number: "10년+", label: "업계 경력" },
];

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToForm = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", phone: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-effect">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-xl sm:text-2xl font-bold gradient-text cursor-pointer hover:opacity-80 transition-opacity"
          >
            종합광고
          </button>
          <button
            onClick={scrollToForm}
            className="btn-primary px-4 sm:px-6 py-2 rounded-full text-white text-sm sm:text-base font-medium"
          >
            무료 상담
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-indigo-500/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-cyan-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "-3s" }} />
          <div className="absolute top-1/2 left-1/2 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-orange-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "-1.5s" }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="inline-block mb-4 sm:mb-6 px-3 sm:px-4 py-2 rounded-full glass-effect text-xs sm:text-sm text-indigo-300">
              네이버 · 당근마켓 · SNS 종합 광고 시행사
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
              <span className="gradient-text">디지털 광고</span>의
              <br />
              모든 것, 한 곳에서
            </h1>
            <p className="text-base sm:text-xl md:text-2xl text-slate-300 mb-8 sm:mb-10 max-w-3xl mx-auto px-2">
              검색광고부터 SNS, 영상광고까지
              <br className="hidden sm:block" />
              비즈니스 성장을 위한 최적의 광고 솔루션을 제공합니다
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
              <button
                onClick={scrollToForm}
                className="btn-primary px-6 sm:px-8 py-3 sm:py-4 rounded-full text-white text-base sm:text-lg font-semibold animate-pulse-glow"
              >
                무료 광고 상담 받기
              </button>
              <a
                href="#services"
                className="px-6 sm:px-8 py-3 sm:py-4 rounded-full glass-effect text-white text-base sm:text-lg font-semibold hover:bg-white/10 transition-all"
              >
                서비스 둘러보기
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mt-12 sm:mt-20 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            {stats.map((stat, index) => (
              <div key={index} className="glass-effect rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text">{stat.number}</div>
                <div className="text-slate-400 mt-1 sm:mt-2 text-sm sm:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
            <div className="w-1 h-3 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 sm:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
              <span className="gradient-text">통합 광고 서비스</span>
            </h2>
            <p className="text-base sm:text-xl text-slate-400 max-w-2xl mx-auto px-2">
              다양한 채널에서 최적화된 광고 운영으로 비즈니스 성장을 도와드립니다
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="service-card glass-effect rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:glow-effect"
              >
                <div className={`w-12 sm:w-16 h-12 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-xl sm:text-2xl mb-4 sm:mb-6`}>
                  {service.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{service.category}</h3>
                <ul className="space-y-3">
                  {service.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-indigo-400 mt-1">●</span>
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-slate-400">{item.desc}</div>
                      </div>
                    </li>
                  ))}
                </ul>
                {service.link && (
                  <a
                    href={service.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-4 text-sm text-orange-400 hover:text-orange-300 transition-colors group"
                  >
                    <span>상세보기</span>
                    <svg
                      className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* CTA in middle */}
          <div className="text-center mt-10 sm:mt-16">
            <button
              onClick={scrollToForm}
              className="btn-primary px-8 sm:px-10 py-3 sm:py-4 rounded-full text-white text-base sm:text-lg font-semibold"
            >
              지금 바로 상담 신청하기
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 sm:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/30 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
              왜 <span className="gradient-text">종합광고</span>인가요?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8">
            {[
              {
                icon: "🎯",
                title: "전문 컨설팅",
                desc: "업종별 맞춤 광고 전략으로 최적의 ROI를 달성합니다",
              },
              {
                icon: "📊",
                title: "실시간 리포팅",
                desc: "투명한 광고 성과 분석과 정기 리포트를 제공합니다",
              },
              {
                icon: "💬",
                title: "1:1 전담 관리",
                desc: "전담 매니저가 광고 운영을 밀착 관리합니다",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="text-center glass-effect rounded-2xl sm:rounded-3xl p-6 sm:p-10 service-card"
              >
                <div className="text-4xl sm:text-5xl mb-4 sm:mb-6">{item.icon}</div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{item.title}</h3>
                <p className="text-slate-400 text-sm sm:text-base">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Powerful Tagline */}
          <div className="mt-12 sm:mt-20 text-center px-2">
            <div className="inline-block relative">
              <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl sm:rounded-2xl blur-xl sm:blur-2xl opacity-30 animate-pulse" />
              <p className="relative text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                <span className="gradient-text">&ldquo;광고 이후까지 설계하는</span>
                <br />
                <span className="text-white">단 하나의 광고회사.&rdquo;</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-16 sm:py-32 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="glass-effect rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-16 glow-effect">
            <div className="text-center mb-8 sm:mb-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
                <span className="gradient-text">무료 상담</span> 신청
              </h2>
              <p className="text-base sm:text-xl text-slate-400 px-2">
                전문 컨설턴트가 맞춤형 광고 전략을 제안해 드립니다
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-300">
                    이름 <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-6 py-4 rounded-xl input-field text-white placeholder-slate-500"
                    placeholder="홍길동"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-300">
                    연락처 <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-6 py-4 rounded-xl input-field text-white placeholder-slate-500"
                    placeholder="010-1234-5678"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">
                  상담문의 <span className="text-red-400">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-6 py-4 rounded-xl input-field text-white placeholder-slate-500 resize-none"
                  placeholder="광고 관련 문의사항을 자유롭게 작성해주세요"
                />
              </div>

              {submitStatus === "success" && (
                <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-4 text-green-300 text-center">
                  상담 신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다!
                </div>
              )}

              {submitStatus === "error" && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 text-red-300 text-center">
                  오류가 발생했습니다. 다시 시도해주세요.
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary py-4 rounded-xl text-white text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "전송 중..." : "상담 신청하기"}
              </button>

              <p className="text-center text-sm text-slate-500">
                제출하신 정보는 상담 목적으로만 사용됩니다
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 sm:py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8 text-center md:text-left">
            <div>
              <div className="text-2xl sm:text-3xl font-bold gradient-text mb-2 sm:mb-4">종합광고</div>
              <p className="text-slate-400 text-sm sm:text-base">네이버 · 당근마켓 · SNS 종합 광고 시행사</p>
            </div>
            <button
              onClick={scrollToForm}
              className="btn-primary px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-white text-sm sm:text-base font-medium"
            >
              무료 상담 신청
            </button>
          </div>

          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between gap-6 sm:gap-8">
              <div className="text-xs sm:text-sm text-slate-500 space-y-1.5 sm:space-y-2 text-center md:text-left">
                <p><strong className="text-slate-400">상호:</strong> 제이코리아 | <strong className="text-slate-400">대표:</strong> 이주영</p>
                <p><strong className="text-slate-400">사업자등록번호:</strong> 278-30-01540</p>
                <p><strong className="text-slate-400">주소:</strong> 인천광역시 계양구 오조산로57번길 15, 7층 7106호</p>
              </div>
              <div className="text-xs sm:text-sm text-center md:text-left">
                <p className="text-slate-400 font-medium mb-2 sm:mb-3">계열사</p>
                <div className="space-y-2 flex flex-col items-center md:items-start">
                  <a
                    href="https://carrot-ad.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-400 transition-colors group"
                  >
                    <span>당근마켓-동네광고연구소</span>
                    <svg
                      className="w-3.5 sm:w-4 h-3.5 sm:h-4 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                  <a
                    href="https://link.inpock.co.kr/rocketcall"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-400 transition-colors group"
                  >
                    <span>콜 전환 광고-로켓콜</span>
                    <svg
                      className="w-3.5 sm:w-4 h-3.5 sm:h-4 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-6 text-center text-slate-600 text-xs sm:text-sm">
              © 2024 종합광고. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* Floating KakaoTalk Button */}
      <a
        href="http://pf.kakao.com/_hxnTNG/chat"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 hover:shadow-xl hover:shadow-yellow-400/30"
        aria-label="카카오톡 상담"
      >
        <div className="w-full h-full rounded-full bg-[#FEE500] flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            className="w-7 h-7 sm:w-8 sm:h-8"
            fill="#3C1E1E"
          >
            <path d="M12 3C6.477 3 2 6.463 2 10.714c0 2.683 1.737 5.042 4.383 6.393-.192.72-.78 2.608-.894 3.012-.143.508.186.5.39.365.16-.106 2.552-1.74 3.585-2.448.82.118 1.67.178 2.536.178 5.523 0 10-3.463 10-7.5S17.523 3 12 3z"/>
          </svg>
        </div>
      </a>
    </div>
  );
}
