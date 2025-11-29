import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Phone, 
  Calendar,
  Tag,
  ChevronRight,
  AlertCircle,
  Star
} from "lucide-react";
import { differenceInDays, parseISO, format } from "date-fns";
import { cn } from "@/lib/utils";

const roleColors = {
  "住民": "bg-emerald-100 text-emerald-700 border-emerald-200",
  "行政": "bg-blue-100 text-blue-700 border-blue-200",
  "事業者": "bg-amber-100 text-amber-700 border-amber-200",
  "NPO": "bg-purple-100 text-purple-700 border-purple-200",
  "専門家": "bg-indigo-100 text-indigo-700 border-indigo-200",
  "その他": "bg-slate-100 text-slate-700 border-slate-200"
};

const influenceColors = {
  "高": "text-amber-500",
  "中": "text-slate-400",
  "低": "text-slate-300"
};

export default function PersonCard({ 
  person, 
  onView, 
  onContact,
  compact = false 
}) {
  const daysAgo = person.last_contact 
    ? differenceInDays(new Date(), parseISO(person.last_contact))
    : null;
  
  const isOverdue = daysAgo !== null && daysAgo > 14;

  if (compact) {
    return (
      <div 
        onClick={() => onView(person)}
        className={cn(
          "flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all",
          isOverdue 
            ? "bg-red-50 hover:bg-red-100 border border-red-100" 
            : "bg-white hover:bg-slate-50 border border-slate-100"
        )}
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
          <User className="w-5 h-5 text-slate-500" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-slate-900 truncate">{person.name}</p>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Badge variant="secondary" className={cn("text-xs", roleColors[person.role])}>
              {person.role}
            </Badge>
            {daysAgo !== null && (
              <span className={cn(isOverdue && "text-red-600 font-medium")}>
                {daysAgo}日前
              </span>
            )}
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-slate-400" />
      </div>
    );
  }

  return (
    <Card className={cn(
      "group overflow-hidden transition-all duration-300 hover:shadow-lg",
      isOverdue && "ring-2 ring-red-200"
    )}>
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center shrink-0">
            <User className="w-7 h-7 text-slate-500" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-slate-900">{person.name}</h3>
                  {person.influence_level === '高' && (
                    <Star className={cn("w-4 h-4", influenceColors[person.influence_level])} fill="currentColor" />
                  )}
                </div>
                <Badge variant="secondary" className={cn("mt-1", roleColors[person.role])}>
                  {person.role}
                </Badge>
              </div>
              
              {isOverdue && (
                <div className="flex items-center gap-1 text-red-600 bg-red-50 px-2 py-1 rounded-full">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span className="text-xs font-medium">要連絡</span>
                </div>
              )}
            </div>

            {person.tags && person.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {person.tags.map((tag, i) => (
                  <span 
                    key={i}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-sm text-slate-500">
                <Calendar className="w-4 h-4" />
                {person.last_contact ? (
                  <span className={cn(isOverdue && "text-red-600 font-medium")}>
                    {daysAgo}日前に接触
                  </span>
                ) : (
                  <span>未接触</span>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    onContact(person);
                  }}
                  className="gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  連絡
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={() => onView(person)}
                >
                  詳細
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}