import Calendar from "./Calendar";
import { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { calendarIcon } from "../../assets";
import { showModalSuccess, showModalFail } from "../common/Modal";
import FormInput from "../common/FormInput";
import validateForm from "./ValidateForm";
import combineClassNames from "../../utils/combineClassNames";

function BookingCalendar() {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
  });
  const [existingBooking, setExistingBooking] = useState([]);

  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);

  const onChangeHandle = (event) => {
    const { name, value } = event.target;
    const inputData = { ...formData, [name]: value };
    setFormData(inputData);
  };

  const formatDateStr = (date) => {
    if (date) {
      const optionDate = { day: "numeric", month: "long", year: "numeric" };
      const optionWeekday = { weekday: "long" };

      const formattedDate = date.toDate().toLocaleDateString("en-GB", optionDate);
      const formattedWeekday = date.toDate().toLocaleDateString("en-GB", optionWeekday);

      return {
        date: formattedDate,
        weekDay: formattedWeekday,
      };
    }
  };

  const canClickBook = () => {
    const allFieldsFilled = Object.values(formData).every((value) => value.trim() !== "");
    return checkOut && allFieldsFilled;
  };

  const setEmtyData = () => {
    const emptyData = {
      username: "",
      email: "",
      phone: "",
    };
    setFormData(emptyData);
    setCheckIn(null);
    setCheckOut(null);
    setErrorMessage({});
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isLoading || !canClickBook()) return false;

    const formErrors = validateForm(formData);
    if (Object.keys(formErrors).length === 0) {
      try {
        setIsLoading(true);
        await axios.post(`${import.meta.env.VITE_API_URL}/book`, {
          ...formData,
          checkIn: checkIn.date,
          checkOut,
        });

        setIsLoading(false);
        setEmtyData();
        getBookingData();
        showModalSuccess("Booking Success");
      } catch (error) {
        setIsLoading(false);

        const errorStatus = error?.request?.status;
        let message;
        if (errorStatus === 400) {
          message = "This date has already been booked.";
        } else {
          message = "An error occurred on the server.";
        }

        getBookingData();
        showModalFail("Booking Failed", message);
      }
    } else {
      setErrorMessage(formErrors);
    }
  };

  const getBookingData = async () => {
    try {
      const result = await axios.get(`${import.meta.env.VITE_API_URL}/book?date=${today}`);
      setExistingBooking(result.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBookingData();
  }, [today]);

  const checkInStr = formatDateStr(checkIn?.date);
  const checkOutStr = formatDateStr(checkOut);

  const calendarProps = {
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    existingBooking,
    today,
    setToday,
    currentDate,
  };
  const inputProps = {
    onChangeHandle: onChangeHandle,
    formDataState: formData,
  };

  return (
    <main className="flex-1 flex justify-center items-center bg-white sm:bg-gray-100 text-gray-600 px-8 sm:px-20 py-4 sm:py-6 select-none">
      <div className="flex-1 flex flex-col sm:flex-row flex-wrap gap-y-10 max-w-[1440px] sm:py-10 bg-white mx-auto rounded-lg sm:shadow-2xl">
        <div className="flex-1 flex flex-col items-center">
          <div className="w-full sm:px-10 ">
            <h1 className="text-lg sm:text-2xl text-gray-600 font-medium sm:px-[5%]">
              Select a Date
            </h1>
            <Calendar state={calendarProps} />
            <div className="flex justify-end items-center gap-3 px-[6%]">
              <div className="w-1.5 h-1 bg-red-400 rounded-full"></div>
              <p className="text-xs text-gray-400">Night Already Booked</p>
            </div>
          </div>
        </div>
        <div className="border border-gray-200 mt-0 mb-5 hidden xl:block"></div>
        <div className="flex-1 min-w-fit">
          <div className="h-full flex flex-col sm:px-10 pb-6">
            <div className="flex justify-between gap-6 flex-wrap sm:flex-nowrap">
              <div
                className={`flex-1 min-w-[218px] px-6 py-4 rounded-xl ${
                  checkIn?.date ? "bg-blue-100" : "bg-gray-200"
                }`}
              >
                <h2
                  className={`text-sm font-bold ${
                    checkIn?.date ? "text-blue-500" : "text-gray-500"
                  }`}
                >
                  CHECK IN :
                </h2>
                <div className="flex gap-6 items-center mt-1">
                  <img
                    src={calendarIcon}
                    alt="calendarIcon"
                    className={`min-w-9 w-9 ${!checkIn?.date && "grayscale"}`}
                  />
                  {checkIn?.date && (
                    <div>
                      <p className="text-sm text-gray-500 font-bold">{checkInStr.date}</p>
                      <p className="text-sm text-gray-400 font-medium">{checkInStr.weekDay}</p>
                    </div>
                  )}
                </div>
              </div>
              <div
                className={`flex-1 min-w-[218px]  px-6 py-4 rounded-xl ${
                  checkOut ? "bg-blue-100" : "bg-gray-200"
                }`}
              >
                <h2 className={`text-sm font-bold ${checkOut ? "text-blue-500" : "text-gray-500"}`}>
                  CHECK OUT :
                </h2>
                <div className="flex gap-6 items-center mt-1">
                  <img
                    src={calendarIcon}
                    alt="calendarIcon"
                    className={`min-w-9 w-9 ${!checkOut && "grayscale"}`}
                  />
                  {checkOut && (
                    <div>
                      <p className="text-sm text-gray-500 font-bold">{checkOutStr.date}</p>
                      <p className="text-sm text-gray-400 font-medium">{checkOutStr.weekDay}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <form className="mt-10 flex flex-col gap-6" onSubmit={handleSubmit}>
              <FormInput
                label="Full Name"
                forId="fullName"
                type="text"
                name="username"
                inputData="username"
                errorMessage={errorMessage?.username}
                {...inputProps}
              ></FormInput>
              <FormInput
                label="Email"
                forId="email"
                type="email"
                name="email"
                inputData="email"
                errorMessage={errorMessage?.email}
                {...inputProps}
              ></FormInput>
              <FormInput
                label="Phone Number"
                forId="phone"
                type="tel"
                name="phone"
                inputData="phone"
                errorMessage={errorMessage?.phone}
                {...inputProps}
              ></FormInput>
              <button
                type="submit"
                className={combineClassNames(
                  canClickBook() ? "bg-blue-500 hover:bg-blue-400" : "bg-gray-300 cursor-default",
                  isLoading && "!bg-blue-400 !cursor-default",
                  "w-full duration-200 text-white font-semibold py-2.5 mt-3 rounded-xl"
                )}
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
                  <p>Book Now</p>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default BookingCalendar;
