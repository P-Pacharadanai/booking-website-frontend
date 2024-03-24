import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="font-prompt h-screen flex justify-center items-center bg-gray-200 px-10">
      <div className="text-center text-gray-800">
        <h1 className="text-6xl sm:text-9xl font-bold">404</h1>
        <h2 className="text-2xl sm:text-3xl font-bold mt-2">Page Not Found</h2>
        <p className="mt-8">We're sorry, the page you requested could not be found.</p>
        <Link
          to="/"
          className="inline-block mt-16 px-10 py-2.5 rounded-full bg-gray-600 hover:bg-gray-500 duration-200 text-white"
        >
          GO BACK HOME
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
