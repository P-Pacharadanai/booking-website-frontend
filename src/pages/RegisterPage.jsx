import FormRegister from "../components/registerPage/FormRegister";

function RegisterPage() {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex justify-center items-center bg-white  sm:bg-gray-100">
        <FormRegister />
      </div>
    </div>
  );
}
export default RegisterPage;
