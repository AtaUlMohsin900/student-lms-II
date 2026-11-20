import Link from 'next/link';
import { HelpCircle, Mail, MessageCircle, BookOpen, ArrowLeft } from 'lucide-react';
import { GLOBAL_CONSTANTS } from '@/constants';

export const metadata = {
  title: 'Support | LearnHub',
  description: 'Get help and support from the LearnHub team. Find answers, contact us, or browse our resources.',
};

export default function SupportPage() {
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

        <div className="flex items-center gap-4 mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center">
            <HelpCircle className="w-9 h-9 text-white" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Support & Help
            </h1>
            <p className="text-gray-600 mt-1">
              We&apos;re here to help you succeed
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-12">
          <a
            href={`mailto:${GLOBAL_CONSTANTS.CONTACT.EMAIL}`}
            className="block p-6 rounded-xl border border-gray-200 bg-white hover:border-blue-300 hover:shadow-md transition-all"
          >
            <Mail className="w-10 h-10 text-blue-600 mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
            <p className="text-gray-600 text-sm mb-2">
              Send us an email and we&apos;ll get back to you within 24–48 hours.
            </p>
            <span className="text-blue-600 font-medium">{GLOBAL_CONSTANTS.CONTACT.EMAIL}</span>
          </a>

          <a
            href={`tel:${GLOBAL_CONSTANTS.CONTACT.PHONE.replace(/\s/g, '')}`}
            className="block p-6 rounded-xl border border-gray-200 bg-white hover:border-blue-300 hover:shadow-md transition-all"
          >
            <MessageCircle className="w-10 h-10 text-purple-600 mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Phone Support</h3>
            <p className="text-gray-600 text-sm mb-2">
              Call us for urgent queries. Available Mon–Fri, 9 AM–6 PM.
            </p>
            <span className="text-purple-600 font-medium">{GLOBAL_CONSTANTS.CONTACT.PHONE}</span>
          </a>
        </div>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-amber-500" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-white border border-gray-200">
              <h4 className="font-medium text-gray-900">How do I enroll in a course?</h4>
              <p className="text-gray-600 text-sm mt-2">
                Browse our courses, select one you like, and click &quot;Enroll Now&quot;. You&apos;ll need to sign in or create an account first.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-white border border-gray-200">
              <h4 className="font-medium text-gray-900">How do I become an instructor?</h4>
              <p className="text-gray-600 text-sm mt-2">
                Sign up, complete the instructor onboarding form, and submit for approval. Our team reviews applications within 24–48 hours.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-white border border-gray-200">
              <h4 className="font-medium text-gray-900">What payment methods do you accept?</h4>
              <p className="text-gray-600 text-sm mt-2">
                We accept major credit/debit cards, UPI, and net banking through our secure payment partner Razorpay.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-white border border-gray-200">
              <h4 className="font-medium text-gray-900">How do I get my certificate?</h4>
              <p className="text-gray-600 text-sm mt-2">
                Complete all lessons in a course and click &quot;Complete Course&quot;. Your certificate will be generated and available in your Certificates section.
              </p>
            </div>
          </div>
        </section>

        <div className="mt-12 p-6 rounded-xl bg-blue-50 border border-blue-100">
          <p className="text-gray-700">
            <strong>Need more help?</strong> Reach out to us at{' '}
            <a href={`mailto:${GLOBAL_CONSTANTS.CONTACT.EMAIL}`} className="text-blue-600 hover:underline">
              {GLOBAL_CONSTANTS.CONTACT.EMAIL}
            </a>
            {' '}or visit our{' '}
            <Link href="/about" className="text-blue-600 hover:underline">About</Link>
            {' '}page to learn more about {GLOBAL_CONSTANTS.PLATFORM_NAME}.
          </p>
        </div>
      </div>
    </main>
  );
}
