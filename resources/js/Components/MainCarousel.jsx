import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

export default function MainCarousel({ items }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    useEffect(() => {
        if (items.length <= 1) return;
        const timer = setInterval(() => {
            nextSlide();
        }, 6000);
        return () => clearInterval(timer);
    }, [currentIndex, items.length]);

    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? '100%' : '-100%',
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? '100%' : '-100%',
            opacity: 0
        })
    };

    const nextSlide = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % items.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    };

    if (!items || items.length === 0) return null;

    const currentItem = items[currentIndex];

    return (
        <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden bg-slate-100 dark:bg-neutral-900 lg:h-[80vh]">
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                    }}
                    className="absolute inset-0"
                >
                    {/* Background Image */}
                    <div className="absolute inset-0 h-full w-full">
                        <picture>
                            {currentItem.mobile_image && (
                                <source media="(max-width: 768px)" srcSet={currentItem.mobile_image} />
                            )}
                            <img
                                src={currentItem.image}
                                alt={currentItem.title}
                                className="h-full w-full object-cover"
                            />
                        </picture>
                        
                        {/* Overlay for contrast */}
                        <div 
                            className="absolute inset-0 bg-black/30 dark:bg-black/40" 
                            style={{ opacity: currentItem.overlay_opacity || 0.3 }}
                        />
                    </div>

                    {/* Content */}
                    <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
                        <div className="max-w-2xl">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                <h2 
                                    className={`text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl`}
                                    style={{ color: currentItem.text_color === 'white' ? '#fff' : (currentItem.text_color === 'gold-500' ? 'rgb(var(--primary-500))' : '#000') }}
                                >
                                    {currentItem.title}
                                </h2>
                                <p 
                                    className="mt-6 text-lg leading-8 opacity-90 sm:text-xl"
                                    style={{ color: currentItem.text_color === 'white' ? '#fff' : (currentItem.text_color === 'gold-500' ? 'rgb(var(--primary-500))' : '#000') }}
                                >
                                    {currentItem.subtitle}
                                </p>
                                <div className="mt-10 flex items-center gap-x-6">
                                    <Link
                                        href={currentItem.button_url || '/produtos'}
                                        className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-8 py-4 text-sm font-bold text-neutral-950 shadow-lg shadow-gold-500/20 transition hover:bg-gold-400"
                                    >
                                        {currentItem.button_text || 'Ver agora'}
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            {items.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white dark:bg-black/10 dark:text-white backdrop-blur-md transition hover:bg-white/20 dark:hover:bg-black/20 sm:left-8"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white dark:bg-black/10 dark:text-white backdrop-blur-md transition hover:bg-white/20 dark:hover:bg-black/20 sm:right-8"
                    >
                        <ChevronRight className="h-6 w-6" />
                    </button>
                </>
            )}

            {/* Pagination Dots */}
            {items.length > 1 && (
                <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-3">
                    {items.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                                setDirection(idx > currentIndex ? 1 : -1);
                                setCurrentIndex(idx);
                            }}
                            className={`h-1.5 transition-all duration-300 rounded-full ${idx === currentIndex ? 'w-8 bg-gold-500' : 'w-2 bg-black/20 dark:bg-white/30'}`}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}
