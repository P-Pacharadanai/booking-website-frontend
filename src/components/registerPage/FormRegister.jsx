import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../common/FormInput";
import validateForm from "./ValidateForm";
import { useAuth } from "../../contexts/authentication";
import { showModalSuccess, showModalFail } from "../common/Modal";

function FormRegister() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { register } = useAuth();

  const onChangeHandle = (event) => {
    const { name, value } = event.target;
    const inputData = { ...formData, [name]: value };
    setFormData(inputData);
  };

  const setEmtyData = () => {
    const emptyData = {
      username: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    };
    setErrorMessage({});
    setFormData(emptyData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isLoading) {
      return false;
    }

    const formErrors = validateForm(formData);
    if (Object.keys(formErrors).length === 0) {
      setIsLoading(true);
      const result = await register(formData);

      if (result?.error) {
        setIsLoading(false);
        showModalFail("Register failed", result?.error);
        return false;
      }

      setIsLoading(false);
      setEmtyData();
      showModalSuccess("Your account has been created.");
      setTimeout(() => navigate("/login"), 3000);
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
      <h1 className="text-2xl text-gray-600 font-semibold  mb-5">Create your account</h1>
      <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit}>
        <FormInput
          label="Full Name"
          forId="fullName"
          type="text"
          name="username"
          inputData="username"
          errorMessage={errorMessage?.username}
          {...commonProps}
        ></FormInput>
        <FormInput
          label="Email"
          forId="email"
          type="email"
          name="email"
          inputData="email"
          errorMessage={errorMessage?.email}
          {...commonProps}
        ></FormInput>
        <FormInput
          label="Phone Number"
          forId="phone"
          type="tel"
          name="phone"
          inputData="phone"
          errorMessage={errorMessage?.phone}
          {...commonProps}
        ></FormInput>
        <FormInput
          label="Password"
          forId="password"
          type="password"
          name="password"
          inputData="password"
          errorMessage={errorMessage?.password}
          {...commonProps}
        ></FormInput>
        <FormInput
          label="Confirm Password"
          forId="confirmPassword"
          type="password"
          name="confirmPassword"
          inputData="confirmPassword"
          errorMessage={errorMessage?.confirmPassword}
          {...commonProps}
        ></FormInput>
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
            <p>Sign up</p>
          )}
        </button>
      </form>
      <div className="w-full mt-8 flex items-center gap-4">
        <div className="flex-1 flex flex-col h-fit items-center border border-gray-200"></div>
        <Link
          to="/login"
          className="text-sm font-bold underline text-blue-500 hover:text-blue-400 duration-200"
        >
          Return to Login
        </Link>
        <div className="flex-1 flex flex-col h-fit items-center border border-gray-200"></div>
      </div>
    </div>
  );
}

export default FormRegister;
