import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { format, differenceInDays, parseISO } from "date-fns";
import { cn } from "@/lib/utils";
import { User, Calendar, Folder } from "lucide-react";

const roleColors = {
  "admin": "bg-ls-secondary/10 text-ls-secondary border-ls-secondary/20",
  "coop": "bg-ls-primary/10 text-ls-primary border-ls-primary/20",
  "resident": "bg-ls-accent/10 text-ls-accent border-ls-accent/20",
  "npo": "bg-ls-primary-light/10 text-ls-primary-light border-ls-primary-light/20",
  "business": "bg-ls-secondary/10 text-ls-secondary border-ls-secondary/20",
  "expert": "bg-ls-bg text-ls-text-light border-ls-border"
};

const roleLabels = {
  "admin": "行政",
  "coop": "協力隊",
  "resident": "住民",
  "npo": "NPO",
  "business": "事業者",
  "expert": "専門家"
};

export default function PeopleCard({
  id,
  name,
  role,
  skills,
  values,
  lastContactAt,
  projects,
  onClick
}) {
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').slice(0, 2);
  };

  const formatLastContact = (dateStr) => {
    if (!dateStr) return '未接触';
    const date = parseISO(dateStr);
    const days = differenceInDays(new Date(), date);
    if (days === 0) return '今日';
    if (days === 1) return '昨日';
    if (days < 7) return `${days}日前`;
    return format(date, 'M月d日');
  };

  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-all duration-200 border-ls-border shadow-sm"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-ls-primary/10 text-ls-primary">
              {getInitials(name)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-ls-text truncate">{name}</h3>
                <Badge 
                  variant="secondary" 
                  className={cn("mt-1 text-xs", roleColors[role] || roleColors.expert)}
                >
                  {roleLabels[role] || role}
                </Badge>
              </div>
            </div>

            {skills.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {skills.slice(0, 3).map((skill, i) => (
                  <Badge key={i} variant="outline" className="text-xs border-ls-border">
                    {skill}
                  </Badge>
                ))}
                {skills.length > 3 && (
                  <Badge variant="outline" className="text-xs border-ls-border">
                    +{skills.length - 3}
                  </Badge>
                )}
              </div>
            )}

            {values.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {values.slice(0, 3).map((value, i) => (
                  <Badge key={i} variant="secondary" className="text-xs bg-ls-bg border-ls-border">
                    {value}
                  </Badge>
                ))}
                {values.length > 3 && (
                  <Badge variant="secondary" className="text-xs bg-ls-bg border-ls-border">
                    +{values.length - 3}
                  </Badge>
                )}
              </div>
            )}

            <div className="flex items-center gap-4 mt-3 text-xs text-ls-text-light">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{formatLastContact(lastContactAt)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Folder className="w-4 h-4" />
                <span>{projects.length}件</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

