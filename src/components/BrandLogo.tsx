interface BrandLogoProps {
  className?: string;
  imgClassName?: string;
}

export default function BrandLogo({ className = '', imgClassName = '' }: BrandLogoProps) {
  return (
    <div className={className}>
      <img
        src="https://ghymn1004-ai.github.io/job/images/logo.png"
        alt="이음JOB Logo"
        className={`w-full h-full object-contain ${imgClassName}`}
      />
    </div>
  );
}

