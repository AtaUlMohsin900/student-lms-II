import React from 'react'

function HeroSection() {
    return (
        <section className='relative py-20 lg:py-32 bg-linear-to-br from-blue-50 via-white to-pink-50 overflow-hidden'>
            <<div className='absolute inset-0 opacity-5'>
                <div
                    className='absolute inset-0'
                    style={{
                        backgroundImage: 'radial-gradient(circle at 1px 1px, #3b82f6 1px, transparent 0)',
                        backgroundSize: '40px 40px'

                            />
</div>

            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
                <div className='text-center max-w-4xl mx-auto'>
                    <h1 className='text-4xl md: text-6xl lg: text-7xl font-bold Otext-gray-900 mb-6 leading-tight'>
                        {SECTION_CONTENT.HERO.TITLE_START}
                        <span className='bg-linear-to-r Ofrom-blue-600
{SECTION_CONTENT.HERO.TITLE_HIGHLIGHT}
</span>
<br/>
<span className=' Otext-gray-700'>
                        {SECTION_CONTENT.HERO.TITLE_END}
                    </span>
                </h1>

            </div>

to-purple-600 bg-clip-text text-transparent'>

            I

        </div>


        </section >




    )
}

export default HeroSection