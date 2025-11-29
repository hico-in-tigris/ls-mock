import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap } from "lucide-react";
import ActionCard from './ActionCard';

export default function ActionList({ 
  actions = [], 
  onStatusChange,
  onAddVerification 
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Zap className="w-4 h-4 text-amber-500" />
        <h3 className="text-sm font-medium text-slate-700">アクション</h3>
        <span className="text-xs text-slate-400">（検証に向けて動いているもの）</span>
      </div>

      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {actions.map((action) => (
            <ActionCard
              key={action.id}
              action={action}
              onStatusChange={onStatusChange}
              onAddVerification={onAddVerification}
            />
          ))}
        </AnimatePresence>

        {actions.length === 0 && (
          <div className="text-center py-8 text-slate-400 text-sm border border-dashed border-slate-200 rounded-xl">
            行動メモをアクション化すると、ここに表示されます
          </div>
        )}
      </div>
    </div>
  );
}