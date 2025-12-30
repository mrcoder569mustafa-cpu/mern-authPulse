import { toast, Bounce } from "react-toastify";

export const handleSuccess = (msg) => {
  toast.success(msg, {
    position: "top-right",
    transition: Bounce,   // ⭐ Bounce Animation
  });
};

export const handleError = (msg) => {
  toast.error(msg, {
    position: "top-right",
    transition: Bounce,   // ⭐ Bounce Animation
  });
};
