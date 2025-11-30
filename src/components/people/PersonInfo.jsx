import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tag, Briefcase, Lightbulb } from "lucide-react";

/**
 * 人物詳細ページの基本情報セクション
 * @param {object} person - 人物データ
 * @param {array} personHypotheses - 人物に関連する仮説
 * @param {array} personProjects - 人物に関連するプロジェクト
 */
export default function PersonInfo({ person, personHypotheses, personProjects }) {
  return (
    <div className="space-y-6">
      {/* Values */}
      {person.values && person.values.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tag className="w-5 h-5" />
              価値観
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {person.values.map((value, i) => (
                <Badge key={i} variant="secondary" className="text-sm">
                  {value}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Skills */}
      {person.skills && person.skills.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              スキル
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {person.skills.map((skill, i) => (
                <Badge key={i} variant="outline" className="text-sm">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Description */}
      {person.description && (
        <Card>
          <CardHeader>
            <CardTitle>プロフィール</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 whitespace-pre-wrap">{person.description}</p>
          </CardContent>
        </Card>
      )}

      {/* Hypotheses */}
      {personHypotheses.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              関わった仮説
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {personHypotheses.map(hypothesis => (
                <div key={hypothesis.id} className="p-3 border rounded-lg">
                  <h4 className="font-semibold text-slate-900">{hypothesis.title}</h4>
                  {hypothesis.target && (
                    <p className="text-sm text-slate-600 mt-1">対象: {hypothesis.target}</p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Projects */}
      {personProjects.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              関わったプロジェクト
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {personProjects.map(project => (
                <div key={project.id} className="p-3 border rounded-lg">
                  <h4 className="font-semibold text-slate-900">{project.name || project.title}</h4>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

