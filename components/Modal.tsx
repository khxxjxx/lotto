'use client';

import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { useStore } from '@/hooks';
import { useActiveModalStore } from '@/store/lotto';
import Button from './Button';

interface IModalProps {
  title?: ReactNode;
  modalId: string;
  className?: string;
  prerender?: boolean;
  onClose?: () => void;
  children: ReactNode;
}

const Modal = ({
  title,
  modalId,
  className,
  prerender = false,
  onClose,
  children,
}: IModalProps) => {
  const [domLoaded, setDomLoaded] = useState(false);
  const [scrollbarWidth, setScrollbarWidth] = useState(0);

  const activeModal = useStore(useActiveModalStore, state => state.activeModal);

  const { setActiveModal } = useActiveModalStore();

  const isActive = activeModal === modalId;
  const modalOpen = prerender || isActive;

  useEffect(() => {
    const windowWidth = window.innerWidth;
    const clientWidth = document.documentElement.clientWidth;

    setDomLoaded(true);
    setScrollbarWidth(windowWidth - clientWidth);

    return () => setActiveModal();
  }, [setActiveModal]);

  if (!domLoaded || !modalOpen) return <></>;

  return (
    <>
      {createPortal(
        <div
          className={`${isActive ? 'block' : 'hidden'} ${
            className ? className : ''
          }`}
        >
          <div
            className='fixed top-0 left-0 h-screen w-screen flex items-center justify-center bg-black-80/40'
            style={{ paddingRight: `${scrollbarWidth}px` }}
          >
            <div className='flex flex-col max-w-[80vw] w-max max-h-[75vh] bg-white rounded-xl'>
              <div className='relative mt-4 mx-2'>
                <h3 className='text-xl font-bold h-7 text-center'>{title}</h3>
                <div className='absolute right-0 -top-[2px]'>
                  <Button
                    size='sm'
                    width='auto'
                    variant='text'
                    className='ml-auto'
                    onClick={() => (onClose || setActiveModal)()}
                  >
                    <svg
                      viewBox='64 64 896 896'
                      width='1em'
                      height='1em'
                      fill='currentColor'
                    >
                      <path d='M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z' />
                    </svg>
                  </Button>
                </div>
              </div>
              <div className='modal_content py-4 break-all overflow-auto'>
                {children}
              </div>
            </div>
          </div>
        </div>,
        document.querySelector('#__root__portal') as HTMLDivElement,
      )}
    </>
  );
};

export default Modal;
