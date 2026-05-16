import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Calendar, User, Building, Phone, Mail, GraduationCap, Briefcase, MessageSquare, Globe, Zap, Brain, Sparkles, Search, Target, Award, Users, MapPin } from 'lucide-react';
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

  const [formData, setFormData] = useState<any>(() => {
    try {
      const saved = localStorage.getItem('inquiry_form_data');
      return saved ? JSON.parse(saved) : {
        name: '',
        phone: '',
        email: '',
        birthDate: '',
        residence: '',
        hopeRegion: '',
        company: '',
        jobTitle: '',
        message: '',
        industry: '',
        employeeCount: '',
        companyLocation: '',
        salaryRange: '',
        workHours: '',
        // Expanded fields
        workTypes: [],
        desiredJobs: [],
        // Seeker Pillar 1
        mainJob: '',
        totalExp: '',
        longField: '',
        coreTasksSe: '',
        checklistsSe: [],
        selfIntroSe: '',
        // Seeker Pillar 2
        proficiencyChecksSe: [],
        strengthIntroSe: '',
        // Seeker Pillar 3
        attitudeSe: {},
        adaptIntroSe: '',
        // Seeker Pillar 4
        collabChecksSe: [],
        collabIntroSe: '',
        // Seeker Pillar 5
        growthChecksSe: [],
        growthGoalSe: '',
        finalIntroSe: '',
        // Corporate Info
        openJobs: '',
        hireCount: '',
        corpWorkTypes: [],
        corpSalary: '',
        corpWorkHours: '',
        // Corp Pillar 1
        corpCoreSkills: [],
        minExp: '',
        prefInd: '',
        importance: '',
        // Corp Pillar 2
        corpProficiencyLevel: [],
        veteranCriteria: '',
        // Corp Pillar 3
        corpCulture: [],
        corpImportantAttitude: [],
        // Corp Pillar 4
        corpCollabTypes: [],
        corpCollabDesc: '',
        // Corp Pillar 5
        corpGrowthValues: [],
        corpExpectation: '',
      };
    } catch (e) {
      console.error('Failed to parse inquiry_form_data', e);
      return {
        name: '',
        phone: '',
        email: '',
        birthDate: '',
        residence: '',
        hopeRegion: '',
        company: '',
        jobTitle: '',
        message: '',
        industry: '',
        employeeCount: '',
        companyLocation: '',
        salaryRange: '',
        workHours: '',
        workTypes: [],
        desiredJobs: [],
        mainJob: '',
        totalExp: '',
        longField: '',
        coreTasksSe: '',
        checklistsSe: [],
        selfIntroSe: '',
        proficiencyChecksSe: [],
        strengthIntroSe: '',
        attitudeSe: {},
        adaptIntroSe: '',
        collabChecksSe: [],
        collabIntroSe: '',
        growthChecksSe: [],
        growthGoalSe: '',
        finalIntroSe: '',
        openJobs: '',
        hireCount: '',
        corpWorkTypes: [],
        corpSalary: '',
        corpWorkHours: '',
        corpCoreSkills: [],
        minExp: '',
        prefInd: '',
        importance: '',
        corpProficiencyLevel: [],
        veteranCriteria: '',
        corpCulture: [],
        corpImportantAttitude: [],
        corpCollabTypes: [],
        corpCollabDesc: '',
        corpGrowthValues: [],
        corpExpectation: '',
      };
    }
  });

  React.useEffect(() => {
    localStorage.setItem('inquiry_form_data', JSON.stringify(formData));
  }, [formData]);

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
                <div className="space-y-10">
                  {/* Basic Info Expansion */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Calendar size={14} className="text-brand" /> 생년월일
                      </label>
                      <input
                        type="text"
                        placeholder="YYYY-MM-DD"
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all font-bold text-sm"
                        value={formData.birthDate}
                        onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Mail size={14} className="text-brand" /> 이메일
                      </label>
                      <input
                        type="email"
                        placeholder="example@email.com"
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all font-bold text-sm"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Globe size={14} className="text-brand" /> 거주지역
                      </label>
                      <input
                        placeholder="예: 서울시 강남구"
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all font-bold text-sm"
                        value={formData.residence}
                        onChange={(e) => setFormData({ ...formData, residence: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Target size={14} className="text-brand" /> 희망근무지역
                      </label>
                      <input
                        placeholder="예: 서울 전역, 경기 남부 등"
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all font-bold text-sm"
                        value={formData.hopeRegion}
                        onChange={(e) => setFormData({ ...formData, hopeRegion: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* 희망근무형태 & 직무 */}
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">희망근무형태 (중복 선택 가능)</label>
                      <div className="flex flex-wrap gap-3">
                        {['정규직', '계약직', '파트타임', '재택근무 가능', '탄력근무 가능'].map(item => (
                          <label key={item} className="flex items-center gap-2 cursor-pointer px-4 py-2 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors">
                            <input 
                              type="checkbox" 
                              className="w-4 h-4 accent-brand" 
                              checked={formData.workTypes?.includes(item)}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                const workTypes = formData.workTypes || [];
                                setFormData({
                                  ...formData,
                                  workTypes: checked 
                                    ? [...workTypes, item] 
                                    : workTypes.filter((i: string) => i !== item)
                                });
                              }}
                            />
                            <span className="text-[13px] font-bold text-slate-700">{item}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">희망 직무 선택</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {['사무행정', '고객상담', '교육보조', '커뮤니티 운영', '콘텐츠/SNS', '운영관리', '돌봄/케어', '기타'].map(item => (
                          <label key={item} className="flex items-center gap-2 cursor-pointer px-4 py-3 border border-slate-100 rounded-xl hover:border-brand/30 transition-all">
                            <input type="checkbox" className="w-4 h-4 accent-brand" />
                            <span className="text-[13px] font-bold text-slate-700">{item}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 1. 직무전문성 / 실무역량 */}
                    <div className="space-y-6">
                      <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                         <Briefcase size={20} className="text-brand" /> 1. 직무전문성 / 실무역량
                      </h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input 
                            placeholder="주요 직무" 
                            className="w-full px-5 py-3 bg-white border border-slate-100 rounded-2xl outline-none font-bold text-sm" 
                            value={formData.mainJob}
                            onChange={(e) => setFormData({ ...formData, mainJob: e.target.value })}
                          />
                          <input 
                            placeholder="총 경력 년수" 
                            className="w-full px-5 py-3 bg-white border border-slate-100 rounded-2xl outline-none font-bold text-sm" 
                            value={formData.totalExp}
                            onChange={(e) => setFormData({ ...formData, totalExp: e.target.value })}
                          />
                        </div>
                        <input 
                          placeholder="가장 오래 근무한 분야" 
                          className="w-full px-5 py-3 bg-white border border-slate-100 rounded-2xl outline-none font-bold text-sm" 
                          value={formData.longField}
                          onChange={(e) => setFormData({ ...formData, longField: e.target.value })}
                        />
                        <textarea 
                          placeholder="담당했던 핵심 업무" 
                          className="w-full px-5 py-3 bg-white border border-slate-100 rounded-2xl outline-none font-bold text-sm resize-none" 
                          rows={2} 
                          value={formData.coreTasksSe}
                          onChange={(e) => setFormData({ ...formData, coreTasksSe: e.target.value })}
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-xs font-black text-slate-500">실무 경험 체크리스트</label>
                        <div className="flex flex-wrap gap-2">
                          {['고객응대', '전화상담', '문서작성', '일정관리', '조직관리', '교육진행', '컴퓨터 활용', '민원응대', '판매/영업', '온라인/SNS 운영', '데이터 정리', '팀 협업', '보고서 작성'].map(item => (
                            <label key={item} className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-100 rounded-lg cursor-pointer">
                              <input 
                                type="checkbox" 
                                className="w-3 h-3 accent-brand" 
                                checked={formData.checklistsSe?.includes(item)}
                                onChange={(e) => {
                                  const checked = e.target.checked;
                                  const list = formData.checklistsSe || [];
                                  setFormData({
                                    ...formData,
                                    checklistsSe: checked ? [...list, item] : list.filter((i: string) => i !== item)
                                  });
                                }}
                              />
                              <span className="text-[11px] font-bold text-slate-600">{item}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[13px] font-black text-slate-700">실무 역량 자기소개 (1000자 이내)</label>
                        <textarea 
                          placeholder="본인이 가장 자신 있게 수행할 수 있는 업무 경험과 성과를 작성해주세요."
                          className="w-full px-5 py-4 bg-white border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all font-medium text-sm resize-none"
                          rows={4}
                          value={formData.selfIntroSe}
                          onChange={(e) => setFormData({ ...formData, selfIntroSe: e.target.value })}
                        />
                      </div>
                    </div>

                  {/* 2. 경력 숙련도 */}
                  <div className="p-8 bg-slate-50 border border-slate-100 rounded-[40px] space-y-6">
                    <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                       <Award size={20} className="text-brand" /> 2. 경력 숙련도
                    </h3>
                    <div className="space-y-4">
                      <label className="text-xs font-black text-slate-500">업무 숙련 체크</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {['동일 직무 5년 이상 경험', '팀장/관리 경험 있음', '신입 교육 경험 있음', '문제 해결 경험 많음', '위기 상황 대응 경험 있음', '고객 컴플레인 해결 경험 있음', '반복 업무 숙련도 높음'].map(item => (
                          <label key={item} className="flex items-center gap-3 px-4 py-3 bg-white border border-slate-100 rounded-xl cursor-pointer">
                            <input 
                              type="checkbox" 
                              className="w-4 h-4 accent-brand" 
                              checked={formData.proficiencyChecksSe?.includes(item)}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                const list = formData.proficiencyChecksSe || [];
                                setFormData({
                                  ...formData,
                                  proficiencyChecksSe: checked ? [...list, item] : list.filter((i: string) => i !== item)
                                });
                              }}
                            />
                            <span className="text-[12px] font-bold text-slate-600">{item}</span>
                          </label>
                        ))}
                      </div>
                      <div className="space-y-2">
                        <label className="text-[13px] font-black text-slate-700">경력 강점 작성 (500자 이내)</label>
                        <textarea 
                          placeholder="본인의 경험이 현장에서 어떤 강점이 될 수 있다고 생각하나요?"
                          className="w-full px-5 py-4 bg-white border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all font-medium text-sm resize-none"
                          rows={3}
                          value={formData.strengthIntroSe}
                          onChange={(e) => setFormData({ ...formData, strengthIntroSe: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  {/* 3. 조직적응 / 업무태도 */}
                  <div className="p-8 bg-slate-50 border border-slate-100 rounded-[40px] space-y-6">
                    <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                       <Zap size={20} className="text-brand" /> 3. 조직적응 / 업무태도
                    </h3>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 gap-4">
                        {[
                          { key: 'feedback', label: '피드백을 받으면', options: ['바로 수정', '설명 후 수정', '쉽게 받아들이기 어려움'] },
                          { key: 'newWay', label: '새로운 업무 방식', options: ['적용 수용', '천천히 적응', '익숙한 방식 선호'] },
                          { key: 'collab', label: '협업 상황에서', options: ['먼저 돕는 편', '요청 시 도움', '혼자 처리 선호'] },
                          { key: 'deadline', label: '업무 마감', options: ['항상 준수', '대부분 준수', '상황에 따라 다름'] },
                        ].map((item, idx) => (
                          <div key={idx} className="space-y-2">
                            <label className="text-[13px] font-black text-slate-700">{item.label}</label>
                            <div className="flex flex-wrap gap-2">
                              {item.options.map(opt => (
                                <label key={opt} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-100 rounded-lg cursor-pointer">
                                  <input 
                                    type="radio" 
                                    name={item.key} 
                                    className="w-3 h-3 accent-brand" 
                                    checked={formData.attitudeSe?.[item.key] === opt}
                                    onChange={() => setFormData({
                                      ...formData,
                                      attitudeSe: { ...formData.attitudeSe, [item.key]: opt }
                                    })}
                                  />
                                  <span className="text-[11px] font-bold text-slate-600">{opt}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-2">
                        <label className="text-[13px] font-black text-slate-700">조직 적응 질문 (500자 이내)</label>
                        <textarea 
                          placeholder="새로운 조직에 적응하기 위해 가장 중요하다고 생각하는 것은 무엇인가요?"
                          className="w-full px-5 py-4 bg-white border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all font-medium text-sm resize-none"
                          rows={3}
                          value={formData.adaptIntroSe}
                          onChange={(e) => setFormData({ ...formData, adaptIntroSe: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  {/* 4. 소통 / 협업능력 */}
                  <div className="p-8 bg-slate-50 border border-slate-100 rounded-[40px] space-y-6">
                    <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                       <MessageSquare size={20} className="text-brand" /> 4. 소통 / 협업능력
                    </h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {['경청을 잘하는 편이다', '갈등 상황에서 감정을 조절하는 편이다', '젊은 세대와 협업 경험이 있다', '고객 응대 경험이 많다', '먼저 인사하고 배려하는 편이다', '팀 분위기를 중요하게 생각한다'].map(item => (
                          <label key={item} className="flex items-center gap-3 px-4 py-3 bg-white border border-slate-100 rounded-xl cursor-pointer">
                            <input 
                              type="checkbox" 
                              className="w-4 h-4 accent-brand" 
                              checked={formData.collabChecksSe?.includes(item)}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                const list = formData.collabChecksSe || [];
                                setFormData({
                                  ...formData,
                                  collabChecksSe: checked ? [...list, item] : list.filter((i: string) => i !== item)
                                });
                              }}
                            />
                            <span className="text-[12px] font-bold text-slate-600">{item}</span>
                          </label>
                        ))}
                      </div>
                      <div className="space-y-2">
                        <label className="text-[13px] font-black text-slate-700">협업 경험 작성 (700자 이내)</label>
                        <textarea 
                          placeholder="다른 사람과 협업하며 좋은 결과를 만든 경험을 작성해주세요."
                          className="w-full px-5 py-4 bg-white border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all font-medium text-sm resize-none"
                          rows={3}
                          value={formData.collabIntroSe}
                          onChange={(e) => setFormData({ ...formData, collabIntroSe: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  {/* 5. 성장 / 지속가능성 */}
                  <div className="p-8 bg-slate-50 border border-slate-100 rounded-[40px] space-y-6">
                    <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                       <Sparkles size={20} className="text-brand" /> 5. 성장 / 지속가능성
                    </h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {['새로운 것을 배우는 것이 즐겁다', 'AI/디지털 교육 참여 의향 있음', '장기근무 희망', '꾸준히 일하고 싶음', '인생2막 직업을 찾고 있음'].map(item => (
                          <label key={item} className="flex items-center gap-3 px-4 py-3 bg-white border border-slate-100 rounded-xl cursor-pointer">
                            <input 
                              type="checkbox" 
                              className="w-4 h-4 accent-brand" 
                              checked={formData.growthChecksSe?.includes(item)}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                const list = formData.growthChecksSe || [];
                                setFormData({
                                  ...formData,
                                  growthChecksSe: checked ? [...list, item] : list.filter((i: string) => i !== item)
                                });
                              }}
                            />
                            <span className="text-[12px] font-bold text-slate-600">{item}</span>
                          </label>
                        ))}
                      </div>
                      <div className="space-y-2">
                        <label className="text-[13px] font-black text-slate-700">미래 목표 작성 (700자 이내)</label>
                        <textarea 
                          placeholder="앞으로 어떤 일을 하며 살아가고 싶은가요?"
                          className="w-full px-5 py-4 bg-white border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all font-medium text-sm resize-none"
                          rows={3}
                          value={formData.growthGoalSe}
                          onChange={(e) => setFormData({ ...formData, growthGoalSe: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  {/* 최종 자기소개 */}
                  <div className="space-y-4">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">최종 자기소개 (1000자 이내)</label>
                    <textarea 
                      required
                      placeholder="왜 다시 일하고 싶으신가요? 그리고 어떤 사람으로 기억되고 싶으신가요?"
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all font-bold text-sm resize-none"
                      rows={5}
                      value={formData.finalIntroSe}
                      onChange={(e) => setFormData({ ...formData, finalIntroSe: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {inquiryType === 'corporate' && (
                <div className="space-y-10">
                  {/* Basic Info Expansion */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Building size={14} className="text-brand" /> 기업명
                      </label>
                      <input
                        required
                        placeholder="기업명을 입력해주세요"
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all font-bold text-sm"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <User size={14} className="text-brand" /> 담당자명
                      </label>
                      <input
                        required
                        placeholder="성함을 입력해주세요"
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all font-bold text-sm"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Globe size={14} className="text-brand" /> 업종
                      </label>
                      <input
                        placeholder="예: IT 서비스, 제조업 등"
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all font-bold text-sm"
                        value={formData.industry}
                        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Users size={14} className="text-brand" /> 직원 수
                      </label>
                      <input
                        placeholder="예: 50명"
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all font-bold text-sm"
                        value={formData.employeeCount}
                        onChange={(e) => setFormData({ ...formData, employeeCount: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <MapPin size={14} className="text-brand" /> 회사 위치
                    </label>
                    <input
                      placeholder="회사 주소를 입력해주세요"
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all font-bold text-sm"
                      value={formData.companyLocation}
                      onChange={(e) => setFormData({ ...formData, companyLocation: e.target.value })}
                    />
                  </div>

                  {/* 채용 정보 */}
                  <div className="p-8 bg-slate-50 border border-slate-100 rounded-[40px] space-y-6">
                    <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                       <Search size={20} className="text-brand" /> 채용 정보
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input placeholder="모집 직무" className="w-full px-5 py-3 bg-white border border-slate-100 rounded-2xl outline-none font-bold text-sm" />
                      <input placeholder="채용 인원" className="w-full px-5 py-3 bg-white border border-slate-100 rounded-2xl outline-none font-bold text-sm" />
                    </div>
                    <div className="space-y-4">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">근무형태</label>
                      <div className="flex flex-wrap gap-2">
                        {['정규직', '계약직', '파트타임', '재택 가능'].map(item => (
                          <label key={item} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-100 rounded-xl cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 accent-brand" />
                            <span className="text-[12px] font-bold text-slate-600">{item}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input placeholder="급여 범위" className="w-full px-5 py-3 bg-white border border-slate-100 rounded-2xl outline-none font-bold text-sm" />
                      <input placeholder="근무 시간" className="w-full px-5 py-3 bg-white border border-slate-100 rounded-2xl outline-none font-bold text-sm" />
                    </div>
                  </div>

                  {/* 1. 직무전문성 / 실무역량 */}
                  <div className="p-8 bg-brand/5 border border-brand/10 rounded-[40px] space-y-6">
                    <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                       <Briefcase size={20} className="text-brand" /> 1. 직무전문성 / 실무역량
                    </h3>
                    <div className="space-y-4">
                      <label className="text-xs font-black text-slate-500">기업이 원하는 핵심 역량 체크</label>
                      <div className="flex flex-wrap gap-2">
                        {['고객응대 경험', '행정/문서 실무', '조직관리 경험', '교육/안내 경험', '컴퓨터 활용 능력', '민원응대 경험', '보고 체계 이해', '서비스 마인드', '현장 대응 능력', '반복업무 숙련도'].map(item => (
                          <label key={item} className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-100 rounded-lg cursor-pointer">
                            <input type="checkbox" className="w-3 h-3 accent-brand" />
                            <span className="text-[11px] font-bold text-slate-600">{item}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input placeholder="최소 경력 (예: 5년 이상)" className="w-full px-5 py-3 bg-white border border-slate-100 rounded-2xl outline-none font-bold text-sm" />
                      <input placeholder="우대 업종" className="w-full px-5 py-3 bg-white border border-slate-100 rounded-2xl outline-none font-bold text-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[13px] font-black text-slate-700">즉시 실무 가능 여부 중요도</label>
                      <div className="flex gap-4">
                        {['매우 중요', '중요', '보통'].map(label => (
                          <label key={label} className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="importance" className="w-4 h-4 accent-brand" />
                            <span className="text-sm font-bold text-slate-600">{label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 2. 경력 숙련도 */}
                  <div className="p-8 bg-slate-50 border border-slate-100 rounded-[40px] space-y-6">
                    <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                       <Award size={20} className="text-brand" /> 2. 경력 숙련도
                    </h3>
                    <div className="space-y-4">
                      <label className="text-xs font-black text-slate-500">기업이 원하는 숙련 수준</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {['동일 업종 경험자 선호', '장기근속 경험 중요', '위기대응 경험 중요', '관리자 경험 우대', '고객 컴플레인 경험 우대'].map(item => (
                          <label key={item} className="flex items-center gap-3 px-4 py-3 bg-white border border-slate-100 rounded-xl cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 accent-brand" />
                            <span className="text-[12px] font-bold text-slate-600">{item}</span>
                          </label>
                        ))}
                      </div>
                      <div className="space-y-2">
                        <label className="text-[13px] font-black text-slate-700">숙련 인재 기준 작성 (700자 이내)</label>
                        <textarea 
                          placeholder="귀사가 생각하는 ‘베테랑 인재’의 기준은 무엇인가요?"
                          className="w-full px-5 py-4 bg-white border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all font-medium text-sm resize-none"
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>

                  {/* 3. 조직적응 / 업무태도 */}
                  <div className="p-8 bg-slate-50 border border-slate-100 rounded-[40px] space-y-6">
                    <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                       <Zap size={20} className="text-brand" /> 3. 조직적응 / 업무태도
                    </h3>
                    <div className="space-y-4">
                      <label className="text-xs font-black text-slate-500">조직문화 체크</label>
                      <div className="flex flex-wrap gap-2">
                        {['수평적 조직', '협업 중심 조직', '보고체계 중요', '고객응대 비중 높음', '빠른 적응 필요', '책임감 중요', '세대 간 협업 많음'].map(item => (
                          <label key={item} className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-100 rounded-lg cursor-pointer">
                            <input type="checkbox" className="w-3 h-3 accent-brand" />
                            <span className="text-[11px] font-bold text-slate-600">{item}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <label className="text-xs font-black text-slate-500">중요 태도 선택 (3개 선택)</label>
                      <div className="grid grid-cols-3 gap-2">
                        {['책임감', '성실성', '시간 약속', '피드백 수용', '배려', '유연성', '꾸준함', '안정감', '긍정성'].map(item => (
                          <label key={item} className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-100 rounded-lg cursor-pointer">
                            <input type="checkbox" className="w-3 h-3 accent-brand" />
                            <span className="text-[11px] font-bold text-slate-600">{item}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 4. 소통 / 협업능력 */}
                  <div className="p-8 bg-slate-50 border border-slate-100 rounded-[40px] space-y-6">
                    <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                       <MessageSquare size={20} className="text-brand" /> 4. 소통 / 협업능력
                    </h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        {['고객 친화형', '차분한 소통형', '팀 협업형', '독립업무형', '친절한 응대형', '공감 능력 중요'].map(item => (
                          <label key={item} className="flex items-center gap-3 px-4 py-3 bg-white border border-slate-100 rounded-xl cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 accent-brand" />
                            <span className="text-[12px] font-bold text-slate-600">{item}</span>
                          </label>
                        ))}
                      </div>
                      <div className="space-y-2">
                        <label className="text-[13px] font-black text-slate-700">협업 환경 설명 (700자 이내)</label>
                        <textarea 
                          placeholder="귀사의 업무 환경과 협업 문화를 설명해주세요."
                          className="w-full px-5 py-4 bg-white border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all font-medium text-sm resize-none"
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>

                  {/* 5. 성장 / 지속가능성 */}
                  <div className="p-8 bg-slate-50 border border-slate-100 rounded-[40px] space-y-6">
                    <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                       <Sparkles size={20} className="text-brand" /> 5. 성장 / 지속가능성
                    </h3>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {['장기근속 중요', '안정적 근무 중요', '꾸준함 중요', '배우려는 태도 중요', '조직 적응 중요'].map(item => (
                          <label key={item} className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-100 rounded-lg cursor-pointer">
                            <input type="checkbox" className="w-3 h-3 accent-brand" />
                            <span className="text-[11px] font-bold text-slate-600">{item}</span>
                          </label>
                        ))}
                      </div>
                      <div className="space-y-2">
                        <label className="text-[13px] font-black text-slate-700">기업 기대사항 (1000자 이내)</label>
                        <textarea 
                          placeholder="귀사는 어떤 사람과 오래 함께 일하고 싶으신가요?"
                          className="w-full px-5 py-4 bg-white border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all font-medium text-sm resize-none"
                          rows={4}
                        />
                      </div>
                    </div>
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
