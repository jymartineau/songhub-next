import { Fragment, ReactNode, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  HomeIcon,
  EnvelopeIcon,
  PlusCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { useUser } from '@auth0/nextjs-auth0/client'
import PulseLoader from 'react-spinners/PulseLoader';
import Link from 'next/link'
import Image from 'next/image'
import {useRouter} from 'next/router'


const navigation = [
  { name: 'Create Project', href: '/projects/create', icon: PlusCircleIcon },
  { name: 'My Projects', href: '/projects/myprojects', icon: HomeIcon},
  { name: 'Invite', href: '/invite', icon: EnvelopeIcon},
]


export default function SideNavigation({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, isLoading } = useUser();
  const router = useRouter();
  if (isLoading) {
    <div>
      <PulseLoader color={'#037ae0'} loading={true} size={15} />
    </div>
  }

  if (user && !isLoading) {
    return (
      <>
        {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
        <div>
          <Transition.Root show={sidebarOpen} as={Fragment}>
            <Dialog as="div" className="relative z-40 lg:hidden" onClose={setSidebarOpen}>
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
              </Transition.Child>

              <div className="fixed inset-0 z-40 flex">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="-translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="-translate-x-full"
                >
                  <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-gray-800">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-300"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute top-0 right-0 -mr-12 pt-2">
                        <button
                          type="button"
                          className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                          onClick={() => setSidebarOpen(false)}
                        >
                          <span className="sr-only">Close sidebar</span>
                          <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                        </button>
                      </div>
                    </Transition.Child>
                    <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                      <div className="flex flex-shrink-0 items-center px-4">
                        <p className='text-lg font-bold'>SONGHUB</p>
                      </div>
                      <nav className="mt-5 space-y-1 px-2">
                        {navigation.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              router.asPath === item.href
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'group flex items-center rounded-md px-2 py-2 text-base font-medium'
                            )}
                          >
                            <item.icon
                              className={classNames(
                                router.asPath === item.href ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                                'mr-4 h-6 w-6 flex-shrink-0'
                              )}
                              aria-hidden="true"
                            />
                            {item.name}
                          </Link>
                        ))}
                      </nav>
                    </div>
                    <div className="flex flex-shrink-0 bg-gray-700 p-4">
                      <a href="#" className="group block flex-shrink-0">
                        <div className="flex items-center">
                           <div className='relative h-9 w-9 rounded-full overflow-hidden'>
                      <Image
                        src={user?.picture as string}
                        alt=""
                        fill

                      />
                    </div>
                          <div className="ml-3">
                            <p className="text-base font-medium text-white capitalize">{user.nickname}</p>
                               {
                        !isLoading && user && (<Link href='/api/auth/logout'><p className="text-xs font-medium text-gray-300 group-hover:text-gray-200">Log Out</p></Link>
                        )
                      }
                          </div>
                        </div>
                      </a>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
                <div className="w-14 flex-shrink-0">{/* Force sidebar to shrink to fit close icon */}</div>
              </div>
            </Dialog>
          </Transition.Root>

          {/* Static sidebar for desktop */}
          <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex min-h-0 flex-1 flex-col bg-gray-800">
              <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
                <div className="flex flex-shrink-0 items-center px-4">
                 <p className='w-full h-full font-bold'>SONGHUB</p>
                </div>
                <nav className="mt-5 flex-1 space-y-1 px-2">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        router.asPath === item.href ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'group flex items-center rounded-md px-2 py-2 text-sm font-medium'
                      )}
                    >
                      <item.icon
                        className={classNames(
                          router.asPath === item.href ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                          'mr-3 h-6 w-6 flex-shrink-0'
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  ))}
                </nav>
              </div>
              <div className="flex flex-shrink-0 bg-gray-700 p-4">
                <a href="#" className="group block w-full flex-shrink-0">
                  <div className="flex items-center">
                    <div className='relative h-9 w-9 rounded-full overflow-hidden'>
                      <Image
                        src={user?.picture as string}
                        alt=""
                        fill

                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-white capitalize">{user?.nickname}</p>
                      {
                        !isLoading && user && (<Link href='/api/auth/logout'><p className="text-xs font-medium text-gray-300 group-hover:text-gray-200">Log Out</p></Link>
                        )
                      }

                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-1 flex-col lg:pl-64">
            <div className="sticky top-0 z-10 bg-gray-800 pl-1 pt-1 sm:pl-3 sm:pt-3 lg:hidden">
              <button
                type="button"
                className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon className="h-8 w-8" aria-hidden="true" />
              </button>
            </div>
            <main className="flex-1">
              {children}
            </main>
          </div>
        </div>
      </>
    )
  }


}
