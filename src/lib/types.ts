export type ComplaintCategory = "Service" | "Product" | "Staff" | "Environment" | "Other";

export interface Complaint {
  id: string;
  name?: string; // Name is optional for anonymity
  text: string;
  category: ComplaintCategory;
  summary: string;
  timestamp: Date;
};

export interface ShoutOut {
  id: string;
  from: string;
  to: string;
  message: string;
  timestamp: Date;
}
