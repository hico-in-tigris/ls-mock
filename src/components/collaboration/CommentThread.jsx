import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageCircle, Send, Loader2 } from "lucide-react";
import { format, parseISO } from "date-fns";
import { cn } from "@/lib/utils";

export default function CommentThread({ 
  hypothesisId, 
  targetType = 'hypothesis',
  targetId = null,
  compact = false 
}) {
  const [text, setText] = useState('');
  const [isExpanded, setIsExpanded] = useState(!compact);
  const queryClient = useQueryClient();

  const { data: comments = [], isLoading } = useQuery({
    queryKey: ['comments', hypothesisId, targetType, targetId],
    queryFn: async () => {
      const filter = { hypothesis_id: hypothesisId };
      if (targetType !== 'hypothesis') {
        filter.target_type = targetType;
        filter.target_id = targetId;
      }
      return base44.entities.Comment.filter(filter, '-created_date');
    }
  });

  const { data: currentUser } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => base44.auth.me()
  });

  const addCommentMutation = useMutation({
    mutationFn: async (content) => {
      const comment = await base44.entities.Comment.create({
        hypothesis_id: hypothesisId,
        target_type: targetType,
        target_id: targetId,
        content,
        author_name: currentUser?.full_name || 'ユーザー',
        author_email: currentUser?.email
      });

      // アクティビティも記録
      await base44.entities.Activity.create({
        hypothesis_id: hypothesisId,
        action_type: 'comment_added',
        actor_name: currentUser?.full_name || 'ユーザー',
        actor_email: currentUser?.email,
        description: `${currentUser?.full_name || 'ユーザー'}がコメントを追加しました`,
        metadata: { comment_id: comment.id, target_type: targetType }
      });

      return comment;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', hypothesisId] });
      queryClient.invalidateQueries({ queryKey: ['activities', hypothesisId] });
      setText('');
    }
  });

  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const filteredComments = targetType === 'hypothesis' 
    ? comments.filter(c => !c.target_type || c.target_type === 'hypothesis')
    : comments;

  if (compact && !isExpanded) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsExpanded(true)}
        className="text-slate-500"
      >
        <MessageCircle className="w-4 h-4 mr-1.5" />
        {filteredComments.length > 0 ? `${filteredComments.length}件のコメント` : 'コメント'}
      </Button>
    );
  }

  return (
    <div className="space-y-4">
      {compact && (
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
            <MessageCircle className="w-4 h-4" />
            コメント ({filteredComments.length})
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(false)}
            className="text-xs text-slate-400"
          >
            閉じる
          </Button>
        </div>
      )}

      {/* コメント一覧 */}
      <div className="space-y-3">
        {filteredComments.map((comment) => (
          <div key={comment.id} className="flex gap-3">
            <Avatar className="w-8 h-8 shrink-0">
              <AvatarFallback className="text-xs bg-slate-100 text-slate-600">
                {getInitials(comment.author_name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-slate-800">
                  {comment.author_name || '匿名'}
                </span>
                <span className="text-xs text-slate-400">
                  {comment.created_date && format(parseISO(comment.created_date), 'M/d H:mm')}
                </span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                {comment.content}
              </p>
            </div>
          </div>
        ))}

        {filteredComments.length === 0 && !isLoading && (
          <p className="text-sm text-slate-400 text-center py-4">
            まだコメントがありません
          </p>
        )}
      </div>

      {/* コメント入力 */}
      <div className="flex gap-3">
        <Avatar className="w-8 h-8 shrink-0">
          <AvatarFallback className="text-xs bg-blue-100 text-blue-600">
            {getInitials(currentUser?.full_name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="コメントを追加..."
            className="min-h-[60px] text-sm resize-none"
          />
          <div className="flex justify-end">
            <Button
              size="sm"
              onClick={() => addCommentMutation.mutate(text)}
              disabled={!text.trim() || addCommentMutation.isPending}
              className="bg-slate-800 hover:bg-slate-900"
            >
              {addCommentMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Send className="w-3.5 h-3.5 mr-1.5" />
                  送信
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}