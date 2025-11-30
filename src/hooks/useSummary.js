/**
 * useSummary - ふりかえりページのデータ取得とmutations
 * Summary.jsxから分離したカスタムフック
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/apiClient';
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, parseISO, isWithinInterval } from 'date-fns';

/**
 * ふりかえりページで使用するデータ取得とmutations
 * @param {string} periodType - 期間タイプ（'daily', 'weekly', 'monthly'）
 * @param {Date} selectedDate - 選択された日付
 * @returns {object} データとmutations
 */
export function useSummary(periodType, selectedDate) {
  const queryClient = useQueryClient();

  // ふりかえりデータの取得
  const { data: reflections = [], isLoading } = useQuery({
    queryKey: ['reflections'],
    queryFn: () => base44.entities.Reflection.list('-period_date'),
  });

  // アクションデータの取得
  const { data: actions = [] } = useQuery({
    queryKey: ['actions'],
    queryFn: () => base44.entities.Action.list('-created_date'),
  });

  // ふりかえり作成のmutation
  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.Reflection.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reflections'] });
    },
  });

  // ふりかえり更新のmutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Reflection.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reflections'] });
    },
  });

  // アクション作成のmutation
  const createActionMutation = useMutation({
    mutationFn: (data) => base44.entities.Action.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['actions'] });
    },
  });

  // 期間に応じたフィルタリング
  const getFilteredReflections = () => {
    return reflections.filter(r => {
      if (!r.period_date) return false;
      const reflectionDate = parseISO(r.period_date);
      
      switch (periodType) {
        case 'daily':
          return format(reflectionDate, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
        case 'weekly':
          return isWithinInterval(reflectionDate, {
            start: startOfWeek(selectedDate, { weekStartsOn: 1 }),
            end: endOfWeek(selectedDate, { weekStartsOn: 1 })
          });
        case 'monthly':
          return isWithinInterval(reflectionDate, {
            start: startOfMonth(selectedDate),
            end: endOfMonth(selectedDate)
          });
        default:
          return true;
      }
    });
  };

  // 完了したアクションの取得
  const getDoneActions = () => {
    return actions.filter(a => {
      if (a.status !== 'Done' || !a.completed_at) return false;
      const completedDate = parseISO(a.completed_at);
      return format(completedDate, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
    });
  };

  return {
    reflections: getFilteredReflections(),
    doneActions: getDoneActions(),
    isLoading,
    createMutation,
    updateMutation,
    createActionMutation
  };
}

