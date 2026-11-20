import Link from 'next/link';
import { GraduationCap, Target, Users, Award, ArrowLeft } from 'lucide-react';
import { GLOBAL_CONSTANTS } from '@/constants';

export const metadata = {
    title: 'About Us | LearnHub',
    description: 'Learn about LearnHub - our mission, vision, and commitment to transforming education.',
};

export default function AboutPage() {
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
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                        <GraduationCap className="w-9 h-9 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                            About {GLOBAL_CONSTANTS.PLATFORM_NAME}
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Empowering learners worldwide with quality education
                        </p>
                    </div>
                </div>

                <div className="prose prose-lg max-w-none space-y-8">
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                            <Target className="w-5 h-5 text-blue-600" />
                            Our Mission
                        </h2>
                        <p className="text-gray-600 leading-relaxed mt-3">
                            {GLOBAL_CONSTANTS.PLATFORM_NAME} is on a mission to make quality education accessible to everyone.
                            We believe that learning should know no boundaries—whether you&apos;re a student looking to upskill,
                            a professional seeking to switch careers, or an expert wanting to share your knowledge with the world.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                            <Users className="w-5 h-5 text-purple-600" />
                            What We Offer
                        </h2>
                        <p className="text-gray-600 leading-relaxed mt-3">
                            We connect talented instructors with eager learners through our curated course marketplace.
                            Our platform offers courses across diverse categories—from web development and data science
                            to design and business. Every course is vetted for quality, and students earn verifiable
                            certificates upon completion.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                            <Award className="w-5 h-5 text-amber-500" />
                            Our Values
                        </h2>
                        <ul className="mt-3 space-y-2 text-gray-600">
                            <li><strong>Quality First:</strong> We maintain high standards for every course on our platform.</li>
                            <li><strong>Accessibility:</strong> Education should be available to everyone, everywhere.</li>
                            <li><strong>Trust:</strong> Transparent pricing, honest reviews, and verified credentials.</li>
                            <li><strong>Community:</strong> Building a supportive learning community for students and instructors.</li>
                        </ul>
                    </section>

                    <section className="rounded-xl bg-white border border-gray-200 p-6">
                        <p className="text-gray-600 leading-relaxed">
                            {GLOBAL_CONSTANTS.TAGLINE}
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}