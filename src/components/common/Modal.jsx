import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const showModalSuccess = (title, message) => {
  withReactContent(Swal).fire({
    icon: "success",
    title: title,
    text: message,
    showConfirmButton: false,
    timer: 3000,
    customClass: {
      popup: "font-prompt",
      title: "text-xl font-prompt",
    },
  });
};

export const showModalFail = (title, message) => {
  withReactContent(Swal).fire({
    icon: "error",
    title: title,
    text: message,
    showConfirmButton: false,
    timer: 3000,
    customClass: {
      popup: "font-prompt",
      title: "text-xl font-prompt",
    },
  });
};
