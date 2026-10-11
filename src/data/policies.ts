import { claimsFor, entity } from "./build";

const karnataka = entity("policy", "Karnataka", "The first state with a dedicated GCC policy.");
const uttarPradesh = entity("policy", "Uttar Pradesh");
const maharashtra = entity("policy", "Maharashtra");
const gujarat = entity("policy", "Gujarat");
const tamilNadu = entity(
  "policy",
  "Tamil Nadu",
  "Sources disagree on whether the state has a standalone GCC policy.",
);

export const policies = [karnataka, uttarPradesh, maharashtra, gujarat, tamilNadu];

export const policyClaims = [
  ...claimsFor(karnataka.id, [
    ["period", "2024 to 2029", "lawAsia", "Nov 2024"],
    ["target_gccs", "500 new GCCs", "lawAsia", "Nov 2024"],
    ["target_jobs", "350,000", "lawAsia", "Nov 2024"],
    [
      "incentives",
      "R&D grants up to ₹50 crore, rent reimbursement up to 50%, EPF support, approvals in 45 days",
      "lawAsia",
      "Nov 2024",
    ],
    [
      "incentives",
      "Internship stipend reimbursed at 50%, up to ₹5,000 a month for three months",
      "bdoKarnataka",
      "2024",
    ],
    [
      "eligibility",
      "Extra incentives for centres outside Bengaluru, such as Mysuru and Mangaluru",
      "lawAsia",
      "Nov 2024",
    ],
  ]),
  ...claimsFor(uttarPradesh.id, [
    ["period", "From 2024", "lawAsia", "2024"],
    ["target_gccs", "1,000+ GCCs", "lawAsia", "2024"],
    ["target_jobs", "500,000", "lawAsia", "2024"],
    ["incentives", "100% stamp duty exemption and payroll subsidies", "lawAsia", "2024"],
  ]),
  ...claimsFor(maharashtra.id, [
    ["period", "2025 to FY2030", "mondaqMaharashtra", "2025"],
    ["target_gccs", "400 new GCCs", "mondaqMaharashtra", "2025"],
    ["target_jobs", "400,000 high-skilled jobs", "mondaqMaharashtra", "2025"],
    [
      "incentives",
      "Capital subsidies, payroll assistance, R&D grants and interest subsidies",
      "mondaqMaharashtra",
      "2025",
    ],
  ]),
  ...claimsFor(gujarat.id, [
    ["period", "2025 to 2030", "statePoliciesViaFlexiple", "2025"],
    ["target_gccs", "250 new units", "statePoliciesViaFlexiple", "2025"],
    ["target_jobs", "50,000+", "statePoliciesViaFlexiple", "2025"],
  ]),
  ...claimsFor(tamilNadu.id, [
    ["period", "Payroll subsidy scheme running to March 2027", "statePoliciesViaFlexiple", "2024"],
    ["target_gccs", "50 GCCs", "statePoliciesViaFlexiple", "2024"],
    [
      "eligibility",
      "Large parent companies committing at least 200 direct jobs",
      "statePoliciesViaFlexiple",
      "2024",
    ],
    [
      "incentives",
      "Land cost incentives up to 50%, IP filing reimbursements, electricity tax exemptions",
      "lawAsia",
      "2025",
    ],
  ]),
];
