/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type SubjectId = "korean" | "math" | "science" | "social" | "english" | "general";

export interface SubjectGuide {
  id: SubjectId;
  name: string;
  icon: string;
  traditionalFocus: string;
  futureFocus: string;
  coreCompetencies: string[];
  traditionalProblem: {
    question: string;
    grading: string;
    limitation: string;
  };
  futureProblem: {
    question: string;
    grading: string;
    strength: string;
  };
}

export interface CompetencyData {
  id: string;
  name: string;
  description: string;
  importance: string;
  color: string;
}

export interface EvaluationResult {
  id: string;
  timestamp: number;
  questionText: string;
  subject: SubjectId;
  subjectName: string;
  gradeLevel: string;
  
  // AIEA Metrics (1-5)
  aieaMetrics: {
    authenticity: number;    // 실제성
    inquiry: number;         // 탐구성
    evidence: number;        // 근거성
    application: number;     // 적용성
    creativity: number;      // 창의성
    aiVerification: number;  // AI 검증성
    communication: number;   // 의사소통성
  };
  
  // Revised Bloom's Taxonomy for AI Era (1-6)
  bloomTaxonomy: {
    level: number;           // 1 to 6
    name: string;            // 기억, 이해, 적용, 분석, 평가, 창조
    description: string;
  };

  // Evaluation of 7 Core Competencies (Is each competency addressed? true/false)
  competenciesMatched: {
    problemDiscovery: boolean;    // 문제발견력
    questioning: boolean;         // 질문력
    criticalThinking: boolean;    // 비판적 사고력
    creativity: boolean;          // 창의력
    collaboration: boolean;       // 협업능력
    communication: boolean;       // 의사소통능력
    aiLiteracy: boolean;          // AI 활용 및 검증능력
  };

  // Parent/Teacher Checklist (true/false)
  checklist: {
    aiEasyResult: boolean;        // AI가 바로 답할 수 있는가? (반대점수 고려)
    studentThoughts: boolean;     // 학생들의 생각이 들어가는가?
    singleAnswer: boolean;        // 정답이 하나뿐인가? (반대점수 고려)
    realLifeConnection: boolean;  // 실제 삶과 연결되는가?
    processEvaluation: boolean;   // 과정 평가가 가능한가?
  };

  totalScore: number;             // AIEA 합계 (MAX 35)
  ratingLevel: "EXCELLENT" | "ADEQUATE" | "NEEDS_IMPROVEMENT" | "ROTE_MEMORY"; // 우수, 적정, 개선 필요, 암기 중심
  ratingName: string;            // AI 시대 우수 평가문항, 적정 수준, 개선 필요, 암기 중심 문항
  ratingColor: string;           // CSS color class

  strengths: string[];            // 강점 리스트
  weaknesses: string[];           // 개선이 필요한 점 리스트
  feedbackSummary: string;        // 종합 평가 의견

  // Recommendations & Rewrite guide
  suggestedRewrite: {
    comparisonTitle: string;
    rewrittenQuestion: string;
    rewrittenMultipleChoice?: string; // 4지선다형 기반 고차원 미래형 개조 문항
    howItImproves: string;
    assessmentGuide: string;      // 채점 루브릭/기준 가이드
  };
}
