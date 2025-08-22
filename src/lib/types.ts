export type ComplaintCategory = "Service" | "Product" | "Staff" | "Environment" | "Other";

export interface Complaint {
  id: string;
  text: string;
  category: ComplaintCategory;
  summary: string;
  timestamp: Date;
};
