import React from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Toast() {
  const notify = () => toast("taki produkt już istnieje!");

  return (
    <div>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default Toast;
