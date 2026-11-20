import Link from 'next/link';
import { FileText, ArrowLeft } from 'lucide-react';
import { GLOBAL_CONSTANTS } from '@/constants';

export const metadata = {
  title: 'Terms of Service | LearnHub',
  description: 'Read the terms and conditions for using the LearnHub platform.',
};

export default function TermsPage() {
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
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl flex items-center justify-center">
            <FileText className="w-9 h-9 text-white" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Terms of Service
            </h1>
            <p className="text-gray-600 mt-1">
              Last updated: {new Date().toLocaleDateString('en-IN')}
            </p>
          </div>
        </div>

        <div className="prose prose-lg max-w-none space-y-8 text-gray-600">
          <section>
            <h2 className="text-xl font-semibold text-gray-900">1. Acceptance of Terms</h2>
            <p className="leading-relaxed mt-3">
              By accessing or using {GLOBAL_CONSTANTS.PLATFORM_NAME}, you agree to be bound by these Terms of Service. 
              If you do not agree, please do not use our platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">2. Use of the Platform</h2>
            <p className="leading-relaxed mt-3">
              You may use our platform to:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Browse and enroll in courses as a student</li>
              <li>Create and publish courses as an approved instructor</li>
              <li>Access learning materials, complete assignments, and earn certificates</li>
              <li>Manage your account and profile</li>
            </ul>
            <p className="leading-relaxed mt-3">
              You agree not to misuse the platform, including but not limited to: sharing account credentials, 
              copying course content without permission, or engaging in fraudulent activity.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">3. Account Responsibilities</h2>
            <p className="leading-relaxed mt-3">
              You are responsible for maintaining the confidentiality of your account and password. 
              You agree to provide accurate information and to notify us of any unauthorized access. 
              We reserve the right to suspend or terminate accounts that violate these terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">4. Payments and Refunds</h2>
            <p className="leading-relaxed mt-3">
              Course fees are charged at the time of enrollment. Refund policies may vary by course—please 
              check the course page before purchasing. We use secure payment processors and do not store 
              full payment card details on our servers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">5. Intellectual Property</h2>
            <p className="leading-relaxed mt-3">
              Course content is owned by instructors or {GLOBAL_CONSTANTS.PLATFORM_NAME}. You may not copy, 
              distribute, or create derivative works without explicit permission. Certificates issued are 
              for personal use and verification of completion only.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">6. Instructor Terms</h2>
            <p className="leading-relaxed mt-3">
              Instructors must provide original, accurate content and comply with our quality guidelines. 
              Platform fees apply to paid courses. Instructors are responsible for their course content 
              and student interactions within course forums.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">7. Limitation of Liability</h2>
            <p className="leading-relaxed mt-3">
              {GLOBAL_CONSTANTS.PLATFORM_NAME} is provided &quot;as is&quot;. We are not liable for indirect, incidental, 
              or consequential damages arising from your use of the platform. Our total liability is limited 
              to the amount you paid for the service in the past 12 months.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">8. Changes</h2>
            <p className="leading-relaxed mt-3">
              We may update these terms from time to time. We will notify you of significant changes via 
              email or a notice on the platform. Continued use after changes constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">9. Contact</h2>
            <p className="leading-relaxed mt-3">
              For questions about these terms, contact us at{' '}
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
