import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Star,
    MapPin,
    Calendar,
    Users,
    Phone,
    Mail,
    Instagram,
    Facebook,
    Twitter,
    ChevronLeft,
    ChevronRight,
    Play,
    Award,
    Camera,
    Mountain,
    Plane,
    Shield,
    Clock,
    Heart,
    ArrowRight,
    Menu,
    X
} from 'lucide-react';
import { useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const heroImages = [
    {
        src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop',
        title: 'Descubre Bolivia',
        subtitle: 'Aventuras que transforman vidas',
        description: 'Explora paisajes únicos en el mundo'
    },
    {
        src: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=1920&h=1080&fit=crop',
        title: 'Salar de Uyuni',
        subtitle: 'El espejo del cielo',
        description: 'Una experiencia mágica e inolvidable'
    },
    {
        src: 'https://i.blogs.es/48a549/gran-turismo-tm-sport_20171017140908/1366_2000.jpg',
        title: 'Lago Titicaca',
        subtitle: 'Cultura ancestral viva',
        description: 'Conecta con tradiciones milenarias'
    },
];

const destinations = [
    {
        id: 1,
        name: 'Salar de Uyuni',
        location: 'Potosí, Bolivia',
        image: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=800&h=600&fit=crop',
        rating: 4.9,
        price: '$89',
        duration: '3 días',
        category: 'Aventura',
    },
    {
        id: 2,
        name: 'Lago Titicaca',
        location: 'La Paz, Bolivia',
        image: 'https://i.blogs.es/48a549/gran-turismo-tm-sport_20171017140908/1366_2000.jpg',
        rating: 4.8,
        price: '$65',
        duration: '2 días',
        category: 'Cultural',
    },
    {
        id: 3,
        name: 'Valle de la Luna',
        location: 'La Paz, Bolivia',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
        rating: 4.7,
        price: '$45',
        duration: '1 día',
        category: 'Naturaleza',
    },
    {
        id: 4,
        name: 'Parque Madidi',
        location: 'La Paz, Bolivia',
        image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
        rating: 4.9,
        price: '$120',
        duration: '4 días',
        category: 'Aventura',
    },
    {
        id: 5,
        name: 'Cristo de la Concordia',
        location: 'Cochabamba, Bolivia',
        image: 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Cristo_de_la_Concordia%2C_Cochabamba.jpg',
        rating: 4.6,
        price: '$35',
        duration: '1 día',
        category: 'Cultural',
    },
    {
        id: 6,
        name: 'Samaipata',
        location: 'Santa Cruz, Bolivia',
        image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop',
        rating: 4.8,
        price: '$80',
        duration: '2 días',
        category: 'Historia',
    },
    {
        id: 7,
        name: 'Torotoro',
        location: 'Potosí, Bolivia',
        image: 'https://images.unsplash.com/photo-1542044801-2872edbd3ad2?w=800&h=600&fit=crop',
        rating: 4.7,
        price: '$95',
        duration: '3 días',
        category: 'Naturaleza',
    },
    {
        id: 8,
        name: 'Chacaltaya',
        location: 'La Paz, Bolivia',
        image: 'https://images.unsplash.com/photo-1549887534-b7e072e85caa?w=800&h=600&fit=crop',
        rating: 4.5,
        price: '$50',
        duration: '1 día',
        category: 'Aventura',
    },
    {
        id: 9,
        name: 'Isla del Sol',
        location: 'Lago Titicaca, Bolivia',
        image: 'https://images.unsplash.com/photo-1574191105771-1975c3e508d0?w=800&h=600&fit=crop',
        rating: 4.9,
        price: '$70',
        duration: '2 días',
        category: 'Cultural',
    },
    {
        id: 10,
        name: 'Yungas Road (Camino de la Muerte)',
        location: 'La Paz, Bolivia',
        image: 'https://images.unsplash.com/photo-1503437313881-503a91226402?w=800&h=600&fit=crop',
        rating: 4.8,
        price: '$90',
        duration: '1 día',
        category: 'Aventura',
    },
];


const testimonials = [
    {
        name: 'María González',
        location: 'España',
        text: 'Una experiencia increíble. El Salar de Uyuni superó todas mis expectativas. El equipo de LGECOTOURS fue excepcional.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
    },
    {
        name: 'John Smith',
        location: 'Estados Unidos',
        text: 'Bolivia es un destino fascinante. Cada día fue una nueva aventura. Recomiendo totalmente esta agencia.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
    {
        name: 'Sophie Laurent',
        location: 'Francia',
        text: 'El profesionalismo y la atención al detalle fueron extraordinarios. Una experiencia que recordaré para siempre.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
    }
];

const services = [
    {
        icon: Mountain,
        title: 'Tours de Aventura',
        description: 'Expediciones emocionantes a destinos únicos'
    },
    {
        icon: Camera,
        title: 'Tours Fotográficos',
        description: 'Captura los mejores momentos con guías especializados'
    },
    {
        icon: Users,
        title: 'Grupos Personalizados',
        description: 'Experiencias diseñadas para tu grupo'
    },
    {
        icon: Shield,
        title: 'Viajes Seguros',
        description: 'Protocolos de seguridad de primera clase'
    }
];

export default function ModernTourismWebsite() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState('Todos');

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
        }, 8000);
        return () => clearInterval(interval);
    }, [heroImages.length]);


    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);


    const { scrollY: statsScrollY } = useScroll(); // Renamed to avoid conflict
    const opacity = useTransform(statsScrollY, [200, 400], [0.7, 1]);
    const yTransform = useTransform(statsScrollY, [200, 400], [50, 0]);

    const stats = [
        { number: '500+', label: 'Viajeros Felices', icon: Users },
        { number: '50+', label: 'Destinos Únicos', icon: MapPin },
        { number: '10+', label: 'Años de Experiencia', icon: Clock },
        { number: '4.9', label: 'Calificación Promedio', icon: Star }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                ease: [0.16, 1, 0.3, 1]
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1]
            }
        }
    };

    const parallaxVariants = {
        initial: { y: 0 },
        animate: {
            y: [-10, 10, -10],
            transition: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };
    const { scrollY } = useScroll();
    const backgroundOpacity = useTransform(scrollY, [0, 100], [0.95, 1]);
    const shadowOpacity = useTransform(scrollY, [0, 100], [0, 0.3]);

    const navItems = ['Inicio', 'Destinos', 'Servicios', 'Testimonios', 'Contacto'];

    const { scrollY: destinationsScrollY } = useScroll();
    const filteredDestinations = activeFilter === 'Todos'
        ? destinations
        : destinations.filter(dest => dest.category === activeFilter);
    // Auto-rotate testimonials
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [testimonials.length]);

    const handlePrev = () => {
        setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const handleNext = () => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 font-sans">
            {/* Navegación */}
            <motion.nav
                className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200/30"
                style={{
                    backgroundColor: useTransform(scrollY, [0, 100], ['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 1)']),
                    boxShadow: useTransform(scrollY, [0, 100], ['none', '0 4px 6px -1px rgba(0, 0, 0, 0.3)'])
                }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo Section */}
                        <motion.div
                            className="flex items-center space-x-3"
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <div className="relative w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden">
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-br from-emerald-400/50 to-teal-500/50"
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                />
                                <Mountain className="w-7 h-7 text-white relative z-10" />
                            </div>
                            <span className="text-2xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent tracking-tight">
                                LGECOTOURS
                            </span>
                        </motion.div>

                        {/* Desktop Menu */}
                        <div className="hidden lg:flex items-center space-x-10">
                            {navItems.map((item, index) => (
                                <motion.a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    className="relative text-slate-700 text-sm font-semibold uppercase tracking-wide group"
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                                >
                                    {item}
                                    <motion.span
                                        className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                        whileHover={{ width: '100%' }}
                                    />
                                    <motion.span
                                        className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full"
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        transition={{ duration: 0.6, delay: index * 0.15 }}
                                    />
                                </motion.a>
                            ))}
                            <motion.button
                                className="relative bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-7 py-2.5 rounded-full font-semibold text-sm uppercase tracking-wide overflow-hidden group"
                                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)' }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                            >
                                <motion.span
                                    className="absolute inset-0 bg-gradient-to-r from-emerald-400/30 to-teal-400/30"
                                    animate={{ x: ['-100%', '100%'] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                />
                                <span className="relative">Reservar Ahora</span>
                            </motion.button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="lg:hidden p-2 text-slate-700 hover:text-emerald-600 transition-colors"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <motion.div
                                animate={{ rotate: isMenuOpen ? 90 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                            </motion.div>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-slate-200/30 shadow-lg"
                            initial={{ opacity: 0, height: 0, y: -20 }}
                            animate={{ opacity: 1, height: 'auto', y: 0 }}
                            exit={{ opacity: 0, height: 0, y: -20 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                        >
                            <div className="px-6 py-6 space-y-4">
                                {navItems.map((item, index) => (
                                    <motion.a
                                        key={item}
                                        href={`#${item.toLowerCase()}`}
                                        className="block text-slate-700 hover:text-emerald-600 font-semibold text-lg tracking-wide py-3 border-b border-slate-200/50"
                                        onClick={() => setIsMenuOpen(false)}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                    >
                                        {item}
                                    </motion.a>
                                ))}
                                <motion.button
                                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 rounded-full font-semibold text-base uppercase tracking-wide"
                                    whileHover={{ scale: 1.03, boxShadow: '0 0 15px rgba(16, 185, 129, 0.3)' }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Reservar Ahora
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>

            {/* Hero Section */}
            <section id="inicio" className="relative w-full h-screen flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentImageIndex}
                        className="absolute inset-0"
                        initial={{ opacity: 0, scale: 1.2 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            transition: { duration: 2, ease: [0.16, 1, 0.3, 1] }
                        }}
                        exit={{
                            opacity: 0,
                            scale: 1.1,
                            transition: { duration: 1, ease: [0.7, 0, 0.84, 0] }
                        }}
                        style={{
                            backgroundImage: `url(${heroImages[currentImageIndex].src})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',

                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70 backdrop-blur-sm" />
                    </motion.div>
                </AnimatePresence>

                <div className="relative z-20 text-center max-w-5xl mx-auto px-6 sm:px-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentImageIndex}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="space-y-8"
                        >
                            <motion.h1
                                className="text-5xl sm:text-6xl lg:text-8xl font-extrabold text-white drop-shadow-2xl leading-tight tracking-tight"
                                style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1.2, delay: 0.2 }}
                            >
                                {heroImages[currentImageIndex].title.split(' ').map((word, idx) => (
                                    <motion.span
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: idx * 0.1 }}
                                        className="inline-block"
                                    >
                                        {word}&nbsp;
                                    </motion.span>
                                ))}
                            </motion.h1>
                            <motion.p
                                className="text-xl sm:text-2xl lg:text-3xl text-white/90 drop-shadow-lg font-medium"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                            >
                                {heroImages[currentImageIndex].subtitle}
                            </motion.p>
                            <motion.p
                                className="text-base sm:text-lg text-white/80 max-w-3xl mx-auto leading-relaxed"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                            >
                                {heroImages[currentImageIndex].description}
                            </motion.p>

                            <motion.div
                                className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10"
                                initial={{
                                    opacity:

                                        0, y: 30
                                }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.8 }}
                            >
                                <motion.button
                                    className="relative bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-full font-semibold text-lg uppercase tracking-wide overflow-hidden group"
                                    whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(16, 185, 129, 0.5)' }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <motion.span
                                        className="absolute inset-0 bg-gradient-to-r from-emerald-400/30 to-teal-400/30"
                                        animate={{ x: ['-100%', '100%'] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                    />
                                    <span className="relative flex items-center space-x-2">
                                        <span>Explorar Destinos</span>
                                        <ArrowRight className="w-5 h-5" />
                                    </span>
                                </motion.button>
                                <motion.button
                                    className="relative border-2 border-white/90 text-white px-8 py-4 rounded-full font-semibold text-lg uppercase tracking-wide overflow-hidden group"
                                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)', borderColor: 'rgba(255, 255, 255, 1)' }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <motion.span
                                        className="absolute inset-0 bg-white/10"
                                        animate={{ opacity: [0, 0.3, 0] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    />
                                    <span className="relative flex items-center space-x-2">
                                        <Play className="w-5 h-5" />
                                        <span>Ver Video</span>
                                    </span>
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Indicators */}
                    <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-4">
                        {heroImages.map((_, idx) => (
                            <motion.button
                                key={idx}
                                onClick={() => setCurrentImageIndex(idx)}
                                className={`w-3 h-3 rounded-full transition-all duration-500 ${idx === currentImageIndex
                                    ? 'bg-emerald-500 scale-150 shadow-lg'
                                    : 'bg-white/50 hover:bg-white/80'
                                    }`}
                                whileHover={{ scale: 1.3 }}
                                whileTap={{ scale: 0.9 }}
                            />
                        ))}
                    </div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-10 right-10 text-white/80 hidden lg:flex flex-col items-center space-y-3"
                    animate={{ y: [0, 15, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <span className="text-sm font-semibold uppercase tracking-wide">Explora</span>
                    <motion.div
                        className="w-1 h-10 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"
                        animate={{ height: [40, 20, 40] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <ChevronDown className="w-6 h-6" />
                </motion.div>
            </section>

            {/* Estadísticas */}
            <section className="relative bg-gradient-to-b from-white to-slate-50 py-20 -mt-16 z-30 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')] bg-cover bg-center opacity-10" />
                <div className="max-w-7xl mx-auto px-6 sm:px-8">
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        style={{ opacity, y: yTransform }}
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                className="relative bg-white/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 text-center shadow-lg hover:shadow-xl transition-all duration-500 group border border-slate-200/50"
                                variants={itemVariants}
                                whileHover={{
                                    scale: 1.05,
                                    y: -5,
                                    boxShadow: '0 10px 20px rgba(16, 185, 129, 0.2)'
                                }}
                            >
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                                />
                                <motion.div
                                    className="relative flex justify-center mb-4"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.6, delay: index * 0.2 }}
                                >
                                    <stat.icon className="w-10 h-10 text-emerald-600 group-hover:text-teal-600 transition-colors duration-300" />
                                </motion.div>
                                <motion.div
                                    className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.8, delay: index * 0.3 }}
                                >
                                    {stat.number}
                                </motion.div>
                                <div className="text-slate-700 font-semibold text-lg mt-3 tracking-wide uppercase">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
            {/* Servicios */}
            <section id="servicios" className="relative py-24 bg-gradient-to-b from-white to-emerald-50/50 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1472214103451-9374bd1c798e')] bg-cover bg-center opacity-5" />
                <div className="max-w-7xl mx-auto px-6 sm:px-8">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-800 mb-6 tracking-tight">
                            {['Nuestros', 'Servicios'].map((word, idx) => (
                                <motion.span
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: idx * 0.2 }}
                                    className="inline-block"
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </h2>
                        <motion.p
                            className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            Ofrecemos experiencias únicas diseñadas para crear recuerdos inolvidables mientras cuidamos el planeta.
                        </motion.p>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        style={{ opacity, y: yTransform }}
                    >
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                className="relative bg-white/90 backdrop-blur-md rounded-2xl p-8 text-center shadow-lg border border-slate-200/30 group overflow-hidden"
                                variants={itemVariants}
                                whileHover={{
                                    scale: 1.05,
                                    y: -8,
                                    boxShadow: '0 12px 24px rgba(16, 185, 129, 0.3)'
                                }}
                                transition={{ duration: 0.5 }}
                            >
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                                    animate={{ scale: [1, 1.02, 1] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                />
                                <motion.div
                                    className="relative w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-md"
                                    initial={{ rotate: -10, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    transition={{ duration: 0.6, delay: index * 0.2 }}
                                >
                                    <service.icon className="w-8 h-8 text-white" />
                                </motion.div>
                                <motion.h3
                                    className="text-xl font-bold textslate-800 mb-4 tracking-wide uppercase"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.6, delay: index * 0.3 }}
                                >
                                    {service.title}
                                </motion.h3>
                                <p className="text-slate-600 leading-relaxed text-base">
                                    {service.description}
                                </p>
                                <motion.button
                                    className="mt-6 text-emerald-600 font-semibold text-sm uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    whileHover={{ x: 5 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Ver más
                                </motion.button>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
            {/* Destinos */}
            <section id="destinos" className="relative py-24 bg-gradient-to-b from-slate-50 to-emerald-50/30 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')] bg-cover bg-center opacity-5" />
                <div className="max-w-7xl mx-auto px-6 sm:px-8">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-800 mb-6 tracking-tight">
                            {['Destinos', 'Populares'].map((word, idx) => (
                                <motion.span
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: idx * 0.2 }}
                                    className="inline-block"
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </h2>
                        <motion.p
                            className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            Descubre los lugares más espectaculares de Bolivia, desde paisajes naturales hasta tesoros culturales.
                        </motion.p>
                        {/* Filters */}
                        <motion.div
                            className="flex flex-wrap justify-center gap-3 mt-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            {['Todos', 'Aventura', 'Cultural', 'Naturaleza'].map((filter, idx) => (
                                <motion.button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={`relative px-6 py-2.5 rounded-full font-semibold text-sm uppercase tracking-wide transition-all duration-300 ${activeFilter === filter
                                        ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg'
                                        : 'bg-white/80 backdrop-blur-md text-slate-600 hover:text-emerald-600 hover:bg-white/90 border border-slate-200/50'
                                        }`}
                                    whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(16, 185, 129, 0.3)' }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                                >
                                    <span className="relative">{filter}</span>
                                    {activeFilter === filter && (
                                        <motion.span
                                            className="absolute inset-0 bg-gradient-to-r from-emerald-400/30 to-teal-400/30"
                                            animate={{ x: ['-100%', '100%'] }}
                                            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                                        />
                                    )}
                                </motion.button>
                            ))}
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        style={{ opacity, y: yTransform }}
                    >
                        <AnimatePresence>
                            {filteredDestinations.map((destination, index) => (
                                <motion.div
                                    key={destination.id}
                                    className="relative bg-white/90 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg border border-slate-200/30 group"
                                    variants={itemVariants}
                                    layout
                                    whileHover={{
                                        scale: 1.03,
                                        y: -8,
                                        boxShadow: '0 12px 24px rgba(16, 185, 129, 0.3)'
                                    }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div className="relative overflow-hidden h-56">
                                        <motion.img
                                            src={destination.image}
                                            alt={destination.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            initial={{ scale: 1.1 }}
                                            animate={{ scale: 1 }}
                                            transition={{ duration: 1 }}
                                        />
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"
                                            initial={{ opacity: 0 }}
                                            whileHover={{ opacity: 1 }}
                                            transition={{ duration: 0.5 }}
                                        />
                                        <motion.div
                                            className="absolute top-4 left-4"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.6, delay: index * 0.2 }}
                                        >
                                            <span className="bg-emerald-500/90 text-white px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm">
                                                {destination.category}
                                            </span>
                                        </motion.div>
                                        <motion.div
                                            className="absolute top-4 right-4"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.6, delay: index * 0.2 }}
                                        >
                                            <motion.button
                                                className="w-10 h-10 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/50 transition-colors duration-300"
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                <Heart className="w-5 h-5 group-hover:fill-red-500 group-hover:text-red-500 transition-colors duration-300" />
                                            </motion.button>
                                        </motion.div>
                                    </div>

                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-3">
                                            <motion.h3
                                                className="text-xl font-bold text-slate-800 tracking-wide"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.6, delay: index * 0.3 }}
                                            >
                                                {destination.name}
                                            </motion.h3>
                                            <motion.div
                                                className="flex items-center space-x-1"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.6, delay: index * 0.3 }}
                                            >
                                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                                <span className="text-sm font-medium text-slate-600">{destination.rating}</span>
                                            </motion.div>
                                        </div>

                                        <motion.div
                                            className="flex items-center text-slate-500 mb-4"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.6, delay: index * 0.4 }}
                                        >
                                            <MapPin className="w-4 h-4 mr-1" />
                                            <span className="text-sm">{destination.location}</span>
                                        </motion.div>

                                        <motion.div
                                            className="flex items-center justify-between mb-4"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.6, delay: index * 0.5 }}
                                        >
                                            <div className="flex items-center space-x-4 text-sm text-slate-600">
                                                <div className="flex items-center">
                                                    <Clock className="w-4 h-4 mr-1" />
                                                    {destination.duration}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-2xl font-bold text-emerald-600">{destination.price}</div>
                                                <div className="text-sm text-slate-500">por persona</div>
                                            </div>
                                        </motion.div>

                                        <motion.button
                                            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 rounded-xl font-semibold text-sm uppercase tracking-wide group-hover:shadow-lg transition-all duration-300 relative overflow-hidden"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <motion.span
                                                className="absolute inset-0 bg-gradient-to-r from-emerald-400/30 to-teal-400/30"
                                                animate={{ x: ['-100%', '100%'] }}
                                                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                                            />
                                            <span className="relative">Ver Detalles</span>
                                        </motion.button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            {/* Testimonios */}
            <section id="testimonios" className="relative py-24 bg-gradient-to-br from-emerald-50 to-teal-50 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1472214103451-9374bd1c798e')] bg-cover bg-center opacity-5" />
                <div className="max-w-7xl mx-auto px-6 sm:px-8">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-800 mb-6 tracking-tight">
                            {['Nuestros', 'Viajeros'].map((word, idx) => (
                                <motion.span
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: idx * 0.2 }}
                                    className="inline-block"
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </h2>
                        <motion.p
                            className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            Experiencias reales de personas que han vivido aventuras únicas con LGECOTOURS.
                        </motion.p>
                    </motion.div>

                    <div className="relative max-w-4xl mx-auto">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentTestimonial}
                                className="relative bg-white/90 backdrop-blur-md rounded-2xl p-8 sm:p-10 text-center shadow-lg border border-slate-200/30"
                                initial={{ opacity: 0, x: 100, scale: 0.95 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: -100, scale: 0.95 }}
                                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                style={{ opacity, y: yTransform }}
                            >
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                                    animate={{ scale: [1, 1.02, 1] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                                />
                                <motion.img
                                    src={testimonials[currentTestimonial].image}
                                    alt={testimonials[currentTestimonial].name}
                                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto mb-6 shadow-xl border-2 border-emerald-500/50"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                />
                                <motion.div
                                    className="flex justify-center mb-6"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                >
                                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ duration: 0.4, delay: i * 0.1 + 0.4 }}
                                        >
                                            <Star className="w-6 h-6 text-yellow-400 fill-current" />
                                        </motion.div>
                                    ))}
                                </motion.div>
                                <motion.blockquote
                                    className="text-xl sm:text-2xl text-slate-700 italic mb-6 leading-relaxed max-w-2xl mx-auto"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.6, delay: 0.5 }}
                                >
                                    "{testimonials[currentTestimonial].text}"
                                </motion.blockquote>
                                <motion.div
                                    className="text-lg font-bold text-slate-800 tracking-wide"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.6, delay: 0.6 }}
                                >
                                    {testimonials[currentTestimonial].name}
                                </motion.div>
                                <motion.div
                                    className="text-slate-500 text-sm"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.6, delay: 0.7 }}
                                >
                                    {testimonials[currentTestimonial].location}
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation Controls */}
                        <div className="flex justify-between items-center mt-8 max-w-4xl mx-auto">
                            <motion.button
                                onClick={handlePrev}
                                className="p-3 bg-white/80 backdrop-blur-md rounded-full text-emerald-600 hover:bg-white hover:shadow-lg transition-all duration-300"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </motion.button>
                            <div className="flex space-x-2">
                                {testimonials.map((_, index) => (
                                    <motion.button
                                        key={index}
                                        onClick={() => setCurrentTestimonial(index)}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentTestimonial
                                                ? 'bg-emerald-500 scale-150 shadow-lg'
                                                : 'bg-slate-300 hover:bg-emerald-400'
                                            }`}
                                        whileHover={{ scale: 1.3 }}
                                        whileTap={{ scale: 0.9 }}
                                    />
                                ))}
                            </div>
                            <motion.button
                                onClick={handleNext}
                                className="p-3 bg-white/80 backdrop-blur-md rounded-full text-emerald-600 hover:bg-white hover:shadow-lg transition-all duration-300"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <ChevronRight className="w-6 h-6" />
                            </motion.button>
                        </div>
                    </div>
                </div>
            </section>
            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-700 relative overflow-hidden">
                <motion.div
                    className="absolute inset-0 opacity-10"
                    variants={parallaxVariants}
                    initial="initial"
                    animate="animate"
                >
                    <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
                    <div className="absolute bottom-10 right-10 w-24 h-24 bg-white rounded-full"></div>
                    <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full"></div>
                </motion.div>

                <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                            ¿Listo para tu próxima aventura?
                        </h2>
                        <p className="text-xl text-white/90 mb-8 leading-relaxed">
                            Contáctanos hoy y comienza a planear el viaje de tus sueños por Bolivia
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <motion.button
                                className="bg-white text-emerald-600 px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all duration-300 flex items-center space-x-2"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span>Planificar Mi Viaje</span>
                                <ArrowRight className="w-5 h-5" />
                            </motion.button>
                            <motion.button
                                className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-emerald-600 transition-all duration-300 flex items-center space-x-2"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Phone className="w-5 h-5" />
                                <span>Llamar Ahora</span>
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Contacto */}
            <section id="contacto" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-6">
                            Contáctanos
                        </h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                            Estamos aquí para ayudarte a planificar tu aventura perfecta
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Información de contacto */}
                        <motion.div
                            className="space-y-8"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8">
                                <h3 className="text-2xl font-bold text-slate-800 mb-6">Información de Contacto</h3>

                                <div className="space-y-6">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                                            <Phone className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-slate-800">Teléfono</div>
                                            <div className="text-slate-600">+591 2 123-4567</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                                            <Mail className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-slate-800">Email</div>
                                            <div className="text-slate-600">info@lgecotours.com</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                                            <MapPin className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-slate-800">Dirección</div>
                                            <div className="text-slate-600">Av. 16 de Julio, La Paz, Bolivia</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <h4 className="font-bold text-slate-800 mb-4">Síguenos</h4>
                                    <div className="flex space-x-4">
                                        {[
                                            { icon: Facebook, color: 'hover:text-blue-600' },
                                            { icon: Instagram, color: 'hover:text-pink-500' },
                                            { icon: Twitter, color: 'hover:text-blue-400' }
                                        ].map(({ icon: Icon, color }, index) => (
                                            <motion.button
                                                key={index}
                                                className={`w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-600 ${color} transition-colors duration-300 shadow-md hover:shadow-lg`}
                                                whileHover={{ scale: 1.1, y: -2 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                <Icon className="w-5 h-5" />
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Horarios */}
                            <div className="bg-slate-50 rounded-2xl p-8">
                                <h3 className="text-xl font-bold text-slate-800 mb-4">Horarios de Atención</h3>
                                <div className="space-y-2 text-slate-600">
                                    <div className="flex justify-between">
                                        <span>Lunes - Viernes</span>
                                        <span className="font-medium">8:00 - 18:00</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Sábados</span>
                                        <span className="font-medium">9:00 - 15:00</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Domingos</span>
                                        <span className="font-medium">Cerrado</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Formulario de contacto */}
                        <motion.div
                            className="bg-slate-50 rounded-2xl p-8"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h3 className="text-2xl font-bold text-slate-800 mb-6">Envíanos un Mensaje</h3>

                            <form className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Nombre
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-300"
                                            placeholder="Tu nombre"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-300"
                                            placeholder="tu@email.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Teléfono
                                    </label>
                                    <input
                                        type="tel"
                                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-300"
                                        placeholder="+591 123-456-789"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Destino de Interés
                                    </label>
                                    <select className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-300">
                                        <option>Selecciona un destino</option>
                                        <option>Salar de Uyuni</option>
                                        <option>Lago Titicaca</option>
                                        <option>Valle de la Luna</option>
                                        <option>Parque Madidi</option>
                                        <option>Tour Personalizado</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Mensaje
                                    </label>
                                    <textarea
                                        rows="4"
                                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-300"
                                        placeholder="Cuéntanos sobre tu viaje soñado..."
                                    ></textarea>
                                </div>

                                <motion.button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-all duration-300"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Enviar Mensaje
                                </motion.button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 text-white py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                        {/* Logo y descripción */}
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                                    <Mountain className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                                    LGECOTOURS
                                </span>
                            </div>
                            <p className="text-slate-300 leading-relaxed">
                                Tu compañía de confianza para explorar las maravillas de Bolivia.
                                Creamos experiencias únicas e inolvidables.
                            </p>
                            <div className="flex space-x-4">
                                {[Facebook, Instagram, Twitter].map((Icon, index) => (
                                    <motion.button
                                        key={index}
                                        className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-emerald-600 transition-all duration-300"
                                        whileHover={{ scale: 1.1, y: -2 }}
                                    >
                                        <Icon className="w-5 h-5" />
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* Enlaces rápidos */}
                        <div>
                            <h3 className="text-lg font-bold mb-4">Enlaces Rápidos</h3>
                            <ul className="space-y-2">
                                {['Inicio', 'Destinos', 'Servicios', 'Sobre Nosotros', 'Contacto'].map((link) => (
                                    <li key={link}>
                                        <a
                                            href={`#${link.toLowerCase()}`}
                                            className="text-slate-300 hover:text-emerald-400 transition-colors duration-300"
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Destinos */}
                        <div>
                            <h3 className="text-lg font-bold mb-4">Destinos Populares</h3>
                            <ul className="space-y-2">
                                {['Salar de Uyuni', 'Lago Titicaca', 'Valle de la Luna', 'Parque Madidi', 'Potosí'].map((dest) => (
                                    <li key={dest}>
                                        <a
                                            href="#"
                                            className="text-slate-300 hover:text-emerald-400 transition-colors duration-300"
                                        >
                                            {dest}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Newsletter */}
                        <div>
                            <h3 className="text-lg font-bold mb-4">Newsletter</h3>
                            <p className="text-slate-300 mb-4">
                                Recibe ofertas especiales y noticias de viajes
                            </p>
                            <div className="space-y-3">
                                <input
                                    type="email"
                                    placeholder="tu@email.com"
                                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-white placeholder-slate-400"
                                />
                                <motion.button
                                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Suscribirse
                                </motion.button>
                            </div>
                        </div>
                    </div>

                    {/* Línea divisoria */}
                    <div className="border-t border-slate-800 pt-8">
                        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                            <div className="text-slate-400 text-sm">
                                © 2024 LGECOTOURS Bolivia. Todos los derechos reservados.
                            </div>
                            <div className="flex items-center space-x-6 text-sm text-slate-400">
                                <a href="#" className="hover:text-emerald-400 transition-colors duration-300">
                                    Políticas de Privacidad
                                </a>
                                <a href="#" className="hover:text-emerald-400 transition-colors duration-300">
                                    Términos y Condiciones
                                </a>
                                <div className="flex items-center space-x-2">
                                    <Award className="w-4 h-4" />
                                    <span>Empresa Certificada</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Botón flotante de WhatsApp */}
            <motion.div
                className="fixed bottom-6 right-6 z-50"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring", stiffness: 200 }}
            >
                <motion.button
                    className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    animate={{
                        y: [0, -5, 0],
                        transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                >
                    <Phone className="w-6 h-6" />
                </motion.button>
            </motion.div>
        </div>
    );
}