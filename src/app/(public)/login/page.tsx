import LoginForm from "@/components/form/LoginForm";

export default function SignInPage() {
  return (
    <div id="container" className="w-full h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg p-10 rounded-2xl w-full max-w-md">

      <div id="text">
        <h1 className="text-5xl font-bold mb-10 text-left">
          Welcome back,
          <br /> please
          <br /> login
        </h1>
      </div>
      <div id="form" className="w-full h-full flex justify-center">
        <LoginForm />
      </div>

    </div>
    </div>
  );
}
