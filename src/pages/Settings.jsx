import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/apiClient';
import { 
  Settings as SettingsIcon, 
  User,
  MapPin,
  Download,
  Upload,
  Trash2,
  Eye,
  EyeOff,
  Save,
  LogOut
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

export default function Settings() {
  const queryClient = useQueryClient();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [maskedMode, setMaskedMode] = useState(false);
  const [profile, setProfile] = useState({
    skills: '',
    interests: '',
    goals: '',
    contact_preference: ''
  });

  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => base44.auth.me(),
  });

  const { data: regionData = [] } = useQuery({
    queryKey: ['regionData'],
    queryFn: () => base44.entities.RegionData.list(),
  });

  const { data: people = [] } = useQuery({
    queryKey: ['people'],
    queryFn: () => base44.entities.Person.list(),
  });

  const { data: projects = [] } = useQuery({
    queryKey: ['projects'],
    queryFn: () => base44.entities.Project.list(),
  });

  const { data: actions = [] } = useQuery({
    queryKey: ['actions'],
    queryFn: () => base44.entities.Action.list(),
  });

  const updateProfileMutation = useMutation({
    mutationFn: (data) => base44.auth.updateMe(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      toast.success('プロフィールを保存しました');
    },
  });

  React.useEffect(() => {
    if (user) {
      setProfile({
        skills: user.skills || '',
        interests: user.interests || '',
        goals: user.goals || '',
        contact_preference: user.contact_preference || ''
      });
    }
  }, [user]);

  const handleExportData = () => {
    const exportData = {
      exportDate: new Date().toISOString(),
      people,
      projects,
      actions,
      regionData
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `localsuccess-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('データをエクスポートしました');
  };

  const handleLogout = async () => {
    await base44.auth.logout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center">
            <SettingsIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">設定</h1>
            <p className="text-sm text-slate-500">アプリの設定とデータ管理</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Profile Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                プロフィール
              </CardTitle>
              <CardDescription>あなたの情報を管理します</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>名前</Label>
                  <Input value={user?.full_name || ''} disabled className="bg-slate-50" />
                </div>
                <div className="space-y-2">
                  <Label>メールアドレス</Label>
                  <Input value={user?.email || ''} disabled className="bg-slate-50" />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label>スキル・専門分野</Label>
                <Input
                  value={profile.skills}
                  onChange={(e) => setProfile({ ...profile, skills: e.target.value })}
                  placeholder="例: 地域活性化、マーケティング、Web制作"
                />
              </div>
              
              <div className="space-y-2">
                <Label>興味・関心</Label>
                <Input
                  value={profile.interests}
                  onChange={(e) => setProfile({ ...profile, interests: e.target.value })}
                  placeholder="例: 移住促進、空き家活用、地域コミュニティ"
                />
              </div>
              
              <div className="space-y-2">
                <Label>目標</Label>
                <Textarea
                  value={profile.goals}
                  onChange={(e) => setProfile({ ...profile, goals: e.target.value })}
                  placeholder="この地域で実現したいこと..."
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label>連絡先の希望</Label>
                <Input
                  value={profile.contact_preference}
                  onChange={(e) => setProfile({ ...profile, contact_preference: e.target.value })}
                  placeholder="例: メール優先、平日10-17時"
                />
              </div>
              
              <Button 
                onClick={() => updateProfileMutation.mutate(profile)}
                disabled={updateProfileMutation.isPending}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Save className="w-4 h-4 mr-2" />
                プロフィールを保存
              </Button>
            </CardContent>
          </Card>

          {/* Privacy Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {maskedMode ? <EyeOff className="w-5 h-5 text-slate-600" /> : <Eye className="w-5 h-5 text-slate-600" />}
                プライバシー
              </CardTitle>
              <CardDescription>デモ時などに個人情報を保護します</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50">
                <div>
                  <p className="font-medium text-slate-900">匿名化表示</p>
                  <p className="text-sm text-slate-500">関係者の名前を匿名化して表示</p>
                </div>
                <Switch
                  checked={maskedMode}
                  onCheckedChange={setMaskedMode}
                />
              </div>
            </CardContent>
          </Card>

          {/* Data Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-600" />
                データ概要
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-emerald-50 text-center">
                  <p className="text-2xl font-bold text-emerald-700">{people.length}</p>
                  <p className="text-xs text-emerald-600">関係者</p>
                </div>
                <div className="p-4 rounded-xl bg-indigo-50 text-center">
                  <p className="text-2xl font-bold text-indigo-700">{projects.length}</p>
                  <p className="text-xs text-indigo-600">プロジェクト</p>
                </div>
                <div className="p-4 rounded-xl bg-blue-50 text-center">
                  <p className="text-2xl font-bold text-blue-700">{actions.length}</p>
                  <p className="text-xs text-blue-600">アクション</p>
                </div>
                <div className="p-4 rounded-xl bg-amber-50 text-center">
                  <p className="text-2xl font-bold text-amber-700">{regionData.length}</p>
                  <p className="text-xs text-amber-600">地域データ</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="w-5 h-5 text-slate-600" />
                データ管理
              </CardTitle>
              <CardDescription>データのエクスポートと初期化</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" className="flex-1 gap-2" onClick={handleExportData}>
                  <Download className="w-4 h-4" />
                  データをエクスポート
                </Button>
              </div>
              
              <Separator />
              
              <div className="p-4 rounded-xl bg-red-50 border border-red-200">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium text-red-900">危険な操作</p>
                    <p className="text-sm text-red-700 mt-1">
                      すべてのデータを削除します。この操作は取り消せません。
                    </p>
                  </div>
                  <Button 
                    variant="destructive"
                    onClick={() => setShowDeleteConfirm(true)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    初期化
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account */}
          <Card>
            <CardHeader>
              <CardTitle>アカウント</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" onClick={handleLogout} className="gap-2">
                <LogOut className="w-4 h-4" />
                ログアウト
              </Button>
            </CardContent>
          </Card>

          {/* System Info */}
          <Card>
            <CardHeader>
              <CardTitle>システム情報</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-slate-500">
                <div className="flex justify-between">
                  <span>バージョン</span>
                  <Badge variant="secondary">v2.3.0</Badge>
                </div>
                <div className="flex justify-between">
                  <span>ビルド日</span>
                  <span>2025年</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Delete Confirmation */}
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>データを初期化しますか？</AlertDialogTitle>
            <AlertDialogDescription>
              すべてのデータが削除されます。この操作は取り消すことができません。
              事前にデータをエクスポートすることをお勧めします。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>キャンセル</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                toast.info('この機能は現在利用できません');
                setShowDeleteConfirm(false);
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              すべて削除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}