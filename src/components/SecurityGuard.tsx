import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, AlertTriangle, Eye, Lock, ArrowRight, X } from 'lucide-react';

export default function SecurityGuard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalReason, setModalReason] = useState<string>('');
  const navigate = useNavigate();

  // Show security warning modal
  const triggerWarning = (reason: string) => {
    setModalReason(reason);
    setIsModalOpen(true);
  };

  useEffect(() => {
    // 1. Right Click Prevent (contextmenu)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      triggerWarning('우클릭 제한 (Right-Click Blocked)');
    };

    // 2. Drag & Selection Prevent
    const handleSelectStart = (e: Event) => {
      e.preventDefault();
    };

    const handleDragStart = (e: Event) => {
      e.preventDefault();
    };

    // 3. Prevent Copy Attempt (copy, cut)
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      // Write warning to clipboard to double protect
      if (e.clipboardData) {
        e.clipboardData.setData('text/plain', '이음(iium)의 모든 저작물은 무단 복제 및 상업적 무단 도용이 원천 금지되어 있습니다. (저작권법 제 103조 보호 대상)');
      }
      triggerWarning('콘텐츠 복사 제한 (Copy Attempt Blocked)');
    };

    const handleCut = (e: ClipboardEvent) => {
      e.preventDefault();
      triggerWarning('콘텐츠 잘라내기 제한 (Cut Attempt Blocked)');
    };

    // 4. Keyboard Shortcuts Prevent (F12, Ctrl/Cmd + Shift + I, Ctrl/Cmd + Shift + C, Ctrl/Cmd + U, Ctrl/Cmd + C, Ctrl/Cmd + P)
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCmdOrCtrl = e.ctrlKey || e.metaKey;
      const isShift = e.shiftKey;
      const isAlt = e.altKey;

      // Allow refreshing (F5, Ctrl+R) but block inspection tools
      
      // F12 Key
      if (e.key === 'F12') {
        e.preventDefault();
        triggerWarning('개발자 도구 진입 시도 차단 (F12 Key Blocked)');
        return;
      }

      // Ctrl/Cmd + Shift + I (Developers panel)
      if (isCmdOrCtrl && isShift && (e.key === 'I' || e.key === 'i')) {
        e.preventDefault();
        triggerWarning('개발자 도구 진입 시도 차단 (Inspector Blocked)');
        return;
      }

      // Ctrl/Cmd + Shift + C (Element selector)
      if (isCmdOrCtrl && isShift && (e.key === 'C' || e.key === 'c')) {
        e.preventDefault();
        triggerWarning('요소 검사 도구 진입 시도 차단');
        return;
      }

      // Ctrl/Cmd + Shift + J (Console console panel)
      if (isCmdOrCtrl && isShift && (e.key === 'J' || e.key === 'j')) {
        e.preventDefault();
        triggerWarning('개발자 콘솔 진입 시도 차단');
        return;
      }

      // Ctrl/Cmd + U (Source code view)
      if (isCmdOrCtrl && (e.key === 'U' || e.key === 'u')) {
        e.preventDefault();
        triggerWarning('페이지 소스 검사 제한 (Source View Blocked)');
        return;
      }

      // Ctrl/Cmd + C / Ctrl/Cmd + X (Copy/Cut hotkeys)
      if (isCmdOrCtrl && (e.key === 'C' || e.key === 'c' || e.key === 'X' || e.key === 'x')) {
        // Allow copy only in allowed safe contexts if any, otherwise block or protect
        // Get selected text if any
        const selection = window.getSelection()?.toString();
        if (selection && selection.length > 0) {
          e.preventDefault();
          triggerWarning('무단 단축키 복사 차단 (Hotkeys Blocked)');
        }
        return;
      }

      // Ctrl/Cmd + S (Save Page)
      if (isCmdOrCtrl && (e.key === 'S' || e.key === 's')) {
        e.preventDefault();
        triggerWarning('웹페이지 무단 저장 제한 (Save Blocked)');
        return;
      }

      // Ctrl/Cmd + P (Print Page)
      if (isCmdOrCtrl && (e.key === 'P' || e.key === 'p')) {
        e.preventDefault();
        triggerWarning('콘텐츠 무단 인쇄 제한 (Print Blocked)');
        return;
      }
    };

    // Attach listeners strictly
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('selectstart', handleSelectStart);
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('cut', handleCut);
    window.addEventListener('keydown', handleKeyDown);

    // 5. Anti-crawler & Automated Tool Detection
    // navigator.webdriver returns true when run under headless browsers like Selenium/Puppeteer
    if (navigator.webdriver) {
      console.warn('자동화 크롤러 탐지 시스템 작동 중');
      // Add heavy styling overlay to block view if it's headless automated browser
      const body = document.querySelector('body');
      if (body) {
        body.style.filter = 'blur(10px)';
        body.style.pointerEvents = 'none';
      }
    }

    // 6. Anti-debugger (makes it extremely hard for hackers to audit scripts in live browser)
    const interval = setInterval(() => {
      // Inline debugger will pause execution if F12 is open, which is annoying and protective
      (function() {
        try {
          (function a(i) {
            if (('' + i / i).length !== 1 || i % 20 === 0) {
              (function() {}).constructor('debugger')();
            } else {
              (function() {}).constructor('debugger')();
            }
            a(++i);
          })(0);
        } catch (e) {}
      })();
    }, 1500);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('selectstart', handleSelectStart);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('cut', handleCut);
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(interval);
    };
  }, []);

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-900/85 backdrop-blur-md animate-fade-in" id="security-warning-modal">
      <div 
        className="relative w-full max-w-lg overflow-hidden bg-white border border-slate-100 shadow-2xl rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top visual graphic accent */}
        <div className="h-2 bg-gradient-to-r from-red-500 via-amber-500 to-emerald-500" />
        
        {/* Close Button */}
        <button 
          onClick={() => setIsModalOpen(false)}
          className="absolute p-2 transition-colors right-4 top-4 hover:bg-slate-50 text-slate-400 hover:text-slate-600 rounded-full"
          aria-label="보안 알림 닫기"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          {/* Icons and title */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex items-center justify-center w-12 h-12 bg-red-50 text-red-500 rounded-2xl">
              <Shield className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-xs font-semibold text-red-600 uppercase tracking-wider block">
                이음 AI 보안 엔진 (K-Security)
              </span>
              <h3 className="text-xl font-bold text-slate-900">
                무단 도용 및 복제 시도 차단
              </h3>
            </div>
          </div>

          {/* Core warning explanation */}
          <div className="p-4 mb-6 rounded-2xl bg-amber-50/50 border border-amber-100 text-slate-700">
            <div className="flex gap-2.5 items-start">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div className="text-sm leading-relaxed">
                <p className="font-semibold text-slate-800 mb-1">
                  감지된 사유: <span className="text-red-600">{modalReason}</span>
                </p>
                본 플랫폼의 모든 구인구직 알고리즘 데이터, 텍스트, AI 매칭 콘텐츠는 대한민국 저작권법 보호를 받으며 유사 업체의 도용과 기계적 AI 크롤링을 일체 금지합니다.
              </div>
            </div>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed mb-6">
            이음(iium)의 고부가 가치 기업/기관 분석 콘텐츠 및 시각화 데이터는 오직 공식 등록된 유료 라이선스 회원에게만 복제, 전재, 가공이 유효하게 승인됩니다. 정당한 정보 접근 및 멤버십 특별 혜택을 체험해 보세요.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                setIsModalOpen(false);
                navigate('/revenue');
              }}
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-2xl shadow-lg shadow-emerald-600/10 transition-all duration-200 active:scale-95 group text-sm"
              id="warn-membership-btn"
            >
              <Lock className="w-4 h-4 shrink-0 text-emerald-100" />
              유료 멤버십 혜택 확인
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-5 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-2xl transition-all duration-200 active:scale-95 text-sm"
              id="warn-close-btn"
            >
              무료 열람 계속하기
            </button>
          </div>

          {/* Legal footer */}
          <div className="mt-6 pt-5 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-400 font-mono">
            <span>PROTECTED BY SECURITY_GUARD</span>
            <span>IP LOGGED FOR REPEATED ACTIONS</span>
          </div>
        </div>
      </div>
    </div>
  );
}
