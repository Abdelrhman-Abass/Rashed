import { toast } from "react-toastify";

const toastConfig = {
  position: "top-center" as const,
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

export const showSuccessToast = (message: string) => {
  toast.success(message, toastConfig);
};

export const showErrorToast = (message: string) => {
  toast.error(message, toastConfig);
};

export const showInfoToast = (message: string) => {
  toast.info(message, toastConfig);
};