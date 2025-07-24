import { MockVendor, Step } from './types';

export const mockVendors: MockVendor[] = [
  {
    name: "Arctic Air Solutions",
    category: "HVAC",
    rating: 4.9,
    responseTime: "2.3 hours",
    bid: "$2,850",
    availability: "Available Today",
    certifications: ["EPA Certified", "NATE Certified"],
    completedJobs: 127
  },
  {
    name: "CoolTech HVAC",
    category: "HVAC", 
    rating: 4.7,
    responseTime: "3.1 hours",
    bid: "$3,200",
    availability: "Available Tomorrow",
    certifications: ["EPA Certified", "OSHA 30"],
    completedJobs: 89
  },
  {
    name: "Climate Control Pro",
    category: "HVAC",
    rating: 4.8,
    responseTime: "1.8 hours",
    bid: "$2,950",
    availability: "Available Today",
    certifications: ["EPA Certified", "NATE Certified", "LEED Certified"],
    completedJobs: 156
  }
];

export const steps: Step[] = [
  {
    title: "Work Order Creation",
    description: "Client submits a new work order request through the platform",
    action: "fillBasicInfo",
    duration: 3000
  },
  {
    title: "Automatic Vendor Matching",
    description: "AI system matches request with pre-vetted vendors based on location, specialty, and availability",
    action: "vendorMatching",
    duration: 2000
  },
  {
    title: "Instant Bid Collection",
    description: "Multiple qualified vendors receive the request and submit competitive bids",
    action: "bidCollection",
    duration: 4000
  },
  {
    title: "Client Review & Selection",
    description: "Client reviews vendor profiles, ratings, and bids to make informed selection",
    action: "clientReview",
    duration: 3000
  },
  {
    title: "Work Order Dispatch",
    description: "Selected vendor receives work order with all details and client contact information",
    action: "dispatch",
    duration: 2000
  },
  {
    title: "Real-Time Progress Tracking",
    description: "Both client and vendor can track progress, share updates, and communicate through the platform",
    action: "tracking",
    duration: 3000
  },
  {
    title: "Quality Assurance & Payment",
    description: "Work completion verification, quality rating, and secure payment processing",
    action: "completion",
    duration: 2000
  }
];