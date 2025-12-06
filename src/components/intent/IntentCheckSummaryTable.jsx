import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle2, AlertTriangle, MessageSquare } from 'lucide-react';

export default function IntentCheckSummaryTable({ items, onChangeReviewerJudge, onOpenComment }) {
  const ngCount = items.filter(
    (item) => item.autoJudge === 'NG' || item.reviewerJudge === 'NG'
  ).length;

  const getAutoJudgeDisplay = (judge) => {
    if (judge === 'OK') {
      return (
        <div className="flex items-center gap-2 text-green-600">
          <CheckCircle2 className="h-4 w-4" />
          <span>OK</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-2 text-red-600">
          <AlertTriangle className="h-4 w-4" />
          <span>NG</span>
        </div>
      );
    }
  };

  const getReviewerJudgeLabel = (judge) => {
    switch (judge) {
      case 'OK':
        return 'OK';
      case 'NG':
        return 'NG';
      case 'NEEDS_DISCUSSION':
        return '要相談';
      case 'UNSET':
      default:
        return '未設定';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">チェック項目</h2>
        {ngCount > 0 && (
          <Badge variant="destructive" className="text-sm">
            NG件数: {ngCount}件
          </Badge>
        )}
      </div>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">カテゴリ</TableHead>
              <TableHead>チェック項目</TableHead>
              <TableHead className="w-[120px]">自動判定</TableHead>
              <TableHead className="w-[150px]">承認判定</TableHead>
              <TableHead className="w-[100px]">コメント</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.category}</TableCell>
                <TableCell>{item.label}</TableCell>
                <TableCell>{getAutoJudgeDisplay(item.autoJudge)}</TableCell>
                <TableCell>
                  <Select
                    value={item.reviewerJudge}
                    onValueChange={(value) => onChangeReviewerJudge(item.id, value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="未設定" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UNSET">未設定</SelectItem>
                      <SelectItem value="OK">OK</SelectItem>
                      <SelectItem value="NG">NG</SelectItem>
                      <SelectItem value="NEEDS_DISCUSSION">要相談</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onOpenComment(item.id)}
                    className="h-8 w-8 p-0"
                  >
                    <MessageSquare className={`h-4 w-4 ${item.hasComment ? 'text-blue-600' : ''}`} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

