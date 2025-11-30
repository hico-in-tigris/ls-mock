import React, { useState } from 'react';
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, parseISO } from 'date-fns';
import { ja } from 'date-fns/locale';
import { 
  FileText, 
  Plus, 
  CheckCircle2,
  TrendingUp,
  Smile,
  Meh,
  Frown,
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import ReflectionForm from '@/components/summary/ReflectionForm';
import EmptyState from '@/components/ui/EmptyState';
import { useSummary } from '@/hooks/useSummary';

const moodConfig = {
  'great': { icon: Smile, label: '最高', color: 'text-emerald-500 bg-emerald-50' },
  'good': { icon: Smile, label: '良い', color: 'text-blue-500 bg-blue-50' },
  'neutral': { icon: Meh, label: '普通', color: 'text-slate-500 bg-slate-50' },
  'difficult': { icon: Frown, label: '難しかった', color: 'text-amber-500 bg-amber-50' },
  'challenging': { icon: Frown, label: '大変だった', color: 'text-red-500 bg-red-50' }
};

export default function Summary() {
  const [periodType, setPeriodType] = useState('daily');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showForm, setShowForm] = useState(false);
  const [editReflection, setEditReflection] = useState(null);

  const {
    reflections: filteredReflections,
    doneActions,
    isLoading,
    createMutation,
    updateMutation,
    createActionMutation
  } = useSummary(periodType, selectedDate);

  const getPeriodLabel = () => {
    switch (periodType) {
      case 'daily':
        return format(selectedDate, 'yyyy年M月d日（E）', { locale: ja });
      case 'weekly':
        const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });
        const weekEnd = endOfWeek(selectedDate, { weekStartsOn: 1 });
        return `${format(weekStart, 'M/d', { locale: ja })} - ${format(weekEnd, 'M/d', { locale: ja })}`;
      case 'monthly':
        return format(selectedDate, 'yyyy年M月', { locale: ja });
      default:
        return '';
    }
  };

  const handlePrevPeriod = () => {
    const newDate = new Date(selectedDate);
    switch (periodType) {
      case 'daily':
        newDate.setDate(newDate.getDate() - 1);
        break;
      case 'weekly':
        newDate.setDate(newDate.getDate() - 7);
        break;
      case 'monthly':
        newDate.setMonth(newDate.getMonth() - 1);
        break;
    }
    setSelectedDate(newDate);
  };

  const handleNextPeriod = () => {
    const newDate = new Date(selectedDate);
    switch (periodType) {
      case 'daily':
        newDate.setDate(newDate.getDate() + 1);
        break;
      case 'weekly':
        newDate.setDate(newDate.getDate() + 7);
        break;
      case 'monthly':
        newDate.setMonth(newDate.getMonth() + 1);
        break;
    }
    setSelectedDate(newDate);
  };

  const handleCreateReflection = (data) => {
    createMutation.mutate({
      ...data,
      period_type: periodType,
      period_date: format(selectedDate, 'yyyy-MM-dd')
    }, {
      onSuccess: () => {
        setShowForm(false);
      }
    });
  };

  const handleUpdateReflection = (data) => {
    updateMutation.mutate({ id: editReflection.id, data }, {
      onSuccess: () => {
        setEditReflection(null);
      }
    });
  };

  const handlePromoteToAction = (nextAction) => {
    createActionMutation.mutate({
      content: nextAction,
      type: '準備',
      status: 'Todo',
      due_date: format(new Date(), 'yyyy-MM-dd')
    });
  };

  const todayReflection = filteredReflections.find(r => r.period_type === periodType);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">ふりかえり</h1>
              <p className="text-sm text-slate-500">日々の学びを記録しましょう</p>
            </div>
          </div>
          <Button 
            onClick={() => setShowForm(true)}
            className="bg-purple-600 hover:bg-purple-700 gap-1.5"
          >
            <Plus className="w-4 h-4" />
            ふりかえりを追加
          </Button>
        </div>

        {/* Period Selection */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <Tabs value={periodType} onValueChange={setPeriodType}>
            <TabsList>
              <TabsTrigger value="daily">日次</TabsTrigger>
              <TabsTrigger value="weekly">週次</TabsTrigger>
              <TabsTrigger value="monthly">月次</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={handlePrevPeriod}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm font-medium min-w-[180px] text-center">
              {getPeriodLabel()}
            </span>
            <Button variant="outline" size="icon" onClick={handleNextPeriod}>
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setSelectedDate(new Date())}
              className="ml-2"
            >
              今日
            </Button>
          </div>
        </div>

        {/* Stats */}
        {periodType === 'daily' && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <CheckCircle2 className="w-6 h-6 mx-auto mb-2 text-emerald-500" />
                <div className="text-2xl font-bold">{doneActions.length}</div>
                <div className="text-xs text-slate-500">完了アクション</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <FileText className="w-6 h-6 mx-auto mb-2 text-purple-500" />
                <div className="text-2xl font-bold">{filteredReflections.length}</div>
                <div className="text-xs text-slate-500">ふりかえり</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <TrendingUp className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                <div className="text-2xl font-bold">
                  {filteredReflections.reduce((acc, r) => acc + (r.next_actions?.length || 0), 0)}
                </div>
                <div className="text-xs text-slate-500">次のアクション</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                {todayReflection ? (
                  <>
                    {React.createElement(moodConfig[todayReflection.mood]?.icon || Meh, {
                      className: cn("w-6 h-6 mx-auto mb-2", moodConfig[todayReflection.mood]?.color.split(' ')[0])
                    })}
                    <div className="text-sm font-medium">
                      {moodConfig[todayReflection.mood]?.label}
                    </div>
                  </>
                ) : (
                  <>
                    <Meh className="w-6 h-6 mx-auto mb-2 text-slate-300" />
                    <div className="text-sm text-slate-400">未記録</div>
                  </>
                )}
                <div className="text-xs text-slate-500">気分</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Reflections List */}
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-slate-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : filteredReflections.length === 0 ? (
          <EmptyState
            icon={FileText}
            title="この期間のふりかえりはありません"
            description="「ふりかえりを追加」ボタンから記録を始めましょう"
            actionLabel="ふりかえりを追加"
            onAction={() => setShowForm(true)}
          />
        ) : (
          <div className="space-y-4">
            {filteredReflections.map(reflection => {
              const mood = moodConfig[reflection.mood] || moodConfig.neutral;
              const MoodIcon = mood.icon;
              
              return (
                <Card 
                  key={reflection.id}
                  className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setEditReflection(reflection)}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={cn("p-2 rounded-xl", mood.color)}>
                          <MoodIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">
                            {format(parseISO(reflection.period_date), 'M月d日（E）', { locale: ja })}
                          </p>
                          <Badge variant="secondary" className="mt-1">
                            {reflection.period_type === 'daily' ? '日次' : 
                             reflection.period_type === 'weekly' ? '週次' : '月次'}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {reflection.good_points && (
                      <div className="mb-3">
                        <p className="text-xs font-medium text-emerald-600 mb-1">良かったこと</p>
                        <p className="text-sm text-slate-600 line-clamp-2">{reflection.good_points}</p>
                      </div>
                    )}

                    {reflection.learnings && (
                      <div className="mb-3">
                        <p className="text-xs font-medium text-blue-600 mb-1">学び</p>
                        <p className="text-sm text-slate-600 line-clamp-2">{reflection.learnings}</p>
                      </div>
                    )}

                    {reflection.next_actions?.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-indigo-600 mb-2">次のアクション</p>
                        <div className="flex flex-wrap gap-2">
                          {reflection.next_actions.slice(0, 3).map((action, i) => (
                            <Button
                              key={i}
                              variant="outline"
                              size="sm"
                              className="gap-1 text-xs"
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePromoteToAction(action);
                              }}
                            >
                              {action}
                              <ArrowRight className="w-3 h-3" />
                            </Button>
                          ))}
                          {reflection.next_actions.length > 3 && (
                            <Badge variant="secondary">
                              +{reflection.next_actions.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Create Reflection Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>ふりかえりを追加</DialogTitle>
          </DialogHeader>
          <ReflectionForm
            doneActions={doneActions}
            onSubmit={handleCreateReflection}
            onCancel={() => setShowForm(false)}
            isLoading={createMutation.isPending}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Reflection Dialog */}
      <Dialog open={!!editReflection} onOpenChange={() => setEditReflection(null)}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>ふりかえりを編集</DialogTitle>
          </DialogHeader>
          <ReflectionForm
            reflection={editReflection}
            doneActions={doneActions}
            onSubmit={handleUpdateReflection}
            onCancel={() => setEditReflection(null)}
            isLoading={updateMutation.isPending}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}