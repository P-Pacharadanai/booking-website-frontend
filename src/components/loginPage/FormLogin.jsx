import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/authentication";
import validateForm from "./ValidateForm";
import FormInput from "../common/FormInput";

function FormLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();

  const onChangeHandle = (event) => {
    const { name, value } = event.target;
    const inputData = { ...formData, [name]: value };
    setFormData(inputData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isLoading) {
      return false;
    }

    const formErrors = validateForm(formData);
    if (Object.keys(formErrors).length === 0) {
      setIsLoading(true);
      const result = await login(formData);

      if (result?.error) {
        setIsLoading(false);
        setErrorMessage({ server: result?.error });
        return false;
      }

      setIsLoading(false);
      setErrorMessage({});
    } else {
      setErrorMessage(formErrors);
    }
  };

  const commonProps = {
    onChangeHandle: onChangeHandle,
    formDataState: formData,
  };

  return (
    <div className="w-[500px] bg-white flex flex-col items-center font-prompt p-8 sm:p-12 rounded-md sm:shadow-xl select-none">
      <h1 className="text-2xl text-gray-600 font-semibold  mb-5">Login</h1>
      <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          forId="email"
          type="email"
          name="email"
          inputData="email"
          errorMessage={errorMessage?.email}
          {...commonProps}
        ></FormInput>
        <div className="">
          <FormInput
            label="Password"
            forId="password"
            type="password"
            name="password"
            inputData="password"
            errorMessage={errorMessage?.password}
            {...commonProps}
          ></FormInput>
          {errorMessage?.server && <small className="text-red-500">{errorMessage?.server}</small>}
        </div>
        <button
          className={`w-full text-white font-bold bg-blue-500 hover:bg-blue-400 duration-200 mt-4 py-3 rounded-lg ${
            isLoading ? "bg-blue-400 cursor-default" : "bg-blue-500 hover:bg-blue-400"
          }`}
          type="submit"
        >
          {isLoading ? (
            <p className="flex justify-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-4 fill-white animate-spin"
              >
                <path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" />
              </svg>
              <span>Processing</span>
            </p>
          ) : (
            <p>Log in</p>
          )}
        </button>
      </form>
      <div className="w-full mt-8 flex items-center gap-4">
        <div className="flex-1 flex flex-col h-fit items-center border border-gray-200"></div>
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-400">Don't have an account?</p>
          <Link
            to="/register"
            className="text-sm font-bold underline text-blue-500 hover:text-blue-400 duration-200"
          >
            Sign up
          </Link>
        </div>

        <div className="flex-1 flex flex-col h-fit items-center border border-gray-200"></div>
      </div>
    </div>
  );
}

export default FormLogin;
