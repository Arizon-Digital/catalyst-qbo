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
 
 
interface Image {
  altText: string;
  src: string;
}
 
interface Link {
  href: string;
  label: string;
}
 
interface Section {
  title?: string;
  links: Link[];
}
 
interface SocialMediaLink {
  href: string;
  icon: ReactNode;
}
 
interface ContactInformation {
  address?: string;
  phone?: string;
}
 
interface Props {
  className?: string;
  contactInformation?: ContactInformation;
  copyright?: string;
  logo?: string | Image;
  paymentIcons?: ReactNode[];
  sections: Section[]; // Sections for navigation links
  socialMediaLinks?: SocialMediaLink[];
}
 
const Footer = ({
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
    <section className="section-flex ">
 
      {/* Contact Information Section */}
      <div className="flex flex-col gap-4 f1">
       
        {Boolean(contactInformation) && (
          <>
            <address className="not-italic" id="address">
            <p id="address"> Quality Bearings Online Ltd</p>
            {/* {contactInformation?.address?.split('\n').map((line) => (
                <Fragment key={line}>
                  {line}
                  <br />
                </Fragment>
              ))} */}
            </address>
            {/* <p id="address" className="footer-contact"> UK - 0808 168 1234</p>
            <p id="address" className="footer-contact"> USA - 646 895 6246 / 619 354 1821</p> */}
            <p id="address" className="footer-contact"> Canada - 438 793 4642</p>
            {/* {Boolean(contactInformation?.phone) && (
 
              <p id="address"> International- {contactInformation?.phone}</p>
 
 
            )} */}
          </>
        )}
 
        <a className="contactus" href="/contact-us">
 
          <p id="address">Contact Us</p>
        </a>
 
        {/* Social Media Links */}
        {Boolean(socialMediaLinks) && (
          <nav aria-label="Social media links" className="block">
            <ul className="flex gap-6">
              {socialMediaLinks?.map((link, index) => (
                <li key={index}>
                  <CustomLink className="inline-block" href={link.href} target="_blank">
                    {link.icon}
                  </CustomLink>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
 
 
      <nav className="grid auto-cols-fr gap-8 sm:grid-flow-col">
        {sections.map((section) => (
          <div key={section.title}>
            <h3 className="mb-4 text-lg font-bold" id='footer headings'>Navigation </h3>
            <ul className="flex flex-col gap-4">
              <li className='navigationfooter opacity-[0.5] transition-opacity duration-500 hover:opacity-[0.5]'>
                <a href="/">Home</a>
              </li>
              <li className='navigationfooter opacity-[0.5] transition-opacity duration-500 hover:opacity-[0.5]'>
                <a href="/about-us">About Us</a>
              </li>
              <li className='navigationfooter opacity-[0.5] transition-opacity duration-500 hover:opacity-[0.5]'>
                <a href="/10-year-anniversary">10 Year Anniversary</a>
              </li>
              <li className='navigationfooter opacity-[0.5] transition-opacity duration-500 hover:opacity-[0.5]'>
                <a href="/contact-us">Contact Us</a>
              </li>
              <li className='navigationfooter opacity-[0.5] transition-opacity duration-500 hover:opacity-[0.5]'>
                <a href="/customer-service">Customer Service</a>
              </li>
              <li className='navigationfooter opacity-[0.5] transition-opacity duration-500 hover:opacity-[0.5]'>
                <a href="/delivery-information">Delivery Information</a>
              </li>
              <li className='navigationfooter opacity-[0.5] transition-opacity duration-500 hover:opacity-[0.5]'>
                <a href="/faqs">FAQs</a>
              </li>
              <li className='navigationfooter opacity-[0.5] transition-opacity duration-500 hover:opacity-[0.5]'>
                <a href="/privacy-policy">Privacy Policy</a>
              </li>
              <li className='navigationfooter opacity-[0.5] transition-opacity duration-500 hover:opacity-[0.5]'>
                <a href="/customer-reviews">Customer Reviews</a>
              </li>
              <li className='navigationfooter opacity-[0.5] transition-opacity duration-500 hover:opacity-[0.5]'>
                <a href="/terms-and-conditions">Terms & Conditions</a>
              </li>
              <li className='navigationfooter opacity-[0.5] transition-opacity duration-500 hover:opacity-[0.5]'>
                <a href="/blog">Blog</a>
              </li>
              <li className='navigationfooter opacity-[0.5] transition-opacity duration-500 hover:opacity-[0.5]'>
                <a href="/sitemap">Sitemap</a>
              </li>
            </ul>
 
          </div>
        ))}
      </nav>
 
      {/* Additional Section */}
      <div className="flex flex-col gap-4">
        <img src="https://cdn11.bigcommerce.com/s-ur7wjnshy8/images/stencil/original/image-manager/footer-logo.png"></img>
        {/* <h3 className="mb-4 text-lg font-bold">Additional Section</h3> */}
        <article className="footer-info-col footer-info-col--other">
          <div className="footer-images footer-images-flex">
            <img src="https://cdn11.bigcommerce.com/s-03842/content/../product_images/uploaded_images/sc21.png" alt="Supply Chains Solutions" height="75" width="300" />
          </div>
          <div className="footer-images">
            <img src="https://cdn11.bigcommerce.com/s-03842/content/../product_images/uploaded_images/Queens_Award_White.png" alt="Queen's Award For Enterprise - International Trade 2022" width="70" height="90" />
            <img src="https://cdn11.bigcommerce.com/s-03842/content/../content/Investers_In_People_23_24-01.jpg" alt="Investors in People Accreditation" width="215" height="80" />
          </div>
          <div className="footer-apps footer-apps-desktop">
            <h2 className="footer-info-heading">Download Our New Mobile App</h2>
            <ul className='downaload'>
              <li className='payment'>
                <a href="https://play.google.com/store/apps/details?id=com.qualitybearingsonline.qualitybearingsonline" className='opacity-[0.5] transition-opacity duration-500 hover:opacity-[1]' title="Get the Quality Bearings Online App on Google Play Store" target="_blank">
                  <img src="https://cdn11.bigcommerce.com/s-03842/content/../content/NewSite/Product-Images/Google%20Play%20Store%20Icon.png" alt="Google Play Store" width="150" />
                </a>
              </li>
              <li>
                <a href="https://apps.apple.com/us/app/quality-bearings-online/id1480671392?ls=1" className='opacity-[0.5] transition-opacity duration-500 hover:opacity-[1]' title="Get the Quality Bearings Online App on The Apple App Store" target="_blank">
                  <img src="https://cdn11.bigcommerce.com/s-03842/content/../content/NewSite/Product-Images/Apple%20Store%20Icon.png" alt="Apple App Store" width="150" />
                </a>
              </li>
            </ul>
          </div>
 
          <div className="footer-apps footer-apps-desktop">
            <h2 className="footer-info-heading">Follow Us on Social Media</h2>
            <ul className='socialmedia'>
              <li className='contactfooter'>
                <a href="https://www.facebook.com/qualitybearings" className="contact-links" target="_blank" rel="noopener noreferrer">
                  <FaFacebook size={30} className='opacity-[0.5] transition-opacity duration-500 hover:opacity-[1]'/>
                 </a>
              </li>
              <li className='contactfooter'>
                <a href="https://www.instagram.com/qualitybearings/" className="contact-links" target="_blank" rel="noopener noreferrer">
                  <FaInstagram size={35} className='opacity-[0.5] transition-opacity duration-500 hover:opacity-[1]'/>
                </a>
              </li>
              <li className='contactfooter'>
                <a href="https://www.linkedin.com/company/quality-bearings-online-limited/" className="contact-links" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin size={35} className='opacity-[0.5] transition-opacity duration-500 hover:opacity-[1]'/>
                </a>
              </li>
            </ul>
          </div>
 
 
 
 
          <div data-content-region="ssl_site_seal--global"></div>
        </article>
      </div>
    </section>
 
    <section className="flex flex-col gap-10 border-t border-gray-200 px-4 py-8 sm:gap-8 sm:px-10 sm:py-6 lg:hidden lg:px-12 2xl:px-0">
      <Locale />
      <div className="flex w-full flex-col justify-between gap-10 sm:flex-row sm:gap-8">
        <div className="flex gap-6">{paymentIcons}</div>
        <p className="textscopy">{copyright}</p>
      </div>
    </section>
 
    <section className="hidden justify-between gap-8 border-t border-gray-200 px-4 py-6 sm:px-10 lg:flex lg:px-12 2xl:px-0" id="borderfooter">
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
 
export { Footer };
 