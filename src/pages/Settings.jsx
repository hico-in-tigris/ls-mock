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
    <div className="min-h-screen bg-ls-bg">
      {/* LSPageLayout: Header */}
      <div className="px-4 pt-6 pb-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-ls-primary/10 flex items-center justify-center">
              <SettingsIcon className="w-5 h-5 text-ls-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-ls-text">設定</h1>
              <p className="text-sm text-ls-text-light mt-1">アプリの設定とデータ管理</p>
            </div>
          </div>
        </div>
      </div>

      {/* LSPageLayout: Main Content */}
      <div className="px-4 pb-6">
        <div className="max-w-4xl mx-auto">
          {/* LSSection: Profile */}
          <div className="mt-6">
            <h2 className="text-lg font-medium text-ls-text mb-3">プロフィール</h2>
            <Card className="border-ls-border shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-medium">
                  <User className="w-5 h-5 text-ls-primary" />
                  あなたの情報を管理します
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>名前</Label>
                    <Input value={user?.full_name || ''} disabled className="bg-ls-bg border-ls-border" />
                  </div>
                  <div className="space-y-2">
                    <Label>メールアドレス</Label>
                    <Input value={user?.email || ''} disabled className="bg-ls-bg border-ls-border" />
                  </div>
                </div>
            
                <Separator className="bg-ls-border" />
                
                <div className="space-y-2">
                  <Label>スキル・専門分野</Label>
                  <Input
                    value={profile.skills}
                    onChange={(e) => setProfile({ ...profile, skills: e.target.value })}
                    placeholder="例: 地域活性化、マーケティング、Web制作"
                    className="border-ls-border"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>興味・関心</Label>
                  <Input
                    value={profile.interests}
                    onChange={(e) => setProfile({ ...profile, interests: e.target.value })}
                    placeholder="例: 移住促進、空き家活用、地域コミュニティ"
                    className="border-ls-border"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>目標</Label>
                  <Textarea
                    value={profile.goals}
                    onChange={(e) => setProfile({ ...profile, goals: e.target.value })}
                    placeholder="この地域で実現したいこと..."
                    rows={3}
                    className="border-ls-border"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>連絡先の希望</Label>
                  <Input
                    value={profile.contact_preference}
                    onChange={(e) => setProfile({ ...profile, contact_preference: e.target.value })}
                    placeholder="例: メール優先、平日10-17時"
                    className="border-ls-border"
                  />
                </div>
                
                <Button 
                  onClick={() => updateProfileMutation.mutate(profile)}
                  disabled={updateProfileMutation.isPending}
                  className="bg-ls-primary hover:bg-ls-primary-light text-white"
                >
                  <Save className="w-4 h-4 mr-2" />
                  プロフィールを保存
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* LSSection: Privacy */}
          <div className="mt-6">
            <h2 className="text-lg font-medium text-ls-text mb-3">プライバシー</h2>
            <Card className="border-ls-border shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-medium">
                  {maskedMode ? <EyeOff className="w-5 h-5 text-ls-text-light" /> : <Eye className="w-5 h-5 text-ls-text-light" />}
                  デモ時などに個人情報を保護します
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 rounded-lg bg-ls-bg border border-ls-border">
                  <div>
                    <p className="text-sm font-medium text-ls-text">匿名化表示</p>
                    <p className="text-xs text-ls-text-light mt-1">関係者の名前を匿名化して表示</p>
                  </div>
                  <Switch
                    checked={maskedMode}
                    onCheckedChange={setMaskedMode}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* LSSection: Data Stats */}
          <div className="mt-6">
            <h2 className="text-lg font-medium text-ls-text mb-3">データ概要</h2>
            <Card className="border-ls-border shadow-sm">
              <CardContent className="p-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 rounded-lg bg-ls-success/10 text-center border border-ls-success/20">
                    <p className="text-2xl font-bold text-ls-success">{people.length}</p>
                    <p className="text-xs text-ls-text-light mt-1">関係者</p>
                  </div>
                  <div className="p-4 rounded-lg bg-ls-primary/10 text-center border border-ls-primary/20">
                    <p className="text-2xl font-bold text-ls-primary">{projects.length}</p>
                    <p className="text-xs text-ls-text-light mt-1">プロジェクト</p>
                  </div>
                  <div className="p-4 rounded-lg bg-ls-secondary/10 text-center border border-ls-secondary/20">
                    <p className="text-2xl font-bold text-ls-secondary">{actions.length}</p>
                    <p className="text-xs text-ls-text-light mt-1">アクション</p>
                  </div>
                  <div className="p-4 rounded-lg bg-ls-accent/10 text-center border border-ls-accent/20">
                    <p className="text-2xl font-bold text-ls-accent">{regionData.length}</p>
                    <p className="text-xs text-ls-text-light mt-1">地域データ</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* LSSection: Data Management */}
          <div className="mt-6">
            <h2 className="text-lg font-medium text-ls-text mb-3">データ管理</h2>
            <Card className="border-ls-border shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-medium">
                  <Download className="w-5 h-5 text-ls-text-light" />
                  データのエクスポートと初期化
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    variant="outline" 
                    className="flex-1 gap-2 border-ls-border text-ls-text hover:bg-ls-bg" 
                    onClick={handleExportData}
                  >
                    <Download className="w-4 h-4" />
                    データをエクスポート
                  </Button>
                </div>
                
                <Separator className="bg-ls-border" />
                
                <div className="p-4 rounded-lg bg-ls-danger/10 border border-ls-danger/20">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-ls-danger">危険な操作</p>
                      <p className="text-xs text-ls-text-light mt-1">
                        すべてのデータを削除します。この操作は取り消せません。
                      </p>
                    </div>
                    <Button 
                      variant="destructive"
                      onClick={() => setShowDeleteConfirm(true)}
                      className="bg-ls-danger hover:bg-ls-danger/90 text-white"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      初期化
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* LSSection: Account */}
          <div className="mt-6">
            <h2 className="text-lg font-medium text-ls-text mb-3">アカウント</h2>
            <Card className="border-ls-border shadow-sm">
              <CardContent className="p-4">
                <Button 
                  variant="outline" 
                  onClick={handleLogout} 
                  className="gap-2 border-ls-border text-ls-text hover:bg-ls-bg"
                >
                  <LogOut className="w-4 h-4" />
                  ログアウト
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* LSSection: System Info */}
          <div className="mt-6">
            <h2 className="text-lg font-medium text-ls-text mb-3">システム情報</h2>
            <Card className="border-ls-border shadow-sm">
              <CardContent className="p-4">
                <div className="space-y-2 text-sm text-ls-text-light">
                  <div className="flex justify-between">
                    <span>バージョン</span>
                    <Badge variant="secondary" className="bg-ls-bg border-ls-border">v2.3.0</Badge>
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
              className="bg-ls-danger hover:bg-ls-danger/90 text-white"
            >
              すべて削除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}