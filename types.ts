export interface FormData {
  woNumber: string;
  description: string;
  priority: string;
  category: string;
  location: string;
  requestedBy: string;
  vendorCategory: string;
  preferredVendor: string;
  budget: string;
  dueDate: string;
  startDate: string;
  estimatedFinishDate: string;
  attachments: string[];
}

export interface MockVendor {
  name: string;
  category: string;
  rating: number;
  responseTime: string;
  bid: string;
  availability: string;
  certifications: string[];
  completedJobs: number;
}

export interface Step {
  title: string;
  description: string;
  action: string;
  duration: number;
}