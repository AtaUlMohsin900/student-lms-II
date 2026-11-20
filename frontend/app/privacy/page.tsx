import Link from 'next/link';
import { Shield, ArrowLeft } from 'lucide-react';
import { GLOBAL_CONSTANTS } from '@/constants';

export const metadata = {
  title: 'Privacy Policy | LearnHub',
  description: 'Learn how LearnHub collects, uses, and protects your personal information.',
};

export default function PrivacyPage() {
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
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center">
            <Shield className="w-9 h-9 text-white" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Privacy Policy
            </h1>
            <p className="text-gray-600 mt-1">
              Last updated: {new Date().toLocaleDateString('en-IN')}
            </p>
          </div>
        </div>

        <div className="prose prose-lg max-w-none space-y-8 text-gray-600">
          <section>
            <h2 className="text-xl font-semibold text-gray-900">1. Introduction</h2>
            <p className="leading-relaxed mt-3">
              {GLOBAL_CONSTANTS.PLATFORM_NAME} (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">2. Information We Collect</h2>
            <p className="leading-relaxed mt-3">
              We may collect the following types of information:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Account Information:</strong> Name, email address, password, profile picture, and phone number when you register.</li>
              <li><strong>Payment Information:</strong> Billing details processed securely through our payment provider. We do not store full card numbers.</li>
              <li><strong>Usage Data:</strong> Course progress, learning activity, and interaction with our platform.</li>
              <li><strong>Device Information:</strong> IP address, browser type, and device identifiers for security and analytics.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">3. How We Use Your Information</h2>
            <p className="leading-relaxed mt-3">
              We use your information to:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Provide, maintain, and improve our services</li>
              <li>Process payments and send transaction confirmations</li>
              <li>Send important updates about your account and courses</li>
              <li>Respond to your support requests</li>
              <li>Analyze usage to improve user experience</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">4. Data Sharing</h2>
            <p className="leading-relaxed mt-3">
              We do not sell your personal information. We may share data with:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Service Providers:</strong> Payment processors (Razorpay), cloud hosting, and analytics tools under strict agreements.</li>
              <li><strong>Instructors:</strong> Limited course-related data (e.g., enrollment status) to instructors whose courses you take.</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">5. Data Security</h2>
            <p className="leading-relaxed mt-3">
              We implement industry-standard security measures including encryption, secure authentication, 
              and regular security audits to protect your data from unauthorized access.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">6. Your Rights</h2>
            <p className="leading-relaxed mt-3">
              You have the right to access, correct, or delete your personal data. You can update your profile 
              in account settings or contact us at {GLOBAL_CONSTANTS.CONTACT.EMAIL} for data-related requests.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">7. Contact Us</h2>
            <p className="leading-relaxed mt-3">
              For privacy-related questions, contact us at{' '}
              <a href={`mailto:${GLOBAL_CONSTANTS.CONTACT.EMAIL}`} className="text-blue-600 hover:underline">
                {GLOBAL_CONSTANTS.CONTACT.EMAIL}
              </a>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
