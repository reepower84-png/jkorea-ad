"use client";

import { useState, useEffect, useRef } from "react";

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
  const [activeSection, setActiveSection] = useState<string>("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const sectionsRef = useRef<{ [key: string]: IntersectionObserverEntry }>({});
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Close mobile menu when clicking outside or scrolling
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleScroll = () => {
      setIsMobileMenuOpen(false);
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobileMenuOpen]);

  // Intersection Observer for active section detection
  useEffect(() => {
    const sectionIds = ["services", "why-us", "reviews"];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          sectionsRef.current[entry.target.id] = entry;
        });

        // Find the section that is most visible
        const visibleSections = sectionIds.filter(
          (id) => sectionsRef.current[id]?.isIntersecting
        );

        if (visibleSections.length > 0) {
          // Get the section with highest intersection ratio
          const mostVisible = visibleSections.reduce((prev, curr) => {
            const prevRatio = sectionsRef.current[prev]?.intersectionRatio || 0;
            const currRatio = sectionsRef.current[curr]?.intersectionRatio || 0;
            return currRatio > prevRatio ? curr : prev;
          });
          setActiveSection(mostVisible);
        } else {
          setActiveSection("");
        }
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: "-80px 0px -20% 0px",
      }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const scrollToForm = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = [
    { name: "상품소개", id: "services" },
    { name: "운영 시스템", id: "why-us" },
    { name: "성공 사례", id: "reviews" },
  ];

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
      <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 glass-effect">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-xl sm:text-2xl font-bold gradient-text cursor-pointer hover:opacity-80 transition-opacity"
          >
            종합광고
          </button>

          {/* Desktop Navigation Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`font-medium transition-all duration-300 relative ${
                  activeSection === item.id
                    ? "text-white"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {item.name}
                {activeSection === item.id && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full" />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* Desktop CTA Button */}
            <button
              onClick={scrollToForm}
              className="hidden md:block btn-primary px-4 sm:px-6 py-2 rounded-full text-white text-sm sm:text-base font-medium"
            >
              무료 상담
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="메뉴 열기"
            >
              <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`} />
              <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-64 border-t border-white/10" : "max-h-0"
          }`}
        >
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${
                  activeSection === item.id
                    ? "bg-white/10 text-white"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="font-medium">{item.name}</span>
                {activeSection === item.id && (
                  <span className="ml-2 text-xs text-indigo-400">현재 위치</span>
                )}
              </button>
            ))}
            <button
              onClick={() => {
                scrollToForm();
                setIsMobileMenuOpen(false);
              }}
              className="w-full btn-primary px-4 py-3 rounded-xl text-white font-medium mt-2"
            >
              무료 상담 신청
            </button>
          </div>
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
      <section id="why-us" className="py-16 sm:py-32 relative">
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

          {/* Customer Reviews */}
          <div id="reviews" className="mt-16 sm:mt-24 scroll-mt-24">
            {/* Satisfaction Badge */}
            <div className="text-center mb-10 sm:mb-12">
              <div className="inline-flex items-center gap-3 glass-effect rounded-full px-6 py-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xl sm:text-2xl font-bold gradient-text">98%</span>
                <span className="text-slate-300 text-sm sm:text-base">고객 만족도</span>
              </div>
            </div>

            {/* Review Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  name: "김OO 대표",
                  business: "인테리어 업체",
                  review: "다른 광고회사 여러 곳 써봤는데, 여기처럼 꼼꼼하게 관리해주는 곳은 처음이에요. 광고비 대비 문의가 3배 이상 늘었습니다.",
                  gradient: "from-indigo-500 to-purple-500",
                },
                {
                  name: "이OO 원장",
                  business: "피부과 의원",
                  review: "전담 매니저분이 매주 리포트 보내주시고, 성과가 안 나오면 바로 전략을 수정해주셔서 믿고 맡기고 있습니다.",
                  gradient: "from-cyan-500 to-blue-500",
                },
                {
                  name: "박OO 사장",
                  business: "음식점 프랜차이즈",
                  review: "당근마켓 광고로 동네 단골 손님이 확 늘었어요. 지역 타겟팅이 정말 효과적이더라고요. 강력 추천합니다!",
                  gradient: "from-orange-500 to-pink-500",
                },
              ].map((review, index) => (
                <div
                  key={index}
                  className="relative group"
                >
                  {/* Gradient Border */}
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${review.gradient} rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500`} />

                  {/* Card Content */}
                  <div className="relative bg-slate-900/90 rounded-2xl p-6 sm:p-8 h-full border border-white/10 hover:border-white/20 transition-all duration-300">
                    {/* Quote Icon */}
                    <div className={`absolute -top-4 -left-2 text-5xl sm:text-6xl font-serif bg-gradient-to-r ${review.gradient} bg-clip-text text-transparent opacity-50`}>
                      &ldquo;
                    </div>

                    {/* Stars */}
                    <div className="flex items-center gap-1 mb-4 pt-2">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-yellow-400 drop-shadow-[0_0_3px_rgba(250,204,21,0.5)]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    {/* Review Text */}
                    <p className="text-slate-200 text-sm sm:text-base mb-6 leading-relaxed font-medium">
                      {review.review}
                    </p>

                    {/* Author Info */}
                    <div className={`border-t border-gradient-to-r ${review.gradient} pt-4 mt-auto`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${review.gradient} flex items-center justify-center text-white font-bold text-sm`}>
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-white">{review.name}</p>
                          <p className="text-sm text-slate-400">{review.business}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
