import React, { useRef } from "react";
import { createPortal } from "react-dom";

// StocksModal component - a modal (popup) for displaying stock-related information
function StocksModal({ isOpen, onClose, children }) {
  const modalRef = useRef(null);

  // If the modal is not open, do not render anything (prevents unnecessary rendering)
  if (!isOpen) return null;

  return createPortal(
    <section className="fixed inset-0 flex items-center justify-center bg-black/40">
      <section
        ref={modalRef}
        className="bg-white p-6 m-2 rounded-lg shadow-lg relative w-full max-w-4xl"
      >
        <button
          className="absolute top-2 right-2 bg-black text-white rounded-full w-8 h-8 flex items-center justify-center text-xl font-bold hover:bg-red-400 transition transform hover:scale-105 shadow-lg"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </section>
    </section>,
    document.body //* Renders the modal outside the regular component tree using `createPortal`
  );
}

export default StocksModal;
