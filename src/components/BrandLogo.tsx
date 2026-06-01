import { useState } from 'react';

interface BrandLogoProps {
  className?: string;
  imgClassName?: string;
}

export default function BrandLogo({ className = '', imgClassName = '' }: BrandLogoProps) {
  return (
    <div className={className} id="brand-logo-container">
      <img
        src="https://ghymn1004-ai.github.io/job/images/logo.png"
        alt="이음JOB 로고"
        className={`w-full h-full object-contain ${imgClassName}`}
        onError={(e) => {
          const target = e.currentTarget;
          const fallbackUrl = window.location.origin + "/logo_eumjob.png";
          if (target.src !== fallbackUrl) {
            console.warn("Primary logo failed to load. Falling back to local logo_eumjob.png");
            target.src = "/logo_eumjob.png";
          }
        }}
      />
    </div>
  );
}

