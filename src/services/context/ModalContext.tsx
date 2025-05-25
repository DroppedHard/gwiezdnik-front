import { createContext, useContext, useState, ReactNode, FC, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './modal.css';

type ModalContent = ReactNode | null;

interface ModalContextType {
  showModal: (content: ReactNode) => void;
  hideModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [modalContent, setModalContent] = useState<ModalContent>(null);
  const [visible, setVisible] = useState(false);

  const showModal = (content: ReactNode) => {
    setModalContent(content);
    requestAnimationFrame(() => setVisible(true)); // trigger animation
  };

  const hideModal = () => {
    setVisible(false);
  };

  // Clear content after fade-out
  useEffect(() => {
    if (!visible && modalContent) {
      const timeout = setTimeout(() => setModalContent(null), 300); // match CSS duration
      return () => clearTimeout(timeout);
    }
  }, [visible, modalContent]);

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      {modalContent &&
        createPortal(
          <div className={`modal-overlay ${visible ? 'show' : 'hide'}`} onClick={hideModal}>
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>
              {modalContent}
            </div>
          </div>,
          document.body
        )}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
