import { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

export const ModalPDF = ({
  title = "",
  PdfTitles = [""],
  files = [""],
  color = "",
  text = "",
  button = true,
}) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [currentFileIndex, setCurrentFileIndex] = useState(0);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function changePDF(index) {
    setCurrentFileIndex(index);
  }
  return (
    <>
      {button ? (
        <button
          className="button footer-button footer-bottom-button footer-button-span"
          onClick={openModal}
        >
          {title}

        </button>
      ) : (
        <span onClick={openModal} className="underline cursor-pointer">
          {text}
        </span>
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className={`btn-pdf border-[15px]  !z-[60] border-white w-[70%] h-[calc(90%-5rem)] top-[calc(50%+2rem)] left-[50%] -translate-x-[50%] -translate-y-[50%] absolute  rounded-lg p-0 overflow-hidden `}
      >
        <div className="flex ">
          {PdfTitles.map((title, index) => {
            return (
              <button
                onClick={() => changePDF(index)}
                className={`text-black text-center font-bold w-full text-details py-2 uppercase  ${
                  index === currentFileIndex ? "bg-gray-400" : "bg-white"
                }`}
                key={title}
              >
                {title}
              </button>
            );
          })}
        </div>
        <button
          className=" absolute right-0 top-0   p-2 text-red-600 bg-white font-bold  "
          onClick={closeModal}
          aria-label="Fechar"
        >
          X
        </button>
        {files.length > 0 && (
          <iframe
            title={PdfTitles[currentFileIndex]}
            src={files[currentFileIndex]}
            className="h-full w-full"
          ></iframe>
        )}
      </Modal>
    </>
  );
};
