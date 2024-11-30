import { NavBar } from "@/components/navbar";
import { SideBar } from "@/components/sidebar";

type Props = {
  children: React.ReactNode;
};

const HomeLayout = ({ children }: Props) => {
  return (
    <div className="h-full">
      {/* Navbar */}
       <div className="h-[70px] md:pl-56 fixed inset-y-0 w-full z-50">
        <NavBar />
      </div> 

      {/* Sidebar */}
       <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <SideBar />
      </div> 

      {/* Main Content */}
      <main className="h-full md:pl-56 pt-[70px]">{children}</main>
    </div>
  );
};

export default HomeLayout;
