import {
  cloneElement,
  createContext,
  useContext,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';

import useOutsideClick from '../hooks/useOutsideClick';

type ModalContextType = {
  openName: string;
  close: () => void;
  open: (name: string) => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

type ModalProps = {
  children: ReactNode;
};

type OpenProps = {
  children: ReactElement<{
    onClick?: () => void;
  }>;
  opens: string;
};

type WindowProps = {
  children: ReactElement<{
    onCloseModal?: () => void;
  }>;
  name: string;
};

function Open({ children, opens: opensWindowName }: OpenProps) {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('Modal.Open must be used inside Modal');
  }
  const { open } = context;
  return cloneElement(children, {
    onClick: () => open(opensWindowName),
  });
}

function Window({ children, name }: WindowProps) {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('Modal.Window must be used inside Modal');
  }
  const { openName, close } = context;
  const ref = useOutsideClick<HTMLDivElement>(close);

  if (name !== openName) return null;

  return createPortal(
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/70
        backdrop-blur-sm
        px-4
      "
    >
      <div
        ref={ref}
        onClick={(e) => e.stopPropagation()}
        className="
          relative
          w-full
          max-w-2xl
          overflow-y-auto
          rounded-4xl
          border
          border-border
          bg-surface
          p-8
          shadow-[0_20px_60px_rgba(0,0,0,0.55)]
          transition-all
          duration-300
        "
      >
        <button
          type="button"
          onClick={close}
          className="
            absolute
            right-5
            top-5
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border
            border-border
            bg-elevated
            text-muted
            transition-all
            hover:border-accent/40
            hover:text-accent
          "
        >
          <HiXMark className="h-5 w-5" />
        </button>
        <div className="mt-4">
          {cloneElement(children, {
            onCloseModal: close,
          })}
        </div>
      </div>
    </div>,
    document.body,
  );
}

function Modal({ children }: ModalProps) {
  const [openName, setOpenName] = useState('');

  function close() {
    setOpenName('');
  }

  function open(name: string) {
    setOpenName(name);
  }

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
