import React from 'react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Globe, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PublishToggle({ isPublic, onToggle, disabled }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
      <div className="flex items-center gap-2">
        {isPublic ? (
          <Globe className="w-4 h-4 text-emerald-500" />
        ) : (
          <Lock className="w-4 h-4 text-slate-400" />
        )}
        <div>
          <Label className="text-sm font-medium text-slate-700">
            {isPublic ? '公開中' : '非公開'}
          </Label>
          <p className="text-xs text-slate-500">
            {isPublic 
              ? '他の隊員があなたの経験から学べます' 
              : '自分だけが閲覧できます'}
          </p>
        </div>
      </div>
      <Switch
        checked={isPublic}
        onCheckedChange={onToggle}
        disabled={disabled}
      />
    </div>
  );
}