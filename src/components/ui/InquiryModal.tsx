import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Calendar, User, Building, Phone, Mail, GraduationCap, Briefcase, MessageSquare, Globe, Zap, Brain, Sparkles, Search, Target } from 'lucide-react';
import { cn } from '../../lib/utils';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: 'individual' | 'corporate' | 'education' | 'ai-match';
}

export default function InquiryModal({ isOpen, onClose, initialType = 'corporate' }: InquiryModalProps) {
  const [inquiryType, setInquiryType] = useState<'individual' | 'corporate' | 'education' | 'ai-match'>(initialType);
  
  React.useEffect(() => {
    if (isOpen) {
      setInquiryType(initialType);
    }
  }, [isOpen, initialType]);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    jobTitle: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Inquiry submitted:', { type: inquiryType, ...formData });
    alert(`${inquiryType === 'corporate' ? '인재찾기(맞춤 인재 제작)' : inquiryType === 'individual' ? '일자리찾기(AI 매칭 및 기업 연계)' : inquiryType === 'ai-match' ? 'AI 정밀 매칭' : '매칭 기업 맞춤 교육'} 신청이 성공적으로 접수되었습니다. 담당 전문가가 곧 연락드리겠습니다.`);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 m-auto w-full max-w-2xl h-fit max-h-[90vh] overflow-y-auto bg-white rounded-[40px] shadow-2xl z-[70] p-8 md:p-12 no-scrollbar"
          >
            <div className="flex justify-between items-start mb-8">
              <div className="flex-grow">
                <div className="flex flex-wrap gap-2 mb-6 p-1.5 bg-slate-100 rounded-[24px] w-fit">
                   {(['individual', 'corporate', 'ai-match', 'education'] as const).map((type) => (
                     <button 
                       key={type}
                       onClick={() => setInquiryType(type)}
                       className={cn(
                         "px-5 py-2.5 rounded-[18px] text-xs font-black transition-all",
                         inquiryType === type ? "bg-white text-brand shadow-sm" : "text-slate-400 hover:text-slate-600"
                       )}
                     >
                       {type === 'individual' ? '일자리찾기' : type === 'corporate' ? '인재찾기' : type === 'ai-match' ? 'AI매칭' : 'AI직무교육'}
                     </button>
                   ))}
                </div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
                  {inquiryType === 'individual' ? '일자리찾기 신청서' : inquiryType === 'corporate' ? '인재찾기 신청서' : inquiryType === 'ai-match' ? 'AI매칭 신청서' : 'AI직무교육 신청서'}
                </h2>
                <p className="text-slate-500 font-bold">
                  {inquiryType === 'individual' 
                    ? '원하는 일을 찾아 세상이 다시 인정하는 인재로 태어나는 시작입니다.' 
                    : inquiryType === 'corporate'
                    ? '기업에 꼭 필요한 인재로 다듬어 세상에 다시 증명합니다.'
                    : inquiryType === 'ai-match'
                    ? 'AI 분석을 통해 최적의 매칭 결과를 도출합니다.'
                    : '직무 실무 역량을 강화하는 AI 교육을 신청하세요.'}
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-100 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all ml-4"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Common Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <User size={14} className="text-brand" /> 성함
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="성함을 입력해주세요"
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all font-bold text-sm"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Phone size={14} className="text-brand" /> 연락처
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="010-0000-0000"
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all font-bold text-sm"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              {inquiryType === 'individual' && (
                <div className="space-y-6">
                  <div className="p-6 bg-brand/5 border border-brand/10 rounded-[32px] space-y-6">
                    <p className="text-[11px] font-black text-brand uppercase tracking-widest flex items-center gap-2">
                       <Search size={14} /> 나를 발견하고 찾는 과정
                    </p>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[13px] font-black text-slate-700">1. 살아온 경험 중 가장 보람찼던 일은 무엇인가요?</label>
                        <textarea 
                          required
                          placeholder="작은 경험이라도 좋습니다. 내가 살아있음을 느꼈던 순간을 적어주세요."
                          className="w-full px-5 py-4 bg-white border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all font-medium text-sm resize-none"
                          rows={2}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[13px] font-black text-slate-700">2. 어떤 일을 할 때 가장 "나답다"고 느끼시나요?</label>
                        <input 
                          required
                          placeholder="예: 사람들을 가르칠 때, 무언가를 정리할 때, 상담해줄 때 등"
                          className="w-full px-5 py-4 bg-white border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all font-medium text-sm"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[13px] font-black text-slate-700">3. 주변에서 말하는 나의 장점</label>
                          <input placeholder="예: 책임감이 강하다, 따뜻하다" className="w-full px-5 py-3 bg-white border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all font-medium text-sm" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[13px] font-black text-slate-700">4. 일에서 가장 중요한 가치</label>
                          <select className="w-full px-5 py-3 bg-white border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all font-medium text-sm appearance-none">
                            <option>사회적 존중과 보람</option>
                            <option>경제적 수익</option>
                            <option>안정적인 소속감</option>
                            <option>새로운 배움과 성장</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                       <Target size={14} className="text-brand" /> 원하는 일자리 신청
                    </p>
                    <div className="space-y-2">
                      <label className="text-[13px] font-black text-slate-700">인생 2막에서 꼭 도전해보고 싶은 역할이 있다면?</label>
                      <input 
                        required
                        placeholder="구체적인 직업명이 아니어도 성격이나 역할 위주로 적어주세요."
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all font-medium text-sm"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[13px] font-black text-slate-700">희망 근무 형태</label>
                        <select className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all font-medium text-sm appearance-none">
                          <option>상관 없음</option>
                          <option>상근 (주 5일)</option>
                          <option>비상근 (주 2~3일)</option>
                          <option>재택/유연 근무</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[13px] font-black text-slate-700">희망 근무 지역</label>
                        <input placeholder="예: 서울 강남구" className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all font-medium text-sm" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {inquiryType === 'corporate' && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <Building size={14} className="text-brand" /> 기업명
                    </label>
                    <input required placeholder="기업명을 입력해주세요" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all font-bold text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <Briefcase size={14} className="text-brand" /> 채용 공고 정보
                    </label>
                    <textarea 
                      required
                      placeholder="찾으시는 인재의 직무와 주요 요건을 입력해주세요"
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all font-bold text-sm resize-none"
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <Brain size={14} className="text-brand" /> 선호하는 인재 성향
                    </label>
                    <input placeholder="예: 주도적인 리더십, 조직 융화가 빠른 타입 등" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all font-bold text-sm" />
                  </div>
                </div>
              )}

              {inquiryType === 'ai-match' && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <Mail size={14} className="text-brand" /> 분석 결과 수신 이메일
                    </label>
                    <input required type="email" placeholder="분석 리포트를 받을 이메일 주소" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all font-bold text-sm" />
                  </div>
                  <div className="p-6 bg-brand/5 border border-dashed border-brand/20 rounded-3xl">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" required className="w-5 h-5 accent-brand" />
                      <span className="text-sm font-bold text-slate-700">AI 정밀 분석 활용 및 개인정보 제공에 동의합니다.</span>
                    </label>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <Sparkles size={14} className="text-brand" /> AI 심층 질문 답변
                    </label>
                    <p className="text-[10px] text-slate-500 font-bold mb-2">질문: 당신의 직업적 가치관에서 가장 중요한 키워드는 무엇인가요?</p>
                    <textarea 
                      placeholder="키워드와 그 이유를 짧게 적어주세요"
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all font-bold text-sm resize-none"
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {inquiryType === 'education' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <GraduationCap size={14} className="text-brand" /> 희망 교육 선택
                      </label>
                      <select className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all font-bold text-sm appearance-none">
                        <option>디지털/AI 기초</option>
                        <option>AI 활용 실무</option>
                        <option>직무 전문 과정</option>
                        <option>취업 역량 강화</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Search size={14} className="text-brand" /> 현재 디지털 수준
                      </label>
                      <select className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all font-bold text-sm appearance-none">
                        <option>입문 (컴퓨터 사용 익숙)</option>
                        <option>중급 (오피스 활용 가능)</option>
                        <option>고급 (기술/AI 툴 경험)</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <Zap size={14} className="text-brand" /> 학습 목적
                    </label>
                    <input placeholder="예: 재취업 준비, 직무 역량 향상 등" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all font-bold text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <Globe size={14} className="text-brand" /> 선호 교육 방식
                    </label>
                    <div className="flex gap-4">
                      {['온라인 전용', '오프라인 실무', '병행'].map(mode => (
                        <label key={mode} className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="edu_mode" className="w-4 h-4 accent-brand" />
                          <span className="text-sm font-bold text-slate-700">{mode}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <MessageSquare size={14} className="text-brand" /> 상세 문의 및 요청사항
                </label>
                <textarea
                  rows={3}
                  placeholder="추가적으로 전달하실 요청사항이 있다면 자유롭게 적어주세요."
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all font-bold text-sm resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button
                type="submit"
                className="w-full py-5 bg-brand text-white rounded-[24px] font-black text-lg shadow-xl shadow-brand/20 hover:bg-brand-hover active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
              >
                {inquiryType === 'corporate' ? '인재찾기 신청 완료' : inquiryType === 'individual' ? '일자리찾기 신청 완료' : inquiryType === 'ai-match' ? 'AI매칭 분석 시작' : '교육 상담 신청 완료'}
                <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
              <p className="text-center text-[10px] text-slate-400 font-bold italic">
                * 전송된 정보는 매칭 전문가가 검토 후 영업일 기준 24시간 이내에 연락드립니다.
              </p>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
