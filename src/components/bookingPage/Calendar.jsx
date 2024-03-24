import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { generateDate, months, days } from "../../utils/generateDate.js";
import combineClassNames from "../../utils/combineClassNames.js";

dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);

function Calendar(props) {
  const {
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    existingBooking,
    today,
    setToday,
    currentDate,
  } = props.state;

  const previousMonth = () => {
    if (today.isSameOrBefore(currentDate, "day")) return;

    const previousMonth = today.clone().subtract(1, "month");
    setToday(previousMonth);
  };

  const nextMonth = () => {
    const nextMonth = today.clone().add(1, "month");
    setToday(nextMonth);
  };

  const isBookingConflict = (selectedDate, isBeforeCheckIn) => {
    for (let booking of existingBooking) {
      const { check_in_date: existingStartDate, check_out_date: existingEndDate } = booking;
      let isOverlap;

      // check if check in date is selected and check out date is being selected
      if (checkIn && !checkOut && !isBeforeCheckIn) {
        const checkOutDate = selectedDate;
        isOverlap =
          checkOutDate.isBetween(existingStartDate, existingEndDate, "day", "(]") ||
          dayjs(existingStartDate).isBetween(checkIn.date, checkOutDate, "day", "[)");
      } else {
        // if check in date is being selected
        const checkInDate = selectedDate;
        isOverlap = checkInDate.isBetween(existingStartDate, existingEndDate, "day", "[)");
      }

      if (isOverlap) return true;
    }

    return false;
  };

  const handleDateSelection = (selectedDate) => {
    const isChangeDateSelected = checkIn && checkIn?.click === 2;
    const isSameCheckIn = checkIn?.date ? selectedDate.isSame(checkIn?.date, "day") : false;
    const isBeforeCheckIn = checkIn?.date ? selectedDate.isBefore(checkIn.date) : false;

    if (isSameCheckIn && !checkOut) {
      setCheckIn(null);
      setCheckOut(null);
      return;
    }

    if (isBookingConflict(selectedDate, isBeforeCheckIn)) return;

    // check if check in date is not selected,
    // or it's a change of check in date,
    // or the selected date is before the check in date
    if (!checkIn || isChangeDateSelected || isBeforeCheckIn) {
      // set new check in date
      setCheckIn({ date: selectedDate, click: 1 });
      setCheckOut(null);
      return;
    }

    setCheckOut(selectedDate);
    setCheckIn({ ...checkIn, click: checkIn.click + 1 });
    return;
  };

  const isDateSelect = (date, startDate, endDate) => {
    if (!startDate) return false;

    const isBetweenCheckInOut = date.isBetween(startDate, endDate, "day");
    const isSameCheckInOut = date.isSame(startDate, "day") || date.isSame(endDate, "day");

    return isBetweenCheckInOut || isSameCheckInOut;
  };

  const showBooking = (date) => {
    for (let booking of existingBooking) {
      const { check_in_date: startDate, check_out_date: endDate } = booking;

      const lastNight = dayjs(endDate).clone().subtract(1, "day");

      if (isDateSelect(date, startDate, lastNight)) {
        return true;
      }
    }

    return false;
  };

  return (
    <div className="w-full sm:min-w-[500px] font-prompt text-gray-600 pt-6 pb-2 bg-white rounded-lg ">
      <div className="flex justify-between items-center  sm:px-[5%] text-base sm:text-lg">
        <h1 className="font-medium">
          {months[today.month()]}, {today.year()}
        </h1>
        <div className="flex items-center gap-5">
          <button
            onClick={previousMonth}
            className="text-xl sm:text-2xl text-blue-500 hover:text-blue-400 font-medium cursor-pointer duration-200"
          >
            &lt;
          </button>
          <button
            onClick={() => setToday(currentDate)}
            className="cursor-pointer hover:hover:text-blue-400 duration-200"
          >
            Today
          </button>
          <button
            onClick={nextMonth}
            className="text-xl sm:text-2xl text-blue-500  hover:text-blue-400 font-medium cursor-pointer duration-200"
          >
            &gt;
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 mt-3">
        {days.map((day, index) => {
          return (
            <h3 key={index} className="text-sm sm:text-base h-10 sm:h-14 grid place-content-center">
              {day}
            </h3>
          );
        })}
      </div>
      <div className="grid grid-cols-7">
        {generateDate(today.month(), today.year()).map((item, index) => {
          const { date, currentMonth, today } = item;
          const isAbleDate = () => {
            if (currentMonth && !date.isBefore(currentDate, "day")) {
              return true;
            }
            return false;
          };
          return (
            <div
              key={index}
              className="relative text-sm sm:text-base h-14 grid place-content-center"
            >
              <p
                onClick={() => isAbleDate() && handleDateSelection(date)}
                className={combineClassNames(
                  "h-10 w-10 grid place-content-center rounded-full duration-200 group",
                  isAbleDate()
                    ? "cursor-pointer hover:text-white hover:bg-blue-300"
                    : "text-gray-400 cursor-default",
                  today && "bg-blue-500 text-white",
                  isDateSelect(date, checkIn?.date, checkOut) &&
                    "!bg-blue-100 !text-blue-500 font-semibold"
                )}
              >
                {date.date()}
                {showBooking(date) && isAbleDate() && (
                  <span className="absolute w-1.5 h-1 bg-red-400 group-hover:bg-white duration-200 rounded-full top-3 left-1/2 -translate-x-1/2"></span>
                )}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;
