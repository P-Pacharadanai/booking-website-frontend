import FormLogin from "../components/loginPage/FormLogin";

function LoginPage() {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex justify-center items-center bg-white sm:bg-gray-100">
        <FormLogin />
      </div>
    </div>
  );
}

export default LoginPage;
