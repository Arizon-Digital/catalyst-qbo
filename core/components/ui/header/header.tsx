"use client"

import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { ChevronDown } from 'lucide-react';
import { Phone, Inbox } from 'lucide-react';
import ScrollToTop from './scrolltop';
import { ComponentPropsWithoutRef, ReactNode, useState, useEffect } from 'react';
import { BcImage } from '~/components/bc-image';
import { Link as CustomLink } from '~/components/link';
import { cn } from '~/lib/utils';
import { type Locale, LocaleSwitcher } from './locale-switcher';
import { MobileNav } from './mobile-nav';
import Minicart from '../header/minicart';
import ViewedItemsPopover from './ViewedItemsPopover';
import DoofinderScriptLoader from '~/app/[locale]/(default)/product/[slug]/_components/Doofinder';
import HubspotChat from '~/app/[locale]/(default)/product/[slug]/_components/Chatbot';
import { GetCurrencyList } from './currency';

interface Link {
  label: string;
  href: string;
}

interface Group {
  label: string;
  href: string;
  links?: Link[];
}

interface Image {
  src: string;
  altText: string;
}

interface Links {
  label: string;
  href: string;
  groups?: Group[];
}

interface Props extends ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root> {
  account?: ReactNode;
  activeLocale?: string;
  locales: Locale[];
  cart?: ReactNode;
  links: Links[];
  locale?: ReactNode;
  logo?: string | Image;
  search?: ReactNode;
}

const Header = ({
  account,
  activeLocale,
  cart,
  className,
  links,
  locales,
  logo,
  search,
}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCartClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
     
      <div className={`${
        isScrolled 
          ? 'fixed top-0 left-0 right-0 w-full shadow-lg animate-slideDown z-[100]' 
          : 'relative'
        } bg-white transition-all duration-300`}>
        {/* Top navbar */}
        <div className="w-full bg-white border-b border-gray-100">
          <div className="navbar">
            <a className="contact-link" href="/about-us"><i className="contact-link"></i> About Us</a>
            <GetCurrencyList />
            <a href="/contact-us" className="contact-link"><Inbox size={15} /> Contact Us</a>
            <a href="tel:438 800 0618" className="contact-link"><Phone size={15} /> CAN: 438 800 0618</a>
          </div>
        </div>

        {/* Main header */}
        <header className="w-full border-b border-gray-100">
          <div className="header-2 relative nmd:static nmd:gap-[25px] p-[0] nmd:py-[25px] flex items-center justify-center">
            <CustomLink className="header-logo-a w-full flex nmd:w-[calc((400/1600)*100vw)]" href="/">
              {typeof logo === 'object' ? (
                <BcImage
                  alt={logo.altText}
                  className="header-logo h-[50px] nmd:h-[100px] w-full min-w-[173px] object-contain"
                  height={100}
                  priority
                  src={logo.src}
                  width={155}
                />
              ) : (
                <span className="">{logo}</span>
              )}
            </CustomLink>
            
            <div className="header-elements flex items-center gap-[20px] absolute w-full nmd:static nmd:w-auto">
              <div className="header-search hidden nmd:block">{search}</div>
              <div className="flex items-center gap-[20px] w-full nmd:w-auto">
                <nav className="account hidden nmd:block header-account">{account}</nav>
                <div className="header-cart flex items-center w-full nmd:w-auto">
                  <div className="header-cart-div flex items-center absolute right-0 pr-[10px] nmd:pr-0 nmd:static">
                    <nav className="header-viewedItems nmd:block hidden">
                      <div className="text">
                        <ViewedItemsPopover />
                      </div>
                    </nav>
                    <nav className="header-cart-icon pl-10px nmd:p-0">
                      <button onClick={handleCartClick}>{cart}</button>
                    </nav>
                    <div className="flex flex-col items-center gap-0 flex-wrap pl-[5px]">
                      <div className="text">
                        <ScrollToTop />
                        <DoofinderScriptLoader />
                        <HubspotChat portalId={139717848} />
                      </div>
                      <div className="texts" />
                      {activeLocale && locales.length > 0 ? (
                        <LocaleSwitcher activeLocale={activeLocale} locales={locales} />
                      ) : null}
                    </div>
                  </div>
                  <MobileNav links={links} logo={logo} />
                </div>
              </div>
            </div>
          </div>
          <div className="header-search-2 nmd:hidden">{search}</div>
        </header>
      </div>

      
      {isScrolled && <div className="h-[150px]" />}

      
      <div className="bg-white border-b border-gray-100 relative ">
        <NavigationMenuPrimitive.Root id="nav-menu-root" className="hidden lg:block">
          <NavigationMenuPrimitive.List id="nav-menu-list" className="flex items-center gap-2 lg:gap-4 justify-center">
            {links.map((link) =>
              link.groups && link.groups.length > 0 ? (
                <NavigationMenuPrimitive.Item id={`nav-menu-item-${link.href}`} key={link.href}>
                  <NavigationMenuPrimitive.Trigger
                    id={`nav-menu-trigger-${link.href}`}
                    className="group/button flex items-center font-semibold hover:text-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20"
                  >
                    <CustomLink id={`nav-menu-link-${link.href}`} className="p-3 font-semibold" href={link.href}>
                      {link.label}
                    </CustomLink>
                    <ChevronDown
                      id={`nav-menu-chevron-${link.href}`}
                      aria-hidden="true"
                      className="cursor-pointer transition duration-200"
                    />
                  </NavigationMenuPrimitive.Trigger>
                  
                  <NavigationMenuPrimitive.Content
                    id={`nav-menu-content-${link.href}`}
                    className="absolute left-0 w-full bg-white z-[70] shadow-lg"
                  >
                    <div className="flex flex-wrap justify-center gap-6 py-4 px-4 mx-auto max-w-7xl">
                      {link.groups.map((group, index) => (
                        <ul id={`nav-menu-group-${group.href}`} className="flex flex-col w-56" key={`${index}-${group.href}`}>
                          <li id={`nav-menu-group-item-${group.href}`}>
                            <NavigationMenuPrimitive.Link asChild>
                              <CustomLink 
                                id={`nav-menu-group-link-${group.href}`} 
                                className="block p-2 font-semibold border-b border-gray-100 mb-2" 
                                href={group.href}
                              >
                                {group.label}
                              </CustomLink>
                            </NavigationMenuPrimitive.Link>
                          </li>
                          {group.links?.map((nestedLink) => (
                            <li id={`nav-menu-nested-item-${nestedLink.href}`} key={nestedLink.href}>
                              <NavigationMenuPrimitive.Link asChild>
                                <CustomLink 
                                  id={`nav-menu-nested-link-${nestedLink.href}`} 
                                  className="block p-2 hover:bg-gray-50 text-gray-600 hover:text-gray-900" 
                                  href={nestedLink.href}
                                >
                                  {nestedLink.label}
                                </CustomLink>
                              </NavigationMenuPrimitive.Link>
                            </li>
                          ))}
                        </ul>
                      ))}
                    </div>
                  </NavigationMenuPrimitive.Content>
                </NavigationMenuPrimitive.Item>
              ) : (
                <NavigationMenuPrimitive.Item id={`nav-menu-item-${link.href}`} key={link.href}>
                  <NavigationMenuPrimitive.Link asChild>
                    <CustomLink id={`nav-menu-link-${link.href}`} className="p-3 font-semibold" href={link.href}>
                      {link.label}
                    </CustomLink>
                  </NavigationMenuPrimitive.Link>
                </NavigationMenuPrimitive.Item>
              )
            )}
          </NavigationMenuPrimitive.List>

          <NavigationMenuPrimitive.Viewport 
            id="nav-menu-viewport" 
            className="absolute start-0 top-full w-full bg-white shadow-lg z-[65]" 
          />
        </NavigationMenuPrimitive.Root>
      </div>

      {/* Banner Section */}
      <section className="header-banner bg-white  border-t border-gray-200">
        <div className="container row">
          <article className="hb-item">
            <div className="hb-card">
              <figure className="hb-image">
                <a href="/customer-service/" title="Free Delivery Over $200.00">
                  <img src="https://www.qualitybearingsonline.com/content/NewSite/Customer-Service.png" alt="Customer Service" />
                </a>
              </figure>
              <div className="hb-text">
                <a href="/customer-service/" title="Free Delivery Over $200.00">Free Delivery <br />Over $200.00</a>
              </div>
            </div>
          </article>
          <article className="hb-item">
            <div className="hb-card">
              <figure className="hb-image">
                <a href="/delivery-information/" title="1-3 Day Delivery Available">
                  <img src="https://www.qualitybearingsonline.com/content/NewSite/UK-Delivery.png" alt="USA Delivery" />
                </a>
              </figure>
              <div className="hb-text">
                <a href="/delivery-information/" title="1-3 Day DHL &amp; UPS Delivery">1-3 Day DHL &amp; UPS<br />Delivery</a>
              </div>
            </div>
          </article>
          <article className="hb-item">
            <div className="hb-card">
              <figure className="hb-image">
                <a href="/blogcelebrating-our-10-year-anniversary-crowned-with-the-queens-award/" title="Queen's Award For Enterprise For International Trade">
                  <img className='queenlogo' src="https://store-03842.mybigcommerce.com/content/Queens_Award_Logo_black.png" alt="Queen's Award For Enterprise For International Trade" />
                </a>
              </figure>
              <div className="hb-text">
                <a target="_self" href="/blogcelebrating-our-10-year-anniversary-crowned-with-the-queens-award/" title="Queen's Award For Enterprise For International Trade">Queen's Award For<br />Enterprise Winners</a>
              </div>
            </div>
          </article>
          <article className="hb-item">
            <div className="hb-card">
              <figure className="hb-image">
                <a href="https://www.qualitybearingsonline.com/content/29134-copy-cert-quality-bearings-online-ltd-9001-050418.pdf" target="_new" title="ISO 9001 PDF">
                  <img src="https://www.qualitybearingsonline.com/content/NewSite/qms.png" alt="ISO Certificate" />
                </a>
              </figure>
              <div className="hb-text">
                <a href="https://store-03842.mybigcommerce.com/content/ISO_9001_2015_Certificate.pdf" target="_new" title="ISO 9001 PDF">ISO 9001 : 2015<br />Cert. No.291342018</a>
              </div>
            </div>
          </article>
          <article className="hb-item">
            <div className="hb-card">
              <figure className="hb-image hb-image-full">
                <a href="https://www.feefo.com/reviews/quality-bearings-online" target="_blank" rel="noopener noreferrer" data-tagrocket-clicked-outboundlink="1">
                  <img className='feefo' alt="Feefo logo" src="https://api.feefo.com/api/logo?merchantidentifier=quality-bearings-online&amp;template=Service-Stars-Yellow-150x38.png" title="Our customer Feefo rating" />
                </a>
              </figure>
            </div>
          </article>
        </div>
      </section>
      <div id="feefo-service-review-floating-widgetId"></div>
    </>
  );
};

Header.displayName = 'Header';

export { Header, type Links };