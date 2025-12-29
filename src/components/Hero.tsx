import CTAButton from './CTAButton';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 md:pt-20">
      {/* Mobile: Gradient Background */}
      <div className="absolute inset-0 gradient-bg md:hidden"></div>

      {/* Desktop: Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden md:block"
        style={{
          backgroundImage: `url('/1도플러스 이미지 3.jpg')`,
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="animate-fade-in-up">
          <p className="text-lg md:text-xl mb-4 opacity-90">
            20년 전통의 기술력으로 만든 프리미엄 건강 제품
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            온 가족의 건강을<br />
            <span className="text-yellow-300">따뜻하게</span> 지켜드립니다
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
            최고급 원적외선 전기매트와 건강사우나로<br className="hidden md:block" />
            혈액순환 개선, 면역력 강화, 피로 회복을 경험하세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <CTAButton size="lg" text="지금 무료 상담 받기" />
            <a
              href="#products"
              className="text-white border-2 border-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-red-600 transition-all duration-300"
            >
              제품 둘러보기
            </a>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 md:gap-12">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-yellow-300">20+</p>
              <p className="text-sm opacity-80">년 제조 경력</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-yellow-300">50,000+</p>
              <p className="text-sm opacity-80">고객 만족</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-yellow-300">99%</p>
              <p className="text-sm opacity-80">재구매율</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
