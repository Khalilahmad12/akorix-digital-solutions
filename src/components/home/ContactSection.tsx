import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Phone, 
  MessageSquare, 
  CheckCircle2, 
  Sparkles, 
  X, 
  ArrowRight,
  Clock,
  ShieldCheck,
  Linkedin,
  Instagram,
  Facebook
} from 'lucide-react';
import { ContactFormData } from '../../types';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface ContactSectionProps {
  initialMessage?: string;
  isOpenAsModal?: boolean;
  onCloseModal?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ 
  initialMessage = '', 
  isOpenAsModal = false,
  onCloseModal 
}) => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.08 });
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    phone: '',
    email: '',
    service: 'Web Development',
    message: initialMessage,
  });


  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
  }>({});

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialMessage) {
      setFormData(prev => ({ ...prev, message: initialMessage }));
    }
  }, [initialMessage]);

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; phone?: string; message?: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your phone number.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please provide a brief message about your project.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      service: 'Web Development',
      message: '',
    });
    setErrors({});
    setSubmitted(false);
  };

  const formElement = (
    <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow relative">
      {isOpenAsModal && onCloseModal && (
        <button
          onClick={onCloseModal}
          aria-label="Close Modal"
          className="absolute top-4 right-4 p-2 rounded-xl bg-stone-100 text-stone-500 hover:text-stone-950 hover:bg-stone-200 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {submitted ? (
        <div className="py-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 mx-auto flex items-center justify-center shadow-xs">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-bold text-stone-950">
              Message Sent Successfully!
            </h3>
            <p className="text-sm text-stone-600 max-w-md mx-auto">
              Thank you, <span className="font-semibold text-stone-900">{formData.name}</span>. We have received your project details and will get back to you within 24 hours.
            </p>
          </div>

          <div className="pt-4">
            <button
              type="button"
              onClick={handleReset}
              className="px-5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Send Another Inquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider">
                Your Name <span className="text-amber-600">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (errors.name) setErrors({ ...errors, name: undefined });
                }}
                placeholder="Your Name"
                className={`w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border text-xs sm:text-sm text-stone-900 font-medium placeholder-stone-400 focus:bg-white focus:outline-none transition-all ${
                  errors.name 
                    ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-200' 
                    : 'border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20'
                }`}
              />
              {errors.name && (
                <p className="text-[11px] text-rose-600 font-medium">{errors.name}</p>
              )}
            </div>

            {/* Phone Number Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider">
                Phone Number <span className="text-amber-600">*</span>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => {
                  setFormData({ ...formData, phone: e.target.value });
                  if (errors.phone) setErrors({ ...errors, phone: undefined });
                }}
                placeholder="Your Phone Number"
                className={`w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border text-xs sm:text-sm text-stone-900 font-medium placeholder-stone-400 focus:bg-white focus:outline-none transition-all ${
                  errors.phone 
                    ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-200' 
                    : 'border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20'
                }`}
              />
              {errors.phone && (
                <p className="text-[11px] text-rose-600 font-medium">{errors.phone}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider">
                Email Address <span className="text-amber-600">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: undefined });
                }}
                placeholder="Your Email Address"
                className={`w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border text-xs sm:text-sm text-stone-900 font-medium placeholder-stone-400 focus:bg-white focus:outline-none transition-all ${
                  errors.email 
                    ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-200' 
                    : 'border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20'
                }`}
              />
              {errors.email && (
                <p className="text-[11px] text-rose-600 font-medium">{errors.email}</p>
              )}
            </div>

            {/* Service Select Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider">
                Service Needed
              </label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm text-stone-900 font-medium focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all cursor-pointer"
              >
                <option value="Web Development">Web Development</option>
                <option value="E-Commerce">E-Commerce</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Mobile App Development">Mobile App Development</option>
                <option value="WordPress">WordPress</option>
                <option value="SEO & Digital Marketing">SEO & Digital Marketing</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Message Textarea */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider">
              Project Details <span className="text-amber-600">*</span>
            </label>
            <textarea
              rows={4}
              value={formData.message}
              onChange={(e) => {
                setFormData({ ...formData, message: e.target.value });
                if (errors.message) setErrors({ ...errors, message: undefined });
              }}
              placeholder="Tell us a little about your project..."
              className={`w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border text-xs sm:text-sm text-stone-900 font-medium placeholder-stone-400 focus:bg-white focus:outline-none transition-all resize-none ${
                errors.message 
                  ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-200' 
                  : 'border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20'
              }`}
            />
            {errors.message && (
              <p className="text-[11px] text-rose-600 font-medium">{errors.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm uppercase tracking-wider shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
          >
            <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500 pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Strict privacy assurance. We never share your contact details.</span>
          </div>

        </form>
      )}
    </div>
  );

  const contactInfoElement = (
    <div className="space-y-6">
      
      <div>
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-950 mb-2">
          Let’s Start a Conversation.
        </h3>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
          Reach out directly through any of our channels. Our team is ready to discuss your goals, explore solutions, and provide a clear plan forward.
        </p>
      </div>

      {/* Information Cards */}
      <div className="space-y-3">
        
        {/* Email Card */}
        <a 
          href="mailto:khalilahmad.developer.@gmail.com" 
          className="group flex items-start gap-3.5 p-4 rounded-xl bg-white border border-stone-200/90 hover:border-amber-400 hover:shadow-2xs transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0 group-hover:bg-amber-500 group-hover:text-stone-950 transition-colors">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500">Email</div>
            <div className="text-xs sm:text-sm font-bold text-stone-900 group-hover:text-amber-800 transition-colors break-all">
              khalilahmad.developer.@gmail.com
            </div>
            <div className="text-[11px] text-stone-500">We respond within 24 hours</div>
          </div>
        </a>

        {/* Phone Card */}
        <a 
          href="tel:03461764101" 
          className="group flex items-start gap-3.5 p-4 rounded-xl bg-white border border-stone-200/90 hover:border-amber-400 hover:shadow-2xs transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0 group-hover:bg-amber-500 group-hover:text-stone-950 transition-colors">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500">Phone</div>
            <div className="text-xs sm:text-sm font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
              03461764101
            </div>
            <div className="text-[11px] text-stone-500">Mon-Fri from 9am to 6pm EST</div>
          </div>
        </a>

        {/* WhatsApp Card */}
        <a 
          href="https://wa.me/03461764101" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group flex items-start gap-3.5 p-4 rounded-xl bg-white border border-stone-200/90 hover:border-amber-400 hover:shadow-2xs transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500">WhatsApp</div>
            <div className="text-xs sm:text-sm font-bold text-stone-900 group-hover:text-emerald-700 transition-colors">
              03461764101
            </div>
            <div className="text-[11px] text-stone-500">Instant messaging with our solutions desk</div>
          </div>
        </a>

        {/* Availability Status Card */}
        <div className="flex items-start gap-3.5 p-4 rounded-xl bg-stone-100/70 border border-stone-200">
          <div className="w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-stone-700 shrink-0">
            <Clock className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-700">
                Availability
              </span>
            </div>
            <div className="text-xs sm:text-sm font-bold text-stone-950">
              Available for new projects
            </div>
            <div className="text-[11px] text-stone-500">Q3 / Q4 project bookings currently open</div>
          </div>
        </div>

      </div>

      {/* Social Media Links */}
      <div className="pt-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
          Follow Us
        </h4>
        <div className="flex items-center gap-2.5">
          <a
            href="https://www.linkedin.com/company/akorix-digital-solutions"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="w-9 h-9 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-stone-600 hover:text-amber-800 hover:border-amber-400 hover:scale-105 transition-all shadow-2xs"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="https://www.instagram.com/akorixdigitalsolutions/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-9 h-9 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-stone-600 hover:text-amber-800 hover:border-amber-400 hover:scale-105 transition-all shadow-2xs"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a
            href="https://www.facebook.com/share/1D2aL18vHY/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="w-9 h-9 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-stone-600 hover:text-amber-800 hover:border-amber-400 hover:scale-105 transition-all shadow-2xs"
          >
            <Facebook className="w-4 h-4" />
          </a>
          <a
            href="https://wa.me/03461764101"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="w-9 h-9 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-stone-600 hover:text-emerald-700 hover:border-emerald-400 hover:scale-105 transition-all shadow-2xs"
          >
            <MessageSquare className="w-4 h-4" />
          </a>
        </div>
      </div>

    </div>
  );

  // If rendered as a standalone modal dialog
  if (isOpenAsModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs overflow-y-auto">
        <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl my-8">
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl border border-stone-200">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7">
                <div className="mb-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-xs font-semibold text-amber-900 mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                    <span className="tracking-wider uppercase text-[11px]">LET'S WORK TOGETHER</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-stone-950">
                    Have a Project in Mind?
                  </h2>
                </div>
                {formElement}
              </div>
              <div className="lg:col-span-5 pt-4 lg:pt-8">
                {contactInfoElement}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Standalone Homepage Section
  return (
    <section 
      id="contact" 
      ref={ref}
      className="py-14 sm:py-20 bg-stone-50 text-stone-900 border-t border-stone-200 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto space-y-2.5 mb-12 sm:mb-16 reveal-fade-up ${isVisible ? 'revealed' : ''}`}>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-xs font-semibold text-amber-900">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span className="tracking-wider uppercase text-[11px]">LET'S WORK TOGETHER</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-stone-950 leading-tight">
            Have a Project in Mind?
          </h2>

          <p className="text-sm sm:text-base text-stone-600 font-normal leading-relaxed max-w-2xl mx-auto">
            Tell us about your idea, and let’s discuss how we can turn it into a powerful digital solution.
          </p>
        </div>

        {/* Two-Column Layout: Left (Form) - Right (Contact Information) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
          
          {/* Left Column: Form */}
          <div className={`lg:col-span-7 reveal-card-left ${isVisible ? 'revealed' : ''}`} style={{ transitionDelay: '100ms' }}>
            {formElement}
          </div>

          {/* Right Column: Contact Info */}
          <div className={`lg:col-span-5 lg:pl-4 reveal-card-right ${isVisible ? 'revealed' : ''}`} style={{ transitionDelay: '180ms' }}>
            {contactInfoElement}
          </div>

        </div>

      </div>
    </section>
  );
};
