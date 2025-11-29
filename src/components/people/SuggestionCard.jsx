import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, ArrowRight, Phone, Calendar, MessageSquare } from "lucide-react";
import { differenceInDays, parseISO } from "date-fns";
import { cn } from "@/lib/utils";

export default function SuggestionCard({ person, onCreateAction }) {
  const daysAgo = person.last_contact 
    ? differenceInDays(new Date(), parseISO(person.last_contact))
    : null;

  const getSuggestions = () => {
    const suggestions = [];

    // Based on days since last contact
    if (daysAgo !== null) {
      if (daysAgo > 30) {
        suggestions.push({
          type: 'urgent',
          icon: Phone,
          title: '長期未連絡',
          description: `${daysAgo}日間連絡がありません。フォローアップの電話をしましょう。`,
          action: `${person.name}さんにフォローアップの電話をする`
        });
      } else if (daysAgo > 14) {
        suggestions.push({
          type: 'warning',
          icon: MessageSquare,
          title: '定期フォロー',
          description: '2週間以上経過。近況確認をお勧めします。',
          action: `${person.name}さんに近況確認の連絡をする`
        });
      }
    }

    // Based on tags
    if (person.tags?.includes('移住相談')) {
      suggestions.push({
        type: 'opportunity',
        icon: Calendar,
        title: '移住相談',
        description: '移住イベントや空き家情報の共有をしましょう。',
        action: `${person.name}さんに移住関連情報を共有する`
      });
    }

    if (person.tags?.includes('空き家')) {
      suggestions.push({
        type: 'opportunity',
        icon: Calendar,
        title: '空き家マッチング',
        description: '空き家バンクの最新情報を確認してみましょう。',
        action: `${person.name}さんに空き家情報を案内する`
      });
    }

    // Based on influence level
    if (person.influence_level === '高') {
      suggestions.push({
        type: 'strategic',
        icon: Calendar,
        title: 'キーパーソン',
        description: '影響力の高い方です。プロジェクトへの参画を打診してみましょう。',
        action: `${person.name}さんにプロジェクト協力を打診する`
      });
    }

    return suggestions;
  };

  const suggestions = getSuggestions();

  if (suggestions.length === 0) {
    return null;
  }

  const typeStyles = {
    urgent: 'bg-red-50 border-red-200',
    warning: 'bg-amber-50 border-amber-200',
    opportunity: 'bg-blue-50 border-blue-200',
    strategic: 'bg-purple-50 border-purple-200'
  };

  const iconStyles = {
    urgent: 'text-red-600 bg-red-100',
    warning: 'text-amber-600 bg-amber-100',
    opportunity: 'text-blue-600 bg-blue-100',
    strategic: 'text-purple-600 bg-purple-100'
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
        <Lightbulb className="w-4 h-4 text-amber-500" />
        提案アクション
      </div>
      
      {suggestions.map((suggestion, index) => (
        <Card 
          key={index} 
          className={cn("border", typeStyles[suggestion.type])}
        >
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                iconStyles[suggestion.type]
              )}>
                <suggestion.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-slate-900 mb-1">{suggestion.title}</h4>
                <p className="text-sm text-slate-600 mb-3">{suggestion.description}</p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onCreateAction(suggestion.action)}
                  className="gap-1.5"
                >
                  アクション作成
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}