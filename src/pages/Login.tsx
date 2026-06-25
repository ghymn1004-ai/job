import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Lock, 
  ArrowRight, 
  Github, 
  Mail, 
  ShieldCheck, 
  Check, 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  FileCheck2, 
  Smartphone, 
  MapPin, 
  ShieldAlert 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import BrandLogo from '../components/BrandLogo';
import { useToast } from '../components/ui/Toast';

export default function Login() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Form states for login
  const [loginId, setLoginId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Form states for signup
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Consent states
  const [consentAll, setConsentAll] = useState(false);
  const [consentTerms, setConsentTerms] = useState(false);
  const [consentPrivacy, setConsentPrivacy] = useState(false);
  const [consentThirdParty, setConsentThirdParty] = useState(false);
  const [consentAntiScraping, setConsentAntiScraping] = useState(false);

  // Expanded details toggles
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const handleConsentAllChange = (checked: boolean) => {
    setConsentAll(checked);
    setConsentTerms(checked);
    setConsentPrivacy(checked);
    setConsentThirdParty(checked);
    setConsentAntiScraping(checked);
  };

  const handleIndividualConsentChange = (
    type: 'terms' | 'privacy' | 'thirdParty' | 'antiScraping',
    checked: boolean
  ) => {
    let t = consentTerms;
    let p = consentPrivacy;
    let r = consentThirdParty;
    let a = consentAntiScraping;

    if (type === 'terms') {
      setConsentTerms(checked);
      t = checked;
    } else if (type === 'privacy') {
      setConsentPrivacy(checked);
      p = checked;
    } else if (type === 'thirdParty') {
      setConsentThirdParty(checked);
      r = checked;
    } else if (type === 'antiScraping') {
      setConsentAntiScraping(checked);
      a = checked;
    }

    if (t && p && r && a) {
      setConsentAll(true);
    } else {
      setConsentAll(false);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginId || !loginPassword) {
      showToast('아이디와 비밀번호를 입력해주세요.', 'error');
      return;
    }

    // Checking against local storage simulation
    const savedUserStr = localStorage.getItem('iium_registered_user');
    if (savedUserStr) {
      const savedUser = JSON.parse(savedUserStr);
      if (loginId === savedUser.username) {
        localStorage.setItem('iium_user_logged', 'true');
        showToast(`로그인에 성공하였습니다. 환영합니다, ${savedUser.name}님!`, 'success');
        navigate('/mypage');
        return;
      }
    }

    // Default simulation fallback
    localStorage.setItem('iium_user_logged', 'true');
    showToast('로그인에 성공하였습니다.', 'success');
    navigate('/mypage');
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !password || !confirmPassword || !name || !email || !phone) {
      showToast('모든 가입 필수 정보를 입력해주세요.', 'error');
      return;
    }

    if (password !== confirmPassword) {
      showToast('비밀번호가 일치하지 않습니다. 다시 확인해주세요.', 'error');
      return;
    }

    if (!consentTerms || !consentPrivacy || !consentThirdParty || !consentAntiScraping) {
      showToast('회원가입 약관 및 정보 수집 이용 등에 모두 동의하셔야 합니다.', 'error');
      return;
    }

    // Save mock registration data
    const newUser = { 
      username: id, 
      name, 
      email, 
      phone,
      joinDate: new Date().toLocaleDateString()
    };
    localStorage.setItem('iium_registered_user', JSON.stringify(newUser));
    localStorage.setItem('iium_user_logged', 'true');

    showToast('이음(iium)의 50+ 회원이 되신 것을 축하합니다!', 'success');
    navigate('/mypage');
  };

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] flex items-center justify-center py-24 px-4 md:px-6">
      <AnimatePresence mode="wait">
        {!isSignUp ? (
          /* LOGIN VIEW */
          <motion.div 
            key="login-card"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -15 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md bg-white p-8 md:p-12 rounded-[40px] border border-slate-100 shadow-2xl shadow-slate-200/50"
            id="login-view-container"
          >
            <div className="text-center mb-10">
              <BrandLogo className="h-16 md:h-20 max-w-[180px] mx-auto mb-6 hover:scale-105 transition-transform" to="/" />
              <h1 className="text-2xl font-black text-slate-900 tracking-tighter">다시 일하는 설렘, 이음(iium)</h1>
              <p className="text-slate-400 font-bold text-xs mt-2">50+의 무궁한 가치를 검증된 안심 기술로 잇습니다.</p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  placeholder="아이디 또는 이메일"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all text-slate-700"
                  required
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="비밀번호"
                  className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all text-slate-700"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="flex items-center justify-between py-2 px-1">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-200 text-brand focus:ring-brand cursor-pointer accent-brand" />
                  <span className="text-xs font-bold text-slate-500 group-hover:text-slate-700">로그인 상태 유지</span>
                </label>
                <a href="#" className="text-xs font-bold text-slate-400 hover:text-brand transition-colors">비밀번호 찾기</a>
              </div>

              <button 
                type="submit"
                className="w-full py-4.5 bg-brand text-slate-950 font-black rounded-2xl text-base shadow-lg shadow-brand/10 hover:bg-brand-hover hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                로그인 <ArrowRight size={18} />
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-4 text-slate-400 font-bold tracking-widest">간편 로그인</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => {
                  showToast('카카오 연동 서비스를 로드합니다.', 'info');
                  navigate('/mypage');
                }}
                className="flex items-center justify-center gap-2 py-3.5 bg-[#FEE500] hover:bg-[#FEE500]/90 rounded-2xl transition-all font-bold text-xs text-[#191919] active:scale-95"
              >
                카카오 로그인
              </button>
              <button 
                onClick={() => {
                  showToast('네이버 연동 서비스를 로드합니다.', 'info');
                  navigate('/mypage');
                }}
                className="flex items-center justify-center gap-2 py-3.5 bg-[#03C75A] hover:bg-[#03C75A]/90 rounded-2xl transition-all font-bold text-xs text-white active:scale-95"
              >
                네이버 로그인
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100/80 flex flex-col items-center gap-2">
              <p className="text-center text-xs font-bold text-slate-400 mb-0">
                아직 회원이 아니신가요? 
                <button 
                  onClick={() => setIsSignUp(true)} 
                  className="text-brand ml-2 hover:underline font-black"
                >
                  회원가입 하기
                </button>
              </p>
              <Link to="/admin" className="text-slate-300 hover:text-brand font-black text-[10px] tracking-tight mt-1 hover:underline">
                 관리자 콘솔로 바로가기
              </Link>
            </div>
          </motion.div>
        ) : (
          /* SIGNUP VIEW WITH COMPREHENSIVE CONSENTS */
          <motion.div 
            key="signup-card"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -15 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-2xl bg-white p-8 md:p-12 rounded-[48px] border border-slate-100 shadow-2xl shadow-slate-200/50"
            id="signup-view-container"
          >
            <div className="mb-8">
              <button 
                onClick={() => setIsSignUp(false)}
                className="flex items-center gap-2 text-slate-400 hover:text-slate-800 text-xs font-black mb-6 transition-colors"
              >
                <ArrowLeft size={16} /> 로그인창으로 복귀
              </button>
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tighter">
                이음(iium) <span className="text-brand">50+ 인재 회원가입</span>
              </h1>
              <p className="text-slate-400 font-bold text-xs mt-1.5 leading-relaxed">
                50+의 빛나는 경험을 AI 정밀 엔진으로 조율하여, 함께하고 싶은 기업들과 투명하게 연결합니다. <br />
                구직자를 위한 지식재산권(저작권) 보호 및 안심 개인정보 보안 규정을 준수합니다.
              </p>
            </div>

            <form onSubmit={handleSignUpSubmit} className="space-y-6">
              {/* Profile Inputs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-black text-slate-500 pl-1">아이디 (ID)</label>
                  <input 
                    type="text" 
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    placeholder="사용하실 아이디"
                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all text-slate-700"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-black text-slate-500 pl-1">이름 (실명)</label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="홍길동"
                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all text-slate-700"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-black text-slate-500 pl-1">비밀번호</label>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="최소 6자리 이상 권장"
                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all text-slate-700"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-black text-slate-500 pl-1">비밀번호 재확인</label>
                  <input 
                    type="password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="동일하게 한 번 더 입력"
                    className={`w-full px-4 py-3.5 border rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all text-slate-700 ${
                      confirmPassword && password !== confirmPassword 
                        ? 'border-red-200 bg-red-50/20' 
                        : 'border-slate-100 bg-slate-50'
                    }`}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-black text-slate-500 pl-1">이메일 주소</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="iium@gmail.com"
                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all text-slate-700"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-black text-slate-500 pl-1">휴대전화번호</label>
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="010-XXXX-XXXX"
                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all text-slate-700"
                    required
                  />
                </div>
              </div>

              {/* CONSENT FORM WRAPPER CARD */}
              <div className="border border-slate-100 bg-[#fbfcfd] p-6 md:p-8 rounded-[32px] space-y-4">
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-slate-100/80">
                  <ShieldCheck className="text-brand shrink-0" size={20} />
                  <h3 className="text-sm font-black text-slate-900">가입 회원 약관 및 지식재산·정보보호 동의서</h3>
                </div>

                {/* Overall Consent Box */}
                <div className="bg-white border border-slate-100 p-4 rounded-xl flex items-center gap-3 shadow-sm">
                  <input 
                    type="checkbox" 
                    id="consent-all-check"
                    checked={consentAll}
                    onChange={(e) => handleConsentAllChange(e.target.checked)}
                    className="w-5 h-5 rounded border-slate-300 text-brand focus:ring-brand accent-brand cursor-pointer shrink-0"
                  />
                  <label htmlFor="consent-all-check" className="text-xs md:text-sm font-black text-slate-800 cursor-pointer block leading-normal select-none">
                    이음(iium) 회원가입에 필요한 모든 약관에 일괄 동의합니다.
                  </label>
                </div>

                {/* Individual Agreements List */}
                <div className="space-y-3.5 pt-2">
                  
                  {/* Agreement 1: Terms & Copyright */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <input 
                          type="checkbox" 
                          id="consent-terms-check"
                          checked={consentTerms}
                          onChange={(e) => handleIndividualConsentChange('terms', e.target.checked)}
                          className="w-4 h-4 rounded border-slate-300 text-brand focus:ring-brand accent-brand cursor-pointer shrink-0"
                        />
                        <label htmlFor="consent-terms-check" className="text-xs font-bold text-slate-700 cursor-pointer select-none">
                          <span className="text-brand mr-1">[필수]</span> 이용약관 및 저작권(지식재산권) 고지 동의
                        </label>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => toggleSection('terms')}
                        className="text-[10px] font-black text-slate-400 hover:text-brand underline whitespace-nowrap ml-2"
                      >
                        {expandedSection === 'terms' ? '접기' : '전문 펼쳐보기'}
                      </button>
                    </div>

                    {expandedSection === 'terms' && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-[11px] text-slate-500 overflow-y-auto max-h-36 font-semibold space-y-2 mt-1.5"
                      >
                        <p className="font-bold text-slate-800">[목적 및 이용범위]</p>
                        <p>본 약관은 '이음'(이하 회사)이 제공하는 매칭, 교육, 커뮤니티 서비스를 회원(이용자)이 이용함에 적용됩니다.</p>
                        <p className="font-bold text-slate-800">[저작권의 보호 및 소유 귀속]</p>
                        <p>① 이음 플랫폼이 자체 제작한 일체의 교육용 강의록, 직무분석 컬럼, 매칭 가이드라인 및 소스코드, 플랫폼 레이아웃의 판권 및 지식재산권은 전적으로 회사에 귀속됩니다.</p>
                        <p>② 회원이 등록한 프로필 자격증 내 기술기술서, 포트폴리오 에세이 작문 등의 저작권은 전적으로 '구직자 본인'에게 소유 및 귀속됩니다. 회사는 단지 해당 저작물에 대해 원활한 구직 매칭, 이력 통계 정 분석, 제안 연계를 위한 포맷 가공 및 기계 분석 활용 제한 조건 내에서만 무상 배포 및 전송할 수 있는 귀속 라이센스를 획득합니다.</p>
                        <p className="font-bold text-red-600">[위반 사항에 대한 경고]</p>
                        <p>타 가입 50+ 회원의 경력 양식 항목이나 일자리 공고 내용을 회사의 명시적인 서면 허가 없이 부당 복사, 복제 및 변조하여 타 사이트에 상업적으로 변형하여 표절하거나 무단 도용하는 것을 금지합니다.</p>
                      </motion.div>
                    )}
                  </div>

                  {/* Agreement 2: Privacy Collection Policy */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <input 
                          type="checkbox" 
                          id="consent-privacy-check"
                          checked={consentPrivacy}
                          onChange={(e) => handleIndividualConsentChange('privacy', e.target.checked)}
                          className="w-4 h-4 rounded border-slate-300 text-brand focus:ring-brand accent-brand cursor-pointer shrink-0"
                        />
                        <label htmlFor="consent-privacy-check" className="text-xs font-bold text-slate-700 cursor-pointer select-none">
                          <span className="text-brand mr-1">[필수]</span> 개인정보 수집 및 동의서 약정
                        </label>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => toggleSection('privacy')}
                        className="text-[10px] font-black text-slate-400 hover:text-brand underline whitespace-nowrap ml-2"
                      >
                        {expandedSection === 'privacy' ? '접기' : '전문 펼쳐보기'}
                      </button>
                    </div>

                    {expandedSection === 'privacy' && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-[11px] text-slate-500 overflow-y-auto max-h-36 font-semibold space-y-2 mt-1.5"
                      >
                        <p className="font-bold text-slate-800">[수집 정보 명세]</p>
                        <p>회사는 서비스 신청, 가입 및 매칭 상담을 위해 회원 고유 성명, 가입 ID, 비밀번호, 이메일, 모바일 휴대전화 번호, 이력 사항(경력이력, 복무기간, 자격증 목록, 보훈 여부 등)을 수집합니다.</p>
                        <p className="font-bold text-slate-800">[이용 및 보관 목적]</p>
                        <p>① AI 분석 데이터 검출 기반의 맞춤식 직무 매칭 제안 및 연계 서비스 상담 실시</p>
                        <p>② 50+ 직무 기초 소통 능력 및 인턴 단계 교육 평가, 결과 가이드라인 레벨 데이터 발송</p>
                        <p>③ 긴급 공지 알림 전달 및 이용 관련 민원 신속 해결 처리</p>
                        <p className="font-bold text-slate-800">[개인 데이터의 파기 원칙]</p>
                        <p>이음(iium)은 사용자의 사생활과 보이스 프라이버시를 안전하게 보살피고 보호합니다. 수집된 제반 개인 정보 및 직업 능력 통계는 이용자가 회원 탈퇴 의사를 발송하여 처리하는 즉시 시스템 스토리지에서 디스크 복구 불능 상태로 완전 분쇄 파쇄 영구 소멸 조치 처리됩니다.</p>
                      </motion.div>
                    )}
                  </div>

                  {/* Agreement 3: Third Party Sharing for Recruitment */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <input 
                          type="checkbox" 
                          id="consent-third-check"
                          checked={consentThirdParty}
                          onChange={(e) => handleIndividualConsentChange('thirdParty', e.target.checked)}
                          className="w-4 h-4 rounded border-slate-300 text-brand focus:ring-brand accent-brand cursor-pointer shrink-0"
                        />
                        <label htmlFor="consent-third-check" className="text-xs font-bold text-slate-700 cursor-pointer select-none">
                          <span className="text-brand mr-1">[필수]</span> 개인정보 제3자 제공 (AI 인재 매칭 기업) 동의
                        </label>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => toggleSection('thirdParty')}
                        className="text-[10px] font-black text-slate-400 hover:text-brand underline whitespace-nowrap ml-2"
                      >
                        {expandedSection === 'thirdParty' ? '접기' : '전문 펼쳐보기'}
                      </button>
                    </div>

                    {expandedSection === 'thirdParty' && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-[11px] text-slate-500 overflow-y-auto max-h-36 font-semibold space-y-2 mt-1.5"
                      >
                        <p className="font-bold text-slate-800">[제공 위탁 개요]</p>
                        <p>• 정보 제공을 받는 대상: 이음에 정식으로 인재 매칭 요청 공고를 접수한 검증된 제휴 파트너 기업 인사담당자</p>
                        <p>• 수집 및 양도 리스트: 회원 자격이 승인된 50+ 인재의 경력 대조 이력, 분야별 직무 교육 이수 평점 요약, 직업 가치관 진단 등 추천 매칭 평가서</p>
                        <p className="font-bold text-slate-800">[비식별 안전 마스킹 장치 장착]</p>
                        <p>이음(iium)은 구직자의 프라이버시 누출을 막기 위해 1단계 기업 자동 검색 matching 추천 보고서에는 이름, 정확한 사적 자택 위치 주소, 실전 상세 연락처를 숨김(*** 마스킹 및 마스킹 번호 대체) 처리하는 엄격한 보호 장치를 시행합니다. 기업의 매칭 채용 제안을 구직 고객님이 최종 수락(Accept)할 때 비로소 상호 연락 및 정밀 이력 인터뷰를 위한 실전 개인정보가 전달 조정됩니다.</p>
                      </motion.div>
                    )}
                  </div>

                  {/* Agreement 4: Anti AI Crawling and Slicing (Mandatory Statement) */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <input 
                          type="checkbox" 
                          id="consent-scraping-check"
                          checked={consentAntiScraping}
                          onChange={(e) => handleIndividualConsentChange('antiScraping', e.target.checked)}
                          className="w-4 h-4 rounded border-slate-300 text-brand focus:ring-brand accent-brand cursor-pointer shrink-0"
                        />
                        <label htmlFor="consent-scraping-check" className="text-xs font-bold text-slate-700 cursor-pointer select-none">
                          <span className="text-brand mr-1">[필수]</span> 인공지능(AI) 웹크롤러 무단 수집 및 도용 금지 확약
                        </label>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => toggleSection('antiScraping')}
                        className="text-[10px] font-black text-slate-400 hover:text-brand underline whitespace-nowrap ml-2"
                      >
                        {expandedSection === 'antiScraping' ? '접기' : '전문 펼쳐보기'}
                      </button>
                    </div>

                    {expandedSection === 'antiScraping' && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-[11px] text-[#9a3412] bg-[#fff7ed] border-[#ffedd5] overflow-y-auto max-h-36 font-semibold space-y-2 mt-1.5"
                      >
                        <p className="font-bold flex items-center gap-1">
                          <ShieldAlert size={14} /> [AI 스크랩 방지 및 수집 거부 확약서]
                        </p>
                        <p>① 본 정보 주체는 이음 가입 회원으로서, 플랫폼 내에서 탐색하여 조회되는 타인(다른 50+ 동료)의 소중한 평생 이력서 문장, 경력 데이터 소스, 맞춤 추천 평가 내역 및 기업의 전략 채용 정보를 불법적인 AI 학습 및 기계식 텍스트 가공을 위해 추출하거나 도용하지 않을 것임을 서약합니다.</p>
                        <p>② 회원의 로봇, 스파이더, 크롤러봇 또는 기타 자동 검색/수집 장치를 동원한 대규모 시각 스크린 캡쳐 및 DB 도집 행위 시 적발될 때는 지식재산권법 침해 및 정보통신망법 위반(비승인 해킹 행위 등)으로 영구 탈퇴 강제 처리와 일체의 손해에 대한 민형사 고발에 귀책사유가 있음을 엄연히 동의 확인합니다.</p>
                      </motion.div>
                    )}
                  </div>

                </div>
              </div>

              {/* Verify form errors inside UI if matching fails */}
              {password && confirmPassword && password !== confirmPassword && (
                <div className="flex items-center gap-2 p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-bold border border-red-100">
                  <AlertCircle size={16} />
                  <span>비밀번호가 서로 불일치합니다. 동일한 값을 입력해 주세요.</span>
                </div>
              )}

              {/* Actions */}
              <div className="pt-2 flex flex-col gap-3">
                <button 
                  type="submit"
                  disabled={!consentTerms || !consentPrivacy || !consentThirdParty || !consentAntiScraping}
                  className={`w-full py-5 text-slate-950 font-black rounded-2xl text-lg transition-all flex items-center justify-center gap-2 shadow-xl shadow-brand/10 ${
                    consentTerms && consentPrivacy && consentThirdParty && consentAntiScraping
                      ? 'bg-brand hover:bg-brand-hover hover:scale-[1.02] cursor-pointer'
                      : 'bg-slate-150 text-slate-400 border border-slate-200 cursor-not-allowed opacity-60'
                  }`}
                >
                  <FileCheck2 size={20} /> 동의하고 가입 완료하기
                </button>
                <button 
                  type="button" 
                  onClick={() => setIsSignUp(false)}
                  className="w-full py-4 bg-slate-50 text-slate-500 hover:text-slate-950 hover:bg-slate-100 font-bold rounded-2xl text-sm transition-all text-center"
                >
                  이전 화면으로 돌아가기
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
