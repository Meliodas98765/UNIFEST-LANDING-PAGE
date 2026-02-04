import { useLocation, useNavigate } from 'react-router-dom';
import { Check, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ThankYou() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get data from location state (passed during navigation)
  const productName = location.state?.productName || '';
  const email = location.state?.email || '';
  const phone = location.state?.phone || '';

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8">
        {/* Success Icon and Title */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-semibold text-green-600 text-center">
            Lead Created Successfully!
          </h1>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <p className="text-center text-slate-600">
            Thank you for your interest! We've received your pre-booking request and will contact you soon.
          </p>

          {productName && (
            <div className="bg-slate-50 rounded-lg p-4 text-left">
              <p className="text-sm text-slate-500 mb-2">Selected Product</p>
              <p className="font-medium text-brand-green">{productName}</p>
            </div>
          )}

          {(email || phone) && (
            <p className="text-sm text-slate-500 text-center">
              Our team will reach out to you at{' '}
              {email && <strong>{email}</strong>}
              {email && phone && ' or '}
              {phone && <strong>+91 {phone}</strong>} to complete your booking.
            </p>
          )}

          <Button
            onClick={() => window.open('https://shop.unicornstore.in/', '_blank')}
            className="w-full bg-brand-green hover:bg-[#5fa038] text-white py-3 rounded-xl"
          >
            Visit Store
          </Button>
          <Button
            variant="outline"
            onClick={handleBack}
            className="w-full border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 [&_svg]:text-slate-700 [&_svg]:hover:text-slate-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
      </div>
    </div>
  );
}
