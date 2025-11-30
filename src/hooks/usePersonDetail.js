/**
 * usePersonDetail - 人物詳細ページのデータ取得とmutations
 * PersonDetail.jsxから分離したカスタムフック
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/apiClient';
import { recommendPeopleForHypothesis } from '@/api/integrations';

/**
 * 人物詳細ページで使用するデータ取得とmutations
 * @param {string} personId - 人物ID
 * @returns {object} データとmutations
 */
export function usePersonDetail(personId) {
  const queryClient = useQueryClient();

  // 人物データの取得
  const { data: person, isLoading } = useQuery({
    queryKey: ['person', personId],
    queryFn: () => base44.entities.Person.get(personId),
    enabled: !!personId
  });

  // 接触履歴の取得
  const { data: interactions = [] } = useQuery({
    queryKey: ['interactions', personId],
    queryFn: async () => {
      const all = await base44.entities.Interaction.list();
      return all.filter(i => i.personId === personId).sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
    },
    enabled: !!personId
  });

  // 仮説データの取得
  const { data: hypotheses = [] } = useQuery({
    queryKey: ['hypotheses'],
    queryFn: () => base44.entities.Hypothesis.list(),
    enabled: !!personId
  });

  // プロジェクトデータの取得
  const { data: projects = [] } = useQuery({
    queryKey: ['projects'],
    queryFn: () => base44.entities.Project.list(),
    enabled: !!personId
  });

  // 推薦された人材の取得
  const { data: recommendedPeople = [] } = useQuery({
    queryKey: ['recommendedPeople', personId],
    queryFn: async () => {
      if (!person?.hypotheses || person.hypotheses.length === 0) return [];
      const latestHypothesisId = person.hypotheses[person.hypotheses.length - 1];
      return await recommendPeopleForHypothesis(latestHypothesisId);
    },
    enabled: !!personId && !!person?.hypotheses?.length
  });

  // 接触記録の作成mutation
  const createInteractionMutation = useMutation({
    mutationFn: async (data) => {
      const interaction = await base44.entities.Interaction.create({
        personId: personId,
        type: data.type,
        note: data.note,
        timestamp: new Date().toISOString()
      });
      
      await base44.entities.Person.update(personId, {
        lastContactAt: new Date().toISOString()
      });
      
      return interaction;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['interactions', personId] });
      queryClient.invalidateQueries({ queryKey: ['person', personId] });
      queryClient.invalidateQueries({ queryKey: ['people'] });
    }
  });

  // 人物に関連する仮説とプロジェクトをフィルタリング
  const personHypotheses = hypotheses.filter(h => person?.hypotheses?.includes(h.id)).slice(0, 3);
  const personProjects = projects.filter(p => person?.projects?.includes(p.id)).slice(0, 3);

  return {
    person,
    isLoading,
    interactions,
    personHypotheses,
    personProjects,
    recommendedPeople,
    createInteractionMutation
  };
}

