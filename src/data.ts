/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SubjectGuide, CompetencyData, SubjectId } from "./types";

export const SUBJECT_GUIDES: SubjectGuide[] = [
  {
    id: "korean",
    name: "국어 (Korean)",
    icon: "BookOpen",
    traditionalFocus: "텍스트 읽기 및 기계적 핵심 요약, 문법 지식 암기, '주제는 무엇인가?' 식의 정형화된 독해력 평가",
    futureFocus: "정보 신뢰성 및 편향 검증, 생성된 글 분석과 윤문, 주체적 관점 수립 및 다면적 글쓰기 역량 강화",
    coreCompetencies: ["비판적 사고력", "의사소통능력", "질문력"],
    traditionalProblem: {
      question: "위 소설에서 주인공의 심리 변화와 일치하는 정답을 보기에서 고르시오.\n또는 다음 제시문의 필자가 주장하는 핵심 요지를 서술하시오.",
      grading: "출제자가 미리 설정한 단 하나의 획일적인 주제 및 키워드 핵심 단어 포함 여부로 채점",
      limitation: "AI는 주어진 텍스트의 주제 분석 및 요약을 3초 만에 원어민 수준으로 수행하므로, 단순 이해도 평가는 학생의 저차원적 지식 습득만을 검토함"
    },
    futureProblem: {
      question: "AI 글쓰기 도구가 제시한 특정 시사적 주제의 칼럼 초안을 읽고, 사실 왜곡(환각 현상)이나 논리적 오류, 또는 성별·연령적 편향이 발견되는 부분 3가지를 지목하고, 신뢰할 수 있는 근거 교차검증을 거쳐 어떻게 수정해야 하는지 수정본과 함께 서술하시오.",
      grading: "단순 찬반 지엽적 요소가 아닌, 외부 근거의 타당성 조율 능력, 글의 논리적 모순성 검증, 최종 수정을 통한 고수준 의사소통 윤문력을 평가",
      strength: "사실 검증 능력(Fact-checking), 비판적 분석력, 고도화된 정보 편집 역량을 극대화"
    }
  },
  {
    id: "math",
    name: "수학 (Mathematics)",
    icon: "Binary",
    traditionalFocus: "공식 암기, 빠르고 정확한 기계적 연산 수행, '2차 방정식을 푸시오'와 같은 정형화된 문제 풀이",
    futureFocus: "수학적 모델링, 결과의 논리적 검증, 실생활 문제 해결과 수학 개념의 결합 및 분석력",
    coreCompetencies: ["문제발견력", "AI 활용능력", "비판적 사고력"],
    traditionalProblem: {
      question: "다음 2차방정식 x² - 6x + 5 = 0 의 해를 계산하여 구하시오.",
      grading: "공식 대입을 통한 기계적인 해 도출과 최종 수치 정답 비교",
      limitation: "포토매스(PhotoMath)나 AI 수학 도구에 수식을 카메라로 비추기만 해도 완벽한 풀이 과정과 단계별 해를 즉각 제시하므로, 암기식 계산은 무의미함"
    },
    futureProblem: {
      question: "어느 재난 방제 시스템 개발에 사용된 수식 y = x² - 6x + 5에 대해, 한 AI 시스템이 '이 시스템의 붕괴 안전 영역 경계 조건은 임계 해가 존재하지 않는다'라는 가설적 오류 보고서를 작성했다. AI가 내놓은 그래프 해 분석 결과의 오류를 수학공식과 정성적 논리를 활용하여 교차 검증하고, AI 판단이 잘못되었음을 증명하는 수학적 논증 보고서를 작성하시오.",
      grading: "단순히 답을 아는지 평가하는 대신 풀이와 검증의 인과성, 수리 논리적 일관성, 설명 능력을 입체적으로 평가",
      strength: "수학적 결과에 대한 비판적 평가력, AI 생성물에 대한 메타인지 및 검증 능력 함양"
    }
  },
  {
    id: "science",
    name: "과학 (Science)",
    icon: "Atom",
    traditionalFocus: "과학 개념 설명 암기, 실험 절차 암기, 단순 인과관계 객관식 맞추기 및 단답형 평가",
    futureFocus: "데이터 수집 및 복합 요인 비교 분석, 생태계 및 기술의 실질적 영향 다각도 고찰, 과학적 윤리와 의사결정",
    coreCompetencies: ["비판적 사고력", "문제발견력", "창의력"],
    traditionalProblem: {
      question: "전기 자동차가 가솔린 자동차에 비해 친환경적인 이유를 2가지 서술하시오.",
      grading: "무배출가스, 화석연료 대체 등 교과서 표준 교안에 명시된 특징의 단순 기술 여부 채점",
      limitation: "AI 검색을 통해 3초 안에 풍부한 전기차의 장단점 데이터를 얻을 수 있어, 개념 지식의 획일적 재확인은 현대 과학 소양으로 부족함"
    },
    futureProblem: {
      question: "AI가 '전기차는 전 과정(LCA) 측면에서 무조건적으로 100% 친환경적이다'라는 대중 선전용 정책 논평을 기고했다. 이 주장의 한계점(예: 리튬 광산 채굴 환경오염, 발전 전력 생산원의 에너지 믹스 비율 차이, 폐배터리 처리 문제 등)에 대한 구체적 데이터 비교 근거를 수집하고, 당신이 국가 에너지 자문 부처 관료라면 AI의 무조건적 주장을 수정 보강하기 위한 복합적 환경 정책 수정 기획안을 다차원적으로 구상하시오.",
      grading: "단일 흑백논리를 탈피하여 생태계 전 과정을 분석하는 시스템적 사고력, 최신 상반된 데이터의 과학적 가치 판단력을 상하 기준표로 설계해 다층 평가",
      strength: "사실 및 데이터 비교 분석력, 과학 기술적 윤리와 균형 잡힌 정책 기획 역량 극대화"
    }
  },
  {
    id: "social",
    name: "사회 (Social Studies)",
    icon: "Globe",
    traditionalFocus: "역사적 역사 연도 기계적 선후관계 나열, 실학자 등 학파 이름 암기, 정책의 구성 요소 기계적 소환 단답형",
    futureFocus: "역사·사회적 맥락 해석을 통한 문제 설계, 오늘날 현대 사회 구조적 난제에 대한 적용, 창의적이고 실효성 있는 대안 제안",
    coreCompetencies: ["창의력", "문제발견력", "협업능력"],
    traditionalProblem: {
      question: "조선 후기 실학과 관련된 실학자들의 주요 제안(토지 개혁 등) 명칭을 각각의 책 이름과 매칭하여 나열하시오.",
      grading: "실학자, 이론명, 도서 제목 간의 암기 일치도 및 오타 유무 식별",
      limitation: "키워드만 넣으면 백과사전식 위키 백과가 즉답을 도출하기 때문에, 암기 위주의 지식은 실생활 연계도 및 활용도가 전무함"
    },
    futureProblem: {
      question: "조선 후기 실학자 중 '유형원의 반계수록(토지 국유화)'과 '박지원의 과농소초(자영농 육성)'에 나타난 민생 구조화 개안을 현대 한국의 심각한 청년층 주거 해결 및 저출산 문제 극복 정책 모델로 번역하고자 한다. 원 고전에 담긴 분배 정의 관점을 도출하고, 이를 바탕으로 한 독자적인 '21세기형 주거지 공급 및 저출산 완화 복안'을 현대 사회 역학 구도에 맞추어 정책 기안문 형식으로 상세 설계하시오.",
      grading: "고전 역사 속 철학을 끄집어내는 '해석력', 현대적 인용 사회 난제와 연결하는 '적용력', 현실성 있는 수정 대책 수립의 '창적 대안력'을 성취 기준별로 측정",
      strength: "인류 자산의 현대적 재해석 역량, 복잡한 현대 사회 공공 위기 해결을 위한 문제 발견력"
    }
  },
  {
    id: "english",
    name: "영어 (English)",
    icon: "Languages",
    traditionalFocus: "영단어 단순 기계 암기, 영-한 직독직해 매칭, 복잡하게 꼬아둔 대학수능 형태의 문법 정오 판별 시험",
    futureFocus: "전 세계적 비즈니스 및 삶의 상황에서 다국어 소통, 타 문화 맥락적 뉘앙스 파악 및 정서적 조정 언어 표현력",
    coreCompetencies: ["의사소통능력", "AI 활용능력", "협업능력"],
    traditionalProblem: {
      question: "다음 고난도 인문학 제시문을 읽고 빈칸 (A)와 (B)에 들어갈 가장 적법한 관계대명사와 단어 조율 조합을 고르시오.",
      grading: "객관식 5지선다 일괄 마킹 채점",
      limitation: "AI 번역과 인공지능 교정기가 수능 1등급 난이도 지문도 1초 만에 완벽히 다국어 호환 번역하므로 단순 구조 문법 독해는 실전 의사소통을 보장하지 못함"
    },
    futureProblem: {
      question: "한국의 정보기술(IT) 벤처기업이 북미 파트너십 투자 유치를 희망하고 있다. 다음은 대형 언어 모델(LLM)이 최초 작성한 영어 이메일 초안이다. 하지만 이는 직역 투가 짙고 영어권 비즈니스에서 상대를 존중하는 '정중하면서도 자신감 있는 프로페셔널 뉘앙스'가 배제되어 상대를 자극할 우려가 있다. 상대 파트너 국가의 실전 비즈니스 문화 특성(예: Directness & Politeness의 균형)을 분석한 뒤, AI 영문 이메일을 수신자의 정서적 수용성과 설득력의 관점에서 분석하여 재작성하고, 구체적인 수정 이력을 문장별로 대비 설명하시오.",
      grading: "단순 문법 오류 극복을 넘어, 상황에 걸맞은 적법성, 언어적 매너와 세심한 톤앤매너 조율 수준, 설득 구조의 유려함을 평가",
      strength: "글로벌 상호 문화주의적 이해도, 감성 지능(EQ) 결합형 의사소통 조정 능력"
    }
  }
];

export const CORE_COMPETENCIDIES: CompetencyData[] = [
  {
    id: "problemDiscovery",
    name: "문제발견력 (Problem Discovery)",
    description: "주어진 문제의 정답만을 구하는 것이 아니라, 현상 속에서 숨어 있는 근본 문제나 새로운 현안을 직접 주체적으로 포착하고 정의하는 능력",
    importance: "AI는 질문과 문제 정의가 주어졌을 때 가장 강력하게 답을 찾습니다. 따라서 문제를 정의하는 힘은 오직 인간만의 독보적인 역량입니다.",
    color: "from-blue-500 to-indigo-600 bg-blue-50"
  },
  {
    id: "questioning",
    name: "질문력 (Prompting & Questioning)",
    description: "원하는 지적 결과물을 이끌어내기 위해 질문의 방향성과 논리를 명확히 세우고, AI나 전문가에게 효과적으로 깊이 있는 질문을 던지는 능력",
    importance: "성공과 가치는 프롬프트(질문)의 깊이가 결정합니다. 단선적 질문을 탈피해 조건과 가정을 담아 묻는 능력은 앎의 새로운 지평을 엽니다.",
    color: "from-purple-500 to-pink-600 bg-purple-50"
  },
  {
    id: "criticalThinking",
    name: "비판적 사고력 (Critical Thinking)",
    description: "AI가 생성한 답변을 포함해 미디어, 논평 등의 사실 관계(Fact-check)를 검증하고, 왜곡이나 논리적 모순, 알고리즘의 편향을 식별하는 정밀성",
    importance: "AI의 환각(Hallucination) 오류나 허위 정보가 만연한 사회에서 참과 거짓을 식별하고 가치 있는 지식만을 여과해내는 핵심적인 필터입니다.",
    color: "from-rose-500 to-amber-600 bg-rose-50"
  },
  {
    id: "creativity",
    name: "창의력 (Creativity)",
    description: "이질적인 지식의 영역들을 결합하여 전에 없던 기발하고 획기적인 발상을 제안하고 새로운 대안, 미적 산출물을 스스로 생산해내는 힘",
    importance: "과거 데이터의 평균값 연산만을 학습한 대형 언어 모델과 차별화되는 인간 고유의 도약적 사고, 개념적 혼성 및 무한한 변용의 원천입니다.",
    color: "from-emerald-500 to-teal-600 bg-emerald-50"
  },
  {
    id: "collaboration",
    name: "협업능력 (Collaboration)",
    description: "다양한 사회적 배경과 재능을 가진 동료들과 열린 마음으로 머리를 맞대어 복잡한 프로젝트를 설계하고 공동의 목표를 평화롭게 달성하는 능력",
    importance: "혼자만의 파편화된 지식 축적을 넘어서 집단 지성을 형성하고, 사람 대 사람의 공감과 시너지를 통해 복합 위기를 해결하게 해줍니다.",
    color: "from-cyan-500 to-blue-600 bg-cyan-50"
  },
  {
    id: "communication",
    name: "의사소통능력 (Communication)",
    description: "자신의 고유한 생각, 논리, 설득하고자 하는 기획안을 타인과 기계에 대해 정교하고 격조 있게 문어로 전달하고 타인의 견해를 경청 호환하는 능력",
    importance: "생각을 표현하지 못하면 고도화된 지식은 사장됩니다. AI 등 기술 자원을 영리하게 도구화하여 표현의 밀도와 진정성을 극대화시키는 힘입니다.",
    color: "from-amber-500 to-orange-600 bg-amber-50"
  },
  {
    id: "aiLiteracy",
    name: "AI 활용능력 (AI Literacy & Verification)",
    description: "생성 인공지능 기술의 내부 작동 원리와 한계를 올바르게 이해하고, 이를 작업 보조 수단으로 안전·생산적·윤리적으로 통제하며 조력자로 두는 역량",
    importance: "AI를 배제하는 것도, 맹신하는 것도 도태를 부릅니다. AI를 강력한 인지 비서로 다루어 기획력을 증폭하고 주체적 인간의 자율성을 지킵니다.",
    color: "from-indigo-500 to-violet-600 bg-indigo-50"
  }
];

export interface ExamExample {
  id: string;
  subject: SubjectId;
  subjectName: string;
  title: string;
  questionText: string;
  gradeLevel: string;
  tag: "기존 암기형" | "미래 지향형";
}

export const EXAM_EXAMPLES: ExamExample[] = [
  {
    id: "ex-korean-old",
    subject: "korean",
    subjectName: "국어",
    title: "국어 - 조선 후기 실학파 문학 주제 (기존 암기형)",
    questionText: "다음 중 조선 후기 박지원에 의해 집필된 한문소설 '양반전'에서 작가가 양반 계급의 위선과 무능을 폭로하기 위해 핵심적으로 사용한 풍자의 요법과 문학사적 의의로 알맞은 것을 고르시오. (오직 교재 35페이지에 나오는 표현으로 적으시오)",
    gradeLevel: "중학교 3학년",
    tag: "기존 암기형"
  },
  {
    id: "ex-korean-new",
    subject: "korean",
    subjectName: "국어",
    title: "국어 - AI 오류 검증 분석 (미래형)",
    questionText: "AI 작문기가 '조선 후기 신분제 철폐의 핵심 요인으로 농민 반란을 부추긴 양반전의 선동성을 꼽을 수 있다'라는 에세이를 창작했습니다. 이 주장이 가진 정교한 문학사적 사실 왜곡(할루시네이션)이나 논증 구멍이 담긴 오류를 2가지 지적해 내고, 조선 사회 양반전의 실제 문학사적 한계와 비판적 위상을 교과 내용을 근거로 균형 있게 비평하시오.",
    gradeLevel: "고등학교 2학년",
    tag: "미래 지향형"
  },
  {
    id: "ex-math-old",
    subject: "math",
    subjectName: "수학",
    title: "수학 - 단선적인 수식 기계적 풀이 (기존 암기형)",
    questionText: "2차함수 y = x² - 4x + 3 의 그래프와 x축이 만나는 두 교점 사이의 거리를 구하는 구체적인 풀이 과정과 최종 정답 수치값을 상세히 서술하시오.",
    gradeLevel: "고등학교 1학년",
    tag: "기존 암기형"
  },
  {
    id: "ex-math-new",
    subject: "math",
    subjectName: "수학",
    title: "수학 - AI 그래프 검증 논증 (미래형)",
    questionText: "자율주행 드론 비행 경로의 임계 고도 조정을 위한 수리 검안 중 y = x² - 4x + 3 함수 그래프 분석이 필요했습니다. AI 기계 경로 탐색 드론 모델은 '두 교점 거리 내에서 음수 좌표가 전무하므로 하한 추락 위험 구간이 아예 없다'고 판정했습니다. AI 분석 판정이 실제로 기하학적·수학적으로 올바른지 논구하여 드론 제어 AI 기계의 오동작 구간을 수학 공식과 인과 유추로 검증하고 오류 해결 가이드를 구안하시오.",
    gradeLevel: "고등학교 1학년",
    tag: "미래 지향형"
  },
  {
    id: "ex-science-old",
    subject: "science",
    subjectName: "과학",
    title: "과학 - 화석연료와 신에너지 기계적 요약 (기존 암기형)",
    questionText: "수소 자동차의 고유한 장점과 단점을 교과서 '신재생 에너지 기후협약의 이해' 장 단독 정리 부분에 명시된 내용을 기준하여 3가지만 기계적으로 쓰고, 구체적인 작동 원리 화학식을 쓰시오.",
    gradeLevel: "중학교 2학년",
    tag: "기존 암기형"
  },
  {
    id: "ex-science-new",
    subject: "science",
    subjectName: "과학",
    title: "과학 - 에너지 모순 실생활 정책 비판 (미래형)",
    questionText: "AI 챗봇이 '수소 연료 전지는 배기가스가 전혀 없으며 완벽한 친환경 해결책이므로, 국가 예산의 80%를 내년도부터 전격 수소 환수 충전소 건설에 올인해야 한다'고 과학 정책을 주창했습니다. 이 AI 과학 컨설팅이 누락하고 있는 '그레이 수소(생산 과정의 탄소 발생)', '압축 저장 기밀 폭발 안전 한계', '신재생 인프라 대비 조율 비용'에 관한 과학적 모순성을 상호 보강하여 기후 복합 균형 관점에서 비판 설명하시오.",
    gradeLevel: "고등학교 3학년",
    tag: "미래 지향형"
  }
];
