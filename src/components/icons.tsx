import { ConciergeBell, Package, Users, Building2, MoreHorizontal, type Icon as LucideIcon, type LucideProps } from 'lucide-react';
import type { ComplaintCategory } from '@/lib/types';

interface CategoryIconProps extends LucideProps {
  category: ComplaintCategory;
}

const iconMap: Record<ComplaintCategory, LucideIcon> = {
  Service: ConciergeBell,
  Product: Package,
  Staff: Users,
  Environment: Building2,
  Other: MoreHorizontal,
};

export function CategoryIcon({ category, ...props }: CategoryIconProps) {
  const IconComponent = iconMap[category] || MoreHorizontal;
  return <IconComponent {...props} />;
}
