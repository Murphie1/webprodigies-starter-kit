import { NavBar } from "@/components/navbar";
import { SideBar } from "@/components/sidebar";

const HomeLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="h-full">
      {/* Navbar */}
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        <NavBar />
      </div>

      {/* Sidebar */}
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <SideBar />
      </div>

      {/* Main Content */}
      <main className="md:pl-56 h-full pt-[80px]">
        {children}
      </main>
    </div>
  );
};

export default HomeLayout;
