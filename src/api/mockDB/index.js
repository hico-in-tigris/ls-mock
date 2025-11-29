/**
 * MockDB - Base44 SDKの代替実装
 * localStorageベースの擬似データベース
 */

import * as entities from './entities.js';
import * as integrations from './integrations.js';

// Base44 SDKと互換性のあるインターフェース
const mockDB = {
  entities: {
    Person: entities.Person,
    Project: entities.Project,
    Action: entities.Action,
    Reflection: entities.Reflection,
    RegionData: entities.RegionData,
    Hypothesis: entities.Hypothesis,
    ThoughtEntry: entities.ThoughtEntry,
    Comment: entities.Comment,
    HypothesisShare: entities.HypothesisShare,
    Activity: entities.Activity,
  },
  auth: entities.auth,
  integrations: {
    Core: integrations.Core,
  },
};

export default mockDB;
