import React, { useRef } from "react";
import { createPortal } from "react-dom";

function StocksModal({ isOpen, onClose, children }) {
  const modalRef = useRef(null);

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
    document.body
  );
}

export default StocksModal;
