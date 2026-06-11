/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Gemini SDK with safety checks
// Use lazy instantiation or safely catch errors on load so missing API keys do not block Node bootup.
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
    return null;
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// REST API endpoint for test question evaluation
app.post("/api/evaluate", async (req, res) => {
  try {
    const { questionText, subject, gradeLevel } = req.body;

    if (!questionText || questionText.trim() === "") {
      return res.status(400).json({ error: "시험문제를 입력해주세요 (Question text is required)." });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.status(500).json({
        error: "GEMINI_API_KEY_MISSING",
        message: "Google AI Studio Settings > Secrets 메뉴에서 GEMINI_API_KEY를 설정해주시기 바랍니다. (Gemini API key is not configured in the workspace environment.)"
      });
    }

    const subjectLabels: Record<string, string> = {
      korean: "국어",
      math: "수학",
      science: "과학",
      social: "사회",
      english: "영어",
      general: "기타/융합"
    };

    const subjectLabel = subjectLabels[subject] || "일반";

    // Inform model beautifully and ask for structured JSON output
    const prompt = `
당신은 AI 시대의 현대 지능적 교육 혁신 전문가이자 대한민국 공교육/사교육 전문 평가원 장학관입니다. 
다음 시험 출제 문제를 검토하고, 제시된 「AI 시대 평가 기준안 (AIEA)」에 입각해 체계적으로 분석하여 구조화된 세부 교육 진단 리포트를 작성해주십시오.

[검토 요청 문항 정보]
- 과목: ${subjectLabel} (${subject})
- 대상 학년 정보: ${gradeLevel || "전학년 공통"}
- 출제 문항 텍스트:
"""
${questionText}
"""

[평가 지침 및 핵심 로직]
1. AIEA (AI Education Assessment) 기준 (각 1~5점 점수 부여):
   - 실제성 (Authenticity): 실제 삶, 현장, 또는 리얼 시나리오 속에 있는 문제인가?
   - 탐구성 (Inquiry): 단순 암기가 아닌 심층 질문, 가설 및 탐구를 요구하는가?
   - 근거성 (Evidence): 명확한 추론적/학술적/논리적 근거를 스스로 수립하고 배후 증거를 기재해야 하는가?
   - 적용성 (Application): 습득한 교육 개념을 다차원적 상황에 올바르게 대입/변형해 해결하는가?
   - 창의성 (Creativity): 정해진 모범답안 외에 학생 스스로 사유하여 새로운 다양하고 창의적 대안을 생산해낼 수 있는가?
   - AI 검증성 (AI Verification): 인공지능이 생성한 정보의 왜곡, 오류, 편향을 식별, 검증하고 비판적으로 검토하도록 유인하는가?
   - 의사소통성 (Communication): 타인에게 기획안, 보고서, 이메일 등의 프로페셔널하고 격조 높은 방식으로 자신의 지식을 표현하고 대안을 전하는가?

2. 미래형 시험 적합성 진단 점수 (Bloom's Revised Taxonomy for AI Era, 1~6단계 척도 배정):
   - 1단계) 기억 (Remember - 단순 암기)
   - 2단계) 이해 (Understand - 요약 및 단순 내용 설명)
   - 3단계) 적용 (Apply - 기계적인 연습문제 활용)
   - 4단계) 분석 (Analyze - 다각적 비교 분석)
   - 5단계) 평가 (Evaluate - 타당성 비판적 판단)
   - 6단계) 창조 (Create - 새로운 맥락의 주체적 대안 및 해결책 설계)

3. 7대 핵심 역량 매칭 (각 역량이 이 시험 문제에서 평가 대상이 되는지 정밀 판정 [true/false]):
   - 문제발견력, 질문력, 비판적 사고력, 창의력, 협업능력, 의사소통능력, AI 활용능력

4. 부모/교사용 체크리스트 판정:
   - aiEasyResult: AI가 단번에 정답을 3초 만에 완벽 제시할 수 있는가? (암기형/단순 계산 형태면 true)
   - studentThoughts: 학생들의 주체적 생각과 의견, 주장이 설계에 개입하는가?
   - singleAnswer: 오직 단 하나의 정답만이 정해져 있는가?
   - realLifeConnection: 현대 실생활 혹은 사회 난제 상황과 직접 연결되는가?
   - processEvaluation: 단순 최종 결과물/수치 정답만이 아닌 주체적 추론 과정 전체에 우열을 두는 평가가 가능한가?

5. 종합 평결 (AIEA 합계가 총 35점 만점 기준):
   - 30점 이상: EXCELLENT (AI 시대 우수 평가문항)
   - 25~29점: ADEQUATE (인공지능 소양 적정 수준)
   - 20~24점: NEEDS_IMPROVEMENT (개선 필요)
   - 19점 이하: ROTE_MEMORY (과거 산업화 암기 중심 문항)

6. 창의적인 혁신적 문항으로의 완전 리디자인 (suggestedRewrite):
   - 이 출제 의도와 과목을 고수하며, 2가지 형태의 강력한 대안 문항을 제안하십시오:
     1) "rewrittenMultipleChoice": 대부분의 실제 학교/학원 평가 현장에서 직관적이고 공정하게 바로 활용할 수 있는 **'고차원 4지선다형(혹은 5지선다형) 객관식 대안 문항'** (단순 사실 암기가 아닌, 상황 지문이나 사료/실생활 통계 데이터를 분석/해설하여 답을 소거해야 하는 우수한 질문 stem + 4~5개 상세 선택지 보기안 + 정답 및 친절한 선택지 오답별 해설 포함).
     2) "rewrittenQuestion": 한 단계 더 깊고 넓은 사고를 전개하는 주체성 중심의 **'미래형 탐구 서·논술식/에세이 문제 문항'**.
   - 왜 각각 개선 기획을 하였고 어떤 미래 역량을 보완했는지("howItImproves") 상세히 기술하고, 교사와 학부모가 공정하게 평정할 수 있도록 다층 채점 루브릭 가이드("assessmentGuide")를 함께 구안해주십시오.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: [
            "aieaMetrics",
            "bloomTaxonomy",
            "competenciesMatched",
            "checklist",
            "totalScore",
            "ratingLevel",
            "strengths",
            "weaknesses",
            "feedbackSummary",
            "suggestedRewrite"
          ],
          properties: {
            aieaMetrics: {
              type: Type.OBJECT,
              required: [
                "authenticity",
                "inquiry",
                "evidence",
                "application",
                "creativity",
                "aiVerification",
                "communication"
              ],
              properties: {
                authenticity: { type: Type.INTEGER, description: "실제성 점수 (1-5)" },
                inquiry: { type: Type.INTEGER, description: "탐구성 점수 (1-5)" },
                evidence: { type: Type.INTEGER, description: "근거성 점수 (1-5)" },
                application: { type: Type.INTEGER, description: "적용성 점수 (1-5)" },
                creativity: { type: Type.INTEGER, description: "창의성 점수 (1-5)" },
                aiVerification: { type: Type.INTEGER, description: "AI 검증성 점수 (1-5)" },
                communication: { type: Type.INTEGER, description: "의사소통성 점수 (1-5)" }
              }
            },
            bloomTaxonomy: {
              type: Type.OBJECT,
              required: ["level", "name", "description"],
              properties: {
                level: { type: Type.INTEGER, description: "블룸 미래형 텍소노미 단계 (1-6)" },
                name: { type: Type.STRING, description: "블룸 분류 단계 한글 명칭 (예: 기억/이해/적용/분석/평가가치/창조)" },
                description: { type: Type.STRING, description: "본 문항이 속하는 인지 발달 단계의 이유와 학술적 근거" }
              }
            },
            competenciesMatched: {
              type: Type.OBJECT,
              required: [
                "problemDiscovery",
                "questioning",
                "criticalThinking",
                "creativity",
                "collaboration",
                "communication",
                "aiLiteracy"
              ],
              properties: {
                problemDiscovery: { type: Type.BOOLEAN, description: "문제발견력 탑재 여부" },
                questioning: { type: Type.BOOLEAN, description: "질문력 탑재 여부" },
                criticalThinking: { type: Type.BOOLEAN, description: "비판적 사고력 탑재 여부" },
                creativity: { type: Type.BOOLEAN, description: "창의력 탑재 여부" },
                collaboration: { type: Type.BOOLEAN, description: "협업능력 탑재 여부" },
                communication: { type: Type.BOOLEAN, description: "의사소통능력 탑재 여부" },
                aiLiteracy: { type: Type.BOOLEAN, description: "AI 활용 및 검증능력 탑재 여부" }
              }
            },
            checklist: {
              type: Type.OBJECT,
              required: [
                "aiEasyResult",
                "studentThoughts",
                "singleAnswer",
                "realLifeConnection",
                "processEvaluation"
              ],
              properties: {
                aiEasyResult: { type: Type.BOOLEAN, description: "AI가 바로 답할 수 있는가?" },
                studentThoughts: { type: Type.BOOLEAN, description: "학생 생각이 들어가는가?" },
                singleAnswer: { type: Type.BOOLEAN, description: "정답이 하나뿐인가?" },
                realLifeConnection: { type: Type.BOOLEAN, description: "실제 삶과 연결되는가?" },
                processEvaluation: { type: Type.BOOLEAN, description: "과정 평가가 가능한가?" }
              }
            },
            totalScore: { type: Type.INTEGER, description: "AIEA 7개 기준의 총점 (7~35)" },
            ratingLevel: {
              type: Type.STRING,
              description: "종합 등급 분류 반드시 다음 4개 중 하나: EXCELLENT, ADEQUATE, NEEDS_IMPROVEMENT, ROTE_MEMORY"
            },
            strengths: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "이 문제 문항이 담보하고 있는 미래 지향적 장점 (2~3개 한국어 서술)"
            },
            weaknesses: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "이 문제 문항이 현대 평가로서 가지는 치명적인 한계 및 누락한 요소 (2~3개 한국어 서술)"
            },
            feedbackSummary: { type: Type.STRING, description: "장학사/평가관 관점의 유려하고 전문적인 종합 권고 논조 (한국어 서술)" },
            suggestedRewrite: {
              type: Type.OBJECT,
              required: ["comparisonTitle", "rewrittenQuestion", "rewrittenMultipleChoice", "howItImproves", "assessmentGuide"],
              properties: {
                comparisonTitle: { type: Type.STRING, description: "비교 주제명 (한글)" },
                rewrittenQuestion: { type: Type.STRING, description: "창의적으로 탈바꿈시킨 미래 교육용 완전 개조 서술식 에세이 문제 문항 전문" },
                rewrittenMultipleChoice: { type: Type.STRING, description: "고차원 분석 및 추론을 요구하는 4지선다형(또는 5지선다형) 객관식 개선 문항 전문 (각각의 선지와 친절한 정답/오답 해설안 포함)" },
                howItImproves: { type: Type.STRING, description: "개조를 통해 어떤 점이 AI 시대 역량 평가로 전환·보강되었는지 논거" },
                assessmentGuide: { type: Type.STRING, description: "교사용/학부모용 핵심 평가 중점 항목 일람 및 체계적인 채점 루브릭 예시" }
              }
            }
          }
        }
      }
    });

    const outputText = response.text;
    if (!outputText) {
      throw new Error("No response content generated from Gemini API.");
    }

    const evaluationResult = JSON.parse(outputText.trim());
    
    // Supplement timestamp & metadata
    evaluationResult.id = "eval_" + Date.now();
    evaluationResult.timestamp = Date.now();
    evaluationResult.questionText = questionText;
    evaluationResult.subject = subject;
    evaluationResult.subjectName = subjectLabel;
    evaluationResult.gradeLevel = gradeLevel || "전학년 공통";

    // Set user-friendly UI presentation metadata based on key evaluation
    let ratingName = "과거 산업화 암기 중심 문항";
    let ratingColor = "rose";
    if (evaluationResult.ratingLevel === "EXCELLENT") {
      ratingName = "AI 시대 초우수 평가문항";
      ratingColor = "emerald";
    } else if (evaluationResult.ratingLevel === "ADEQUATE") {
      ratingName = "AI 시대 적정 평가수준";
      ratingColor = "indigo";
    } else if (evaluationResult.ratingLevel === "NEEDS_IMPROVEMENT") {
      ratingName = "일부 개선 필요 평가문항";
      ratingColor = "amber";
    }

    evaluationResult.ratingName = ratingName;
    evaluationResult.ratingColor = ratingColor;

    return res.json(evaluationResult);

  } catch (error: any) {
    console.error("Evaluation handler error:", error);
    return res.status(500).json({
      error: "EVALUATION_FAILED",
      message: error.message || "문항 분석 및 평가 과정 중 원인 미상의 오류가 발생했습니다. 잠시 후 감사하겠습니다."
    });
  }
});

// Provide standard robots.txt output supporting SEO automated indexing
app.get("/robots.txt", (req, res) => {
  res.type("text/plain");
  res.send(`User-agent: *
Allow: /

Sitemap: https://iiumai.com/sitemap.xml`);
});

// Vite & Static assets resolution
const startServer = async () => {
  const isProduction =
    process.env.NODE_ENV === "production" ||
    process.env.NODE_ENV === "staging" ||
    (typeof __filename !== "undefined" && (__filename.endsWith("server.cjs") || __filename.includes("dist")));

  if (!isProduction) {
    // Dynamically import Vite components for development mode
    // We obfuscate the import string so esbuild does not pack it under runtime CJS environments
    const viteModuleName = "vite";
    const { createServer: createViteServer } = await import(viteModuleName);
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production delivery for compiled static output
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[AIEA Server] Live running securely on port http://localhost:${PORT}`);
  });
};

startServer().catch((err) => {
  console.error("Failed to start fullstack evaluation express server:", err);
});
