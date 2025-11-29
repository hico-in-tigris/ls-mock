/**
 * useHypothesisDetail - 仮説詳細ページのデータ取得とmutations
 * HypothesisDetail.jsxから分離したカスタムフック
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/apiClient';
import { recommendPeopleForHypothesis } from '@/api/integrations';

/**
 * 仮説詳細ページで使用するデータ取得とmutations
 * @param {string} hypothesisId - 仮説ID
 * @returns {object} データとmutations
 */
export function useHypothesisDetail(hypothesisId) {
  const queryClient = useQueryClient();

  // 仮説データの取得
  const { data: hypothesis, isLoading } = useQuery({
    queryKey: ['hypothesis', hypothesisId],
    queryFn: () => base44.entities.Hypothesis.get(hypothesisId),
    enabled: !!hypothesisId
  });

  // 推薦された人材の取得
  const { data: recommendedPeople = [] } = useQuery({
    queryKey: ['recommendedPeople', hypothesisId],
    queryFn: () => recommendPeopleForHypothesis(hypothesisId),
    enabled: !!hypothesisId
  });

  // 仮説更新のmutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Hypothesis.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hypothesis', hypothesisId] });
      queryClient.invalidateQueries({ queryKey: ['hypotheses'] });
    }
  });

  return {
    hypothesis,
    isLoading,
    recommendedPeople,
    updateMutation
  };
}

