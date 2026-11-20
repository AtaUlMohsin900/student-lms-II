import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowLeft } from 'lucide-react';
import { GLOBAL_CONSTANTS } from '@/constants';

export const metadata = {
  title: 'Contact Us | LearnHub',
  description: 'Get in touch with the LearnHub team. We\'re here to help with any questions.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Contact Us
        </h1>
        <p className="text-gray-600 mb-12">
          Have a question or need help? We&apos;d love to hear from you.
        </p>

        <div className="grid gap-6 md:grid-cols-3 mb-12">
          <a
            href={`mailto:${GLOBAL_CONSTANTS.CONTACT.EMAIL}`}
            className="flex flex-col items-center p-6 rounded-xl border border-gray-200 bg-white hover:border-blue-300 hover:shadow-md transition-all text-center"
          >
            <Mail className="w-10 h-10 text-blue-600 mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
            <span className="text-gray-600 text-sm">{GLOBAL_CONSTANTS.CONTACT.EMAIL}</span>
          </a>

          <a
            href={`tel:${GLOBAL_CONSTANTS.CONTACT.PHONE.replace(/\s/g, '')}`}
            className="flex flex-col items-center p-6 rounded-xl border border-gray-200 bg-white hover:border-blue-300 hover:shadow-md transition-all text-center"
          >
            <Phone className="w-10 h-10 text-purple-600 mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
            <span className="text-gray-600 text-sm">{GLOBAL_CONSTANTS.CONTACT.PHONE}</span>
          </a>

          <div className="flex flex-col items-center p-6 rounded-xl border border-gray-200 bg-white text-center">
            <MapPin className="w-10 h-10 text-amber-500 mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Address</h3>
            <span className="text-gray-600 text-sm">{GLOBAL_CONSTANTS.CONTACT.ADDRESS}</span>
          </div>
        </div>

        <div className="p-6 rounded-xl bg-blue-50 border border-blue-100">
          <p className="text-gray-700">
            For detailed help, FAQs, and support resources, visit our{' '}
            <Link href="/support" className="text-blue-600 hover:underline font-medium">
              Support page
            </Link>.
          </p>
        </div>
      </div>
    </main>
  );
}
