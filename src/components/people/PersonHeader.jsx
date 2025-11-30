import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Twitter, Instagram, Edit } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const roleLabels = {
  "admin": "行政",
  "coop": "協力隊",
  "resident": "住民",
  "npo": "NPO",
  "business": "事業者",
  "expert": "専門家"
};

/**
 * 人物詳細ページのヘッダーコンポーネント
 * @param {object} person - 人物データ
 */
export default function PersonHeader({ person }) {
  const navigate = useNavigate();

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').slice(0, 2);
  };

  return (
    <div className="mb-6">
      <Button
        variant="ghost"
        onClick={() => navigate('/people')}
        className="mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        一覧に戻る
      </Button>
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarFallback className="bg-gradient-to-br from-emerald-100 to-teal-200 text-emerald-700 text-2xl">
            {getInitials(person.name)}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">{person.name}</h1>
          <Badge variant="secondary" className="text-sm">
            {roleLabels[person.role] || person.role}
          </Badge>
        </div>

        <div className="flex gap-2">
          {person.contact?.sns?.twitter && (
            <Button variant="outline" size="sm" asChild>
              <a href={`https://twitter.com/${person.contact.sns.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer">
                <Twitter className="w-4 h-4" />
              </a>
            </Button>
          )}
          {person.contact?.sns?.instagram && (
            <Button variant="outline" size="sm" asChild>
              <a href={`https://instagram.com/${person.contact.sns.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer">
                <Instagram className="w-4 h-4" />
              </a>
            </Button>
          )}
          <Button variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2" />
            編集
          </Button>
        </div>
      </div>
    </div>
  );
}

