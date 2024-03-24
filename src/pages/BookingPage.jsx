import Navbar from "../components/common/Navbar";
import BookingCalendar from "../components/bookingPage/BookingCalendar";

function BookingPage() {
  return (
    <div className="font-prompt flex flex-col min-h-screen min-w-[375px]">
      <Navbar />
      <BookingCalendar />
    </div>
  );
}

export default BookingPage;
