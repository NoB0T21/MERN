import { lazy } from "react";
import { Outlet} from "react-router-dom";
const Form  = lazy(()=> import("./others/Form"));


const Home = () => {
  return (
    <div className="main flex w-full min-h-screen bg-zinc-900 gap-2">
      <Form />
        <Outlet />
    </div>
  );
};

export default Home;
