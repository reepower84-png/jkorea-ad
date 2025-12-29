import CTAButton from './CTAButton';

const products = [
  {
    name: '프리미엄 전기매트',
    subtitle: '온 가족을 위한 건강 매트',
    features: ['원적외선 방출', '디지털 온도조절', '타이머 기능', '전자파 차단'],
    highlight: '베스트셀러',
    color: 'from-red-500 to-orange-500',
    image: '/온열매트_2-removebg-preview.png'
  },
  {
    name: '금운모 돔사우나',
    subtitle: '집에서 즐기는 찜질방',
    features: ['황토 돔 구조', '음이온 방출', '실리콘 열선 장착', '접이식 설계'],
    highlight: '인기상품',
    color: 'from-orange-500 to-yellow-500',
    image: '/누끼_썬돔E_모델_옆면 2.png'
  },
];

export default function Products() {
  return (
    <section id="products" className="py-20 md:py-28 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-red-400 font-semibold mb-2">OUR PRODUCTS</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            인기 제품 라인업
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            고객님의 건강과 편안함을 위해 엄선된 프리미엄 제품들을 소개합니다
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {products.map((product, index) => (
            <div
              key={index}
              className="relative bg-gray-800 rounded-3xl overflow-hidden group hover:transform hover:scale-105 transition-all duration-300"
            >
              {/* Highlight Badge */}
              <div className={`absolute top-4 right-4 bg-gradient-to-r ${product.color} text-white text-sm font-bold px-4 py-1 rounded-full`}>
                {product.highlight}
              </div>

              {/* Product Image */}
              {product.image ? (
                <div className="h-48 bg-gray-700 flex items-center justify-center">
                  <img src={product.image} alt={product.name} className="h-full object-contain" />
                </div>
              ) : (
                <div className={`h-48 bg-gradient-to-br ${product.color} opacity-20`} />
              )}

              <div className="p-6">
                <h3 className="text-2xl font-bold mb-1">{product.name}</h3>
                <p className="text-gray-400 mb-4">{product.subtitle}</p>

                <ul className="space-y-2 mb-6">
                  {product.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center text-gray-300">
                      <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <CTAButton text="상담 신청" size="sm" className="w-full" />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400 mb-4">
            어떤 제품이 나에게 맞을지 모르시겠나요?
          </p>
          <CTAButton text="전문가 무료 상담 받기" />
        </div>
      </div>
    </section>
  );
}
