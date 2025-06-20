import { getMenu } from '@/lib/shopify';
import { Menu } from '@/lib/shopify/types';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Logo from '../../icons/logo';
import MobileMenu from './mobile-menu';
import Search from './search';

export async function Navbar() {
  // responsible for fetching menu from the Shopify
  const menu = await getMenu('next-js-frontend-menu');

  return (
    <nav className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Mobile menu button - only visible on mobile */}
          <div className="flex items-center md:hidden">
            <MobileMenu menu={menu} />
          </div>

          {/* Logo and Navigation - Left side */}
          <div className="flex items-center space-x-8">
            {/* Logo/Brand */}
            <Link
              href="/"
              prefetch={true}
              className="flex items-center cursor-pointer group transition-transform duration-200 ease-out hover:scale-[1.02]"
              aria-label={`${process.env.SITE_NAME} - Home`}
            >
              <div className="transition-opacity duration-200 group-hover:opacity-80">
                <Logo />
              </div>
              <div className="ml-2 text-lg font-semibold text-black transition-colors duration-200 group-hover:text-gray-700">
                {process.env.SITE_NAME}
              </div>
            </Link>

            {/* Desktop Navigation Menu */}
            {menu.length > 0 && (
              <nav
                className="hidden md:block"
                role="navigation"
                aria-label="Main navigation"
              >
                <ul className="flex items-center space-x-6">
                  {menu.map((item: Menu) => (
                    <li key={item.title}>
                      <Link
                        href={item.path}
                        prefetch={true}
                        className="relative text-sm font-medium text-black cursor-pointer transition-colors duration-200 hover:text-gray-600 group"
                      >
                        {item.title}
                        <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-black transition-all duration-300 ease-out group-hover:w-full"></span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>

          {/* Search - Center */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="w-full transition-transform duration-200 ease-out hover:scale-[1.01] focus-within:scale-[1.01]">
              <Search />
            </div>
          </div>

          {/* Cart - Right side */}
          <div className="flex items-center">
            {/* Shopping Cart */}
            <button
              className="relative p-2 text-black cursor-pointer group transition-all duration-200 ease-out hover:bg-gray-50 rounded-lg"
              aria-label="Shopping cart"
            >
              <ShoppingBagIcon className="h-6 w-6 transition-transform duration-200 ease-out group-hover:scale-110 group-hover:text-gray-700" />
              <div className="absolute inset-0 rounded-lg ring-0 ring-black/5 transition-all duration-200 group-hover:ring-2 group-hover:ring-offset-1"></div>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
