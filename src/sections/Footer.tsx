import { Mail, Phone } from 'lucide-react';
import { useStoreConfig } from '@/hooks/use-store-config';

export function Footer() {
  const storeConfig = useStoreConfig();

  // Format phone number for tel: link (remove spaces and special characters except +)
  const phoneLink = storeConfig.contact.phone.replace(/\s/g, '');

  return (
    <footer className="w-full bg-white border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-10 md:gap-8">
          {/* Brand Info */}
          <div>
            <h3 className="text-xl font-semibold text-brand-dark mb-4">
              Unicorn Store
            </h3>
            <p className="text-slate-500 mb-4 leading-relaxed">
              Your premium destination for everything Apple. Experience the latest technology with exclusive launch benefits.
            </p>
            <div className="text-slate-500 text-sm">
              {storeConfig.address.line1 && <p>{storeConfig.address.line1}</p>}
              {storeConfig.address.line2 && <p>{storeConfig.address.line2}</p>}
              {storeConfig.address.line3 && <p>{storeConfig.address.line3}</p>}
              <p>{storeConfig.address.city}, {storeConfig.address.state} {storeConfig.address.pincode}</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-brand-dark mb-4">
              Contact
            </h3>
            <div className="space-y-3">
              <a
                href={`mailto:${storeConfig.contact.email}`}
                className="flex items-center gap-2 text-slate-500 hover:text-brand-dark transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>{storeConfig.contact.email}</span>
              </a>
              <a
                href={`tel:${phoneLink}`}
                className="flex items-center gap-2 text-slate-500 hover:text-brand-dark transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>{storeConfig.contact.phone}</span>
              </a>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold text-brand-dark mb-4">
              Legal
            </h3>
            <div className="space-y-3">
              <a
                href="#"
                className="block text-slate-500 hover:text-brand-dark transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="block text-slate-500 hover:text-brand-dark transition-colors"
              >
                Prebooking T&C
              </a>
              <a
                href="#"
                className="block text-slate-500 hover:text-brand-dark transition-colors"
              >
                Refund Policy
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-400">
            © 2026 Unicorn Infosolutions. All rights reserved.
          </p>
          <p className="text-sm text-slate-400 text-center md:text-right">
            Not affiliated with Apple Inc. All trademarks belong to their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
}
