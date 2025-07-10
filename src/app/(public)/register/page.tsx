import RegisterForm from "@/components/form/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="bg-white shadow-lg p-10 rounded-2xl w-full max-w-md">

      <div id="text">
        <h1 className="text-5xl font-bold text-left">
          Hello! Please 
          <br /> register to start 
          <br /> renting!
        </h1>
      </div>
      <div id="form" className="w-full h-full flex justify-center flex-col">
        <RegisterForm />
      </div>
    </div>
  );
}
