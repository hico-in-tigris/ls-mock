import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function IntentHeader({ intentCase }) {
  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'APPROVED':
        return 'default';
      case 'REJECTED':
        return 'destructive';
      case 'PENDING':
        return 'secondary';
      case 'UNAPPROVED':
      default:
        return 'outline';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'APPROVED':
        return '承認済み';
      case 'REJECTED':
        return '差戻し';
      case 'PENDING':
        return '保留';
      case 'UNAPPROVED':
      default:
        return '未承認';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">案件情報</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div>
              <span className="text-sm text-muted-foreground">契約者名：</span>
              <span className="font-medium">{intentCase.customerInfo.name}</span>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">被保険者名：</span>
              <span className="font-medium">{intentCase.customerInfo.insuredName}</span>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">商品名：</span>
              <span className="font-medium">{intentCase.productName}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <span className="text-sm text-muted-foreground">チャネル：</span>
              <span className="font-medium">{intentCase.channel}</span>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">担当者：</span>
              <span className="font-medium">{intentCase.agentName}</span>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">意向確認日：</span>
              <span className="font-medium">{intentCase.intentConfirmedAt}</span>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">ステータス：</span>
              <Badge variant={getStatusBadgeVariant(intentCase.status)} className="ml-2">
                {getStatusLabel(intentCase.status)}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

