import { SidebarItem } from "./sidebar-item";
import { Heart, Circle, CreditCard, BookOpen, Briefcase } from "lucide-react";

const guestRoutes = [
  {
    key: 1,
    icon: Heart,
    label: "Courses",
    href: "/home",
  },
  {
    key: 2,
    icon: Circle,
    label: "Personalized Learning",
    href: "/hakima",
  },
  {
    key: 3,
    icon: BookOpen,
    label: "Languages",
    href: "/languages",
  },
  {
    key: 4,
    icon: Heart,
    label: "Practice and Prep Resources",
    href: "/prep",
  },
  {
    key: 5,
    icon: Briefcase,
    label: "Vision and Cognitive Learning",
    href: "/cognition",
  },
  {
    key: 6,
    icon: Circle,
    label: "XR & 3D Learning",
    href: "/xr",
  },
  {
    key: 7,
    icon: Heart,
    label: "Virtual Tutor",
    href: "/vikam",
  },
  {
    key: 8,
    icon: Briefcase,
    label: "Institutions and Organizations",
    href: "/organizations",
  },
  {
    key: 9,
    icon: CreditCard,
    label: "Plans",
    href: "/plans",
  },
];

const teacherRoutes = [
  {
    key: 10,
    icon: Heart,
    label: "Courses",
    href: "/home",
  },
  {
    key: 11,
    icon: Circle,
    label: "Personalized Learning",
    href: "/hakima",
  },
  {
    key: 12,
    icon: BookOpen,
    label: "Languages",
    href: "/languages",
  },
  {
    key: 13,
    icon: Heart,
    label: "Practice and Prep Resources",
    href: "/prep",
  },
  {
    key: 14,
    icon: Circle,
    label: "Lectures",
    href: "/lectures",
  },
  {
    key: 15,
    icon: Heart,
    label: "Counselling",
    href: "/counselling",
  },
  {
    key: 16,
    icon: Heart,
    label: "Tools and Assistant",
    href: "/teacher/tools",
  },
  {
    key: 17,
    icon: Briefcase,
    label: "Institutions and Organizations",
    href: "/organizations",
  },
];

export const SidebarRoutes = () => {
  // const role = "guest"; // Change this to "teacher" for teacher routes
  const routes = guestRoutes;// role === "teacher" ? teacherRoutes : guestRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.key}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};
