import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, GraduationCap, Scale, Landmark, Shield, Users } from "lucide-react";
import { useNavigationProgress } from "@/hooks/use-navigation-progress";

interface CourseRecommendation {
  path: string;
  label: string;
  icon: React.ElementType;
  variant?: "default" | "outline";
}

const ALL_COURSES: CourseRecommendation[] = [
  { path: "/proof-course", label: "Take PROOF Course", icon: BookOpen, variant: "outline" },
  { path: "/greek-life-training", label: "Greek Life Training", icon: GraduationCap, variant: "default" },
  { path: "/faith-authority", label: "Faith & Authority", icon: Shield, variant: "outline" },
  { path: "/should-you-stay-or-leave", label: "Should You Stay or Leave?", icon: Scale, variant: "outline" },
  { path: "/saints-or-sellouts", label: "Saints or Sellouts?", icon: Users, variant: "outline" },
  { path: "/hidden-in-plain-sight", label: "Hidden in Plain Sight", icon: Landmark, variant: "outline" },
];

interface CourseRecommendationsProps {
  /** Paths to exclude from recommendations (e.g., current course) */
  excludePaths?: string[];
  /** Maximum number of recommendations to show */
  maxRecommendations?: number;
  /** Custom class name for the container */
  className?: string;
}

export const CourseRecommendations = ({
  excludePaths = [],
  maxRecommendations = 2,
  className = "flex justify-center gap-4 mt-6",
}: CourseRecommendationsProps) => {
  const { getProgressForPath } = useNavigationProgress();

  // Filter out completed courses and excluded paths
  const availableCourses = ALL_COURSES.filter((course) => {
    // Exclude specified paths (like current course)
    if (excludePaths.includes(course.path)) return false;
    
    // Exclude completed courses (100% progress)
    const progress = getProgressForPath(course.path);
    if (progress >= 100) return false;
    
    return true;
  });

  // Take only the first N recommendations
  const recommendations = availableCourses.slice(0, maxRecommendations);

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      {recommendations.map((course) => (
        <Link key={course.path} to={course.path}>
          <Button variant={course.variant || "outline"} className="gap-2">
            <course.icon className="w-4 h-4" /> {course.label}
          </Button>
        </Link>
      ))}
    </div>
  );
};
