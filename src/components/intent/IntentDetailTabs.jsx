import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckCircle2, XCircle } from 'lucide-react';

export default function IntentDetailTabs({ intentCase }) {
  return (
    <Tabs defaultValue="customer" className="w-full">
      <TabsList className="grid w-full grid-cols-6">
        <TabsTrigger value="customer">お客様情報</TabsTrigger>
        <TabsTrigger value="intent">意向の内容</TabsTrigger>
        <TabsTrigger value="proposal">提案内容</TabsTrigger>
        <TabsTrigger value="explanation">説明履歴</TabsTrigger>
        <TabsTrigger value="qa">設問と回答</TabsTrigger>
        <TabsTrigger value="comments">コメント履歴</TabsTrigger>
      </TabsList>

      <TabsContent value="customer" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>お客様情報</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-muted-foreground">年齢：</span>
                  <span className="ml-2 font-medium">{intentCase.customerInfo.age}歳</span>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">家族構成：</span>
                  <span className="ml-2 font-medium">{intentCase.customerInfo.familyStructure}</span>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">職業：</span>
                  <span className="ml-2 font-medium">{intentCase.customerInfo.job}</span>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">収入レンジ：</span>
                  <span className="ml-2 font-medium">{intentCase.customerInfo.incomeRange}</span>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">住宅ローン：</span>
                  <span className="ml-2 font-medium">
                    {intentCase.customerInfo.hasMortgage ? 'あり' : 'なし'}
                  </span>
                </div>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">既契約情報：</span>
                <p className="mt-2 text-sm">{intentCase.customerInfo.existingPoliciesSummary}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="intent" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>意向の内容</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <span className="text-sm font-medium text-muted-foreground">相談のきっかけ</span>
                <p className="mt-2 text-sm">{intentCase.intentContent.trigger}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">目的</span>
                <p className="mt-2 text-sm">{intentCase.intentContent.purpose}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium text-muted-foreground">希望保険料レンジ</span>
                  <p className="mt-2 text-sm">{intentCase.intentContent.desiredPremium}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">希望期間</span>
                  <p className="mt-2 text-sm">{intentCase.intentContent.desiredPeriod}</p>
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">お客様の言葉</span>
                <p className="mt-2 text-sm italic">{intentCase.intentContent.customerWords}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">担当者要約</span>
                <p className="mt-2 text-sm">{intentCase.intentContent.agentSummary}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="proposal" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>提案内容</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {intentCase.proposedPlans.map((plan, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{plan.productName}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm text-muted-foreground">保障内容：</span>
                        <span className="ml-2 font-medium">{plan.coverageSummary}</span>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">保険料：</span>
                        <span className="ml-2 font-medium">{plan.premium}</span>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">払込方法：</span>
                        <span className="ml-2 font-medium">{plan.payMethod}</span>
                      </div>
                      {plan.notes && (
                        <div>
                          <span className="text-sm text-muted-foreground">備考：</span>
                          <p className="mt-1 text-sm">{plan.notes}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="explanation" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>説明履歴</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>項目</TableHead>
                  <TableHead className="w-[150px]">状態</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {intentCase.explanationRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>{record.label}</TableCell>
                    <TableCell>
                      {record.notApplicable ? (
                        <Badge variant="outline">該当なし</Badge>
                      ) : record.explained ? (
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle2 className="h-4 w-4" />
                          <span>説明済み</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-gray-500">
                          <XCircle className="h-4 w-4" />
                          <span>未説明</span>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="qa" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>設問と回答</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                {intentCase.qandas.map((qa) => (
                  <Card key={qa.id}>
                    <CardContent className="pt-6">
                      <div className="space-y-2">
                        <div className="flex items-start justify-between">
                          <p className="font-medium text-sm">Q: {qa.question}</p>
                          {qa.flagged && (
                            <Badge variant="destructive" className="ml-2">
                              要確認
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground pl-4">
                          A: {qa.answer}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="comments" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>コメント履歴</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                {intentCase.approvalComments.map((comment) => (
                  <Card key={comment.id}>
                    <CardContent className="pt-6">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{comment.author}</span>
                            <Badge
                              variant={
                                comment.status === 'APPROVED'
                                  ? 'default'
                                  : comment.status === 'REJECTED'
                                  ? 'destructive'
                                  : 'secondary'
                              }
                            >
                              {comment.status === 'APPROVED'
                                ? '承認'
                                : comment.status === 'REJECTED'
                                ? '差戻し'
                                : '保留'}
                            </Badge>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {comment.createdAt}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{comment.role}</p>
                        <p className="text-sm">{comment.comment}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

