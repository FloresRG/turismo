import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Parallax } from 'react-parallax';
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
    Globe,
} from 'lucide-react';

// Multilingual configuration
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            home: "Home",
            destinations: "Destinations",
            reviews: "Reviews",
            contact: "Contact",
            bookNow: "Book Now",
            explore: "Explore",
            showMap: "View 3D Map",
            hideMap: "Hide 3D Map",
            welcomeTitle: "Discover Bolivia’s Wonders",
            welcomeSubtitle: "Eco-luxury adventures crafted for unforgettable memories",
            destinationsTitle: "Explore La Paz",
            destinationsSubtitle: "Immerse yourself in breathtaking landscapes and vibrant culture",
            reviewsTitle: "Traveler Stories",
            reviewsSubtitle: "Hear from those who’ve explored with us",
            aiRecommendations: "AI-Powered Suggestions",
            aiText: "Based on your preferences: {{filter}}, we suggest {{destination}}.",
            bookingTitle: "Book: {{name}}",
            name: "Name",
            email: "Email",
            date: "Travel Date",
            footerText: "Sustainable travel, unforgettable experiences.",
            footerCopyright: "© 2025 LGECOTOURS Bolivia. All Rights Reserved.",
            language: "Language",
            english: "English",
            spanish: "Spanish",
            category: "Category",
            cost: "Cost",
            duration: "Duration",
            adventure: "Adventure",
            cultural: "Cultural",
            nature: "Nature",
        }
    },
    es: {
        translation: {
            home: "Inicio",
            destinations: "Destinos",
            reviews: "Reseñas",
            contact: "Contacto",
            bookNow: "Reservar",
            explore: "Explorar",
            showMap: "Ver Mapa 3D",
            hideMap: "Ocultar Mapa 3D",
            welcomeTitle: "Descubre las Maravillas de Bolivia",
            welcomeSubtitle: "Aventuras eco-lujosas diseñadas para recuerdos inolvidables",
            destinationsTitle: "Explora La Paz",
            destinationsSubtitle: "Sumérgete en paisajes impresionantes y una cultura vibrante",
            reviewsTitle: "Historias de Viajeros",
            reviewsSubtitle: "Escucha a quienes han explorado con nosotros",
            aiRecommendations: "Sugerencias de IA",
            aiText: "Basado en tus preferencias: {{filter}}, te sugerimos {{destination}}.",
            bookingTitle: "Reserva: {{name}}",
            name: "Nombre",
            email: "Correo",
            date: "Fecha de Viaje",
            footerText: "Viajes sostenibles, experiencias inolvidables.",
            footerCopyright: "© 2025 LGECOTOURS Bolivia. Todos los Derechos Reservados.",
            language: "Idioma",
            english: "Inglés",
            spanish: "Español",
            category: "Categoría",
            cost: "Costo",
            duration: "Duración",
            adventure: "Aventura",
            cultural: "Cultural",
            nature: "Naturaleza",
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
        title: { en: 'Bolivian Horizons', es: 'Horizontes Bolivianos' },
        subtitle: { en: 'Eco-Luxury Adventures', es: 'Aventuras Eco-Lujosas' }
    },
    {
        src: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=1920&h=1080&fit=crop',
        title: { en: 'Salar de Uyuni', es: 'Salar de Uyuni' },
        subtitle: { en: 'Mirrors of the Sky', es: 'Espejos del Cielo' }
    },
    {
        src: 'https://images.unsplash.com/photo-1574191105771-1975c3e508d0?w=1920&h=1080&fit=crop',
        title: { en: 'Lake Titicaca', es: 'Lago Titicaca' },
        subtitle: { en: 'Cradle of Civilization', es: 'Cuna de la Civilización' }
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
        description: { en: 'A surreal landscape of eroded rock formations.', es: 'Un paisaje surrealista con formaciones rocosas erosionadas.' }
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
        description: { en: 'The world’s highest navigable lake, steeped in history.', es: 'El lago navegable más alto del mundo, lleno de historia.' }
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
        description: { en: 'A thrilling ride on the world’s most iconic road.', es: 'Un viaje emocionante por el camino más icónico del mundo.' }
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
        description: { en: 'The vibrant heart of La Paz’s history and culture.', es: 'El vibrante corazón de la historia y cultura de La Paz.' }
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
        description: { en: 'A majestic climb with breathtaking glacier views.', es: 'Una escalada majestuosa con vistas a glaciares impresionantes.' }
    },
];

const testimonials = [
    {
        name: 'Elena Vargas',
        location: { en: 'Chile', es: 'Chile' },
        text: { en: 'An unforgettable journey with seamless planning.', es: 'Un viaje inolvidable con una planificación impecable.' },
        rating: 5,
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
    },
    {
        name: 'Liam Chen',
        location: { en: 'Canada', es: 'Canadá' },
        text: { en: 'The eco-conscious approach made this adventure truly special.', es: 'El enfoque ecológico hizo que esta aventura fuera realmente especial.' },
        rating: 5,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
];

const stats = [
    { value: '1000+', label: { en: 'Happy Travelers', es: 'Viajeros Felices' } },
    { value: '25+', label: { en: 'Sustainable Tours', es: 'Tours Sostenibles' } },
    { value: '12+', label: { en: 'Years of Excellence', es: 'Años de Excelencia' } },
];

export default function ModernEcoTourismWebsite() {
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
    const opacity = useTransform(scrollY, [200, 400], [0.8, 1]);
    const yTransform = useTransform(scrollY, [200, 400], [30, 0]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, ease: 'easeOut' }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: 'easeOut' }
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

    return (
        <div className="relative min-h-screen bg-[#F5F9FF] font-sans text-[#1A2A44]" style={{ fontFamily: 'Manrope, Montserrat, sans-serif' }}>
            {/* Subtle Particle Background */}
            <div className="absolute inset-0 pointer-events-none" style={{
                background: 'radial-gradient(circle, rgba(8,110,93,0.1) 0%, rgba(212,160,23,0.05) 50%, transparent 100%)',
                opacity: 0.3
            }} />

            {/* Navigation */}
            <motion.nav
                className="fixed top-0 left-0 right-0 z-50 bg-[#F5F9FF]/80 backdrop-blur-md shadow-sm"
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between py-4">
                    <div className="flex items-center space-x-3">
                        <Mountain className="w-8 h-8 text-[#086E5D]" />
                        <span className="text-2xl font-bold text-[#1A2A44]">LGECOTOURS</span>
                    </div>
                    <div className="hidden md:flex space-x-6">
                        {['home', 'destinations', 'reviews', 'contact'].map((item) => (
                            <a
                                key={item}
                                href={`#${item}`}
                                className="text-[#1A2A44] hover:text-[#086E5D] font-medium transition-colors"
                            >
                                {t(item)}
                            </a>
                        ))}
                        <select
                            className="bg-transparent text-[#1A2A44] font-medium"
                            value={i18n.language}
                            onChange={(e) => i18n.changeLanguage(e.target.value)}
                        >
                            <option value="en">{t('english')}</option>
                            <option value="es">{t('spanish')}</option>
                        </select>
                    </div>
                    <motion.button
                        className="md:hidden text-[#1A2A44]"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        whileTap={{ scale: 0.9 }}
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </motion.button>
                </div>
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            className="md:hidden bg-[#F5F9FF]/95 backdrop-blur-md p-6"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {['home', 'destinations', 'reviews', 'contact'].map((item) => (
                                <a
                                    key={item}
                                    href={`#${item}`}
                                    className="block text-[#1A2A44] hover:text-[#086E5D] font-medium py-2"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {t(item)}
                                </a>
                            ))}
                            <select
                                className="bg-transparent text-[#1A2A44] font-medium mt-4 w-full"
                                value={i18n.language}
                                onChange={(e) => i18n.changeLanguage(e.target.value)}
                            >
                                <option value="en">{t('english')}</option>
                                <option value="es">{t('spanish')}</option>
                            </select>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>

            {/* Hero Section */}
            <Parallax
                strength={300}
                bgImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop"
                className="relative h-screen flex items-center justify-center"
            >
                <div className="absolute inset-0 bg-gradient-to-b from-[#1A2A44]/60 to-transparent" />
                <motion.div
                    className="relative z-10 text-center max-w-4xl mx-auto px-6"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.h1
                        className="text-4xl sm:text-6xl font-bold text-[#F5F9FF] mb-4"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        {heroImages[currentImageIndex].title[i18n.language]}
                    </motion.h1>
                    <p className="text-lg sm:text-xl text-[#D4A017] mb-8">{heroImages[currentImageIndex].subtitle[i18n.language]}</p>
                    <motion.button
                        className="bg-[#086E5D] text-[#F5F9FF] px-8 py-4 rounded-full font-semibold hover:bg-[#D4A017] transition-all"
                        whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(212,160,23,0.5)' }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {t('bookNow')}
                    </motion.button>
                </motion.div>
            </Parallax>

            {/* Stats Section */}
            <section className="py-16 bg-[#F5F9FF]">
                <div className="max-w-7xl mx-auto px-6">
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
                                className="bg-[#F5F9FF]/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-[#086E5D]/20"
                                variants={itemVariants}
                            >
                                <motion.div
                                    className="text-4xl font-bold text-[#086E5D] mb-2"
                                    initial={{ scale: 0.8 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.5, delay: index * 0.2 }}
                                >
                                    {stat.value}
                                </motion.div>
                                <div className="text-[#1A2A44]">{stat.label[i18n.language]}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Destinations Section */}
            <section id="destinations" className="py-24 bg-[#F5F9FF]">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl sm:text-5xl font-bold text-[#1A2A44] mb-6">{t('destinationsTitle')}</h2>
                        <p className="text-lg text-[#086E5D] max-w-3xl mx-auto">{t('destinationsSubtitle')}</p>
                    </motion.div>

                    {/* Filters */}
                    <motion.div
                        className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
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
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                            >
                                <select
                                    className="bg-[#F5F9FF]/80 backdrop-blur-sm border border-[#086E5D]/50 rounded-full px-6 py-3 text-[#1A2A44] focus:ring-2 focus:ring-[#D4A017]"
                                    value={filter.value}
                                    onChange={(e) => filter.setter(e.target.value)}
                                >
                                    {filter.options.map(opt => (
                                        <option key={opt} value={opt} className="text-[#1A2A44]">{opt}</option>
                                    ))}
                                </select>
                            </motion.div>
                        ))}
                        <motion.button
                            onClick={() => setShowMap(!showMap)}
                            className="bg-[#086E5D] text-[#F5F9FF] px-6 py-3 rounded-full font-medium flex items-center space-x-2 hover:bg-[#D4A017] transition-all"
                            whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(212,160,23,0.5)' }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Map className="w-5 h-5" />
                            <span>{showMap ? t('hideMap') : t('showMap')}</span>
                        </motion.button>
                    </motion.div>

                    {/* 3D Map */}
                    <AnimatePresence>
                        {showMap && (
                            <motion.div
                                className="mb-12 bg-[#F5F9FF]/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-[#086E5D]/20"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Canvas style={{ height: '400px' }}>
                                    <ambientLight intensity={0.5} />
                                    <pointLight position={[10, 10, 10]} />
                                    <OrbitControls />
                                    <Sphere args={[1, 32, 32]} position={[0, 0, 0]}>
                                        <meshStandardMaterial color="#086E5D" wireframe />
                                    </Sphere>
                                    {filteredLocations.map((loc, idx) => (
                                        <Sphere
                                            key={idx}
                                            args={[0.05, 16, 16]}
                                            position={[loc.coordinates.lng / 90, loc.coordinates.lat / 90, 1.1]}
                                        >
                                            <meshStandardMaterial color="#D4A017" />
                                        </Sphere>
                                    ))}
                                </Canvas>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* AI Recommendations */}
                    <motion.div
                        className="mb-12 bg-[#F5F9FF]/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-[#086E5D]/20"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="text-xl font-bold text-[#1A2A44] mb-4">{t('aiRecommendations')}</h3>
                        <p className="text-[#086E5D]">
                            {t('aiText', { filter: activeFilter !== 'Todos' ? activeFilter : t('generalExploration'), destination: filteredLocations[0]?.name || t('exploreMore') })}
                        </p>
                    </motion.div>

                    {/* Destinations Grid */}
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        style={{ opacity, y: yTransform }}
                    >
                        {filteredLocations.map((location, index) => (
                            <motion.div
                                key={index}
                                className="bg-[#F5F9FF]/90 backdrop-blur-sm rounded-xl shadow-md border border-[#086E5D]/20 overflow-hidden"
                                variants={itemVariants}
                                whileHover={{ scale: 1.03, boxShadow: '0 10px 20px rgba(8,110,93,0.2)' }}
                            >
                                <img
                                    src={location.image}
                                    alt={location.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-[#1A2A44] mb-2">{location.name}</h3>
                                    <div className="flex items-center text-[#086E5D] mb-2">
                                        <MapPin className="w-5 h-5 mr-2" />
                                        <span>{location.location[i18n.language]}</span>
                                    </div>
                                    <div className="flex items-center text-[#086E5D] mb-2">
                                        <Calendar className="w-5 h-5 mr-2" />
                                        <span>{location.duration[i18n.language]}</span>
                                    </div>
                                    <div className="flex items-center text-[#086E5D] mb-2">
                                        <Star className="w-5 h-5 mr-2 text-[#D4A017]" />
                                        <span>{location.rating}</span>
                                    </div>
                                    <div className="text-[#D4A017] font-bold mb-4">{location.price}</div>
                                    <p className="text-[#1A2A44] mb-4">{location.description[i18n.language]}</p>
                                    <div className="flex space-x-4">
                                        <motion.button
                                            className="bg-[#086E5D] text-[#F5F9FF] px-4 py-2 rounded-full font-medium hover:bg-[#D4A017] transition-all"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => {
                                                setSelectedLocation(location);
                                                setShowBooking(true);
                                            }}
                                        >
                                            {t('bookNow')}
                                        </motion.button>
                                        <motion.button
                                            className="bg-[#1A2A44]/10 text-[#1A2A44] px-4 py-2 rounded-full font-medium hover:bg-[#1A2A44]/20 transition-all"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            360° Tour
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Booking Modal */}
            <AnimatePresence>
                {showBooking && (
                    <motion.div
                        className="fixed inset-0 bg-[#1A2A44]/50 backdrop-blur-sm z-50 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div
                            className="bg-[#F5F9FF]/90 backdrop-blur-sm rounded-xl p-8 max-w-md w-full shadow-lg border border-[#086E5D]/20"
                            initial={{ scale: 0.9, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <h3 className="text-2xl font-bold text-[#1A2A44] mb-6">{t('bookingTitle', { name: selectedLocation?.name })}</h3>
                            <input
                                type="text"
                                placeholder={t('name')}
                                className="w-full px-4 py-3 mb-4 bg-[#F5F9FF] border border-[#086E5D]/50 rounded-lg text-[#1A2A44] focus:ring-2 focus:ring-[#D4A017]"
                            />
                            <input
                                type="email"
                                placeholder={t('email')}
                                className="w-full px-4 py-3 mb-4 bg-[#F5F9FF] border border-[#086E5D]/50 rounded-lg text-[#1A2A44] focus:ring-2 focus:ring-[#D4A017]"
                            />
                            <input
                                type="date"
                                placeholder={t('date')}
                                className="w-full px-4 py-3 mb-4 bg-[#F5F9FF] border border-[#086E5D]/50 rounded-lg text-[#1A2A44] focus:ring-2 focus:ring-[#D4A017]"
                            />
                            <div className="flex justify-between">
                                <motion.button
                                    className="bg-[#086E5D] text-[#F5F9FF] px-6 py-3 rounded-full font-medium hover:bg-[#D4A017] transition-all"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setShowBooking(false)}
                                >
                                    {t('bookNow')}
                                </motion.button>
                                <motion.button
                                    className="bg-[#1A2A44]/10 text-[#1A2A44] px-6 py-3 rounded-full font-medium hover:bg-[#1A2A44]/20 transition-all"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setShowBooking(false)}
                                >
                                    Cancel
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Reviews Section */}
            <section id="reviews" className="py-24 bg-[#F5F9FF]">
                <div className="max-w-4xl mx-auto px-6">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl sm:text-5xl font-bold text-[#1A2A44] mb-6">{t('reviewsTitle')}</h2>
                        <p className="text-lg text-[#086E5D] max-w-2xl mx-auto">{t('reviewsSubtitle')}</p>
                    </motion.div>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentTestimonial}
                            className="bg-[#F5F9FF]/90 backdrop-blur-sm rounded-xl p-8 shadow-md border border-[#086E5D]/20 text-center"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.5 }}
                        >
                            <img
                                src={testimonials[currentTestimonial].image}
                                alt={testimonials[currentTestimonial].name}
                                className="w-16 h-16 rounded-full mx-auto mb-4 border-2 border-[#D4A017]/50"
                            />
                            <div className="flex justify-center mb-4">
                                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 text-[#D4A017] fill-current" />
                                ))}
                            </div>
                            <blockquote className="text-lg text-[#1A2A44] italic mb-4">"{testimonials[currentTestimonial].text[i18n.language]}"</blockquote>
                            <div className="text-[#1A2A44] font-bold">{testimonials[currentTestimonial].name}</div>
                            <div className="text-[#086E5D]">{testimonials[currentTestimonial].location[i18n.language]}</div>
                        </motion.div>
                    </AnimatePresence>
                    <div className="flex justify-center space-x-4 mt-8">
                        <motion.button
                            onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                            className="p-2 bg-[#086E5D]/10 text-[#086E5D] rounded-full hover:bg-[#086E5D]/20 transition-all"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                            onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
                            className="p-2 bg-[#086E5D]/10 text-[#086E5D] rounded-full hover:bg-[#086E5D]/20 transition-all"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <ChevronRight className="w-5 h-5" />
                        </motion.button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer id="contact" className="bg-[#1A2A44] py-16">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <div className="flex justify-center items-center space-x-3 mb-6">
                        <Mountain className="w-8 h-8 text-[#D4A017]" />
                        <span className="text-2xl font-bold text-[#F5F9FF]">LGECOTOURS</span>
                    </div>
                    <p className="text-[#F5F9FF] mb-6 max-w-md mx-auto">{t('footerText')}</p>
                    <div className="flex justify-center space-x-4 mb-8">
                        {[Facebook, Instagram, Twitter].map((Icon, index) => (
                            <a
                                key={index}
                                href="#"
                                className="p-2 bg-[#086E5D]/20 text-[#F5F9FF] rounded-full hover:bg-[#D4A017]/20 transition-all"
                            >
                                <Icon className="w-5 h-5" />
                            </a>
                        ))}
                    </div>
                    <div className="text-[#F5F9FF] text-sm">{t('footerCopyright')}</div>
                </div>
            </footer>

            {/* Floating Contact */}
            <motion.div
                className="fixed bottom-6 right-6 z-50"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
            >
                <motion.button
                    className="w-14 h-14 bg-[#086E5D] text-[#F5F9FF] rounded-full shadow-lg flex items-center justify-center hover:bg-[#D4A017] transition-all"
                    whileHover={{ scale: 1.1, boxShadow: '0 0 15px rgba(212,160,23,0.5)' }}
                    whileTap={{ scale: 0.9 }}
                >
                    <Phone className="w-6 h-6" />
                </motion.button>
            </motion.div>
        </div>
    );
}