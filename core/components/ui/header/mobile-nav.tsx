'use client';

import * as SheetPrimitive from '@radix-ui/react-dialog';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { BcImage } from '~/components/bc-image';
import { Link as CustomLink } from '~/components/link';
import { Button } from '../button';
import { Links } from './header';

interface Image {
  altText: string;
  src: string;
}

interface Props {
  links: Links[];
  logo?: string | Image;
}

export const MobileNav = ({ links, logo }: Props) => {
  const [open, setOpen] = useState(false);
  // Track open/closed state for each menu item using their paths as keys
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const t = useTranslations('Components.Header.Navigation');

  // Toggle specific menu/submenu
  const toggleMenu = (menuPath: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setOpenMenus(prev => ({
      ...prev,
      [menuPath]: !prev[menuPath]
    }));
  };

  const renderNestedMenu = (menuItem: any, path: string) => {
    const isOpen = openMenus[path];
    
    return (
      <div key={menuItem.href} className="w-full">
        <div 
          onClick={(e) => toggleMenu(path, e)}
          className="group/button flex w-full items-center justify-between p-3 ps-0 font-semibold hover:text-primary cursor-pointer"
        >
          <span className="font-semibold">{menuItem.label}</span>
          {(menuItem.groups?.length > 0 || menuItem.links?.length > 0) && (
            <ChevronDown
              aria-hidden="true"
              className={`transition duration-200 ${isOpen ? '-rotate-180' : ''}`}
            />
          )}
        </div>
        
        {isOpen && menuItem.groups && (
          <div className="ps-4">
            {menuItem.groups.map((group: any, groupIndex: number) => (
              <div key={group.href || groupIndex}>
                <div className="ps-4">
                  {/* Group header */}
                  {group.label && (
                    <div
                      onClick={(e) => toggleMenu(`${path}-${groupIndex}`, e)}
                      className="flex items-center justify-between p-2 ps-0 font-semibold cursor-pointer"
                    >
                      <span>{group.label}</span>
                      {group.links?.length > 0 && (
                        <ChevronDown
                          className={`transition duration-200 ${
                            openMenus[`${path}-${groupIndex}`] ? '-rotate-180' : ''
                          }`}
                        />
                      )}
                    </div>
                  )}
                  
                  {/* Group links */}
                  {openMenus[`${path}-${groupIndex}`] && group.links && (
                    <div className="ps-4">
                      {group.links.map((link: any) => (
                        <CustomLink
                          key={link.href}
                          href={link.href}
                          className="block p-2 ps-0 hover:text-primary"
                          onClick={() => setOpen(false)}
                        >
                          {link.label}
                        </CustomLink>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <SheetPrimitive.Root onOpenChange={setOpen} open={open}>
      <SheetPrimitive.Trigger asChild>
        <Button
          aria-controls="nav-menu"
          aria-label={t('toggle')}
          className="group bg-transparent p-3 text-black hover:bg-transparent hover:text-primary lg:hidden"
          variant="subtle"
        >
          <Menu />
        </Button>
      </SheetPrimitive.Trigger>
      <SheetPrimitive.Portal>
        <SheetPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <SheetPrimitive.Content
          aria-describedby={undefined}
          className="fixed inset-y-0 left-0 z-50 h-full w-3/4 border-r p-6 pt-0 shadow-lg transition ease-in-out overflow-y-auto overscroll-contain 
          data-[state=closed]:duration-300 
          data-[state=open]:duration-500 
          data-[state=open]:animate-in 
          data-[state=closed]:animate-out 
          data-[state=closed]:slide-out-to-left 
          data-[state=open]:slide-in-from-left sm:max-w-sm"
        >
          <SheetPrimitive.Title asChild>
            <h2 className="sr-only">{t('navigationMenu')}</h2>
          </SheetPrimitive.Title>
          <div className="flex h-[92px] items-center justify-between">
            <div className="overflow-hidden text-ellipsis py-3">
              {typeof logo === 'object' ? (
                <BcImage
                  alt={logo.altText}
                  className="max-h-16 object-contain"
                  height={32}
                  priority
                  src={logo.src}
                  width={155}
                />
              ) : (
                <span className="truncate text-2xl font-black">{logo}</span>
              )}
            </div>
            <SheetPrimitive.Close className="p-3">
              <X className="h-6 w-6" />
            </SheetPrimitive.Close>
          </div>
          
          <div className="flex flex-col gap-2">
            {links.map((link, index) => (
              link.groups?.length > 0 ? 
                renderNestedMenu(link, `menu-${index}`) :
                <CustomLink
                  key={link.href}
                  href={link.href}
                  className="block p-3 ps-0 font-semibold hover:text-primary"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </CustomLink>
            ))}
            
            {/* Static links */}
            <CustomLink href="/about-us" className="block p-3 ps-0">About Us</CustomLink>
            <CustomLink href="/10-year-anniversary" className="block p-3 ps-0">10 Year Anniversary</CustomLink>
            <CustomLink href="/contact-us" className="block p-3 ps-0">Contact Us</CustomLink>
            <CustomLink href="/customer-service" className="block p-3 ps-0">Customer Service</CustomLink>
            <CustomLink href="/delivery-information" className="block p-3 ps-0">Delivery Information</CustomLink>
            <CustomLink href="/faqs" className="block p-3 ps-0">FAQs</CustomLink>
            <CustomLink href="/privacy-policy" className="block p-3 ps-0">Privacy Policy</CustomLink>
            <CustomLink href="/customer-reviews" className="block p-3 ps-0">Customer Reviews</CustomLink>
            <CustomLink href="/terms-and-conditions" className="block p-3 ps-0">Terms & Conditions</CustomLink>
            <CustomLink href="/blog" className="block p-3 ps-0">Blog</CustomLink>
            <CustomLink href="/sign-in" className="block p-3 ps-0">Sign In</CustomLink>
            <CustomLink href="/register" className="block p-3 ps-0">Register</CustomLink>
          </div>
        </SheetPrimitive.Content>
      </SheetPrimitive.Portal>
    </SheetPrimitive.Root>
  );
};