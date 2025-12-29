'use client';

interface CTAButtonProps {
  text?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function CTAButton({
  text = "무료 상담 신청하기",
  className = "",
  size = 'md'
}: CTAButtonProps) {
  const scrollToForm = () => {
    const formElement = document.getElementById('contact-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sizeClasses = {
    sm: 'px-6 py-3 text-sm',
    md: 'px-8 py-4 text-base',
    lg: 'px-10 py-5 text-lg'
  };

  return (
    <button
      onClick={scrollToForm}
      className={`
        gradient-bg text-white font-bold rounded-full
        hover:opacity-90 transition-all duration-300
        animate-pulse-glow cursor-pointer
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {text}
    </button>
  );
}
