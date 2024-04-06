'use client'

import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  function openDialog() {
    setIsOpen(true);
  }

  function closeDialog() {
    setIsOpen(false);
  }

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <button
          onClick={openDialog}
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
        >
          Click Me
        </button>
      </div>

      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={closeDialog}>
          <div className="flex items-center justify-center min-h-screen">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              
              <div className="bg-white rounded-lg p-6 max-w-md mx-auto z-10">
                <Dialog.Title className="text-lg font-semibold mb-2">Popup Message</Dialog.Title>
                <p className="mb-4">This is a popup message.</p>
                <button
                  onClick={closeDialog}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                >
                  Close
                </button>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
