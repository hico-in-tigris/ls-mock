import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, Mail, Trash2, Loader2, Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

const permissionLabels = {
  view: { label: '閲覧のみ', color: 'bg-slate-100 text-slate-600' },
  comment: { label: 'コメント可', color: 'bg-blue-100 text-blue-700' },
  edit: { label: '編集可', color: 'bg-emerald-100 text-emerald-700' }
};

export default function ShareDialog({ hypothesisId, hypothesisTitle, trigger }) {
  const [email, setEmail] = useState('');
  const [permission, setPermission] = useState('comment');
  const [copied, setCopied] = useState(false);
  const queryClient = useQueryClient();

  const { data: shares = [], isLoading } = useQuery({
    queryKey: ['shares', hypothesisId],
    queryFn: () => base44.entities.HypothesisShare.filter({ hypothesis_id: hypothesisId })
  });

  const { data: currentUser } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => base44.auth.me()
  });

  const inviteMutation = useMutation({
    mutationFn: async () => {
      const share = await base44.entities.HypothesisShare.create({
        hypothesis_id: hypothesisId,
        shared_with_email: email,
        permission,
        invited_by: currentUser?.email,
        status: 'pending'
      });

      // アクティビティ記録
      await base44.entities.Activity.create({
        hypothesis_id: hypothesisId,
        action_type: 'shared',
        actor_name: currentUser?.full_name || 'ユーザー',
        actor_email: currentUser?.email,
        description: `${currentUser?.full_name || 'ユーザー'}が${email}を招待しました`,
        metadata: { shared_with: email, permission }
      });

      // メール送信
      await base44.integrations.Core.SendEmail({
        to: email,
        subject: `【仮説OS】${currentUser?.full_name || 'チームメンバー'}から仮説への招待`,
        body: `${currentUser?.full_name || 'チームメンバー'}さんから、仮説「${hypothesisTitle}」への参加招待が届きました。\n\n権限: ${permissionLabels[permission].label}\n\nアプリにログインして確認してください。`
      });

      return share;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shares', hypothesisId] });
      queryClient.invalidateQueries({ queryKey: ['activities', hypothesisId] });
      setEmail('');
    }
  });

  const removeMutation = useMutation({
    mutationFn: (shareId) => base44.entities.HypothesisShare.delete(shareId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shares', hypothesisId] });
    }
  });

  const handleCopyLink = async () => {
    const url = `${window.location.origin}${window.location.pathname}?id=${hypothesisId}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getInitials = (email) => {
    return email?.split('@')[0]?.slice(0, 2).toUpperCase() || '??';
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <Users className="w-4 h-4 mr-1.5" />
            共有
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            チームと共有
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* 招待フォーム */}
          <div className="space-y-3">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="メールアドレス"
                  className="pl-10"
                />
              </div>
              <Select value={permission} onValueChange={setPermission}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="view">閲覧のみ</SelectItem>
                  <SelectItem value="comment">コメント可</SelectItem>
                  <SelectItem value="edit">編集可</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={() => inviteMutation.mutate()}
              disabled={!email.trim() || inviteMutation.isPending}
              className="w-full bg-slate-800 hover:bg-slate-900"
            >
              {inviteMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin mr-1.5" />
              ) : null}
              招待を送信
            </Button>
          </div>

          {/* リンクをコピー */}
          <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-50">
            <Input
              readOnly
              value={`${window.location.origin}${window.location.pathname}?id=${hypothesisId}`}
              className="text-xs bg-white"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyLink}
              className="shrink-0"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>

          {/* 共有済みメンバー */}
          {shares.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-700">共有中のメンバー</p>
              <div className="space-y-2">
                {shares.map((share) => (
                  <div key={share.id} className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="text-xs bg-slate-200">
                          {getInitials(share.shared_with_email)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm text-slate-700">{share.shared_with_email}</p>
                        <Badge variant="secondary" className={cn("text-xs", permissionLabels[share.permission]?.color)}>
                          {permissionLabels[share.permission]?.label}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeMutation.mutate(share.id)}
                      className="h-8 w-8 text-slate-400 hover:text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}