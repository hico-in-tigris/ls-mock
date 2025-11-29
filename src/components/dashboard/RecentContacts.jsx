import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, ArrowRight, AlertCircle, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { format, differenceInDays, parseISO } from "date-fns";
import { ja } from "date-fns/locale";
import { cn } from "@/lib/utils";

const roleColors = {
  "住民": "bg-emerald-100 text-emerald-700",
  "行政": "bg-blue-100 text-blue-700",
  "事業者": "bg-amber-100 text-amber-700",
  "NPO": "bg-purple-100 text-purple-700",
  "専門家": "bg-indigo-100 text-indigo-700",
  "その他": "bg-slate-100 text-slate-700"
};

export default function RecentContacts({ people = [], onContactAction }) {
  const sortedPeople = [...people]
    .filter(p => p.last_contact)
    .sort((a, b) => {
      const daysA = differenceInDays(new Date(), parseISO(a.last_contact));
      const daysB = differenceInDays(new Date(), parseISO(b.last_contact));
      return daysB - daysA;
    })
    .slice(0, 5);

  const getDaysAgo = (date) => {
    if (!date) return null;
    return differenceInDays(new Date(), parseISO(date));
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Users className="w-5 h-5 text-emerald-600" />
          要フォロー
        </CardTitle>
        <Link 
          to={createPageUrl("People")}
          className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
        >
          すべて見る
          <ArrowRight className="w-4 h-4" />
        </Link>
      </CardHeader>
      <CardContent className="space-y-3">
        {sortedPeople.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <Users className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p>関係者データがありません</p>
          </div>
        ) : (
          sortedPeople.map((person) => {
            const daysAgo = getDaysAgo(person.last_contact);
            const isOverdue = daysAgo > 14;
            
            return (
              <div 
                key={person.id}
                className={cn(
                  "p-3 rounded-xl transition-all",
                  isOverdue ? "bg-red-50 border border-red-100" : "bg-slate-50 hover:bg-slate-100"
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-slate-900">{person.name}</span>
                      <Badge variant="secondary" className={cn("text-xs", roleColors[person.role])}>
                        {person.role}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-1.5">
                      {isOverdue && (
                        <AlertCircle className="w-3.5 h-3.5 text-red-500" />
                      )}
                      <span className={cn(
                        "text-xs",
                        isOverdue ? "text-red-600 font-medium" : "text-slate-500"
                      )}>
                        {daysAgo}日前に接触
                      </span>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant={isOverdue ? "destructive" : "outline"}
                    className="shrink-0 gap-1.5"
                    onClick={() => onContactAction(person)}
                  >
                    <Phone className="w-3.5 h-3.5" />
                    連絡
                  </Button>
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}