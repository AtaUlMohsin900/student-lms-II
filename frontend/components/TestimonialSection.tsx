import React from 'react'
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel'
import { SECTION_CONTENT, TESTIMONIALS } from '@/constants'
import { Card, CardHeader } from './ui/card'
import { Quote, Star } from 'lucide-react'

const TestimonialSection = () => {
    return (
        <section className='py-20 bg-linear-to-br from-blue-50 via-white to-purple-50'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='text-center mb-16'>
                    <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
                        {SECTION_CONTENT.TESTIMONIALS.TITLE}
                    </h2>
                    <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
                        {SECTION_CONTENT.TESTIMONIALS.SUBTITLE}
                    </p>

                </div>

                <div className='relative mb-16'>
                    <Carousel
                        opts={{
                            align: 'start',
                            loop: true
                        }}
                        className='w-full'
                    >
                        <CarouselContent className='-ml-2 md:-ml-4'>
                            {
                                TESTIMONIALS.map((testimonial) => (
                                    <CarouselItem key={testimonial.id} className='pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 p-5 m-4'>
                                        <Card className='h-full hover:shadow-md transition-shadow duration-200'>
                                            <CardHeader className='pb-3'>
                                                <div className='mb-4'>
                                                    <Quote className='w-8 h-8 text-blue-200' />
                                                </div>

                                                <p className='text-gray-700 leading-relaxed text-sm'>
                                                    "{testimonial.content}"
                                                </p>
                                                <div className='mb-4'>
                                                    <span className='text-sm text-blue-600 font-medium'>
                                                        {testimonial.course}
                                                    </span>
                                                </div>

                                                <div className='flex items-center space-x-1'>
                                                    {[...Array(testimonial.rating)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className='w-4 h-4 text-yellow-400 fill-current'
                                                        />
                                                    ))}
                                                </div>

                                            </CardHeader>

                                        </Card>
                                    </CarouselItem>
                                ))}
                        </CarouselContent>

                    </Carousel>
                </div>

            </div >

        </section >
    )
}

export default TestimonialSection