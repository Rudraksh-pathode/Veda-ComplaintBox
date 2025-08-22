import { Building2, Users, GraduationCap, AlertTriangle, MoreHorizontal, type Icon as LucideIcon, type LucideProps } from 'lucide-react';
import type { ComplaintCategory } from '@/lib/types';

interface CategoryIconProps extends LucideProps {
  category: ComplaintCategory;
}

const iconMap: Record<ComplaintCategory, LucideIcon> = {
  Infrastructure: Building2,
  Harassment: Users,
  Academics: GraduationCap,
  Ragging: AlertTriangle,
  Other: MoreHorizontal,
};

export function CategoryIcon({ category, ...props }: CategoryIconProps) {
  const IconComponent = iconMap[category] || MoreHorizontal;
  return <IconComponent {...props} />;
}
