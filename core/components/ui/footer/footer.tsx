import { Fragment, ReactNode } from 'react';

import { BcImage } from '~/components/bc-image';
import { Link as CustomLink } from '~/components/link';
import { cn } from '~/lib/utils';
import { Phone, Inbox } from 'lucide-react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

import { Locale } from './locale';

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
  <div className="newsletter-container" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
    <h5 className="footer-info-heading" id='headingin' style={{ margin: 0 }}>Subscribe Today</h5>
    <p id='font size' style={{ margin: 0 }}>
      Be the first to know about exclusive deals, new product lines, company announcements, and industry news.
    </p>
    <form className="form" action="/subscribe.php" method="post" data-hs-cf-bound="true" style={{ display: 'flex', alignItems: 'center' }}>
      <fieldset className="form-fieldset" style={{ display: 'flex', alignItems: 'center', border: 'none' }}>
        <input type="hidden" name="action" value="subscribe" />
        <input type="hidden" name="nl_first_name" value="bc" />
        <input type="hidden" name="check" value="1" />
        <div className="form-field" style={{ display: 'flex', alignItems: 'center' }}>
          <label className="form-label is-srOnly" htmlFor="nl_email">
          </label>
          <div className="form-prefixPostfix wrap" id='warp' style={{ display: 'flex', alignItems: 'center' }}>
            <input
              className="form-input form-prefixPostfix-input"
              id="nl_email"
              name="nl_email"
              type="email"
              placeholder="Your email address"
              aria-required="true"
              required
              style={{ marginRight: '8px' }}
            />
            <input className="button form-prefixPostfix-button--postfix" type="submit" value="Subscribe" />
          </div>
        </div>
      </fieldset>
    </form>
  </div>
</article>


    </nav>
    <section className="flex flex-col gap-8 border-t border-gray-200 px-4 py-10 sm:px-10 md:flex-row lg:gap-4 lg:px-12 2xl:px-0">
      
      {/* Contact Information Section */}
      <div className="flex flex-col gap-4">
        {Boolean(contactInformation) && (
          <>
            <address className="not-italic" id="address">
              {contactInformation?.address?.split('\n').map((line) => (
                <Fragment key={line}>
                  {line}
                  <br />
                </Fragment>
              ))}
            </address>
            <p id="address"> UK - 0808 168 1234</p>
        <p id="address"> USA - 646 895 6246 / 619 354 1821</p>
        <p id="address"> Canada - 438 800 0605</p>
            {Boolean(contactInformation?.phone) && (
              <a
                className="hover:text-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20"
                href={`tel:${contactInformation?.phone}`}
              >
                <p id="address"> International- {contactInformation?.phone}</p>
              </a>
              
            )}
          </>
        )}
        
        <a className="contactus" href={`tel:${contactInformation?.phone}`}>
          
          <p id="address">Contact us</p>
        </a>

        {/* Social Media Links */}
        {Boolean(socialMediaLinks) && (
          <nav aria-label="Social media links" className="block">
            <ul className="flex gap-6">
              {socialMediaLinks?.map((link) => (
                <li key={link.href}>
                  <CustomLink className="inline-block" href={link.href} target="_blank">
                    {link.icon}
                  </CustomLink>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      
      <nav className="grid flex-auto auto-cols-fr gap-8 sm:grid-flow-col">
        {sections.map((section) => (
          <div key={section.title}>
            <h3 className="mb-4 text-lg font-bold">{section.title}</h3>
            <ul className="flex flex-col gap-4">
  <li>
    <a href="/">Home</a>
  </li>
  <li>
    <a href="/about-us">About Us</a>
  </li>
  <li>
    <a href="/10-year-anniversary">10 Year Anniversary</a>
  </li>
  <li>
    <a href="/contact-us">Contact Us</a>
  </li>
  <li>
    <a href="/customer-service">Customer Service</a>
  </li>
  <li>
    <a href="/delivery-information">Delivery Information</a>
  </li>
  <li>
    <a href="/faqs">FAQS</a>
  </li>
  <li>
    <a href="/privacy-policy">Privacy Policy</a>
  </li>
  <li>
    <a href="/customer-reviews">Customer Reviews</a>
  </li>
  <li>
    <a href="/terms-conditions">Terms & Conditions</a>
  </li>
  <li>
    <a href="/blog">Blog</a>
  </li>
  <li>
    <a href="/sitemap">Sitemap</a>
  </li>
</ul>

          </div>
        ))}
      </nav>

      {/* Additional Section */}
      <div className="flex flex-col gap-4">
        <h3 className="mb-4 text-lg font-bold">Additional Section</h3>
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
            <ul>
              <li>
                <a href="https://play.google.com/store/apps/details?id=com.qualitybearingsonline.qualitybearingsonline" title="Get the Quality Bearings Online App on Google Play Store" target="_blank">
                  <img src="https://cdn11.bigcommerce.com/s-03842/content/../content/NewSite/Product-Images/Google%20Play%20Store%20Icon.png" alt="Google Play Store" width="150" />
                </a>
              </li>
              <li>
                <a href="https://apps.apple.com/us/app/quality-bearings-online/id1480671392?ls=1" title="Get the Quality Bearings Online App on The Apple App Store" target="_blank">
                  <img src="https://cdn11.bigcommerce.com/s-03842/content/../content/NewSite/Product-Images/Apple%20Store%20Icon.png" alt="Apple App Store" width="150" />
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-apps footer-apps-desktop">
  <h2 className="footer-info-heading">Follow Us on Social Media</h2>
  <ul>
    <li>
      <a href="https://www.facebook.com" className="contact-links" target="_blank" rel="noopener noreferrer">
        <FaFacebook size={35} />
      </a>
    </li>
    <li>
      <a href="https://www.instagram.com" className="contact-links" target="_blank" rel="noopener noreferrer">
        <FaInstagram size={35} /> 
      </a>
    </li>
    <li>
      <a href="https://www.linkedin.com" className="contact-links" target="_blank" rel="noopener noreferrer">
        <FaLinkedin size={35} />
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
      <div className="flex gap-8">
        <Locale />
        <div className="flex gap-6" id="payment-icons">
          {paymentIcons}
        </div>
      </div>
    </section>
  </footer>
);

Footer.displayName = 'Footer';

export { Footer };
