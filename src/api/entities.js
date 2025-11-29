import { base44 } from './base44Client';

// MockDBからエンティティをエクスポート
export const Person = base44.entities.Person;
export const Project = base44.entities.Project;
export const Action = base44.entities.Action;
export const Reflection = base44.entities.Reflection;
export const RegionData = base44.entities.RegionData;
export const Hypothesis = base44.entities.Hypothesis;
export const ThoughtEntry = base44.entities.ThoughtEntry;
export const Comment = base44.entities.Comment;
export const HypothesisShare = base44.entities.HypothesisShare;
export const Activity = base44.entities.Activity;

// auth sdk:
export const User = base44.auth;