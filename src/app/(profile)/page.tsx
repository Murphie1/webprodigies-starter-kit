import ProfileComp from "./_components/profile-comp";
import UserComp from "./_components/user-comp";
import ProfileBottom from "./_components/profile-bottom";
import ProfileTop from "./_components/profile-top";



const Home = () => {

  return <div className="relative flex flex-col h-auto min-h-screen justify-center">
  <ProfileTop />
    <Usercomp />
      <div className="overflow-x-auto whitespace-nowrap">
  <ProfileComp />
      </div>
  <ProfileBottom />
  </div>;

};



export default Home;
