import { Compass, Users, Heart, Crown } from "lucide-react";

export interface AcademyLevel {
  name: string;
  minPoints: number;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  description: string;
}

export const ACADEMY_LEVELS: AcademyLevel[] = [
  { name: "Explorer", minPoints: 0, icon: Compass, color: "text-blue-500", bgColor: "bg-blue-500/10", description: "Beginning your leadership journey" },
  { name: "Mentor", minPoints: 200, icon: Users, color: "text-violet-500", bgColor: "bg-violet-500/10", description: "Growing in knowledge and influence" },
  { name: "Shepherd", minPoints: 500, icon: Heart, color: "text-rose-500", bgColor: "bg-rose-500/10", description: "Guiding others with wisdom and care" },
  { name: "Kingdom Builder", minPoints: 1000, icon: Crown, color: "text-sacred", bgColor: "bg-sacred/10", description: "Advancing the Kingdom through leadership" },
];

export function getAcademyLevel(points: number): AcademyLevel {
  const sorted = [...ACADEMY_LEVELS].sort((a, b) => b.minPoints - a.minPoints);
  return sorted.find(l => points >= l.minPoints) || ACADEMY_LEVELS[0];
}

export function getNextAcademyLevel(points: number): AcademyLevel | null {
  const current = getAcademyLevel(points);
  const idx = ACADEMY_LEVELS.findIndex(l => l.name === current.name);
  return idx < ACADEMY_LEVELS.length - 1 ? ACADEMY_LEVELS[idx + 1] : null;
}

export function getAcademyLevelProgress(points: number): number {
  const current = getAcademyLevel(points);
  const next = getNextAcademyLevel(points);
  if (!next) return 100;
  const range = next.minPoints - current.minPoints;
  const progress = points - current.minPoints;
  return Math.min(Math.round((progress / range) * 100), 100);
}
