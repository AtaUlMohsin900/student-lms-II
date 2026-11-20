import Link from 'next/link';
import { Rocket, ArrowLeft } from 'lucide-react';
import { GLOBAL_CONSTANTS } from '@/constants';

const PAGE_NAMES: Record<string, string> = {
  'how-it-works': 'How It Works',
  'careers': 'Careers',
  'blog': 'Blog',
};

export const metadata = {
  title: 'Coming Soon | LearnHub',
  description: 'This page is under construction. Check back soon!',
};

export default async function ComingSoonPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const slugKey = slug?.[0] ?? '';
  const pageName = slugKey ? (PAGE_NAMES[slugKey] ?? slugKey.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')) : 'This page';

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 flex items-center justify-center">
      <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors absolute top-8 left-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center animate-pulse">
          <Rocket className="w-12 h-12 text-white" />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Coming Soon
        </h1>
        <p className="text-xl text-gray-600 mb-2">
          {pageName} is under construction
        </p>
        <p className="text-gray-500 mb-10">
          We&apos;re working hard to bring you something great. Check back soon!
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
        >
          Back to {GLOBAL_CONSTANTS.PLATFORM_NAME}
        </Link>
      </div>
    </main>
  );
}
