import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface BrandLogoProps {
  className?: string;
  imgClassName?: string;
  to?: string;
  onClick?: () => void;
}

export default function BrandLogo({ className = '', imgClassName = '', to, onClick }: BrandLogoProps) {
  const navigate = useNavigate();

  const handleLogoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClick) {
      onClick();
    }
    navigate(to || '/');
  };

  const content = (
    <img
      src="https://ghymn1004-ai.github.io/job/images/logo.png"
      alt="이음JOB 로고"
      className={`w-full h-full object-contain cursor-pointer hover:opacity-90 transition-all ${imgClassName}`}
      onError={(e) => {
        const target = e.currentTarget;
        const fallbackUrl = window.location.origin + "/logo_eumjob.png";
        if (target.src !== fallbackUrl) {
          console.warn("Primary logo failed to load. Falling back to local logo_eumjob.png");
          target.src = "/logo_eumjob.png";
        }
      }}
    />
  );

  return (
    <div 
      className={`inline-block ${className}`} 
      onClick={handleLogoClick} 
      id="brand-logo-container"
    >
      {content}
    </div>
  );
}



