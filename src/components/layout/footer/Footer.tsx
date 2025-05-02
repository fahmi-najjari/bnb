import React from 'react';
import { Building, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Support',
      links: ['Help Center', 'Safety Information', 'Cancellation Options', 'COVID-19 Resources'],
    },
    {
      title: 'Community',
      links: ['Diversity & Belonging', 'Accessibility', 'Referrals', 'Forum'],
    },
    {
      title: 'Hosting',
      links: ['Host Your Home', 'Responsible Hosting', 'Host Experiences', 'Resource Center'],
    },
    {
      title: 'About',
      links: ['Newsroom', 'Careers', 'Investors', 'Contact Us'],
    },
  ];

  return (
    <footer className="bg-gray-100 dark:bg-slate-900 pt-12 pb-8 text-gray-700 dark:text-gray-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((text) => (
                  <li key={text}>
                    <a href="#" className="hover:text-cyan-600 transition-colors">
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="my-8 border-gray-200 dark:border-gray-700" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Building className="h-6 w-6 text-cyan-600" />
            <span className="ml-2 text-lg font-bold text-gray-900 dark:text-white">MonthStay</span>
          </div>

          <div className="flex items-center space-x-4">
            {[Facebook, Twitter, Instagram].map((Icon, i) => (
              <a key={i} href="#" className="hover:text-cyan-600 transition-colors">
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center text-sm">
          <p>&copy; {currentYear} MonthStay, Inc. All rights reserved.</p>
          <div className="flex justify-center mt-2 space-x-4">
            {['Privacy', 'Terms', 'Sitemap'].map((link) => (
              <a key={link} href="#" className="hover:text-cyan-600 transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
