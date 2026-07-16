import { 
  LayoutDashboard, 
  Briefcase, 
  Building2, 
  Users, 
  MessageSquare, 
  CalendarDays, 
  LineChart, 
  FileText, 
  UserCircle, 
  Settings 
} from "lucide-react";

export const NAVIGATION_ITEMS = [
  {
    title: "Dashboard",
    route: "/dashboard",
    icon: LayoutDashboard,
    description: "Overview of your job search",
  },
  {
    title: "Applications",
    route: "/applications",
    icon: Briefcase,
    description: "Track your job applications",
  },
  {
    title: "Companies",
    route: "/companies",
    icon: Building2,
    description: "Manage target companies",
  },
  {
    title: "Recruiters",
    route: "/recruiters",
    icon: Users,
    description: "Network with recruiters",
  },
  {
    title: "Interviews",
    route: "/interviews",
    icon: MessageSquare,
    description: "Prepare for upcoming interviews",
  },
  {
    title: "Calendar",
    route: "/calendar",
    icon: CalendarDays,
    description: "Your interview schedule",
  },
  {
    title: "Analytics",
    route: "/analytics",
    icon: LineChart,
    description: "Job search performance",
  },
  {
    title: "Resumes",
    route: "/resumes",
    icon: FileText,
    description: "Manage different resume versions",
  },
];

export const BOTTOM_NAVIGATION_ITEMS = [
  {
    title: "Profile",
    route: "/profile",
    icon: UserCircle,
    description: "Your personal details",
  },
  {
    title: "Settings",
    route: "/settings",
    icon: Settings,
    description: "App configuration",
  },
];
