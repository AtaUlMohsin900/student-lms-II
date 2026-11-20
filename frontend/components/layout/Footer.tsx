import { GraduationCap, Mail, MapPin, Phone } from 'lucide-react'
import React from 'react'
import { GLOBAL_CONSTANTS, SECTION_CONTENT, FOOTER_LINKS } from '@/constants'
import Link from 'next/link'

const Footer = () => {
    return (
        <footer className='bg-gray-900 text-white'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8'>

                    <div className='lg:col-span-2'>
                        <div className='flex items-center space-x-2 mb-4'>
                            <div className='w-10 h-10 bg-linear-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center'>
                                <GraduationCap className='w-6 h-6 text-white' />
                            </div>
                            <span className='text-2xl font-bold'>
                                {GLOBAL_CONSTANTS.PLATFORM_NAME}
                            </span>
                        </div>
                        <p className='text-gray-300 mb-6 max-w-md'>{GLOBAL_CONSTANTS.TAGLINE}</p>
                        <div className='space-y-3'>
                            <div className='flex items-center space-x-3 text-gray-300'>
                                <Mail className='w-4 h-4' />
                                <span>{GLOBAL_CONSTANTS.CONTACT.EMAIL}</span>
                            </div>

                            <div className='flex items-center space-x-3 text-gray-300'>
                                <Phone className='w-4 h-4' />
                                <span>{GLOBAL_CONSTANTS.CONTACT.PHONE}</span>
                            </div>

                            <div className='flex items-center space-x-3 text-gray-300'>
                                <MapPin className='w-4 h-4' />
                                <span>{GLOBAL_CONSTANTS.CONTACT.ADDRESS}</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            {SECTION_CONTENT.FOOTER.CATEGORIES.PLATFORM}
                        </h3>
                        <ul className="space-y-2">
                            {FOOTER_LINKS.platform.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-300 hover:text-white transition-colors duration-200"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            {SECTION_CONTENT.FOOTER.CATEGORIES.RESOURCES}
                        </h3>
                        <ul className="space-y-2">
                            {FOOTER_LINKS.resources.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-300 hover:text-white transition-colors duration-200"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            {SECTION_CONTENT.FOOTER.CATEGORIES.LEGAL}
                        </h3>
                        <ul className="space-y-2">
                            {FOOTER_LINKS.legal.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-300 hover:text-white transition-colors duration-200"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className='border-t Oborder-gray-800 mt-12 pt-8'>
                    <div className='flex flex-col md: flex-row items-center justify-between'>
                        <p className='text-gray-400 text-sm'>
                            {currentyear} {GLOBAL_CONSTANTS.PLATFORM_NAME}. {SECTION_CONTENT.FOOTER.RIGHTS_RESERVED}
                        </p>

                        <div className="flex items-center space-x-4 mt-4 md:mt-0">
                            {SOCIAL_LINKS.map((social) => (
                                <Link
                                    key={social.name}
                                    href={social.href}
                                    className='text-gray-400 aria-label={social. name} hover: text-white transition-colors duration-200 p-2 Ohover:bg-gray-800 rounded-lg'>

                                    <social.icon className="w-5 h-5" />
                                </Link>

                    </div>
                    </div>
                </div >

            </div >
        </footer >
    )
}

export default Footer
