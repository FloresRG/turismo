import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useSpring, animated } from "@react-spring/web";

import Tilt from 'react-parallax-tilt';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import { useTranslation } from 'react-i18next';
import {
    Star,
    MapPin,
    Calendar,
    Phone,
    Instagram,
    Facebook,
    Twitter,
    ChevronLeft,
    ChevronRight,
    Map,
    Mountain,
    X,
    Menu,
    Send,
    Mic,
    Globe,
} from 'lucide-react';

// Multilingual configuration
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            home: "Home",
            places: "Places",
            testimonials: "Testimonials",
            contact: "Contact",
            reserve: "Reserve",
            voice: "Voice",
            hideMap: "Hide 3D Map",
            showMap: "Show 3D Map",
            explore: "Explore",
            initiateJourney: "Initiate Journey",
            placesTitle: "Destinations of La Paz",
            placesSubtitle: "Discover destinations that transcend reality in an immersive journey",
            testimonialsTitle: "Echoes of Travelers",
            testimonialsSubtitle: "Stories resonating from the edges of Bolivia",
            aiRecommendations: "AI Recommendations",
            aiText: "Based on your filters: {{filter}}, we recommend {{destination}}.",
            bookingTitle: "Reserve: {{name}}",
            name: "Name",
            email: "Email",
            footerText: "Conquer the universe with unique travel experiences.",
            footerCopyright: "© 2025 LGECOTOURS Bolivia. All Rights Reserved.",
            language: "Language",
            english: "English",
            spanish: "Spanish",
        }
    },
    es: {
        translation: {
            home: "Inicio",
            places: "Lugares",
            testimonials: "Testimonios",
            contact: "Contacto",
            reserve: "Reservar",
            voice: "Voz",
            hideMap: "Ocultar Mapa 3D",
            showMap: "Ver Mapa 3D",
            explore: "Explorar",
            initiateJourney: "Iniciar Viaje",
            placesTitle: "Lugares de La Paz",
            placesSubtitle: "Descubre destinos que desafían la realidad en un viaje inmersivo",
            testimonialsTitle: "Ecos de Viajeros",
            testimonialsSubtitle: "Historias que resuenan desde los confines de Bolivia",
            aiRecommendations: "Recomendaciones IA",
            aiText: "Basado en tus filtros: {{filter}}, te recomendamos {{destination}}.",
            bookingTitle: "Reserva: {{name}}",
            name: "Nombre",
            email: "Email",
            footerText: "Conquista el universo con experiencias de viaje únicas.",
            footerCopyright: "© 2025 LGECOTOURS Bolivia. Derechos Reservados.",
            language: "Idioma",
            english: "Inglés",
            spanish: "Español",
        }
    }
};

i18n.use(initReactI18next).init({
    resources,
    lng: 'es',
    interpolation: { escapeValue: false }
});

const heroImages = [
    {
        src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop',
        title: { en: 'Portal to Bolivia', es: 'Portal a Bolivia' },
        subtitle: { en: 'Interdimensional Journeys', es: 'Viajes interdimensionales' },
        description: { en: 'Explore a universe of wonders', es: 'Explora un universo de maravillas' }
    },
    {
        src: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=1920&h=1080&fit=crop',
        title: { en: 'Salar de Uyuni', es: 'Salar de Uyuni' },
        subtitle: { en: 'Cosmic Reflection', es: 'Reflejo del cosmos' },
        description: { en: 'A mirror to infinity', es: 'Un espejo hacia el infinito' }
    },
    {
        src: 'https://images.unsplash.com/photo-1574191105771-1975c3e508d0?w=1920&h=1080&fit=crop',
        title: { en: 'Lake Titicaca', es: 'Lago Titicaca' },
        subtitle: { en: 'Origin of Time', es: 'Origen del tiempo' },
        description: { en: 'Connection to the ancestral', es: 'Conexión con lo ancestral' }
    },
];

const locations = [
    {
        name: 'Valle de la Luna',
        coordinates: { lat: -16.5667, lng: -68.0833 },
        location: { en: 'La Paz, Bolivia', es: 'La Paz, Bolivia' },
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
        rating: 4.7,
        price: '$45',
        duration: { en: '1 day', es: '1 día' },
        category: { en: 'Nature', es: 'Naturaleza' },
        description: { en: 'An extraterrestrial landscape with unique rock formations.', es: 'Un paisaje extraterrestre con formaciones rocosas únicas.' }
    },
    {
        name: 'Lago Titicaca',
        coordinates: { lat: -15.9254, lng: -69.3354 },
        location: { en: 'Copacabana, La Paz, Bolivia', es: 'Copacabana, La Paz, Bolivia' },
        image: 'https://images.unsplash.com/photo-1574191105771-1975c3e508d0?w=800&h=600&fit=crop',
        rating: 4.8,
        price: '$65',
        duration: { en: '2 days', es: '2 días' },
        category: { en: 'Cultural', es: 'Cultural' },
        description: { en: 'The highest navigable lake, a portal to ancient cultures.', es: 'El lago navegable más alto, un portal a culturas milenarias.' }
    },
    {
        name: 'Yungas Road',
        coordinates: { lat: -16.3333, lng: -68.0167 },
        location: { en: 'Yungas, La Paz, Bolivia', es: 'Yungas, La Paz, Bolivia' },
        image: 'https://images.unsplash.com/photo-1503437313881-503a91226402?w=800&h=600&fit=crop',
        rating: 4.8,
        price: '$90',
        duration: { en: '1 day', es: '1 día' },
        category: { en: 'Adventure', es: 'Aventura' },
        description: { en: 'A pure adrenaline route on a legendary road.', es: 'Una ruta de adrenalina pura en un camino legendario.' }
    },
    {
        name: 'Plaza Murillo',
        coordinates: { lat: -16.4957, lng: -68.1335 },
        location: { en: 'La Paz, Bolivia', es: 'La Paz, Bolivia' },
        image: 'https://images.unsplash.com/photo-1599999948312-4e294652e7b0?w=800&h=600&fit=crop',
        rating: 4.5,
        price: '$20',
        duration: { en: '1 day', es: '1 día' },
        category: { en: 'Cultural', es: 'Cultural' },
        description: { en: 'The historic heart of La Paz, vibrant and full of history.', es: 'El núcleo histórico de La Paz, vibrante y lleno de historia.' }
    },
    {
        name: 'Huayna Potosí',
        coordinates: { lat: -16.2667, lng: -68.1500 },
        location: { en: 'La Paz, Bolivia', es: 'La Paz, Bolivia' },
        image: 'https://images.unsplash.com/photo-1549887534-b7e072e85caa?w=800&h=600&fit=crop',
        rating: 4.9,
        price: '$150',
        duration: { en: '3 days', es: '3 días' },
        category: { en: 'Adventure', es: 'Aventura' },
        description: { en: 'An epic challenge with stunning glacier views.', es: 'Un desafío épico con vistas a glaciares imponentes.' }
    },
];

const testimonials = [
    {
        name: 'Sofía Ramírez',
        location: { en: 'Argentina', es: 'Argentina' },
        text: { en: 'A journey that transported me to another dimension. LGECOTOURS is the future of tourism.', es: 'Un viaje que me transportó a otra dimensión. LGECOTOURS es el futuro del turismo.' },
        rating: 5,
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
    },
    {
        name: 'Kai Nakamura',
        location: { en: 'Japan', es: 'Japón' },
        text: { en: 'The most immersive experience I’ve ever had. Every detail was perfect.', es: 'La experiencia más inmersiva que he tenido. Cada detalle fue perfecto.' },
        rating: 5,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
];

const stats = [
    { value: '500+', label: { en: 'Satisfied Travelers', es: 'Viajeros Satisfechos' } },
    { value: '20+', label: { en: 'Eco-Friendly Tours', es: 'Tours Ecológicos' } },
    { value: '10+', label: { en: 'Years of Exploration', es: 'Años de Exploración' } },
];

export default function UltimateTourismWebsite() {
    const { t, i18n } = useTranslation();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState('Todos');
    const [costFilter, setCostFilter] = useState('Todos');
    const [durationFilter, setDurationFilter] = useState('Todos');
    const [showMap, setShowMap] = useState(false);
    const [showBooking, setShowBooking] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const { scrollY } = useScroll();
    const opacity = useTransform(scrollY, [400, 600], [0.7, 1]);
    const yTransform = useTransform(scrollY, [400, 600], [50, 0]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                ease: 'easeOut'
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50, rotateY: 90 },
        visible: {
            opacity: 1,
            y: 0,
            rotateY: 0,
            transition: {
                duration: 0.8,
                type: 'spring',
                stiffness: 120,
                damping: 15
            }
        }
    };

    const filterDestinations = () => {
        let filtered = locations;
        if (activeFilter !== 'Todos') {
            filtered = filtered.filter(dest => dest.category[i18n.language] === activeFilter);
        }
        if (costFilter !== 'Todos') {
            filtered = filtered.filter(dest => {
                const priceNum = parseFloat(dest.price.replace('$', ''));
                if (costFilter === 'Bajo') return priceNum <= 50;
                if (costFilter === 'Medio') return priceNum > 50 && priceNum <= 100;
                if (costFilter === 'Alto') return priceNum > 100;
                return true;
            });
        }
        if (durationFilter !== 'Todos') {
            filtered = filtered.filter(dest => {
                if (durationFilter === '1 día') return dest.duration[i18n.language] === '1 día' || dest.duration[i18n.language] === '1 day';
                if (durationFilter === '2-3 días') return ['2 días', '3 días', '2 days', '3 days'].includes(dest.duration[i18n.language]);
                if (durationFilter === '4+ días') return dest.duration[i18n.language] === '4 días' || dest.duration[i18n.language] === '4 days';
                return true;
            });
        }
        return filtered;
    };

    const filteredLocations = filterDestinations();

    const [particles] = useSpring(() => ({
        from: { opacity: 0 },
        to: { opacity: 1 },
        config: { duration: 2000 },
        loop: true
    }));

    return (
        <div className="relative min-h-screen bg-[#0D0D2B] font-sans text-[#F5F7FA]" style={{ fontFamily: 'Orbitron, Inter, sans-serif' }}>
            {/* Particle Background */}
            <animated.div
                className="absolute inset-0 pointer-events-none"
                style={{
                    ...particles,
                    background: 'radial-gradient(circle, rgba(0,231,255,0.15) 0%, rgba(123,0,255,0.1) 50%, transparent 100%)'
                }}
            >
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?fit=crop&w=1920&h=1080")`,
                    opacity: 0.05,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }} />
            </animated.div>

            {/* Navigation */}
            <motion.nav
                className="fixed top-4 right-4 z-50"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <motion.button
                    className="w-14 h-14 bg-[#00E7FF]/20 backdrop-blur-md rounded-full flex items-center justify-center text-[#F5F7FA] hover:bg-[#FF00A3] transition-all"
                    whileHover={{ scale: 1.2, rotate: 45 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                </motion.button>
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            className="absolute top-16 right-0 bg-[#0D0D2B]/95 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-[#00E7FF]/30"
                            initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            exit={{ opacity: 0, scale: 0.5, rotate: -45 }}
                            transition={{ duration: 0.5, type: 'spring' }}
                        >
                            {['home', 'places', 'testimonials', 'contact'].map((item, index) => (
                                <motion.a
                                    key={item}
                                    href={`#${item}`}
                                    className="block text-[#F5F7FA] hover:text-[#7B00FF] font-semibold text-lg py-2 px-4 rounded-lg transition-all"
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {t(item)}
                                </motion.a>
                            ))}
                            <motion.div
                                className="mt-4 flex space-x-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.4, delay: 0.4 }}
                            >
                                <motion.button
                                    className="bg-[#00E7FF] text-[#0D0D2B] px-4 py-2 rounded-full font-medium"
                                    whileHover={{ scale: 1.05, boxShadow: '0 0 15px #00E7FF' }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => i18n.changeLanguage('es')}
                                >
                                    {t('spanish')}
                                </motion.button>
                                <motion.button
                                    className="bg-[#7B00FF] text-[#F5F7FA] px-4 py-2 rounded-full font-medium"
                                    whileHover={{ scale: 1.05, boxShadow: '0 0 15px #7B00FF' }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => i18n.changeLanguage('en')}
                                >
                                    {t('english')}
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>

            {/* Hero Section */}
            <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
                <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-[#0D0D2B]/60 to-[#00E7FF]/10"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 4, repeat: Infinity }}
                />
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentImageIndex}
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${heroImages[currentImageIndex].src})` }}
                        initial={{ opacity: 0, scale: 1.3, filter: 'blur(5px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 1.3, filter: 'blur(5px)' }}
                        transition={{ duration: 1.8, ease: 'easeInOut' }}
                    />
                </AnimatePresence>
                <motion.div
                    className="relative z-10 text-center max-w-4xl mx-auto px-6"
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, type: 'spring', stiffness: 80 }}
                >
                    <motion.h1
                        className="text-5xl sm:text-7xl font-extrabold text-[#F5F7FA] mb-6 tracking-tight"
                        animate={{ textShadow: ['0 0 15px #00E7FF', '0 0 25px #7B00FF', '0 0 15px #FF00A3'] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    >
                        {heroImages[currentImageIndex].title[i18n.language]}
                    </motion.h1>
                    <motion.p
                        className="text-xl sm:text-2xl mb-8 font-medium text-[#7B00FF]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        {heroImages[currentImageIndex].subtitle[i18n.language]}
                    </motion.p>
                    <motion.button
                        className="bg-[#00E7FF] text-[#0D0D2B] px-8 py-4 rounded-full font-semibold text-lg uppercase tracking-wide shadow-lg hover:bg-[#FF00A3] transition-all"
                        whileHover={{ scale: 1.1, boxShadow: '0 0 20px #FF00A3' }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {t('initiateJourney')}
                    </motion.button>
                </motion.div>
            </section>

            {/* Stats Section */}
            <section className="relative py-16 bg-[#0D0D2B] overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa')] bg-cover bg-center opacity-5" />
                <div className="max-w-7xl mx-auto px-6 sm:px-8">
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                className="bg-[#0D0D2B]/80 backdrop-blur-md rounded-2xl p-6 border border-[#00E7FF]/50"
                                variants={itemVariants}
                            >
                                <motion.div
                                    className="text-4xl font-bold text-[#FF00A3] mb-2"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 1, delay: index * 0.2 }}
                                >
                                    {stat.value}
                                </motion.div>
                                <div className="text-[#7B00FF]">{stat.label[i18n.language]}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Locations Section */}
            <section id="places" className="relative py-24 bg-[#0D0D2B] overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa')] bg-cover bg-center opacity-5" />
                <div className="max-w-7xl mx-auto px-6 sm:px-8">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, type: 'spring', stiffness: 100 }}
                    >
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#F5F7FA] mb-6 tracking-tight">
                            {t('placesTitle').split(' ').map((word, idx) => (
                                <motion.span
                                    key={idx}
                                    initial={{ opacity: 0, rotateY: 180 }}
                                    whileInView={{ opacity: 1, rotateY: 0 }}
                                    transition={{ duration: 0.8, delay: idx * 0.3 }}
                                    className="inline-block"
                                >
                                    {word} 
                                </motion.span>
                            ))}
                        </h2>
                        <motion.p
                            className="text-lg sm:text-xl text-[#7B00FF] max-w-3xl mx-auto leading-relaxed"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            {t('placesSubtitle')}
                        </motion.p>
                    </motion.div>

                    {/* Filters */}
                    <motion.div
                        className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        {[
                            { label: t('category'), value: activeFilter, setter: setActiveFilter, options: ['Todos', t('adventure'), t('cultural'), t('nature')] },
                            { label: t('cost'), value: costFilter, setter: setCostFilter, options: ['Todos', 'Bajo ($0-$50)', 'Medio ($51-$100)', 'Alto ($101+)'] },
                            { label: t('duration'), value: durationFilter, setter: setDurationFilter, options: ['Todos', '1 día', '2-3 días', '4+ días'] },
                        ].map((filter, idx) => (
                            <motion.div
                                key={filter.label}
                                className="relative"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                            >
                                <select
                                    className="bg-[#0D0D2B]/80 backdrop-blur-md border border-[#00E7FF]/50 rounded-full px-6 py-3 text-[#F5F7FA] font-medium focus:ring-2 focus:ring-[#FF00A3] pr-10 hover:bg-[#7B00FF]/20 transition-all"
                                    value={filter.value}
                                    onChange={(e) => filter.setter(e.target.value)}
                                >
                                    {filter.options.map(opt => (
                                        <option key={opt} value={opt} className="bg-[#0D0D2B] text-[#F5F7FA]">{opt}</option>
                                    ))}
                                </select>
                                <ChevronRight className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#00E7FF]" />
                            </motion.div>
                        ))}
                        <motion.button
                            onClick={() => setShowMap(!showMap)}
                            className="bg-[#00E7FF] text-[#0D0D2B] px-6 py-3 rounded-full font-medium flex items-center space-x-2 hover:bg-[#FF00A3] transition-all"
                            whileHover={{ scale: 1.05, boxShadow: '0 0 20px #FF00A3' }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Map className="w-5 h-5" />
                            <span>{showMap ? t('hideMap') : t('showMap')}</span>
                        </motion.button>
                        <motion.button
                            className="bg-[#7B00FF]/20 text-[#7B00FF] px-6 py-3 rounded-full font-medium flex items-center space-x-2 hover:bg-[#7B00FF]/50 transition-all"
                            whileHover={{ scale: 1.05, boxShadow: '0 0 20px #7B00FF' }}
                            whileTap={{ scale: 0.95 }}
                            title={t('voice') + " (Ejemplo: 'Mostrar aventuras')"}
                        >
                            <Mic className="w-5 h-5" />
                            <span>{t('voice')}</span>
                        </motion.button>
                    </motion.div>

                    {/* 3D Map */}
                    <AnimatePresence>
                        {showMap && (
                            <motion.div
                                className="mb-12 bg-[#0D0D2B]/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-[#00E7FF]/50"
                                initial={{ opacity: 0, scale: 0.8, rotateX: -30 }}
                                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                                exit={{ opacity: 0, scale: 0.8, rotateX: -30 }}
                                transition={{ duration: 0.7, type: 'spring' }}
                            >
                                <Canvas style={{ height: '400px' }}>
                                    <ambientLight intensity={0.5} />
                                    <pointLight position={[10, 10, 10]} />
                                    <OrbitControls />
                                    <Sphere args={[1, 32, 32]} position={[0, 0, 0]}>
                                        <meshStandardMaterial color="#00E7FF" wireframe />
                                    </Sphere>
                                    {filteredLocations.map((loc, idx) => (
                                        <Sphere
                                            key={idx}
                                            args={[0.05, 16, 16]}
                                            position={[loc.coordinates.lng / 90, loc.coordinates.lat / 90, 1.1]}
                                        >
                                            <meshStandardMaterial color="#FF00A3" />
                                        </Sphere>
                                    ))}
                                </Canvas>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* AI Recommendations */}
                    <motion.div
                        className="mb-12 bg-[#0D0D2B]/80 backdrop-blur-md rounded-2xl p-6 text-[#F5F7FA] border border-[#7B00FF]/50"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h3 className="text-xl font-bold mb-4">{t('aiRecommendations')}</h3>
                        <p className="text-[#7B00FF]">
                            {t('aiText', { filter: activeFilter !== 'Todos' ? activeFilter : t('generalExploration'), destination: filteredLocations[0]?.name || t('exploreMore') })}
                        </p>
                    </motion.div>

                    {/* Locations Grid */}
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        style={{ opacity, y: yTransform }}
                    >
                        {filteredLocations.map((location, index) => (
                            <Tilt key={index} tiltMaxAngleX={15} tiltMaxAngleY={15} scale={1.05}>
                                <animated.div
                                    className="relative bg-[#0D0D2B]/90 backdrop-blur-md rounded-2xl shadow-lg border border-[#00E7FF]/50 overflow-hidden"
                                    style={useSpring({
                                        from: { transform: 'rotateY(180deg)' },
                                        to: { transform: 'rotateY(0deg)' },
                                        delay: index * 200,
                                        config: { tension: 120, friction: 14 }
                                    })}
                                >
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-br from-[#00E7FF]/20 to-[#FF00A3]/20"
                                        animate={{ opacity: [0.4, 1, 0.4] }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                    />
                                    <img
                                        src={location.image}
                                        alt={location.name}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-6 relative z-10">
                                        <h3 className="text-xl font-bold text-[#F5F7FA] mb-2">{location.name}</h3>
                                        <div className="flex items-center text-[#7B00FF] mb-2">
                                            <MapPin className="w-5 h-5 mr-2" />
                                            <span>{location.location[i18n.language]}</span>
                                        </div>
                                        <div className="flex items-center text-[#7B00FF] mb-2">
                                            <Map className="w-5 h-5 mr-2" />
                                            <span>Lat: {location.coordinates.lat}, Lng: {location.coordinates.lng}</span>
                                        </div>
                                        <div className="flex items-center text-[#7B00FF] mb-2">
                                            <Calendar className="w-5 h-5 mr-2" />
                                            <span>{location.duration[i18n.language]}</span>
                                        </div>
                                        <div className="flex items-center text-[#7B00FF] mb-2">
                                            <Star className="w-5 h-5 mr-2 text-[#FF00A3]" />
                                            <span>{location.rating}</span>
                                        </div>
                                        <div className="text-[#FF00A3] font-bold mb-4">{location.price}</div>
                                        <p className="text-[#7B00FF] mb-4">{location.description[i18n.language]}</p>
                                        <div className="flex space-x-4">
                                            <motion.button
                                                className="bg-[#00E7FF] text-[#0D0D2B] px-4 py-2 rounded-full font-medium flex items-center space-x-2 hover:bg-[#FF00A3] transition-all"
                                                whileHover={{ scale: 1.05, boxShadow: '0 0 15px #FF00A3' }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => {
                                                    setSelectedLocation(location);
                                                    setShowBooking(true);
                                                }}
                                            >
                                                <span>{t('reserve')}</span>
                                                <Send className="w-5 h-5" />
                                            </motion.button>
                                            <motion.button
                                                className="bg-[#7B00FF]/20 text-[#7B00FF] px-4 py-2 rounded-full font-medium hover:bg-[#7B00FF]/50 transition-all"
                                                whileHover={{ scale: 1.05, boxShadow: '0 0 15px #7B00FF' }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                AR Vista
                                            </motion.button>
                                        </div>
                                    </div>
                                </animated.div>
                            </Tilt>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Booking Modal */}
            <AnimatePresence>
                {showBooking && (
                    <motion.div
                        className="fixed inset-0 bg-[#0D0D2B]/90 backdrop-blur-md z-50 flex items-center justify-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.div
                            className="bg-[#0D0D2B]/90 backdrop-blur-md rounded-2xl p-8 max-w-md w-full border border-[#00E7FF]/50"
                            initial={{ y: 50 }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.5, type: 'spring' }}
                        >
                            <h3 className="text-2xl font-bold text-[#F5F7FA] mb-6">{t('bookingTitle', { name: selectedLocation?.name })}</h3>
                            <input
                                type="text"
                                placeholder={t('name')}
                                className="w-full px-4 py-3 mb-4 bg-[#0D0D2B] border border-[#00E7FF]/50 rounded-lg text-[#F5F7FA] focus:ring-2 focus:ring-[#FF00A3]"
                            />
                            <input
                                type="email"
                                placeholder={t('email')}
                                className="w-full px-4 py-3 mb-4 bg-[#0D0D2B] border border-[#00E7FF]/50 rounded-lg text-[#F5F7FA] focus:ring-2 focus:ring-[#FF00A3]"
                            />
                            <input
                                type="date"
                                className="w-full px-4 py-3 mb-4 bg-[#0D0D2B] border border-[#00E7FF]/50 rounded-lg text-[#F5F7FA] focus:ring-2 focus:ring-[#FF00A3]"
                            />
                            <div className="flex justify-between">
                                <motion.button
                                    className="bg-[#00E7FF] text-[#0D0D2B] px-6 py-3 rounded-full font-medium hover:bg-[#FF00A3] transition-all"
                                    whileHover={{ scale: 1.05, boxShadow: '0 0 15px #FF00A3' }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setShowBooking(false)}
                                >
                                    {t('reserve')}
                                </motion.button>
                                <motion.button
                                    className="bg-[#7B00FF]/20 text-[#7B00FF] px-6 py-3 rounded-full font-medium hover:bg-[#7B00FF]/50 transition-all"
                                    whileHover={{ scale: 1.05, boxShadow: '0 0 15px #7B00FF' }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setShowBooking(false)}
                                >
                                    Cancelar
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Testimonials Section */}
            <section id="testimonials" className="relative py-24 bg-[#0D0D2B] overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa')] bg-cover bg-center opacity-5" />
                <div className="max-w-4xl mx-auto px-6 sm:px-8">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, type: 'spring' }}
                    >
                        <h2 className="text-4xl sm:text-5xl font-extrabold text-[#F5F7FA] mb-6 tracking-tight">
                            {t('testimonialsTitle')}
                        </h2>
                        <motion.p
                            className="text-lg sm:text-xl text-[#7B00FF] max-w-2xl mx-auto"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            {t('testimonialsSubtitle')}
                        </motion.p>
                    </motion.div>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentTestimonial}
                            className="relative bg-[#0D0D2B]/90 backdrop-blur-md rounded-2xl p-8 text-center shadow-lg border border-[#00E7FF]/50"
                            initial={{ opacity: 0, x: 100, rotateY: 30 }}
                            animate={{ opacity: 1, x: 0, rotateY: 0 }}
                            exit={{ opacity: 0, x: -100, rotateY: -30 }}
                            transition={{ duration: 0.7, type: 'spring' }}
                        >
                            <motion.img
                                src={testimonials[currentTestimonial].image}
                                alt={testimonials[currentTestimonial].name}
                                className="w-20 h-20 rounded-full mx-auto mb-6 shadow-lg border-2 border-[#FF00A3]/50"
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.5 }}
                            />
                            <motion.div
                                className="flex justify-center mb-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                                    <Star key={i} className="w-6 h-6 text-[#FF00A3] fill-current" />
                                ))}
                            </motion.div>
                            <blockquote className="text-xl text-[#F5F7FA] italic mb-6">
                                "{testimonials[currentTestimonial].text[i18n.language]}"
                            </blockquote>
                            <div className="text-lg font-bold text-[#F5F7FA]">{testimonials[currentTestimonial].name}</div>
                            <div className="text-[#7B00FF]">{testimonials[currentTestimonial].location[i18n.language]}</div>
                        </motion.div>
                    </AnimatePresence>
                    <div className="flex justify-center space-x-4 mt-8">
                        <motion.button
                            onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                            className="p-3 bg-[#00E7FF]/20 rounded-full text-[#F5F7FA] hover:bg-[#FF00A3] transition-all"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </motion.button>
                        <motion.button
                            onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
                            className="p-3 bg-[#00E7FF]/20 rounded-full text-[#F5F7FA] hover:bg-[#FF00A3] transition-all"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <ChevronRight className="w-6 h-6" />
                        </motion.button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#0D0D2B] py-16">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <motion.div
                        className="flex justify-center items-center space-x-3 mb-6"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="w-10 h-10 bg-[#00E7FF] rounded-full flex items-center justify-center">
                            <Mountain className="w-6 h-6 text-[#0D0D2B]" />
                        </div>
                        <span className="text-2xl font-bold text-[#FF00A3]">LGECOTOURS</span>
                    </motion.div>
                    <p className="text-[#7B00FF] mb-6 max-w-md mx-auto">
                        {t('footerText')}
                    </p>
                    <div className="flex justify-center space-x-4 mb-8">
                        {[Facebook, Instagram, Twitter].map((Icon, index) => (
                            <motion.a
                                key={index}
                                href="#"
                                className="p-2 bg-[#0D0D2B] rounded-full text-[#F5F7FA] hover:bg-[#7B00FF] transition-all"
                                whileHover={{ scale: 1.2, rotate: 360 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Icon className="w-5 h-5" />
                            </motion.a>
                        ))}
                    </div>
                    <div className="text-[#7B00FF] text-sm">
                        {t('footerCopyright')}
                    </div>
                </div>
            </footer>

            {/* Floating Controls */}
            <motion.div
                className="fixed bottom-6 right-6 z-50 flex flex-col space-y-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: 'spring', stiffness: 200 }}
            >
                <motion.button
                    className="w-16 h-16 bg-[#FF00A3] text-[#F5F7FA] rounded-full shadow-lg flex items-center justify-center"
                    whileHover={{ scale: 1.2, boxShadow: '0 0 20px #FF00A3' }}
                    whileTap={{ scale: 0.9 }}
                    animate={{ rotate: [0, 360], transition: { duration: 5, repeat: Infinity, ease: 'linear' } }}
                >
                    <Phone className="w-6 h-6" />
                </motion.button>
                <motion.button
                    className="w-16 h-16 bg-[#7B00FF]/20 text-[#7B00FF] rounded-full shadow-lg flex items-center justify-center"
                    whileHover={{ scale: 1.2, boxShadow: '0 0 20px #7B00FF' }}
                    whileTap={{ scale: 0.9 }}
                    title={t('voice') + " (Example: 'Show adventures')"}
                >
                    <Mic className="w-6 h-6" />
                </motion.button>
            </motion.div>
        </div>
    );
}