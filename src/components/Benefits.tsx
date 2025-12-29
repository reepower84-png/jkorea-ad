import CTAButton from './CTAButton';

const benefits = [
  {
    title: '혈액순환 촉진',
    description: '원적외선이 체내 깊숙이 침투하여 혈관을 확장시키고 혈액순환을 원활하게 합니다.',
    icon: '🩸'
  },
  {
    title: '면역력 강화',
    description: '체온 상승으로 면역 세포 활성화를 도와 각종 질병에 대한 저항력을 높여줍니다.',
    icon: '🛡️'
  },
  {
    title: '피로 회복',
    description: '근육의 긴장을 풀어주고 젖산 분해를 촉진하여 빠른 피로 회복을 돕습니다.',
    icon: '⚡'
  },
  {
    title: '신진대사 활성화',
    description: '체내 노폐물 배출을 촉진하고 신진대사를 활발하게 하여 다이어트에도 도움이 됩니다.',
    icon: '🔥'
  },
  {
    title: '숙면 유도',
    description: '따뜻한 온열 효과가 심신을 이완시켜 깊고 편안한 수면을 유도합니다.',
    icon: '😴'
  },
  {
    title: '관절 건강',
    description: '관절 주변 혈류를 개선하여 관절통, 근육통 완화에 도움을 줍니다.',
    icon: '🦴'
  },
];

export default function Benefits() {
  return (
    <section id="benefits" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-red-600 font-semibold mb-2">HEALTH BENEFITS</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            온열 요법의 <span className="gradient-text">놀라운 효과</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            매일 30분, 1도플러스 제품과 함께하면 달라지는 건강 변화를 느껴보세요
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="relative p-6 rounded-2xl border-2 border-gray-100 hover:border-red-200 transition-all duration-300 group"
            >
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-red-600 transition-colors">
                {benefit.title}
              </h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-red-50 to-orange-50 rounded-3xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            건강한 삶의 시작, 지금 바로 상담받으세요
          </h3>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            전문 상담사가 고객님의 건강 상태와 필요에 맞는 최적의 제품을 추천해드립니다
          </p>
          <CTAButton size="lg" />
        </div>
      </div>
    </section>
  );
}
