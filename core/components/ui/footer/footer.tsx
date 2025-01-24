


import { Fragment, ReactNode } from 'react';
import { BcImage } from '~/components/bc-image';
import { Link as CustomLink } from '~/components/link';
import { cn } from '~/lib/utils';
import { Phone, Inbox } from 'lucide-react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Locale } from './locale';
import CookieConsent from '~/components/header/cookie-consent';
import { NewsLetterSubscriptions } from './news-letter-subscription';
import { getChannelIdFromLocale } from '~/channels.config';

interface Props {
  className?: string;
  contactInformation?: {
    address?: string;
    phone?: string;
  };
  copyright?: string;
  logo?: string;
  paymentIcons?: ReactNode[];
  sections: { title?: string; links: { href: string; label: string; }[]; }[];
  socialMediaLinks?: { href: string; icon: ReactNode; }[];
}

export const Footer = ({
  className,
  contactInformation,
  copyright,
  logo,
  paymentIcons,
  sections,
  socialMediaLinks,
  ...props
}: Props) => (
  <footer className={cn('2xl:container 2xl:mx-auto', className)} {...props}>
    <nav className="grid flex-auto auto-cols-frr gap-8 sm:grid-flow-col">
      <article className="emthemesModez-newsletterForm" data-section-type="newsletterSubscription">
        <div className="newsletter-container">
          <h5 className="footer-info-heading" id='headingin' style={{ margin: 0 }}>Subscribe Today</h5>
          <p id='font size' style={{ margin: 0 }}>
            Be the first to know about exclusive deals, new product lines, company announcements, and industry news.
          </p>
          <NewsLetterSubscriptions channelId={getChannelIdFromLocale()}/>
        </div>
      </article>
    </nav>
   
    {/* Mobile View */}
    <div className="lg:hidden">
    <section className="section-flex">
        {/* Contact Information Section */}
        <div className="flex flex-col gap-4 f1">
          <address className="not-italic font-bold" id="address">
            <p id="address">Quality Bearings Online Ltd</p>
          </address>
          <p id="address" className="footer-contact font-bold">Canada - {contactInformation?.phone}</p>
          <a className="contactus font-bold" href="/contact-us">
            <p id="address">Contact Us</p>
            <span className="block w-100 h-[1px] bg-white mt-4 sm:hidden"></span>
          </a>
        </div>
        </section>
      <div className="px-4 py-6 flex">
        {/* Navigation Section */}
        <nav className="w-1/2">
          <h3 className="mb-4 text-lg font-bold" id='footer headings'>Navigation</h3>
          <ul className="flex flex-col gap-4">
            <li className='navigationfooter opacity-[0.5] transition-opacity duration-500 hover:opacity-[1]'>
              <a href="/">Home</a>
            </li>
            <li className='navigationfooter opacity-[0.5] transition-opacity duration-500 hover:opacity-[1]'>
              <a href="/about-us">About Us</a>
            </li>
            <li className='navigationfooter opacity-[0.5] transition-opacity duration-500 hover:opacity-[1]'>
              <a href="/10-year-anniversary">10 Year Anniversary</a>
            </li>
            <li className='navigationfooter opacity-[0.5] transition-opacity duration-500 hover:opacity-[1]'>
              <a href="/contact-us">Contact Us</a>
            </li>
            <li className='navigationfooter opacity-[0.5] transition-opacity duration-500 hover:opacity-[1]'>
              <a href="/customer-service">Customer Service</a>
            </li>
            <li className='navigationfooter opacity-[0.5] transition-opacity duration-500 hover:opacity-[1]'>
              <a href="/delivery-information">Delivery Information</a>
            </li>
            <li className='navigationfooter opacity-[0.5] transition-opacity duration-500 hover:opacity-[1]'>
              <a href="/faqs">FAQs</a>
            </li>
            <li className='navigationfooter opacity-[0.5] transition-opacity duration-500 hover:opacity-[1]'>
              <a href="/privacy-policy">Privacy Policy</a>
            </li>
            <li className='navigationfooter opacity-[0.5] transition-opacity duration-500 hover:opacity-[1]'>
              <a href="/customer-reviews">Customer Reviews</a>
            </li>
            <li className='navigationfooter opacity-[0.5] transition-opacity duration-500 hover:opacity-[1]'>
              <a href="/terms-and-conditions">Terms & Conditions</a>
            </li>
            <li className='navigationfooter opacity-[0.5] transition-opacity duration-500 hover:opacity-[1]'>
              <a href="/blog">Blog</a>
            </li>
           
          </ul>
        </nav>

        {/* Images Section */}
        <div className="w-1/2">
          <div className="flex flex-col items-center space-y-4">
          <img src="https://cdn11.bigcommerce.com/s-03842/content/../product_images/uploaded_images/bbea-lloys-bank-winner-2023.png" 
                 alt="Supply Chains Solutions" 
                 height="75" width="300" />
          
            <img src="https://cdn11.bigcommerce.com/s-03842/content/../product_images/uploaded_images/sc21.png" 
                 alt="Supply Chains Solutions" 
                 height="75" width="300" />
            <img src="https://cdn11.bigcommerce.com/s-03842/content/../product_images/uploaded_images/Queens_Award_White.png" 
                 alt="Queen's Award" 
                 width="70" height="90" />
            <img src="https://cdn11.bigcommerce.com/s-03842/content/../content/Investers_In_People_23_24-01.jpg" 
                 alt="Investors in People" 
                 width="215" height="80" />
          </div>

          <div className="footer-apps footer-apps-desktop mt-8">
            <h2 className="footer-info-heading">Download Our New Mobile App</h2>
            <ul className='downaload'>
              <li className='payment'>
                <a href="https://play.google.com/store/apps/details?id=com.qualitybearingsonline.qualitybearingsonline" 
                   className='opacity-[0.5] transition-opacity duration-500 hover:opacity-[1]'>
                  <img src="https://cdn11.bigcommerce.com/s-03842/content/../content/NewSite/Product-Images/Google%20Play%20Store%20Icon.png" 
                       alt="Google Play Store" width="150" />
                </a>
              </li>
              <li>
                <a href="https://apps.apple.com/us/app/quality-bearings-online/id1480671392?ls=1" 
                   className='opacity-[0.5] transition-opacity duration-500 hover:opacity-[1]'>
                  <img src="https://cdn11.bigcommerce.com/s-03842/content/../content/NewSite/Product-Images/Apple%20Store%20Icon.png" 
                       alt="Apple App Store" width="150" />
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-apps footer-apps-desktop mt-8">
            <h2 className="footer-info-heading">Follow Us on Social Media</h2>
            <ul className='socialmedia'>
              <li className='contactfooter'>
                <a href="https://www.facebook.com/qualitybearings" className="contact-links">
                  <FaFacebook size={30} className='opacity-[0.5] transition-opacity duration-500 hover:opacity-[1]'/>
                </a>
              </li>
              <li className='contactfooter'>
                <a href="https://www.instagram.com/qualitybearings/" className="contact-links">
                  <FaInstagram size={35} className='opacity-[0.5] transition-opacity duration-500 hover:opacity-[1]'/>
                </a>
              </li>
              <li className='contactfooter'>
                <a href="https://www.linkedin.com/company/quality-bearings-online-limited/" className="contact-links">
                  <FaLinkedin size={35} className='opacity-[0.5] transition-opacity duration-500 hover:opacity-[1]'/>
                </a>
              </li>
            </ul>
            
          </div>
          
        </div>
      </div>
       {/* Mobile Bottom Section */}
    <section className="flex flex-col gap-6 border-t border-gray-200 px-4 py-6 lg:hidden">
      <div className="flex flex-col items-center gap-4">
        <Locale />
        <div className="flex gap-3 items-center justify-center">{paymentIcons}</div>
        <p className="textscopy text-center">{copyright}</p>
      </div>
    </section>
    </div>


    {/* Desktop View */}
    <div className="hidden lg:block">
      <section className="section-flex">
        {/* Contact Information Section */}
        <div className="flex flex-col gap-4 f1">
          <address className="not-italic font-bold" id="address">
            <p id="address">Quality Bearings Online Ltd</p>
          </address>
          <p id="address" className="footer-contact font-bold">Canada - {contactInformation?.phone}</p>
          <a className="contactus font-bold" href="/contact-us">
            <p id="address">Contact Us</p>
          </a>
        </div>

        {/* Navigation Section */}
        <nav className="grid auto-cols-fr gap-8 sm:grid-flow-col">
          <div>
            <h3 className="mb-4 text-lg font-bold" id='footer headings'>Navigate</h3>
            <ul className="flex flex-col gap-4">
              <li className='navigationfooter opacity-[0.5] transition-opacity duration-500 hover:opacity-[1]'>
                <a href="/">Home</a>
              </li>
              <li className='navigationfooter opacity-[0.5] transition-opacity duration-500 hover:opacity-[1]'>
                <a href="/about-us">About Us</a>
              </li>
              <li className='navigationfooter opacity-[0.5] transition-opacity duration-500 hover:opacity-[1]'>
                <a href="/10-year-anniversary">10 Year Anniversary</a>
              </li>
              <li className='navigationfooter opacity-[0.5] transition-opacity duration-500 hover:opacity-[1]'>
                <a href="/contact-us">Contact Us</a>
              </li>
              <li className='navigationfooter opacity-[0.5] transition-opacity duration-500 hover:opacity-[1]'>
                <a href="/customer-service">Customer Service</a>
              </li>
              <li className='navigationfooter opacity-[0.5] transition-opacity duration-500 hover:opacity-[1]'>
                <a href="/delivery-information">Delivery Information</a>
              </li>
              <li className='navigationfooter opacity-[0.5] transition-opacity duration-500 hover:opacity-[1]'>
                <a href="/faqs">FAQs</a>
              </li>
              <li className='navigationfooter opacity-[0.5] transition-opacity duration-500 hover:opacity-[1]'>
                <a href="/privacy-policy">Privacy Policy</a>
              </li>
              <li className='navigationfooter opacity-[0.5] transition-opacity duration-500 hover:opacity-[1]'>
                <a href="/customer-reviews">Customer Reviews</a>
              </li>
              <li className='navigationfooter opacity-[0.5] transition-opacity duration-500 hover:opacity-[1]'>
                <a href="/terms-and-conditions">Terms & Conditions</a>
              </li>
              <li className='navigationfooter opacity-[0.5] transition-opacity duration-500 hover:opacity-[1]'>
                <a href="/blog">Blog</a>
              </li>
             
            </ul>
          </div>
        </nav>

        {/* Third Column with Images and Links */}
        <div className="flex flex-col gap-2">
          {/* Awards and Certifications - Structured like the image */}
          <div className="flex flex-col gap-2">
            {/* Lloyds Bank Awards Group */}
            <div className="flex items-center gap-2 lloyds">
              <img src="https://cdn11.bigcommerce.com/s-ur7wjnshy8/images/stencil/original/image-manager/footer-logo.png" 
                   alt="Lloyds Bank British Business" 
                   className="w-[400px] h-auto" />
            </div>

            {/* SC21 and Supply Chain Solutions */}
            <div className="flex items-center gap-2">
              <div className="">
                <img src="https://cdn11.bigcommerce.com/s-03842/content/../product_images/uploaded_images/sc21.png" 
                     alt="SC21" 
                     className="w-[300px] h-auto" />
              </div>
              
            </div>

            {/* Queen's Award and Investors in People */}
            <div className="flex items-center gap-8">
              <img src="https://cdn11.bigcommerce.com/s-03842/content/../product_images/uploaded_images/Queens_Award_White.png" 
                   alt="Queen's Award" 
                   className="w-[70px] h-auto" />
              <img src="https://cdn11.bigcommerce.com/s-03842/content/../content/Investers_In_People_23_24-01.jpg" 
                   alt="Investors in People" 
                   className="w-[215px] h-auto" />
            </div>
          </div>

          {/* Mobile App Downloads - Now in a row */}
          <div className="mt-2">
            <h2 className="footer-info-heading mb-4">Download Our New Mobile App</h2>
            <ul className="flex flex-row gap-4">
              <li>
                <a href="https://play.google.com/store/apps/details?id=com.qualitybearingsonline.qualitybearingsonline" 
                   className="opacity-[0.5] transition-opacity duration-500 hover:opacity-[1]">
                  <img src="https://cdn11.bigcommerce.com/s-03842/content/../content/NewSite/Product-Images/Google%20Play%20Store%20Icon.png" 
                       alt="Google Play Store" 
                       className="w-[150px] h-auto" />
                </a>
              </li>
              <li>
                <a href="https://apps.apple.com/us/app/quality-bearings-online/id1480671392?ls=1" 
                   className="opacity-[0.5] transition-opacity duration-500 hover:opacity-[1]">
                  <img src="https://cdn11.bigcommerce.com/s-03842/content/../content/NewSite/Product-Images/Apple%20Store%20Icon.png" 
                       alt="Apple App Store" 
                       className="w-[150px] h-auto" />
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="mt-2">
            <h2 className="footer-info-heading mb-4">Follow Us on Social Media</h2>
            <ul className="flex gap-4">
              <li>
                <a href="https://www.facebook.com/qualitybearings" 
                   className="opacity-[0.5] transition-opacity duration-500 hover:opacity-[1]">
                  <FaFacebook size={30} />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/qualitybearings/" 
                   className="opacity-[0.5] transition-opacity duration-500 hover:opacity-[1]">
                  <FaInstagram size={35} />
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/quality-bearings-online-limited/" 
                   className="opacity-[0.5] transition-opacity duration-500 hover:opacity-[1]">
                  <FaLinkedin size={35} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>

    <section className="hidden justify-between gap-8 border-t border-gray-200 px-4 mt-6 py-6 sm:px-10 lg:flex lg:px-12 2xl:px-0" id="borderfooter">
      <p className="textscopy">{copyright}</p>
      <div className="flex gap-8 ml-[100px]">
        <Locale />
        <div className="flex gap-3 opacity-[0.9] transition-opacity duration-500" id="payment-icons">
          {paymentIcons}
        </div>
      </div>
    </section>
    <CookieConsent />
  </footer>
);

Footer.displayName = 'Footer';