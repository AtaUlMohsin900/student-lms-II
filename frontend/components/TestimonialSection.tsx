import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from './ui/carousel'
import { SECTION_CONTENT, TESTIMONIALS } from '@/constants'
import { Card, CardContent, CardFooter } from './ui/card'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
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
                        className='w-full px-10 sm:px-12'
                    >
                        <CarouselContent className='-ml-2 md:-ml-4'>
                            {TESTIMONIALS.map((testimonial) => (
                                <CarouselItem
                                    key={testimonial.id}
                                    className='pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3'
                                >
                                    <Card className='h-full hover:shadow-md transition-shadow duration-200'>
                                        <CardContent className='flex h-full flex-col pt-6'>
                                            <Quote
                                                aria-hidden='true'
                                                className='mb-4 h-8 w-8 text-blue-200'
                                            />
                                            <blockquote className='flex-1'>
                                                <p className='text-gray-700 leading-relaxed text-sm'>
                                                    &ldquo;{testimonial.content}&rdquo;
                                                </p>
                                            </blockquote>
                                            <p className='mt-4 text-sm text-blue-600 font-medium'>
                                                {testimonial.course}
                                            </p>
                                            <div
                                                className='mt-3 flex items-center space-x-1'
                                                aria-label={`${testimonial.rating} out of 5 stars`}
                                            >
                                                {Array.from({ length: Math.max(0, Math.min(5, testimonial.rating)) }).map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        aria-hidden='true'
                                                        className='w-4 h-4 text-yellow-400 fill-current'
                                                    />
                                                ))}
                                            </div>
                                        </CardContent>
                                        <CardFooter className='gap-3 border-t-0 bg-transparent'>
                                            <Avatar size='lg'>
                                                <AvatarImage src={testimonial.avatar} alt='' />
                                                <AvatarFallback>
                                                    {testimonial.name
                                                        .split(' ')
                                                        .map((part) => part[0])
                                                        .join('')
                                                        .slice(0, 2)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className='font-medium text-gray-900'>{testimonial.name}</p>
                                                <p className='text-sm text-gray-500'>{testimonial.role}</p>
                                            </div>
                                        </CardFooter>
                                    </Card>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className='left-0' />
                        <CarouselNext className='right-0' />
                    </Carousel>
                </div>
            </div >
        </section >
    )
}

export default TestimonialSection