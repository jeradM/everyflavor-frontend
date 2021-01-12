import Toastify from "toastify-js";

const defaultOptions = () => ({
  text: "",
  duration: 3000,
  destination: null,
  newWindow: true,
  gravity: "top", // `top` or `bottom`
  position: "left", // `left`, `center` or `right`
  stopOnFocus: true, // Prevents dismissing of toast on hover
  offset: { y: 64 },
});

const showToast = (options) => {
  Toastify(Object.assign(defaultOptions(), options)).showToast();
};

const info = (msg) => showToast({ text: msg, className: "toast info" });
const success = (msg) => showToast({ text: msg, className: "toast success" });
const warning = (msg) => showToast({ text: msg, className: "toast warning" });
const error = (msg) => showToast({ text: msg, className: "toast error" });

export default { info, success, warning, error };
