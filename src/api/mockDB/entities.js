/**
 * MockDB Entities - Base44 entitiesの代替実装
 */
import { createEntity } from './db.js';

// 各エンティティのインスタンスを作成
const PersonDB = createEntity('Person');
const ProjectDB = createEntity('Project');
const ActionDB = createEntity('Action');
const ReflectionDB = createEntity('Reflection');
const RegionDataDB = createEntity('RegionData');
const HypothesisDB = createEntity('Hypothesis');
const ThoughtEntryDB = createEntity('ThoughtEntry');
const CommentDB = createEntity('Comment');
const HypothesisShareDB = createEntity('HypothesisShare');
const ActivityDB = createEntity('Activity');

/**
 * エンティティオブジェクト（Base44 SDK互換）
 */
export const entities = {
  Person: {
    list: (sortBy) => Promise.resolve(PersonDB.list(sortBy)),
    create: (data) => PersonDB.create(data),
    update: (id, data) => PersonDB.update(id, data),
    delete: (id) => PersonDB.delete(id),
    get: (id) => Promise.resolve(PersonDB.findById(id)),
  },
  
  Project: {
    list: (sortBy) => Promise.resolve(ProjectDB.list(sortBy)),
    create: (data) => ProjectDB.create(data),
    update: (id, data) => ProjectDB.update(id, data),
    delete: (id) => ProjectDB.delete(id),
    get: (id) => Promise.resolve(ProjectDB.findById(id)),
  },
  
  Action: {
    list: (sortBy) => Promise.resolve(ActionDB.list(sortBy)),
    create: (data) => ActionDB.create(data),
    update: (id, data) => ActionDB.update(id, data),
    delete: (id) => ActionDB.delete(id),
    get: (id) => Promise.resolve(ActionDB.findById(id)),
  },
  
  Reflection: {
    list: (sortBy) => Promise.resolve(ReflectionDB.list(sortBy)),
    create: (data) => ReflectionDB.create(data),
    update: (id, data) => ReflectionDB.update(id, data),
    delete: (id) => ReflectionDB.delete(id),
    get: (id) => Promise.resolve(ReflectionDB.findById(id)),
  },
  
  RegionData: {
    list: (sortBy) => Promise.resolve(RegionDataDB.list(sortBy)),
    create: (data) => RegionDataDB.create(data),
    update: (id, data) => RegionDataDB.update(id, data),
    delete: (id) => RegionDataDB.delete(id),
    get: (id) => Promise.resolve(RegionDataDB.findById(id)),
  },
  
  Hypothesis: {
    list: (sortBy) => Promise.resolve(HypothesisDB.list(sortBy)),
    create: (data) => HypothesisDB.create(data),
    update: (id, data) => HypothesisDB.update(id, data),
    delete: (id) => HypothesisDB.delete(id),
    get: (id) => Promise.resolve(HypothesisDB.findById(id)),
  },
  
  ThoughtEntry: {
    list: (sortBy) => Promise.resolve(ThoughtEntryDB.list(sortBy)),
    create: (data) => ThoughtEntryDB.create(data),
    update: (id, data) => ThoughtEntryDB.update(id, data),
    delete: (id) => ThoughtEntryDB.delete(id),
    get: (id) => Promise.resolve(ThoughtEntryDB.findById(id)),
  },
  
  Comment: {
    list: (sortBy) => Promise.resolve(CommentDB.list(sortBy)),
    create: (data) => CommentDB.create(data),
    update: (id, data) => CommentDB.update(id, data),
    delete: (id) => CommentDB.delete(id),
    get: (id) => Promise.resolve(CommentDB.findById(id)),
  },
  
  HypothesisShare: {
    list: (sortBy) => Promise.resolve(HypothesisShareDB.list(sortBy)),
    create: (data) => HypothesisShareDB.create(data),
    update: (id, data) => HypothesisShareDB.update(id, data),
    delete: (id) => HypothesisShareDB.delete(id),
    get: (id) => Promise.resolve(HypothesisShareDB.findById(id)),
  },
  
  Activity: {
    list: (sortBy) => Promise.resolve(ActivityDB.list(sortBy)),
    create: (data) => ActivityDB.create(data),
    update: (id, data) => ActivityDB.update(id, data),
    delete: (id) => ActivityDB.delete(id),
    get: (id) => Promise.resolve(ActivityDB.findById(id)),
  },
};

