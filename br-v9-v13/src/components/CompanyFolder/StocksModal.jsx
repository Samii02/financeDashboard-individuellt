import React from "react";

function StocksModal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <section className="fixed inset-0 flex rounded-xl">
      <section className="flex bg-cardBg p-6 rounded-lg shadow-lg w-full">
        <button className="absolute top-3 right-3 text-xl" onClick={onClose}>
          &times;
        </button>
        {children}
      </section>
    </section>
  );
}

export default StocksModal;
