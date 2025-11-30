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
  "住民": "bg-ls-accent/10 text-ls-accent border-ls-accent/20",
  "行政": "bg-ls-secondary/10 text-ls-secondary border-ls-secondary/20",
  "事業者": "bg-ls-warning/10 text-ls-warning border-ls-warning/20",
  "NPO": "bg-ls-primary-light/10 text-ls-primary-light border-ls-primary-light/20",
  "専門家": "bg-ls-bg text-ls-text-light border-ls-border",
  "その他": "bg-ls-bg text-ls-text-light border-ls-border"
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
    <Card className="h-full border-ls-border shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg font-medium flex items-center gap-2 text-ls-text">
          <Users className="w-5 h-5 text-ls-primary" />
          要フォロー
        </CardTitle>
        <Link 
          to={createPageUrl("People")}
          className="text-sm text-ls-primary hover:text-ls-primary-light flex items-center gap-1"
        >
          すべて見る
          <ArrowRight className="w-4 h-4" />
        </Link>
      </CardHeader>
      <CardContent className="space-y-3">
        {sortedPeople.length === 0 ? (
          <div className="text-center py-8 text-ls-text-light">
            <Users className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="text-sm">関係者データがありません</p>
          </div>
        ) : (
          sortedPeople.map((person) => {
            const daysAgo = getDaysAgo(person.last_contact);
            const isOverdue = daysAgo > 14;
            
            return (
              <div 
                key={person.id}
                className={cn(
                  "p-3 rounded-lg transition-all min-h-[44px] border",
                  isOverdue ? "bg-ls-danger/10 border-ls-danger/20" : "bg-ls-bg hover:bg-ls-surface border-ls-border"
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-ls-text">{person.name}</span>
                      <Badge variant="outline" className={cn("text-xs", roleColors[person.role])}>
                        {person.role}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-1.5">
                      {isOverdue && (
                        <AlertCircle className="w-4 h-4 text-ls-danger" />
                      )}
                      <span className={cn(
                        "text-xs",
                        isOverdue ? "text-ls-danger font-medium" : "text-ls-text-light"
                      )}>
                        {daysAgo}日前に接触
                      </span>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant={isOverdue ? "destructive" : "outline"}
                    className={cn(
                      "shrink-0 gap-1.5",
                      isOverdue 
                        ? "bg-ls-danger hover:bg-ls-danger/90 text-white" 
                        : "border-ls-border text-ls-text hover:bg-ls-bg"
                    )}
                    onClick={() => onContactAction(person)}
                  >
                    <Phone className="w-4 h-4" />
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