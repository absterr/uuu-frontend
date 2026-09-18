export interface Plan {
  id: "free" | "starter" | "professional" | "team" | "enterprise";
  name: string;
  price: number;
  analysesPerMonth: number;
  bulkUpload: boolean;
  pdfReports: boolean;
  teamMembers: number;
  apiAccess: boolean;
}

export const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    analysesPerMonth: 5,
    bulkUpload: false,
    pdfReports: false,
    teamMembers: 1,
    apiAccess: false,
  },
  {
    id: "starter",
    name: "Starter",
    price: 49,
    analysesPerMonth: 50,
    bulkUpload: false,
    pdfReports: true,
    teamMembers: 1,
    apiAccess: false,
  },
  {
    id: "professional",
    name: "Professional",
    price: 149,
    analysesPerMonth: 200,
    bulkUpload: true,
    pdfReports: true,
    teamMembers: 3,
    apiAccess: false,
  },
  {
    id: "team",
    name: "Team",
    price: 299,
    analysesPerMonth: -1,
    bulkUpload: true,
    pdfReports: true,
    teamMembers: 10,
    apiAccess: false,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 999,
    analysesPerMonth: -1,
    bulkUpload: true,
    pdfReports: true,
    teamMembers: -1,
    apiAccess: true,
  },
];
