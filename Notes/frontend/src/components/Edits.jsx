import { lazy } from "react";
const EditAnime  = lazy(()=> import("./EditAnime"));
const Form  = lazy(()=> import("./others/Updateform"));


const Edit = () => {
  return (
    <div className="main flex w-full min-h-screen bg-zinc-900 gap-2">
      <Form />
      <EditAnime />
    </div>
  );
};

export default Edit;
