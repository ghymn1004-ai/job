import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, Edit, LogOut, Download, Upload, CheckCircle2, ChevronDown, Save, Eye, ArrowLeft, RefreshCw, Sparkles, Image as ImageIcon } from 'lucide-react';
import { Post, PostCategory, CATEGORY_LABELS } from '../types';
import { getPosts, savePosts, SEED_POSTS } from '../data/posts';
import BrandLogo from '../components/BrandLogo';

const SAMPLE_IMAGES = [
  { label: 'AI 테크', url: 'https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?auto=format&fit=crop&w=800&q=80' },
  { label: '스마트 오피스', url: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=800&q=80' },
  { label: '시니어 학습', url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80' },
  { label: '시니어 미소', url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80' }
];

export default function Admin() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // 포스트 관련 상태
  const [posts, setPosts] = useState<Post[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<Partial<Post>>({});
  
  // 성공 토스트 메시지
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    // 세션 로그인 검증
    const authStatus = sessionStorage.getItem('iium_admin_logged');
    if (authStatus === 'true') {
      setIsLoggedIn(true);
      setPosts(getPosts());
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // 시니어 관리자를 위한 손쉬운 로그인 비밀번호
    if (password === 'iium1234' || password === 'admin1234') {
      sessionStorage.setItem('iium_admin_logged', 'true');
      setIsLoggedIn(true);
      setPosts(getPosts());
      setLoginError('');
      showToast('관리자 인증에 성공하였습니다!');
    } else {
      setLoginError('비밀번호가 올바르지 않습니다. (안내: iium1234)');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('iium_admin_logged');
    setIsLoggedIn(false);
    showToast('로그아웃 되었습니다.');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  // 작성 에디터 열기 (신규)
  const handleNewPost = () => {
    const today = new Date().toISOString().split('T')[0];
    setCurrentPost({
      id: 'post-' + Date.now(),
      category: 'literacy',
      title: '',
      summary: '',
      content: '',
      coverImage: SAMPLE_IMAGES[0].url,
      createdAt: today,
      author: '이음AI',
      views: 0,
      isPublished: true
    });
    setIsEditing(true);
  };

  // 작성 에디터 열기 (수정)
  const handleEditPost = (post: Post) => {
    setCurrentPost({ ...post });
    setIsEditing(true);
  };

  // 포스트 삭제
  const handleDeletePost = (id: string) => {
    if (window.confirm('정말로 이 포스트를 삭제하시겠습니까?')) {
      const updated = posts.filter(p => p.id !== id);
      setPosts(updated);
      savePosts(updated);
      showToast('포스트가 안전하게 삭제되었습니다.');
    }
  };

  // 포스트 저장
  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPost.title || !currentPost.content || !currentPost.summary) {
      alert('제목, 요약글, 상세 본문을 모두 입력해 주셔야 발행이 가능합니다.');
      return;
    }

    const postToSave = currentPost as Post;
    let updated: Post[] = [];
    
    // 수정본인지 신규본인지 체크
    if (posts.some(p => p.id === postToSave.id)) {
      updated = posts.map(p => p.id === postToSave.id ? postToSave : p);
      showToast('포스트가 정상적으로 수정되었습니다.');
    } else {
      updated = [postToSave, ...posts];
      showToast('새로운 포스트가 발행 및 저장되었습니다!');
    }

    setPosts(updated);
    savePosts(updated);
    setIsEditing(false);
    setCurrentPost({});
  };

  // 포스트 씨앗 데이터 초기화 (전체 초기화 복구 기능)
  const handleRestoreSeeds = () => {
    if (window.confirm('현재 작성된 모든 데이터가 삭제되고 최초 4개의 시범 포스트로 복구됩니다. 진행하시겠습니까?')) {
      localStorage.removeItem('iium_posts');
      const seedData = getPosts();
      setPosts(seedData);
      showToast('기본 데모 포스팅 4종으로 초기화 복구되었습니다.');
    }
  };

  // JSON 데이터 백업 (내보내기)
  const handleExportBackup = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(posts, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `iium_blog_posts_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('블로그 작성 데이터 백업본이 안전하게 다운로드되었습니다.');
  };

  // JSON 데이터 복원 (가져오기)
  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (Array.isArray(parsed) && parsed.length > 0 && 'title' in parsed[0]) {
            setPosts(parsed);
            savePosts(parsed);
            showToast('백업 파일로부터 블로그 게시글들이 정상적으로 연동되어 복원되었습니다.');
          } else {
            alert('올바른 이음AI 포스팅 백업 JSON 파일 형식이 아닙니다.');
          }
        } catch (error) {
          alert('파일을 파싱하는 과정에 에러가 발생했습니다.');
        }
      };
    }
  };

  // 로그인 컴포넌트
  if (!isLoggedIn) {
     return (
       <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
         <div className="sm:mx-auto sm:w-full sm:max-w-md">
           <div className="flex justify-center">
             <Link to="/">
                <BrandLogo className="h-20 md:h-24 max-w-[200px]" />
             </Link>
           </div>
           <h2 className="mt-6 text-center text-3xl font-black text-slate-900 tracking-tight leading-none">
             이음AI 블로그 관리자 도구
           </h2>
           <p className="mt-2 text-center text-xs font-bold text-slate-400">
             본 사이트 전용 포스트를 카테고리별로 작성, 수정 및 관리합니다.
           </p>
         </div>

         <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
           <div className="bg-white py-10 px-8 shadow-2xl rounded-[32px] border border-slate-100 relative overflow-hidden">
             <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-brand to-indigo-500" />
             
             <form onSubmit={handleLogin} className="space-y-6">
               <div className="space-y-1.5">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">
                   관리자 비밀번호
                 </label>
                 <input
                   type="password"
                   placeholder="비밀번호를 입력해 주세요"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   className="w-full bg-slate-50 rounded-xl p-4 border border-slate-100 text-slate-700 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all"
                   autoFocus
                 />
                 <span className="text-[10px] font-bold text-slate-400 block mt-1 pl-1">
                   * 개발 테스트 안내: <strong className="text-brand">iium1234</strong> 또는 <strong className="text-brand">admin1234</strong>
                 </span>
               </div>

               {loginError && (
                 <p className="text-xs font-bold text-red-500 bg-red-50 p-3 rounded-lg border border-red-100">
                   {loginError}
                 </p>
               )}

               <button
                 type="submit"
                 className="w-full py-4 bg-brand text-white rounded-2xl font-black text-sm shadow-xl shadow-brand/10 hover:bg-brand-hover transition-all"
               >
                 안전 인증 로그인
               </button>
             </form>
             
             <div className="mt-8 pt-6 border-t border-slate-100 text-center">
               <Link to="/" className="text-slate-400 hover:text-brand font-bold text-xs flex items-center justify-center gap-1.5 transition-colors">
                  <ArrowLeft size={14} /> 메인 메인페이지 홈으로 돌아가기
               </Link>
             </div>
           </div>
         </div>
       </div>
     );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Toast Notification */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-20 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-800 text-white px-6 py-3.5 rounded-2xl shadow-2xl z-[120] text-xs font-black flex items-center gap-2"
            >
              <CheckCircle2 size={16} className="text-brand" /> {toastMessage}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dashboard Header */}
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-brand-light text-brand rounded font-black text-[9px] uppercase tracking-wider">Control Panel</span>
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-black text-emerald-500">SYSTEM ONLINE</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mt-1">블로그 콘텐츠 관리 시스템</h1>
            <p className="text-slate-400 text-xs font-bold mt-1">이음지수기 관리자 계정으로 로그인되어 직접 실시간 포스팅 및 수정이 가능합니다.</p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <button 
              onClick={handleNewPost}
              className="px-5 py-3 bg-brand text-white rounded-xl text-xs font-black hover:bg-brand-hover transition-all flex items-center gap-1.5 shadow-lg shadow-brand/10 cursor-pointer"
            >
              <Plus size={14} /> 새 포스트 글쓰기
            </button>
            <button 
              onClick={handleExportBackup}
              className="px-4 py-3 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl text-xs font-black transition-all flex items-center gap-1.5"
              title="작성한 포스트 데이터를 브라우저 밖 파일로 백업 보관합니다."
            >
              <Download size={14} /> 백업 다운로드
            </button>
            <label 
              className="px-4 py-3 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer"
              title="백업했던 JSON 파일을 불러와 블로그에 연동시킵니다."
            >
              <Upload size={14} /> 백업 복원 (가져오기)
              <input 
                type="file" 
                accept=".json" 
                onChange={handleImportBackup} 
                className="hidden" 
              />
            </label>
            <button 
              onClick={handleRestoreSeeds}
              className="px-4 py-3 bg-slate-100 hover:bg-red-50 text-red-500 rounded-xl text-xs font-black transition-all flex items-center gap-1.5"
              title="기본 시드 데이터로 강제 리셋합니다."
            >
              <RefreshCw size={14} /> 최초 상태로 초기화
            </button>
            <button 
              onClick={handleLogout}
              className="px-4 py-3 bg-slate-900 text-white hover:bg-slate-800 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ml-3"
            >
              <LogOut size={14} /> 인증 로그아웃
            </button>
          </div>
        </div>

        {/* Device Sync & Permanent Display Notification */}
        <div className="bg-emerald-50/80 border border-emerald-100 rounded-3xl p-6 md:p-8 mb-8 flex flex-col md:flex-row gap-5 items-start md:items-center justify-between shadow-sm">
          <div className="space-y-1.5">
            <h4 className="text-emerald-900 font-black text-sm flex items-center gap-1.5">
              💡 실시간 기기 동기화 및 전체 사용자 영구 반영 안내
            </h4>
            <div className="text-slate-600 text-xs leading-relaxed font-bold">
              <p>현재 작성하신 칼럼 글들은 개인 웹 브라우저의 전용 안전 공간(<span className="text-brand font-black">localStorage</span>)에 기기별로 각각 보관됩니다.</p>
              <p className="mt-1.5">&#10004; <strong>컴퓨터에서 작성한 글을 모바일에서도 똑같이 관리하려면:</strong> 컴퓨터에서 <span className="text-emerald-700 font-extrabold">[백업 다운로드]</span>를 통해 JSON 파일을 받으신 후, 모바일에서 이음AI 관리자 모드로 접속하여 <span className="text-emerald-700 font-extrabold">[백업 복원 (가져오기)]</span>를 하시면 즉시 완벽한 무선 동기화가 이루어집니다!</p>
              <p className="mt-1.5">&#10004; <strong>모든 기기와 일반 방문자에게 기본으로 칼럼글을 영구 노출하려면:</strong> 언제든지 다운로드받은 JSON 백업 파일 또는 파일 속 텍스트를 AI 스튜디오 상담창에 저희 쪽으로 첨부해주시면, 사이트 전체 기본 데이터셋인 <span className="font-mono font-black text-brand">SEED_POSTS</span> 파일에 직접 영구 탑재(빌드 반영)해 드립니다.</p>
            </div>
          </div>
          <div className="shrink-0">
            <span className="px-3.5 py-2 bg-emerald-600 text-white text-[11px] font-black rounded-xl shadow-lg shadow-emerald-600/10">무료 동기화 가이드</span>
          </div>
        </div>

        {/* Editor Form Modal / View */}
        {isEditing ? (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[40px] p-8 md:p-12 border-2 border-slate-100 shadow-2xl relative mb-12"
          >
            <div className="absolute top-0 inset-x-0 h-1.5 bg-brand" />
            
            <div className="flex items-center justify-between mb-8 border-b border-sidebar-divider pb-4">
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <Sparkles size={18} className="text-brand" /> 
                {posts.some(p => p.id === currentPost.id) ? '포스트 내용 편집하기' : '새로운 블로그 글 작성하기'}
              </h2>
              <button 
                onClick={() => { setIsEditing(false); setCurrentPost({}); }}
                className="px-4 py-2 bg-slate-50 text-slate-400 hover:bg-slate-100 rounded-lg text-xs font-black transition-all"
              >
                작성 취소하고 리스트로
              </button>
            </div>

            <form onSubmit={handleSavePost} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* 제목 */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">포스트 제목 *</label>
                  <input 
                    type="text"
                    required
                    placeholder="예: 시니어가 꼭 알아야 할 인공지능 윤리 가이드"
                    value={currentPost.title || ''}
                    onChange={(e) => setCurrentPost({ ...currentPost, title: e.target.value })}
                    className="w-full bg-slate-50 rounded-xl p-4 border border-slate-100 text-slate-700 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all"
                  />
                </div>

                {/* 카테고리 */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">교육 카테고리 매칭 *</label>
                  <select 
                    value={currentPost.category || 'literacy'}
                    onChange={(e) => setCurrentPost({ ...currentPost, category: e.target.value as PostCategory })}
                    className="w-full bg-slate-50 rounded-xl p-4 border border-slate-100 text-slate-700 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all cursor-pointer"
                  >
                    <option value="literacy">AI리터러시 (교육 하위메뉴)</option>
                    <option value="utilization">AI직무활용 (교육 하위메뉴)</option>
                    <option value="senior">시니어교육 (교육 하위메뉴 / 시니어인턴)</option>
                  </select>
                </div>

                {/* 작성자 */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">작성자 명의</label>
                  <input 
                    type="text"
                    placeholder="이음AI 튜터 등"
                    value={currentPost.author || ''}
                    onChange={(e) => setCurrentPost({ ...currentPost, author: e.target.value })}
                    className="w-full bg-slate-50 rounded-xl p-4 border border-slate-100 text-slate-700 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all"
                  />
                </div>

                {/* 발행 여부 */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">퍼블리시(게시) 설정</label>
                  <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <input 
                      type="checkbox"
                      id="publish-toggle"
                      checked={currentPost.isPublished ?? true}
                      onChange={(e) => setCurrentPost({ ...currentPost, isPublished: e.target.checked })}
                      className="w-4 h-4 text-brand bg-slate-100 border-slate-300 rounded focus:ring-brand/30 cursor-pointer"
                    />
                    <label htmlFor="publish-toggle" className="text-xs font-black text-slate-700 cursor-pointer select-none">
                      {currentPost.isPublished ? '홈페이지 및 AI교육관에 정주 발행(공개)' : '임시 저장 (블로그 목록에 노출하지 않음)'}
                    </label>
                  </div>
                </div>
              </div>

              {/* 커버 이미지 */}
              <div className="space-y-2">
                <div className="flex justify-between items-center pr-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">포스트 대표 이미지 URL</label>
                  <span className="text-[9px] font-black text-brand text-right">기본 테마 프리셋 입력 찬스!👇</span>
                </div>
                <input 
                  type="url"
                  placeholder="https://images.unsplash.com/... 또는 직접 연결"
                  value={currentPost.coverImage || ''}
                  onChange={(e) => setCurrentPost({ ...currentPost, coverImage: e.target.value })}
                  className="w-full bg-slate-50 rounded-xl p-4 border border-slate-100 text-slate-700 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all mb-2"
                />
                <div className="flex flex-wrap gap-2">
                  {SAMPLE_IMAGES.map((img) => (
                    <button
                      key={img.label}
                      type="button"
                      onClick={() => setCurrentPost({ ...currentPost, coverImage: img.url })}
                      className={`px-3 py-1.5 rounded-lg border text-[10px] font-black transition-all flex items-center gap-1 cursor-pointer ${currentPost.coverImage === img.url ? 'border-brand bg-brand/10 text-brand' : 'border-slate-100 bg-slate-50 hover:bg-slate-100 text-slate-500'}`}
                    >
                      <ImageIcon size={10} /> {img.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 가이드 요약글 */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">포스트 요약설명(Summary) *</label>
                <textarea 
                  required
                  rows={2}
                  maxLength={150}
                  placeholder="리스트나 첫 화면 카드에 표시될 1~2줄 가량의 매력적인 한줄 요약입니다."
                  value={currentPost.summary || ''}
                  onChange={(e) => setCurrentPost({ ...currentPost, summary: e.target.value })}
                  className="w-full bg-slate-50 rounded-xl p-4 border border-slate-100 text-slate-700 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all font-sans"
                />
              </div>

              {/* 본문 콘텐츠 */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center pr-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">포스트 상세 내용 본문 *</label>
                  <span className="text-[9px] font-black text-slate-400">마크다운 타이틀(##) 및 포인트(*), 인용구(&gt;) 문법을 자동 치환해 예쁘게 정돈해 드립니다.</span>
                </div>
                <textarea 
                  required
                  rows={12}
                  placeholder={`## 여기에 소제목을 써보세요.

본문을 여기에 작성하시면 됩니다. 시니어 분들을 위해 눈높이에 맞춘 친근하고 따뜻한 가이드를 제공해주세요.

* 첫 번째 핵심 포인트 리스트
* 두 번째 핵심 포인트 리스트

> 이음AI 팁: 여기에 유용한 팁이나 주요 인용구를 작성하면 예쁘게 음영 박스 처리가 된답니다.`}
                  value={currentPost.content || ''}
                  onChange={(e) => setCurrentPost({ ...currentPost, content: e.target.value })}
                  className="w-full bg-slate-50 rounded-3xl p-6 border border-slate-100 text-slate-700 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all font-mono"
                />
              </div>

              {/* 버튼그룹 */}
              <div className="flex justify-end gap-2.5 pt-4">
                <button 
                  type="button"
                  onClick={() => { setIsEditing(false); setCurrentPost({}); }}
                  className="px-6 py-4 bg-slate-100 text-slate-500 rounded-2xl text-xs font-black hover:bg-slate-200 transition-all cursor-pointer"
                >
                  작성 취소
                </button>
                <button 
                  type="submit"
                  className="px-8 py-4 bg-brand text-white rounded-2xl text-xs font-black hover:bg-brand-hover shadow-xl shadow-brand/10 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Save size={14} /> 블로그 글 최종 저장 및 게시(게재)
                </button>
              </div>
            </form>
          </motion.div>
        ) : null}

        {/* Blog Post Core Table / Grid inside Admin */}
        <div className="bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm">
          <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between">
            <h3 className="text-lg font-black text-slate-900">
              실시간 포스팅 게재 목록 <span className="text-slate-400 text-sm font-normal">({posts.length}건)</span>
            </h3>
            <span className="text-[10px] font-bold text-slate-400">
              * 각 줄의 수정/삭제 버튼으로 즉각 반영하실 수 있습니다.
            </span>
          </div>

          {posts.length === 0 ? (
            <div className="p-20 text-center">
              <RefreshCw size={40} className="mx-auto text-slate-300 animate-spin mb-4" />
              <p className="font-black text-slate-600">포스팅된 글이 하나도 없습니다.</p>
              <p className="text-xs text-slate-400 mt-1">상단의 "새 포스트 글쓰기"를 눌러 첫 글을 올려 보시거나 초기화를 복구해 보세요!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-400 text-[10px] uppercase tracking-widest text-left border-b border-slate-100">
                    <th className="px-6 py-4 font-black">대표커버</th>
                    <th className="px-6 py-4 font-black">카테고리</th>
                    <th className="px-6 py-4 font-black">제목</th>
                    <th className="px-6 py-4 font-black">작성자</th>
                    <th className="px-6 py-4 font-black">날짜</th>
                    <th className="px-6 py-4 font-black">조회</th>
                    <th className="px-6 py-4 font-black">공개상태</th>
                    <th className="px-6 py-4 font-black text-right">컨트롤</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-left">
                  {posts.map((post) => (
                    <tr key={post.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="w-16 h-10 rounded-lg overflow-hidden border border-slate-100 bg-slate-100">
                          <img src={post.coverImage} referrerPolicy="no-referrer" alt="" className="w-full h-full object-cover" />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 text-[10px] font-black rounded-lg bg-brand/10 text-brand">
                          {CATEGORY_LABELS[post.category]}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-slate-800 font-black text-xs line-clamp-1">{post.title}</p>
                        <p className="text-[10px] font-bold text-slate-400 mt-0.5 line-clamp-1">{post.summary}</p>
                      </td>
                      <td className="px-6 py-4 text-xs font-black text-slate-600">
                        {post.author}
                      </td>
                      <td className="px-6 py-4 text-xs font-bold text-slate-400">
                        {post.createdAt}
                      </td>
                      <td className="px-6 py-4 text-xs font-bold text-slate-500">
                        {post.views}회
                      </td>
                      <td className="px-6 py-4">
                        {post.isPublished ? (
                          <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded text-[9px] font-black">게시중</span>
                        ) : (
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-400 rounded text-[9px] font-black">임시저장</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-1.5">
                          <button 
                            onClick={() => handleEditPost(post)}
                            className="p-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-100 hover:border-brand/20 text-slate-600 hover:text-brand rounded-lg transition-all"
                            title="포스트 편집"
                          >
                            <Edit size={13} />
                          </button>
                          <button 
                            onClick={() => handleDeletePost(post.id)}
                            className="p-1.5 bg-slate-50 hover:bg-red-50 border border-slate-100 hover:border-red-200 text-slate-500 hover:text-red-600 rounded-lg transition-all"
                            title="포스트 삭제"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer Navigation Back to Site */}
        <div className="mt-8 text-center">
          <Link to="/" className="text-xs font-black text-brand hover:underline flex items-center justify-center gap-1">
             <ArrowLeft size={12} /> 사용자 서비스페이지(메인)로 복귀하기
          </Link>
        </div>

      </div>
    </div>
  );
}
