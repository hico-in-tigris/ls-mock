import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft } from 'lucide-react';
import IntentHeader from '@/components/intent/IntentHeader';
import IntentCheckSummaryTable from '@/components/intent/IntentCheckSummaryTable';
import IntentDetailTabs from '@/components/intent/IntentDetailTabs';
import { getIntentCaseById } from '@/mock/intentCases';

export default function IntentApprovalDetail() {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [intentCase, setIntentCase] = useState(() => getIntentCaseById(caseId));
  const [checkItems, setCheckItems] = useState(intentCase?.checkItems || []);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  if (!intentCase) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 mb-4">意向確認ケースが見つかりません</p>
          <Button onClick={() => navigate(-1)}>戻る</Button>
        </div>
      </div>
    );
  }

  const handleChangeReviewerJudge = (id, judge) => {
    setCheckItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, reviewerJudge: judge } : item))
    );
  };

  const handleOpenComment = (id) => {
    // コメントモーダルを開く処理（将来的に実装）
    toast({
      title: 'コメント機能',
      description: `チェック項目 ${id} のコメントを開きます`,
    });
  };

  const handleReject = () => {
    if (!rejectReason.trim()) {
      toast({
        title: 'エラー',
        description: '差戻し理由を入力してください',
        variant: 'destructive',
      });
      return;
    }
    console.log('差戻し理由:', rejectReason);
    toast({
      title: '差戻しを実行しました',
      description: rejectReason,
    });
    setIntentCase((prev) => ({ ...prev, status: 'REJECTED' }));
    setIsRejectDialogOpen(false);
    setRejectReason('');
  };

  const handlePending = () => {
    toast({
      title: '保留にしました',
      description: 'この案件は保留中です',
    });
    setIntentCase((prev) => ({ ...prev, status: 'PENDING' }));
  };

  const handleApprove = () => {
    toast({
      title: '承認しました',
      description: 'この案件を承認しました',
    });
    setIntentCase((prev) => ({ ...prev, status: 'APPROVED' }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <div className="container mx-auto py-6 px-4 max-w-7xl">
        {/* ページヘッダー */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            戻る
          </Button>
          <h1 className="text-2xl font-bold">意向確認（承認画面）</h1>
        </div>

        {/* コンテンツ */}
        <div className="space-y-6">
          <IntentHeader intentCase={intentCase} />
          <IntentCheckSummaryTable
            items={checkItems}
            onChangeReviewerJudge={handleChangeReviewerJudge}
            onOpenComment={handleOpenComment}
          />
          <IntentDetailTabs intentCase={intentCase} />
        </div>

        {/* フッターアクション */}
        <div className="sticky bottom-0 bg-white border-t mt-8 py-4 px-4 rounded-t-lg shadow-lg">
          <div className="flex justify-end gap-4">
            <Button
              variant="outline"
              onClick={() => setIsRejectDialogOpen(true)}
            >
              差戻す
            </Button>
            <Button
              variant="secondary"
              onClick={handlePending}
            >
              保留
            </Button>
            <Button
              onClick={handleApprove}
              disabled={intentCase.status === 'APPROVED'}
            >
              承認する
            </Button>
          </div>
        </div>
      </div>

      {/* 差戻し理由入力モーダル */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>差戻し理由</DialogTitle>
            <DialogDescription>
              差戻しの理由を入力してください
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              placeholder="差戻し理由を入力..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="min-h-[120px]"
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsRejectDialogOpen(false);
                setRejectReason('');
              }}
            >
              キャンセル
            </Button>
            <Button onClick={handleReject}>送信</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

