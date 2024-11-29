//sidebar routes
import { SidebarItem } from "./sidebar-item";
import { Heart, Circle, CreditCard } from "lucide-react";




const guestRoutes = [
{
key: 1,
icon: Heart,
label: "Courses",
href: "/home",
},
{
key: 2,
icon: Heart,
label: "Personalized Learning",
href: "/hakima",
},
{
key: 3,
icon: Heart,
label: "Languages",
href: "/languages",
},
{
key: 4
icon: Heart,
label: "Practice and Prep Resources",
href: "/prep",
},
{
key: 5,
icon: Heart,
label: "Vision and Cognitive Learning",
href: "/cognition",
},
{
key: 6,
icon: Heart,
label: "XR & 3D learning",
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
icon: Heart,
label: "Institutions and Organizations",
href: "/organizations",
},
{
key: 9,
icon: CreditCard,
label: "Plans",
href: "/plans",
},
]


const teacherRoutes = [
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
icon: Heart,
label: "Languages",
href: "/languages",
},
{
key: 4
icon: Heart,
label: "Practice and Prep Resources",
href: "/prep",
},
{
key: 5,
icon: Heart,
label: "Lectures",
href: "/lectures",
},
{
key: 6,
icon: Heart,
label: "Counselling",
href: "/counselling",
},
{
key: 7,
icon: Heart,
label: "Tools and Assistant",
href: "/teacher/tools",
},
{
key: 8,
icon: Heart,
label: "Institutions and Organizations",
href: "/organizations",
},
]

export const SidebarRoutes = () => {
const routes = guestRoutes;

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
)
  }
