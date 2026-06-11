/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { 
  History, 
  Trash2, 
  BookOpen, 
  ExternalLink, 
  Calendar,
  Layers,
  ChevronRight,
  TrendingUp
} from "lucide-react";
import { EvaluationResult } from "../types";

interface HistorySectionProps {
  history: EvaluationResult[];
  selectedId: string | null;
  onSelectResult: (result: EvaluationResult) => void;
  onDeleteHistory: (id: string) => void;
  onClearAll: () => void;
}

export default function HistorySection({
  history,
  selectedId,
  onSelectResult,
  onDeleteHistory,
  onClearAll
}: HistorySectionProps) {

  const formatTime = (ts: number) => {
    const d = new Date(ts);
    return `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  };

  const truncateText = (text: string, len = 40) => {
    if (text.length <= len) return text;
    return text.substring(0, len) + "...";
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-6 shadow-xs select-none">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
            <History className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm md:text-base">진단 이력 피드</h4>
            <p className="text-[11px] text-slate-400">교사별 자가진단 누적 수량 ({history.length}건)</p>
          </div>
        </div>

        {history.length > 0 && (
          <button
            onClick={onClearAll}
            className="text-[11px] font-semibold text-rose-600 hover:text-rose-800 transition-colors flex items-center gap-1 cursor-pointer bg-rose-50 px-2 py-1.5 rounded-lg border border-rose-100/50"
          >
            모두 지우기
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="py-8 text-center text-slate-400 space-y-2">
          <p className="text-xs leading-relaxed font-light">아직 누적된 자가 진단 이력이 존재하지 않습니다.<br />검토할 시험문항을 입력해 보세요.</p>
        </div>
      ) : (
        <div className="space-y-2.5 max-h-[480px] overflow-y-auto pr-1">
          {history.map((item) => {
            const isSelected = selectedId === item.id;
            
            // Map rating level colors
            let colorBadgeClass = "border-slate-200 text-slate-600 bg-slate-50";
            if (item.ratingLevel === "EXCELLENT") {
              colorBadgeClass = "border-emerald-200 text-emerald-700 bg-emerald-50/40";
            } else if (item.ratingLevel === "ADEQUATE") {
              colorBadgeClass = "border-indigo-200 text-indigo-700 bg-indigo-50/40";
            } else if (item.ratingLevel === "NEEDS_IMPROVEMENT") {
              colorBadgeClass = "border-amber-200 text-amber-700 bg-amber-50/40";
            }

            return (
              <div
                key={item.id}
                className={`group relative rounded-2xl border p-4 transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                  isSelected 
                    ? "border-indigo-600 bg-indigo-50/15 shadow-xs" 
                    : "border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50/30"
                }`}
                onClick={() => onSelectResult(item)}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200/50">
                        {item.subjectName}
                      </span>
                      <span className="text-[10px] text-slate-400 font-light flex items-center gap-0.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-300" />
                        {formatTime(item.timestamp)}
                      </span>
                    </div>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteHistory(item.id);
                      }}
                      className="text-slate-300 hover:text-rose-600 transition-colors cursor-pointer opacity-0 group-hover:opacity-100 p-1 rounded-md hover:bg-slate-100"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-700 font-medium line-clamp-2 leading-relaxed">
                    "{truncateText(item.questionText, 70)}"
                  </p>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100/50 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[11px]">
                    <span className="text-slate-400">AIEA 지수:</span>
                    <span className="font-bold text-slate-900">{item.totalScore}점</span>
                  </div>

                  <div className={`px-2 py-0.5 rounded-md border text-[9px] font-bold ${colorBadgeClass}`}>
                    {item.ratingName.replace("AI 시대 ", "").split(" 평가")[0]}
                  </div>
                </div>

                {isSelected && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-600">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
