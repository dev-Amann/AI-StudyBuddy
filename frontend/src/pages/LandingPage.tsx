import React from 'react';
import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import Creators from '../components/landing/Creators';
import FAQ from '../components/landing/FAQ';
import CTA from '../components/landing/CTA';
import Footer from '../components/landing/Footer';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-amber-200 selection:text-amber-900">
            <Navbar />
            <Hero />
            <Features />
            <Creators />
            <FAQ />
            <CTA />
            <Footer />
        </div>
    );
};

export default LandingPage;
