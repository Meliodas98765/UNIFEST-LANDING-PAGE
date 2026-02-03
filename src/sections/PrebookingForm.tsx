import { useState, useMemo } from 'react';
import { Smartphone, Tablet, Laptop, Watch, Headphones, ChevronRight, Check, User, Mail, Phone, MapPin, Loader2, ArrowLeft, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { createLeadInCRM, getUTMParameters } from '@/lib/crm';
import { watches, airpods } from '@/data';
import { isWatchVariant, isAirPodsVariant } from '@/data/types';


interface ProductData {
  category: string;
  product: string;
  storage: string;
  size: string;
  finish: string;
  color: string;
}

interface UserDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  expectedVisitDate: string;
}


const categories = [
  { id: 'iphone', label: 'iPhone', icon: Smartphone },
  { id: 'ipad', label: 'iPad', icon: Tablet },
  { id: 'macbook', label: 'MacBook', icon: Laptop },
  { id: 'watch', label: 'Apple Watch', icon: Watch },
  { id: 'airpods', label: 'AirPods', icon: Headphones },
];

const products: Record<string, string[]> = {
  iphone: ['iPhone 15', 'iPhone 16e', 'iPhone 16', 'iPhone 16 Plus', 'iPhone 17', 'iPhone 17 Air', 'iPhone 17 Pro', 'iPhone 17 Pro Max'],
  ipad: ['iPad Pro 11"', 'iPad Pro 13"', 'iPad Air', 'iPad mini', 'iPad'],
  macbook: ['MacBook Air 13" M2', 'MacBook Air 13" M4', 'MacBook Air 15" M4'],
  watch: ['Apple Watch Ultra 3', 'Apple Watch Series 11 GPS + Cellular', 'Apple Watch Series 11 GPS', 'Apple Watch Series 11 GPS + Cellular (Aluminium)'],
  airpods: ['AirPods (3rd generation)', 'AirPods (2nd generation)', 'AirPods 4', 'AirPods Pro (2nd generation)', 'AirPods Pro 3'],
};

const storageOptions: Record<string, string[]> = {
  'iPhone 15': ['128GB', '256GB'],
  'iPhone 16e': ['128GB', '256GB'],
  'iPhone 16': ['128GB', '256GB'],
  'iPhone 16 Plus': ['128GB', '256GB'],
  'iPhone 17': ['256GB', '512GB'],
  'iPhone 17 Air': ['256GB', '512GB', '1TB'],
  'iPhone 17 Pro': ['256GB', '512GB', '1TB'],
  'iPhone 17 Pro Max': ['256GB', '512GB', '1TB', '2TB'],
  'iPad Pro 11"': ['256GB', '512GB', '1TB', '2TB'],
  'iPad Pro 13"': ['256GB', '512GB', '1TB', '2TB'],
  'iPad Air': ['128GB', '256GB', '512GB', '1TB'],
  'iPad mini': ['128GB', '256GB', '512GB'],
  'iPad': ['128GB', '256GB', '512GB'],
  'MacBook Air 13" M2': ['256GB'],
  'MacBook Air 13" M4': ['256GB', '512GB'],
  'MacBook Air 15" M4': ['256GB', '512GB'],
};

const finishOptions: Record<string, string[]> = {
  'iPhone 15': ['Black', 'Blue', 'Green', 'Yellow', 'Pink'],
  'iPhone 16e': ['Black', 'White'],
  'iPhone 16': ['Black', 'White', 'Pink', 'Teal', 'Ultramarine'],
  'iPhone 16 Plus': ['Black', 'White', 'Pink', 'Teal', 'Ultramarine'],
  'iPhone 17': ['Black', 'White', 'Pink', 'Teal', 'Ultramarine'],
  'iPhone 17 Air': ['Space Black'],
  'iPhone 17 Pro': ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium'],
  'iPhone 17 Pro Max': ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium'],
  'iPad Pro 11"': ['Space Black', 'Silver'],
  'iPad Pro 13"': ['Space Black', 'Silver'],
  'iPad Air': ['Space Grey', 'Blue', 'Purple', 'Starlight'],
  'iPad mini': ['Space Grey', 'Pink', 'Purple', 'Starlight'],
  'iPad': ['Blue', 'Pink', 'Yellow', 'Silver'],
  'MacBook Air 13" M2': ['Midnight', 'Starlight', 'Space Grey', 'Silver'],
  'MacBook Air 13" M4': ['Midnight', 'Starlight', 'Space Grey', 'Silver', 'Sky Blue'],
  'MacBook Air 15" M4': ['Midnight', 'Starlight', 'Space Grey', 'Silver', 'Sky Blue'],
};

// Helper function to get size options for a watch product
const getWatchSizeOptions = (productName: string): string[] => {
  const product = watches.products.find(p => p.model === productName);
  if (!product) return [];
  
  const sizes = new Set<string>();
  product.variants.forEach(variant => {
    if (isWatchVariant(variant)) {
      sizes.add(variant.size);
    }
  });
  return Array.from(sizes).sort();
};

// Helper function to get color options for a watch product (after size is selected)
const getWatchColorOptions = (productName: string, size: string): string[] => {
  const product = watches.products.find(p => p.model === productName);
  if (!product) return [];
  
  const colors = new Set<string>();
  product.variants.forEach(variant => {
    if (isWatchVariant(variant) && variant.size === size) {
      colors.add(variant.color);
    }
  });
  return Array.from(colors).sort();
};

// Helper function to get color options for an AirPods product
const getAirPodsColorOptions = (productName: string): string[] => {
  const product = airpods.products.find(p => p.model === productName);
  if (!product) return [];
  
  const colors = new Set<string>();
  product.variants.forEach(variant => {
    if (isAirPodsVariant(variant)) {
      colors.add(variant.color);
    }
  });
  return Array.from(colors).sort();
};


export function PrebookingForm() {
  const [step, setStep] = useState(1);
  const [productData, setProductData] = useState<ProductData>({
    category: '',
    product: '',
    storage: '',
    size: '',
    finish: '',
    color: '',
  });
  const [userDetails, setUserDetails] = useState<UserDetails>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    expectedVisitDate: '',
  });
  const [showStatusDialog, setShowStatusDialog] = useState(false);
  const [leadCreationStatus, setLeadCreationStatus] = useState<'idle' | 'creating' | 'success' | 'failed'>('idle');
  const [leadCreationError, setLeadCreationError] = useState<string>('');
  const [leadId, setLeadId] = useState<string>('');


  const handleCategorySelect = (categoryId: string) => {
    setProductData({
      category: categoryId,
      product: '',
      storage: '',
      size: '',
      finish: '',
      color: '',
    });
  };

  const handleProductSelect = (product: string) => {
    setProductData({
      ...productData,
      product,
      storage: '',
      size: '',
      finish: '',
      color: '',
    });
  };

  const handleStorageSelect = (storage: string) => {
    setProductData({
      ...productData,
      storage,
      finish: '',
    });
  };

  const handleSizeSelect = (size: string) => {
    setProductData({
      ...productData,
      size,
      color: '',
    });
  };

  const handleFinishSelect = (finish: string) => {
    setProductData({
      ...productData,
      finish,
    });
  };

  const handleColorSelect = (color: string) => {
    setProductData({
      ...productData,
      color,
    });
  };

  const handleUserDetailsChange = (field: keyof UserDetails, value: string) => {
    setUserDetails({
      ...userDetails,
      [field]: value,
    });
  };

  // Determine if category needs storage, size, or neither
  const needsStorage = useMemo(() => {
    return productData.category === 'iphone' || productData.category === 'ipad' || productData.category === 'macbook';
  }, [productData.category]);

  const needsSize = useMemo(() => {
    return productData.category === 'watch';
  }, [productData.category]);

  // Validation for continue button
  const canContinueProduct = useMemo(() => {
    if (!productData.category || !productData.product) return false;
    
    if (productData.category === 'watch') {
      return productData.size && productData.color;
    } else if (productData.category === 'airpods') {
      return productData.color;
    } else {
      return productData.storage && productData.finish;
    }
  }, [productData]);

  const canContinueDetails =
    userDetails.firstName.trim() &&
    userDetails.lastName.trim() &&
    userDetails.email.trim() &&
    userDetails.phone.trim() &&
    userDetails.phone.length >= 10;

  // Create lead in CRM and show success message
  const handleContinueToPayment = async () => {
    if (!canContinueDetails) {
      return;
    }

    setLeadCreationStatus('creating');
    setLeadCreationError('');

    try {
      // Format product name for CRM (itemName is the unique field)
      let itemName = '';
      if (productData.category === 'watch') {
        itemName = `${productData.product} ${productData.size} - ${productData.color}`;
      } else if (productData.category === 'airpods') {
        itemName = `${productData.product} - ${productData.color}`;
      } else {
        itemName = `${productData.product} ${productData.storage} - ${productData.finish}`;
      }

      // Extract UTM parameters from URL
      const utmParams = getUTMParameters();

      const result = await createLeadInCRM({
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        phone: userDetails.phone,
        mobile: userDetails.phone,
        email: userDetails.email,
        itemName: itemName,
        expectedVisitDate: userDetails.expectedVisitDate || undefined,
        leadSource: 'TeleCHAMP',
        campaignName: 'LANDING PAGE PAY',
        leadCampaignName: 'LANDING PAGE PAY',
        adName: 'LANDING PAGE PAY',
        ...utmParams,
      });

      if (result.success) {
        setLeadCreationStatus('success');
        setLeadId(result.leadId || '');
        // Show success dialog
        setShowStatusDialog(true);
      } else {
        setLeadCreationStatus('failed');
        setLeadCreationError(result.message || 'Failed to create lead. Please try again.');
      }
    } catch (error) {
      setLeadCreationStatus('failed');
      setLeadCreationError(error instanceof Error ? error.message : 'An unexpected error occurred');
    }
  };


  // Reset form
  const resetForm = () => {
    setStep(1);
    setProductData({
      category: '',
      product: '',
      storage: '',
      size: '',
      finish: '',
      color: '',
    });
    setUserDetails({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      pincode: '',
      expectedVisitDate: '',
    });
    setShowStatusDialog(false);
    setLeadCreationStatus('idle');
    setLeadCreationError('');
    setLeadId('');
  };

  // Render Step Indicator
  const renderStepIndicator = () => (
    <div className="flex items-center justify-center px-6 md:px-10 py-6 border-b border-slate-100 gap-6">
      <div className="flex items-center gap-2">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${step >= 1 ? 'bg-brand-green text-white' : 'bg-slate-100 text-slate-400'
          }`}>
          {step > 1 ? <Check className="w-4 h-4" /> : '1'}
        </div>
        <span className={`text-sm font-medium ${step >= 1 ? 'text-brand-green' : 'text-slate-400'}`}>
          Product
        </span>
      </div>
      <div className="h-px bg-slate-100 w-8" />
      <div className="flex items-center gap-2">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${step >= 2 ? 'bg-brand-green text-white' : 'bg-slate-100 text-slate-400'
          }`}>
          {step > 2 ? <Check className="w-4 h-4" /> : '2'}
        </div>
        <span className={`text-sm font-medium ${step >= 2 ? 'text-brand-green' : 'text-slate-400'}`}>
          Details
        </span>
      </div>
    </div>
  );

  // Render Product Selection Step
  const renderProductStep = () => (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
          Choose Your Product
        </h3>
        <p className="text-slate-500 text-sm">
          Select detailed options to unlock offers.
        </p>
      </div>

      {/* Category Selection */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
          Category
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategorySelect(category.id)}
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border transition-all duration-200 ${productData.category === category.id
                ? 'border-brand-green bg-brand-green text-white shadow-sm'
                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                }`}
            >
              <category.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{category.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Product Selection */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
          Product
        </label>
        <select
          value={productData.product}
          onChange={(e) => handleProductSelect(e.target.value)}
          disabled={!productData.category}
          className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed"
        >
          <option value="">Select Product</option>
          {productData.category && products[productData.category]?.map((product) => (
            <option key={product} value={product}>{product}</option>
          ))}
        </select>
      </div>

      {/* Storage Selection (for iPhone, iPad, MacBook) */}
      {needsStorage && (
        <div className="mb-6">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
            Storage
          </label>
          {productData.product ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {storageOptions[productData.product]?.map((storage) => (
                <button
                  key={storage}
                  onClick={() => handleStorageSelect(storage)}
                  className={`px-4 py-3 rounded-lg border transition-all duration-200 ${productData.storage === storage
                    ? 'border-brand-green bg-brand-green text-white shadow-sm'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                >
                  <span className="text-sm font-medium">{storage}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="px-4 py-3 rounded-lg border border-slate-100 bg-slate-50 text-slate-400 text-sm">
              Select a product first
            </div>
          )}
        </div>
      )}

      {/* Size Selection (for Watch) */}
      {needsSize && (
        <div className="mb-6">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
            Size
          </label>
          {productData.product ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {getWatchSizeOptions(productData.product).map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeSelect(size)}
                  className={`px-4 py-3 rounded-lg border transition-all duration-200 ${productData.size === size
                    ? 'border-brand-green bg-brand-green text-white shadow-sm'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                >
                  <span className="text-sm font-medium">{size}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="px-4 py-3 rounded-lg border border-slate-100 bg-slate-50 text-slate-400 text-sm">
              Select a product first
            </div>
          )}
        </div>
      )}

      {/* Finish Selection (for iPhone, iPad, MacBook) */}
      {needsStorage && (
        <div className="mb-8">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
            Preferred Finish
          </label>
          {productData.storage ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {finishOptions[productData.product]?.map((finish) => (
                <button
                  key={finish}
                  onClick={() => handleFinishSelect(finish)}
                  className={`px-4 py-3 rounded-lg border transition-all duration-200 ${productData.finish === finish
                    ? 'border-brand-green bg-brand-green text-white shadow-sm'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                >
                  <span className="text-sm font-medium">{finish}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="px-4 py-3 rounded-lg border border-slate-100 bg-slate-50 text-slate-400 text-sm">
              Select storage first
            </div>
          )}
        </div>
      )}

      {/* Colour Selection (for Watch) */}
      {needsSize && (
        <div className="mb-8">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
            Colour
          </label>
          {productData.size ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {getWatchColorOptions(productData.product, productData.size).map((color) => (
                <button
                  key={color}
                  onClick={() => handleColorSelect(color)}
                  className={`px-4 py-3 rounded-lg border transition-all duration-200 ${productData.color === color
                    ? 'border-brand-green bg-brand-green text-white shadow-sm'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                >
                  <span className="text-sm font-medium">{color}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="px-4 py-3 rounded-lg border border-slate-100 bg-slate-50 text-slate-400 text-sm">
              Select size first
            </div>
          )}
        </div>
      )}

      {/* Colour Selection (for AirPods) */}
      {productData.category === 'airpods' && (
        <div className="mb-8">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
            Colour
          </label>
          {productData.product ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {getAirPodsColorOptions(productData.product).map((color) => (
                <button
                  key={color}
                  onClick={() => handleColorSelect(color)}
                  className={`px-4 py-3 rounded-lg border transition-all duration-200 ${productData.color === color
                    ? 'border-brand-green bg-brand-green text-white shadow-sm'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                >
                  <span className="text-sm font-medium">{color}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="px-4 py-3 rounded-lg border border-slate-100 bg-slate-50 text-slate-400 text-sm">
              Select a product first
            </div>
          )}
        </div>
      )}

      {/* Continue Button */}
      <Button
        disabled={!canContinueProduct}
        onClick={() => setStep(2)}
        className="w-full bg-brand-green hover:bg-[#5fa038] text-white py-4 rounded-lg text-base font-semibold disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed transition-all duration-300"
      >
        Continue to Details
        <ChevronRight className="w-5 h-5 ml-2" />
      </Button>
    </div>
  );

  // Render User Details Step
  const renderDetailsStep = () => (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
          Enter Your Details
        </h3>
        <p className="text-slate-500 text-sm">
          We'll use this information for your pre-booking and GST invoice.
        </p>
      </div>

      {/* Selected Product Summary */}
      <div className="bg-slate-50 rounded-xl p-4 mb-6">
        <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">Selected Product</p>
        <p className="font-medium text-slate-900">
          {productData.category === 'watch' 
            ? `${productData.product} ${productData.size} - ${productData.color}`
            : productData.category === 'airpods'
            ? `${productData.product} - ${productData.color}`
            : `${productData.product} ${productData.storage} - ${productData.finish}`
          }
        </p>
      </div>

      {/* Name Fields */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <Label htmlFor="firstName" className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">
            First Name *
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              id="firstName"
              value={userDetails.firstName}
              onChange={(e) => handleUserDetailsChange('firstName', e.target.value)}
              placeholder="John"
              className="pl-10 py-3 rounded-lg border-slate-200 focus:ring-2 focus:ring-brand-green"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="lastName" className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">
            Last Name *
          </Label>
          <Input
            id="lastName"
            value={userDetails.lastName}
            onChange={(e) => handleUserDetailsChange('lastName', e.target.value)}
            placeholder="Doe"
            className="py-3 rounded-lg border-slate-200 focus:ring-2 focus:ring-brand-green"
          />
        </div>
      </div>

      {/* Email */}
      <div className="mb-4">
        <Label htmlFor="email" className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">
          Email Address *
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            id="email"
            type="email"
            value={userDetails.email}
            onChange={(e) => handleUserDetailsChange('email', e.target.value)}
            placeholder="john.doe@example.com"
            className="pl-10 py-3 rounded-xl border-slate-200 focus:ring-2 focus:ring-brand-dark"
          />
        </div>
      </div>

      {/* Phone */}
      <div className="mb-4">
        <Label htmlFor="phone" className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">
          Phone Number *
        </Label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            id="phone"
            type="tel"
            value={userDetails.phone}
            onChange={(e) => handleUserDetailsChange('phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
            placeholder="9876543210"
            className="pl-10 py-3 rounded-xl border-slate-200 focus:ring-2 focus:ring-brand-dark"
          />
        </div>
      </div>

      {/* Address */}
      <div className="mb-4">
        <Label htmlFor="address" className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">
          Address
        </Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
          <Input
            id="address"
            value={userDetails.address}
            onChange={(e) => handleUserDetailsChange('address', e.target.value)}
            placeholder="Your address"
            className="pl-10 py-3 rounded-xl border-slate-200 focus:ring-2 focus:ring-brand-dark"
          />
        </div>
      </div>

      {/* City & Pincode */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <Label htmlFor="city" className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">
            City
          </Label>
          <Input
            id="city"
            value={userDetails.city}
            onChange={(e) => handleUserDetailsChange('city', e.target.value)}
            placeholder="Gurugram"
            className="py-3 rounded-lg border-slate-200 focus:ring-2 focus:ring-brand-green"
          />
        </div>
        <div>
          <Label htmlFor="pincode" className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">
            Pincode
          </Label>
          <Input
            id="pincode"
            value={userDetails.pincode}
            onChange={(e) => handleUserDetailsChange('pincode', e.target.value.replace(/\D/g, '').slice(0, 6))}
            placeholder="122009"
            className="py-3 rounded-lg border-slate-200 focus:ring-2 focus:ring-brand-green"
          />
        </div>
      </div>

      {/* Expected Visit Date */}
      <div className="mb-8">
        <Label htmlFor="expectedVisitDate" className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">
          Expected Visit Date
        </Label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            id="expectedVisitDate"
            type="date"
            value={userDetails.expectedVisitDate}
            onChange={(e) => handleUserDetailsChange('expectedVisitDate', e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="pl-10 py-3 rounded-xl border-slate-200 focus:ring-2 focus:ring-brand-dark"
          />
        </div>
      </div>

      {/* Lead Creation Error Message */}
      {leadCreationStatus === 'failed' && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-sm text-red-600 font-medium mb-1">Failed to Create Lead</p>
          <p className="text-xs text-red-500">{leadCreationError}</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setLeadCreationStatus('idle');
              setLeadCreationError('');
            }}
            className="mt-2 text-xs"
          >
            Try Again
          </Button>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-4">
        <Button
          variant="outline"
          onClick={() => setStep(1)}
          disabled={leadCreationStatus === 'creating'}
          className="flex-1 py-4 rounded-lg text-base font-medium border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </Button>
        <Button
          disabled={!canContinueDetails || leadCreationStatus === 'creating'}
          onClick={handleContinueToPayment}
          className="flex-1 bg-brand-green hover:bg-[#5fa038] text-white py-4 rounded-lg text-base font-semibold disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed transition-all duration-300"
        >
          {leadCreationStatus === 'creating' ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Creating Lead...
            </>
          ) : (
            <>
              Submit
              <ChevronRight className="w-5 h-5 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  );

  // Render Success Dialog
  const renderStatusDialog = () => (
    <Dialog open={showStatusDialog} onOpenChange={setShowStatusDialog}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {leadCreationStatus === 'success' ? (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <span className="text-2xl font-semibold text-green-600">Lead Created Successfully!</span>
              </div>
            ) : null}
          </DialogTitle>
        </DialogHeader>
        {leadCreationStatus === 'success' ? (
          <div className="space-y-4 pt-4">
            <DialogDescription className="text-center text-slate-600">
              Thank you for your interest! We've received your pre-booking request and will contact you soon.
            </DialogDescription>
            {leadId && (
              <div className="bg-slate-50 rounded-lg p-4 text-left">
                <p className="text-sm text-slate-500 mb-1">Lead ID</p>
                <p className="font-medium text-brand-green mb-3">{leadId}</p>
              </div>
            )}
            <div className="bg-slate-50 rounded-lg p-4 text-left">
              <p className="text-sm text-slate-500 mb-2">Selected Product</p>
              <p className="font-medium text-brand-green">
                {productData.category === 'watch' 
                  ? `${productData.product} ${productData.size} - ${productData.color}`
                  : productData.category === 'airpods'
                  ? `${productData.product} - ${productData.color}`
                  : `${productData.product} ${productData.storage} - ${productData.finish}`
                }
              </p>
            </div>
            <p className="text-sm text-slate-500 text-center">
              Our team will reach out to you at <strong>{userDetails.email}</strong> or <strong>+91 {userDetails.phone}</strong> to complete your booking.
            </p>
            <Button
              onClick={resetForm}
              className="w-full bg-brand-green hover:bg-[#5fa038] text-white py-3 rounded-xl"
            >
              Pre-book Another Product
            </Button>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );

  return (
    <section id="prebooking-form" className="w-full bg-slate-50 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side: Form */}
          <div className="w-full order-last lg:order-first">
            <div className="bg-white rounded-2xl shadow-lg border-2 border-slate-200 overflow-hidden">
              {renderStepIndicator()}

              {/* Form Content */}
              <div className="p-6 md:p-10">
                {step === 1 && renderProductStep()}
                {step === 2 && renderDetailsStep()}
              </div>
            </div>
          </div>

          {/* Right Side: Image */}
          <div className="w-full order-first lg:order-last">
            <div className="relative w-full h-full min-h-[250px] lg:min-h-[400px] flex items-center justify-center">
              <img
                src="/right_form_image.webp"
                alt="UniFest Apple Products"
                className="w-full max-w-xs lg:max-w-sm h-auto object-contain rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      {renderStatusDialog()}
    </section>
  );
}
