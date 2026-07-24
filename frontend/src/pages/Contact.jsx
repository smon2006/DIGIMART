import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';

const Contact = () => {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

    const inputHandle = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const submit = (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.message) {
            toast.error('Please fill in your name, email and message.');
            return;
        }
        toast.success('Thanks for reaching out! We will get back to you soon.');
        setForm({ name: '', email: '', subject: '', message: '' });
    };
const info = [
    { icon: <FaMapMarkerAlt />, title: 'Our Address', text: '128 Maple Street, Springfield, IL 62704' },
    { icon: <FaPhoneAlt />, title: 'Call Us', text: '+1 (555) 010-2029' },
    { icon: <FaEnvelope />, title: 'Email Us', text: 'support@digimart.com' },
    { icon: <FaClock />, title: 'Working Hours', text: 'Mon - Sat: 9:00 AM - 6:00 PM' },
    ];

    return (
        <div className='w-full'>
            <Header />
            <PageHeader title='Contact Us' crumbs={[{ label: 'Contact Us' }]} />

            <div className='w-[85%] lg:w-[90%] mx-auto py-16 md-lg:py-10'>
                <div className='grid grid-cols-4 md-lg:grid-cols-2 sm:grid-cols-1 gap-6 mb-12'>
                    {info.map((item, i) => (
                        <div key={i} className='bg-slate-50 border border-slate-200 rounded-lg p-6 flex flex-col items-start'>
                            <div className='w-12 h-12 flex items-center justify-center rounded-full bg-[#2563EB]/10 text-[#2563EB] text-lg mb-4'>
                                {item.icon}
                            </div>
                            <h3 className='font-semibold text-slate-800 mb-1'>{item.title}</h3>
                            <p className='text-slate-600 text-sm leading-relaxed'>{item.text}</p>
                        </div>
                    ))}
                </div>

                <div className='flex flex-wrap gap-y-8'>
                    <div className='w-7/12 md-lg:w-full md-lg:pr-0 pr-8'>
                        <div className='bg-white border border-slate-200 rounded-lg p-8 sm:p-5'>
                            <h2 className='text-2xl font-bold text-slate-800 mb-2'>Send Us a Message</h2>
                            <p className='text-slate-600 text-sm mb-6'>We would love to hear from you. Fill out the form below and our team will respond promptly.</p>
                            <form onSubmit={submit} className='flex flex-col gap-4'>
                                <div className='flex md:flex-col gap-4'>
                                    <div className='flex flex-col gap-1 w-full'>
                                        <label htmlFor='name' className='text-sm font-medium text-slate-700'>Name</label>
                                        <input
                                            value={form.name}
                                            onChange={inputHandle}
                                            className='px-3 py-2.5 border border-slate-300 rounded-md outline-none focus:border-[#2563EB] text-slate-800 text-sm'
                                            type='text' name='name' id='name' placeholder='Your name'
                                        />
                                    </div>
                                    <div className='flex flex-col gap-1 w-full'>
                                        <label htmlFor='email' className='text-sm font-medium text-slate-700'>Email</label>
                                        <input
                                            value={form.email}
                                            onChange={inputHandle}
                                            className='px-3 py-2.5 border border-slate-300 rounded-md outline-none focus:border-[#2563EB] text-slate-800 text-sm'
                                            type='email' name='email' id='email' placeholder='you@example.com'
                                        />
                                    </div>
                                </div>
                                <div className='flex flex-col gap-1 w-full'>
                                    <label htmlFor='subject' className='text-sm font-medium text-slate-700'>Subject</label>
                                    <input
                                        value={form.subject}
                                        onChange={inputHandle}
                                        className='px-3 py-2.5 border border-slate-300 rounded-md outline-none focus:border-[#2563EB] text-slate-800 text-sm'
                                        type='text' name='subject' id='subject' placeholder='How can we help?'
                                    />
                                </div>
                                <div className='flex flex-col gap-1 w-full'>
                                    <label htmlFor='message' className='text-sm font-medium text-slate-700'>Message</label>
                                    <textarea
                                        value={form.message}
                                        onChange={inputHandle}
                                        className='px-3 py-2.5 border border-slate-300 rounded-md outline-none focus:border-[#2563EB] text-slate-800 text-sm min-h-[140px] resize-y'
                                        name='message' id='message' placeholder='Write your message...'
                                    />
                                </div>
                                <button
                                    type='submit'
                                    className='bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-medium px-6 py-2.5 rounded-md transition-colors w-fit'
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className='w-5/12 md-lg:w-full'>
                        <div className='h-full rounded-lg overflow-hidden border border-slate-200 min-h-[300px]'>
                            <iframe
    title='DigiMart location'
    src='https://www.openstreetmap.org/export/embed.html?bbox=-89.70%2C39.755%2C-89.60%2C39.805&layer=mapnik&marker=39.7817%2C-89.6501'
    className='w-full h-full min-h-[300px] border-0'
    loading='lazy'
/>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Contact;
