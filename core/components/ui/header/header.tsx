import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { ChevronDown } from 'lucide-react';
import { Phone, Inbox } from 'lucide-react';

import { ComponentPropsWithoutRef, ReactNode } from 'react';

import { BcImage } from '~/components/bc-image';
import { Link as CustomLink } from '~/components/link';
import { cn } from '~/lib/utils';
import DialogDemo from './addtocartpopup';

import { type Locale, LocaleSwitcher } from './locale-switcher';
import { MobileNav } from './mobile-nav';
import Minicart from '../header/minicart';
import ViewedItemsPopover  from './ViewedItemsPopover';
import DoofinderScriptLoader  from '~/app/[locale]/(default)/product/[slug]/_components/Doofinder';
import HubspotChat from '~/app/[locale]/(default)/product/[slug]/_components/Chatbot';




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
}: Props) => (
  

  <div className={cn('relative', className)}>

    
<div className="navbar">
  <a className="contact-link" href="/about-us"><i className="contact-link"></i> About Us</a> 
  <a href="#" className="contact-link"> Select Currency:GBP</a> 
  <a href="#" className="contact-link"><Inbox size={15} /> Home</a>
  <a href="#" className="contact-link"><Phone size={15} /> USA : 646 878 6265</a>
  <a href="#" className="contact-link"><Phone size={15} /> CAN : 438 800 3601</a>
  <a href="#" className="contact-link"><Phone size={15} /> INT : +44 113 537 2137</a>
 
  
</div>


    
<header>
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
                    {' '}
                    <ViewedItemsPopover />
                  </div>
                </nav>
                <nav className="header-cart-icon pl-10px nmd:p-0">{cart} </nav>
                <div className="flex flex-col items-center gap-0 flex-wrap pl-[5px]">
                  <div className="text">
                    {' '}
                    <Minicart />
                    <DoofinderScriptLoader />
                    <HubspotChat portalId={139717848} />
                  </div>
                  <div className="texts">
                    {' '}
                    <DialogDemo />
                  </div>
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
    <NavigationMenuPrimitive.Root id="nav-menu-root" className="hidden lg:block">
  <NavigationMenuPrimitive.List id="nav-menu-list" className="flex items-center gap-2 lg:gap-4">
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
              className="cursor-pointer transition duration-200 group-data-[state=open]/button:-rotate-180"
            />
          </NavigationMenuPrimitive.Trigger>
          <NavigationMenuPrimitive.Content
            id={`nav-menu-content-${link.href}`}
            className="flex gap-20 2xl:container data-[motion^=from-]:animate-in data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 sm:px-10 lg:px-12 2xl:mx-auto 2xl:px-0"
          >
            {link.groups.map((group) => (
              <ul id={`nav-menu-group-${group.href}`} className="flex flex-col" key={group.href}>
                <li id={`nav-menu-group-item-${group.href}`}>
                  <NavigationMenuPrimitive.Link asChild>
                    <CustomLink id={`nav-menu-group-link-${group.href}`} className="block p-3 font-semibold" href={group.href}>
                      {group.label}
                    </CustomLink>
                  </NavigationMenuPrimitive.Link>
                </li>
                {group.links &&
                  group.links.length > 0 &&
                  group.links.map((nestedLink) => (
                    <li id={`nav-menu-nested-item-${nestedLink.href}`} key={nestedLink.href}>
                      <NavigationMenuPrimitive.Link asChild>
                        <CustomLink id={`nav-menu-nested-link-${nestedLink.href}`} className="block p-3" href={nestedLink.href}>
                          {nestedLink.label}
                        </CustomLink>
                      </NavigationMenuPrimitive.Link>
                    </li>
                  ))}
              </ul>
            ))}
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
      ),
    )}
  </NavigationMenuPrimitive.List>

  <NavigationMenuPrimitive.Viewport id="nav-menu-viewport" className="absolute start-0 top-full z-50 w-full bg-white pb-12 pt-6 shadow-xl duration-200 animate-in slide-in-from-top-5" />
</NavigationMenuPrimitive.Root>

{/* New Section Here */}
<section className="header-banner">
    <div className="container row">
        <article className="hb-item">
            <div className="hb-card">
                <figure className="hb-image">
                    <a href="https://www.qualitybearingsonline.com/customer-service/" title="Excellent Customer Service">
                        <img src="https://www.qualitybearingsonline.com/content/NewSite/Customer-Service.png" alt="Customer Service" />
                    </a>
                </figure>
                <div className="hb-text">
                    <a href="https://www.qualitybearingsonline.com/customer-service/" title="Excellent Customer Service">Excellent Customer<br />Service</a>
                </div>
            </div>
        </article>
        <article className="hb-item">
            <div className="hb-card">
                <figure className="hb-image">
                    <a href="https://www.qualitybearingsonline.com/delivery-information/" title="1-3 Day Delivery Available">
                        <img src="https://www.qualitybearingsonline.com/content/NewSite/UK-Delivery.png" alt="USA Delivery" />
                    </a>
                </figure>
                <div className="hb-text">
                    <a href="https://www.qualitybearingsonline.com/delivery-information/" title="1-3 Day DHL &amp; UPS Delivery">1-3 Day DHL &amp; UPS<br />Delivery</a>
                </div>
            </div>
        </article>
        <article className="hb-item">
            <div className="hb-card">
                <figure className="hb-image">
                    <a href="https://www.qualitybearingsonline.com/blogcelebrating-our-10-year-anniversary-crowned-with-the-queens-award/" title="Queen's Award For Enterprise For International Trade">
                        <img src="https://store-03842.mybigcommerce.com/content/Queens_Award_Logo_black.png" alt="Queen's Award For Enterprise For International Trade" />
                    </a>
                </figure>
                <div className="hb-text">
                    <a target="_self" href="https://www.qualitybearingsonline.com/blogcelebrating-our-10-year-anniversary-crowned-with-the-queens-award/" title="Queen's Award For Enterprise For International Trade">Queen's Award For<br />Enterprise Winners</a>
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
                    <a href="https://store-03842.mybigcommerce.com/content/ISO_9001_2015_Certificate.pdf?__hstc=239461468.e5f434888e7955fe283fde1f06418809.1719491421981.1727774515263.1727776880460.56&amp;__hssc=239461468.1.1727776880460&amp;__hsfp=2296146515" target="_new" title="ISO 9001 PDF">ISO 9001 : 2015<br />Cert. No.291342018</a>
                </div>
            </div>
        </article>
        <article className="hb-item">
            <div className="hb-card">
                <figure className="hb-image hb-image-full">
                    <a href="https://www.feefo.com/reviews/quality-bearings-online" target="_blank" data-tagrocket-clicked-outboundlink="1">
                        <img alt="Feefo logo" src="https://api.feefo.com/api/logo?merchantidentifier=quality-bearings-online&amp;template=Service-Stars-Yellow-150x38.png" title="Our customer Feefo rating" />
                    </a>
                </figure>
            </div>
        </article>
    </div>
</section>



</div>


  
);


Header.displayName = 'Header';

export { Header, type Links };
