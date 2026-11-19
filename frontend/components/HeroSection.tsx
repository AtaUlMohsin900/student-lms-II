import React from 'react'
import { SECTION_CONTENT, HERO_STATS } from '@/constants'
import { Button } from './ui/button'
import Link from 'next/link'
import { ArrowRight, Play, Star } from 'lucide-react'

const HeroSection = () => {
    return (
        <section className='relative py-20 lg:py-32 bg-linear-to-br from-blue-50 via-white to-pink-50 overflow-hidden'>
            <div className='absolute inset-0 opacity-5'>
                <div
                    className='absolute inset-0'
                    style={{
                        backgroundImage: 'radial-gradient(circle at 1px 1px, #3b82f6 1px, transparent 0)',
                        backgroundSize: '40px 40px'
                    }}
                />
            </div>

            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
                <div className='text-center max-w-4xl mx-auto'>
                    <h1 className='text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight'>
                        {SECTION_CONTENT.HERO.TITLE_START}
                        <span className='bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                            {SECTION_CONTENT.HERO.TITLE_HIGHLIGHT}
                        </span>
                        <br />
                        <span className='text-gray-700'>
                            {SECTION_CONTENT.HERO.TITLE_END}
                        </span>
                    </h1>
                    <p className='text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed'>
                        {SECTION_CONTENT.HERO.SUBTITLE}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                        <Button asChild size="lg" className="text-lg px-8 py-6 group">
                            <Link href="/courses">
                                {SECTION_CONTENT.HERO.CTA_EXPLORE}
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                            </Link>
                        </Button>

                        <Button variant='outline' asChild size="lg" className="text-lg px-8 py-6 group">
                            <Link href="/signup">
                                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                                {SECTION_CONTENT.HERO.CTA_GET_STARTED}
                            </Link>
                        </Button>
                    </div>

                    {/* stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        {HERO_STATS.map((stat) => (
                            <div key={stat.label} className="text-center">
                                <div className="flex items-center justify-center mb-3">
                                    <stat.icon className="w-8 h-8 text-blue-600" />
                                </div>
                                <div className="text-3xl font-bold text-gray-900 mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-gray-600">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center space-x-1">
                        <div className="flex items-center space-x-1">
                            {[...Array(4)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                            ))}
                            <span className="text-sm">
                                {SECTION_CONTENT.HERO.RATING}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute top-20 left-20 w-20 h-20 bg-blue-100 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute top-40 right-20 w-16 h-16 bg-purple-100 rounded-full opacity-20 animate-pulse delay-1000 "></div>
            <div className="absolute bottom-20 left-20 w-12 h-12 bg-yellow-100 rounded-full opacity-20 animate-pulse delay-2000 "></div>
        </section>
    )
}

export default HeroSection
