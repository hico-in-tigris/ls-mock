import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, Calendar } from "lucide-react";
import { format, parseISO } from "date-fns";
import PeopleCard from '@/components/people/PeopleCard';

/**
 * 人物詳細ページのサイドバーコンポーネント
 * @param {object} person - 人物データ
 * @param {array} recommendedPeople - 推薦された人材
 */
export default function PersonSidebar({ person, recommendedPeople }) {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Contact Info */}
      <Card>
        <CardHeader>
          <CardTitle>連絡先</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {person.contact?.email && (
            <div className="flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4 text-slate-400" />
              <a href={`mailto:${person.contact.email}`} className="text-emerald-600 hover:underline">
                {person.contact.email}
              </a>
            </div>
          )}
          {person.contact?.phone && (
            <div className="flex items-center gap-2 text-sm">
              <Phone className="w-4 h-4 text-slate-400" />
              <a href={`tel:${person.contact.phone}`} className="text-emerald-600 hover:underline">
                {person.contact.phone}
              </a>
            </div>
          )}
          {person.lastContactAt && (
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Calendar className="w-4 h-4" />
              <span>最終接触: {format(parseISO(person.lastContactAt), 'yyyy年M月d日')}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      {recommendedPeople.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>AIのおすすめ</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600 mb-4">
              この仮説に関わりそうな人
            </p>
            <div className="space-y-3">
              {recommendedPeople.map(rec => (
                <PeopleCard
                  key={rec.id}
                  id={rec.id}
                  name={rec.name}
                  role={rec.role}
                  skills={rec.skills || []}
                  values={rec.values || []}
                  lastContactAt={rec.lastContactAt}
                  projects={rec.projects || []}
                  onClick={() => navigate(`/people/${rec.id}`)}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

