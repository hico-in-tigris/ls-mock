import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tag, Briefcase, Lightbulb, Edit } from "lucide-react";
import PersonTagsEditor from './PersonTagsEditor';

/**
 * 人物詳細ページの基本情報セクション
 * @param {object} person - 人物データ
 * @param {array} personHypotheses - 人物に関連する仮説
 * @param {array} personProjects - 人物に関連するプロジェクト
 */
export default function PersonInfo({ person, personHypotheses, personProjects }) {
  const [tagsEditorOpen, setTagsEditorOpen] = useState(false);
  
  const interests = person.values || person.interests || [];
  const skills = person.skills || [];

  return (
    <div className="space-y-6">
      {/* 関心領域 */}
      <Card className="border-ls-border shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg font-medium text-ls-text">
            <Tag className="w-5 h-5 text-ls-primary" />
            関心領域
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTagsEditorOpen(true)}
            className="text-ls-text-light hover:text-ls-text"
          >
            <Edit className="w-4 h-4 mr-1" />
            編集
          </Button>
        </CardHeader>
        <CardContent>
          {interests.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {interests.map((interest, i) => (
                <Badge 
                  key={i} 
                  variant="secondary" 
                  className="text-sm rounded-full px-2.5 py-0.5 bg-ls-bg border-ls-border"
                >
                  {interest}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-ls-text-light">関心領域が設定されていません</p>
          )}
        </CardContent>
      </Card>

      {/* スキル */}
      <Card className="border-ls-border shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg font-medium text-ls-text">
            <Briefcase className="w-5 h-5 text-ls-primary" />
            スキル
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTagsEditorOpen(true)}
            className="text-ls-text-light hover:text-ls-text"
          >
            <Edit className="w-4 h-4 mr-1" />
            編集
          </Button>
        </CardHeader>
        <CardContent>
          {skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <Badge 
                  key={i} 
                  variant="outline" 
                  className="text-sm rounded-full px-2.5 py-0.5 border-ls-border"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-ls-text-light">スキルが設定されていません</p>
          )}
        </CardContent>
      </Card>
      
      {/* タグ編集Drawer */}
      <PersonTagsEditor
        person={person}
        open={tagsEditorOpen}
        onOpenChange={setTagsEditorOpen}
      />

      {/* Description */}
      {person.description && (
        <Card className="border-ls-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-ls-text">プロフィール</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-ls-text leading-relaxed whitespace-pre-wrap">{person.description}</p>
          </CardContent>
        </Card>
      )}

      {/* Hypotheses */}
      {personHypotheses.length > 0 && (
        <Card className="border-ls-border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-medium text-ls-text">
              <Lightbulb className="w-5 h-5 text-ls-primary" />
              関わった仮説
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {personHypotheses.map(hypothesis => (
                <div key={hypothesis.id} className="p-3 rounded-lg border border-ls-border bg-ls-bg">
                  <h4 className="text-sm font-medium text-ls-text">{hypothesis.title}</h4>
                  {hypothesis.target && (
                    <p className="text-xs text-ls-text-light mt-1">対象: {hypothesis.target}</p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Projects */}
      {personProjects.length > 0 && (
        <Card className="border-ls-border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-medium text-ls-text">
              <Briefcase className="w-5 h-5 text-ls-primary" />
              関わったプロジェクト
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {personProjects.map(project => (
                <div key={project.id} className="p-3 rounded-lg border border-ls-border bg-ls-bg">
                  <h4 className="text-sm font-medium text-ls-text">{project.name || project.title}</h4>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

