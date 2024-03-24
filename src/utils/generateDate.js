import dayjs from "dayjs";

export function generateDate(month, year) {
  month = month ?? dayjs().month();
  year = year ?? dayjs().year();

  const firstDateOfMonth = dayjs().year(year).month(month).startOf("month");
  const lastDateOfMonth = dayjs().year(year).month(month).endOf("month");

  const arrayOfDate = [];
  //   generate prefix date of last month
  for (let i = 0; i < firstDateOfMonth.day(); i++) {
    arrayOfDate.push({
      date: firstDateOfMonth.day(i),
      currentMonth: false,
    });
  }

  //generate current date of this month
  for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
    arrayOfDate.push({
      date: firstDateOfMonth.date(i),
      currentMonth: true,
      today: dayjs().isSame(firstDateOfMonth.date(i), "day"),
    });
  }

  //   generate remain date of next month
  const totalDate = 42;
  const remaining = totalDate - arrayOfDate.length;

  for (let i = lastDateOfMonth.date() + 1; i <= lastDateOfMonth.date() + remaining; i++) {
    arrayOfDate.push({
      date: firstDateOfMonth.date(i),
      currentMonth: false,
    });
  }

  return arrayOfDate;
}

export const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
