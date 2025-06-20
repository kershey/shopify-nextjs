'use client';

import { Menu } from '@/lib/shopify/types';
import { Dialog, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import Search from './search';

export default function MobileMenu({ menu }: { menu: Menu[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const openMobileMenu = () => setIsOpen(true);
  const closeMobileMenu = () => setIsOpen(false);

  return (
    <>
      <button
        onClick={openMobileMenu}
        aria-label="Open mobile menu"
        className="flex h-10 w-10 items-center justify-center rounded-lg text-black transition-all duration-200 ease-out hover:bg-gray-50 hover:scale-105 group md:hidden"
      >
        <Bars3Icon className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
      </button>

      <Transition show={isOpen}>
        <Dialog onClose={closeMobileMenu} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-all ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm"
              aria-hidden="true"
            />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition-all ease-out duration-300"
            enterFrom="translate-x-[-100%]"
            enterTo="translate-x-0"
            leave="transition-all ease-in duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-[-100%]"
          >
            <Dialog.Panel className="fixed bottom-0 left-0 right-0 top-0 flex h-full w-full max-w-sm flex-col bg-white shadow-2xl">
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-black">Menu</h2>
                  <button
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-black transition-all duration-200 ease-out hover:bg-gray-50 hover:scale-105 group"
                    onClick={closeMobileMenu}
                    aria-label="Close mobile menu"
                  >
                    <XMarkIcon className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                  </button>
                </div>

                {/* Search */}
                <div className="p-6 border-b border-gray-200">
                  <Search />
                </div>

                {/* Navigation */}
                <div className="flex-1 p-6">
                  {menu.length > 0 ? (
                    <nav>
                      <ul className="space-y-1">
                        {menu.map((item: Menu) => (
                          <li key={item.title}>
                            <Link
                              href={item.path}
                              prefetch={true}
                              onClick={closeMobileMenu}
                              className="block px-4 py-3 text-base font-medium text-black transition-all duration-200 ease-out hover:bg-gray-50 hover:text-gray-700 rounded-lg group"
                            >
                              <span className="flex items-center justify-between">
                                {item.title}
                                <svg
                                  className="h-4 w-4 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-1"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                  />
                                </svg>
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  ) : null}
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
