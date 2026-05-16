import React, { createContext, useContext, useState, ReactNode } from 'react';
import InquiryModal from './InquiryModal';

interface InquiryContextType {
  openInquiry: (type?: 'individual' | 'corporate' | 'education') => void;
}

const InquiryContext = createContext<InquiryContextType | undefined>(undefined);

export function InquiryProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialType, setInitialType] = useState<'individual' | 'corporate' | 'education'>('corporate');

  const openInquiry = (type?: 'individual' | 'corporate' | 'education') => {
    if (type) setInitialType(type);
    setIsOpen(true);
  };
  const closeInquiry = () => setIsOpen(false);

  return (
    <InquiryContext.Provider value={{ openInquiry }}>
      {children}
      <InquiryModal isOpen={isOpen} onClose={closeInquiry} initialType={initialType} />
    </InquiryContext.Provider>
  );
}

export function useInquiry() {
  const context = useContext(InquiryContext);
  if (context === undefined) {
    throw new Error('useInquiry must be used within an InquiryProvider');
  }
  return context;
}
