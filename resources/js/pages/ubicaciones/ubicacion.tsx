import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
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
    X,
    ChevronDown,
    Map,
} from 'lucide-react';

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

const locations = [
    {
        name: 'Valle de la Luna',
        coordinates: { lat: -16.5667, lng: -68.0833 },
        location: 'La Paz, Bolivia',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
        rating: 4.7,
        price: '$45',
        duration: '1 día',
        category: 'Naturaleza',
        description: 'Un paisaje lunar único con formaciones rocosas esculpidas por la naturaleza. Ideal para caminatas y fotografía.'
    },
    {
        name: 'Lago Titicaca',
        coordinates: { lat: -15.9254, lng: -69.3354 },
        location: 'Copacabana, La Paz, Bolivia',
        image: 'https://i.blogs.es/48a549/gran-turismo-tm-sport_20171017140908/1366_2000.jpg',
        rating: 4.8,
        price: '$65',
        duration: '2 días',
        category: 'Cultural',
        description: 'El lago navegable más alto del mundo, hogar de comunidades aymaras y quechuas con rica historia.'
    },
    {
        name: 'Yungas Road (Camino de la Muerte)',
        coordinates: { lat: -16.3333, lng: -68.0167 },
        location: 'Yungas, La Paz, Bolivia',
        image: 'https://images.unsplash.com/photo-1503437313881-503a91226402?w=800&h=600&fit=crop',
        rating: 4.8,
        price: '$90',
        duration: '1 día',
        category: 'Aventura',
        description: 'Una emocionante ruta en bicicleta por una de las carreteras más peligrosas del mundo.'
    },
    {
        name: 'Plaza Murillo',
        coordinates: { lat: -16.4957, lng: -68.1335 },
        location: 'La Paz, Bolivia',
        image: 'https://images.unsplash.com/photo-1599999948312-4e294652e7b0?w=800&h=600&fit=crop',
        rating: 4.5,
        price: '$20',
        duration: '1 día',
        category: 'Cultural',
        description: 'El corazón histórico de La Paz, rodeado por el Palacio Quemado y la Catedral.'
    },
    {
        name: 'Huayna Potosí',
        coordinates: { lat: -16.2667, lng: -68.1500 },
        location: 'La Paz, Bolivia',
        image: 'https://images.unsplash.com/photo-1549887534-b7e072e85caa?w=800&h=600&fit=crop',
        rating: 4.9,
        price: '$150',
        duration: '3 días',
        category: 'Aventura',
        description: 'Un nevado ideal para montañismo, con vistas espectaculares y glaciares.'
    },
    {
        name: 'Calle Jaén',
        coordinates: { lat: -16.4938, lng: -68.1354 },
        location: 'La Paz, Bolivia',
        image: 'https://images.unsplash.com/photo-1599999948312-4e294652e7b0?w=800&h=600&fit=crop',
        rating: 4.6,
        price: '$25',
        duration: '1 día',
        category: 'Cultural',
        description: 'Una calle colonial con museos y un ambiente histórico vibrante.'
    },
    {
        name: 'Parque Nacional Madidi',
        coordinates: { lat: -14.5667, lng: -67.9167 },
        location: 'La Paz, Bolivia',
        image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
        rating: 4.9,
        price: '$120',
        duration: '4 días',
        category: 'Naturaleza',
        description: 'Una de las áreas con mayor biodiversidad en el mundo, ideal para ecoturismo.'
    },
    {
        name: 'Mirador Killi Killi',
        coordinates: { lat: -16.4940, lng: -68.1390 },
        location: 'La Paz, Bolivia',
        image: 'https://images.unsplash.com/photo-1599999948312-4e294652e7b0?w=800&h=600&fit=crop',
        rating: 4.7,
        price: '$15',
        duration: '1 día',
        category: 'Naturaleza',
        description: 'Un mirador con vistas panorámicas de La Paz y los nevados circundantes.'
    },
    {
        name: 'Tiwanaku',
        coordinates: { lat: -16.5547, lng: -68.6735 },
        location: 'La Paz, Bolivia',
        image: 'https://images.unsplash.com/photo-1574191105771-1975c3e508d0?w=800&h=600&fit=crop',
        rating: 4.8,
        price: '$60',
        duration: '1 día',
        category: 'Cultural',
        description: 'Un sitio arqueológico Patrimonio de la Humanidad, con la Puerta del Sol.'
    },
    {
        name: 'Chacaltaya',
        coordinates: { lat: -16.3500, lng: -68.1333 },
        location: 'La Paz, Bolivia',
        image: 'https://images.unsplash.com/photo-1549887534-b7e072e85caa?w=800&h=600&fit=crop',
        rating: 4.5,
        price: '$50',
        duration: '1 día',
        category: 'Aventura',
        description: 'Un antiguo centro de esquí con vistas impresionantes, ideal para trekking.'
    }
];

export default function ModernTourismWebsite() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState('Todos');
    const [costFilter, setCostFilter] = useState('Todos');
    const [durationFilter, setDurationFilter] = useState('Todos');
    const [showMap, setShowMap] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
        }, 8000);
        return () => clearInterval(interval);
    }, [heroImages.length]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [testimonials.length]);

    const { scrollY: statsScrollY } = useScroll();
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

    const navItems = ['Inicio', 'Destinos', 'Lugares', 'Servicios', 'Testimonios', 'Contacto'];

    const handlePrev = () => {
        setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const handleNext = () => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    };

    const filterDestinations = () => {
        let filtered = locations;

        if (activeFilter !== 'Todos') {
            filtered = filtered.filter(dest => dest.category === activeFilter);
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
                if (durationFilter === '1 día') return dest.duration === '1 día';
                if (durationFilter === '2-3 días') return ['2 días', '3 días'].includes(dest.duration);
                if (durationFilter === '4+ días') return dest.duration === '4 días';
                return true;
            });
        }

        return filtered;
    };

    const filteredLocations = filterDestinations();

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
            <section id="inicio" className="relative h-screen flex items-center justify-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentImageIndex}
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${heroImages[currentImageIndex].src})` }}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30" />
                    </motion.div>
                </AnimatePresence>
                <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
                    <motion.h1
                        className="text-4xl sm:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {heroImages[currentImageIndex].title}
                    </motion.h1>
                    <motion.p
                        className="text-xl sm:text-2xl mb-8 font-medium"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        {heroImages[currentImageIndex].subtitle}
                    </motion.p>
                    <motion.p
                        className="text-lg sm:text-xl mb-10 max-w-xl mx-auto"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        {heroImages[currentImageIndex].description}
                    </motion.p>
                    <motion.button
                        className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-full font-semibold text-lg uppercase tracking-wide hover:shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                    >
                        Explora Ahora
                    </motion.button>
                </div>
            </section>

            {/* Stats Section */}
            <section id="stats" className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                className="text-center bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-slate-200/30"
                                variants={itemVariants}
                                style={{ opacity, y: yTransform }}
                            >
                                <motion.div
                                    className="mb-4 flex justify-center"
                                    animate={{ scale: [1, 1.05, 1] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                >
                                    <stat.icon className="w-12 h-12 text-emerald-500" />
                                </motion.div>
                                <h3 className="text-3xl font-bold text-slate-800 mb-2">{stat.number}</h3>
                                <p className="text-slate-600">{stat.label}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Services Section */}
            <section id="servicios" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-6">
                            Nuestros Servicios
                        </h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                            Experiencias personalizadas para cada tipo de viajero
                        </p>
                    </motion.div>
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                className="relative bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-2xl text-center shadow-lg border border-slate-200/20 overflow-hidden group"
                                variants={itemVariants}
                            >
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    animate={{ scale: [1, 1.02, 1] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                />
                                <service.icon className="w-12 h-12 text-emerald-500 mx-auto mb-6 relative z-10" />
                                <h3 className="text-xl font-bold text-slate-800 mb-4 relative z-10">{service.title}</h3>
                                <p className="text-slate-600 relative z-10">{service.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Locations Section */}
            <section id="lugares" className="relative py-24 bg-gradient-to-br from-emerald-50 to-teal-50 overflow-hidden">
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
                            {['Lugares', 'Turísticos', 'de La Paz'].map((word, idx) => (
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
                            Descubre los destinos más impresionantes de La Paz, desde paisajes naturales hasta sitios culturales históricos.
                        </motion.p>
                    </motion.div>

                    {/* Filters */}
                    <motion.div
                        className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="relative">
                            <select
                                className="appearance-none bg-white/80 backdrop-blur-md border border-slate-200/30 rounded-full px-6 py-3 text-slate-700 font-medium focus:ring-2 focus:ring-emerald-500 pr-10"
                                value={activeFilter}
                                onChange={(e) => setActiveFilter(e.target.value)}
                            >
                                <option>Todos</option>
                                <option>Aventura</option>
                                <option>Cultural</option>
                                <option>Naturaleza</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500" />
                        </div>
                        <div className="relative">
                            <select
                                className="appearance-none bg-white/80 backdrop-blur-md border border-slate-200/30 rounded-full px-6 py-3 text-slate-700 font-medium focus:ring-2 focus:ring-emerald-500 pr-10"
                                value={costFilter}
                                onChange={(e) => setCostFilter(e.target.value)}
                            >
                                <option>Todos</option>
                                <option>Bajo ($0-$50)</option>
                                <option>Medio ($51-$100)</option>
                                <option>Alto ($101+)</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500" />
                        </div>
                        <div className="relative">
                            <select
                                className="appearance-none bg-white/80 backdrop-blur-md border border-slate-200/30 rounded-full px-6 py-3 text-slate-700 font-medium focus:ring-2 focus:ring-emerald-500 pr-10"
                                value={durationFilter}
                                onChange={(e) => setDurationFilter(e.target.value)}
                            >
                                <option>Todos</option>
                                <option>1 día</option>
                                <option>2-3 días</option>
                                <option>4+ días</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500" />
                        </div>
                        <motion.button
                            onClick={() => setShowMap(!showMap)}
                            className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-full font-medium flex items-center space-x-2"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Map className="w-5 h-5" />
                            <span>{showMap ? 'Ocultar Mapa' : 'Ver Mapa'}</span>
                        </motion.button>
                    </motion.div>

                    {/* Map Placeholder */}
                    <AnimatePresence>
                        {showMap && (
                            <motion.div
                                className="mb-12 bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-slate-200/30"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: '400px' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="h-full w-full flex items-center justify-center bg-slate-100 rounded-xl">
                                    <p className="text-slate-600 text-lg">
                                        Mapa interactivo de La Paz (Integrar Leaflet o Google Maps con coordenadas: {filteredLocations.map(loc => `${loc.name}: ${loc.coordinates.lat}, ${loc.coordinates.lng}`).join('; ')})
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Locations Grid */}
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {filteredLocations.map((location, index) => (
                            <motion.div
                                key={index}
                                className="relative bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/30 overflow-hidden group"
                                variants={itemVariants}
                                whileHover={{ scale: 1.03, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)' }}
                            >
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    animate={{ scale: [1, 1.02, 1] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                />
                                <img
                                    src={location.image}
                                    alt={location.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-6 relative z-10">
                                    <h3 className="text-xl font-bold text-slate-800 mb-2">{location.name}</h3>
                                    <div className="flex items-center text-slate-600 mb-2">
                                        <MapPin className="w-5 h-5 mr-2" />
                                        <span>{location.location}</span>
                                    </div>
                                    <div className="flex items-center text-slate-600 mb-2">
                                        <Map className="w-5 h-5 mr-2" />
                                        <span>Lat: {location.coordinates.lat}, Lng: {location.coordinates.lng}</span>
                                    </div>
                                    <div className="flex items-center text-slate-600 mb-2">
                                        <Calendar className="w-5 h-5 mr-2" />
                                        <span>{location.duration}</span>
                                    </div>
                                    <div className="flex items-center text-slate-600 mb-2">
                                        <Star className="w-5 h-5 mr-2 text-yellow-400" />
                                        <span>{location.rating}</span>
                                    </div>
                                    <div className="text-emerald-600 font-bold mb-4">{location.price}</div>
                                    <p className="text-slate-600 mb-4">{location.description}</p>
                                    <motion.button
                                        className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-2 rounded-full font-medium flex items-center space-x-2"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <span>Explorar</span>
                                        <ArrowRight className="w-5 h-5" />
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Destinations Section */}
            <section id="destinos" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-6">
                            Destinos Populares
                        </h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                            Explora los lugares más impresionantes de Bolivia
                        </p>
                    </motion.div>
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {destinations.map((dest, index) => (
                            <motion.div
                                key={dest.id}
                                className="relative bg-white rounded-2xl shadow-lg overflow-hidden group"
                                variants={itemVariants}
                                whileHover={{ scale: 1.03, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)' }}
                            >
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                />
                                <img
                                    src={dest.image}
                                    alt={dest.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-6 relative">
                                    <h3 className="text-xl font-bold text-slate-800 mb-2">{dest.name}</h3>
                                    <div className="flex items-center text-slate-600 mb-2">
                                        <MapPin className="w-5 h-5 mr-2" />
                                        <span>{dest.location}</span>
                                    </div>
                                    <div className="flex items-center text-slate-600 mb-2">
                                        <Calendar className="w-5 h-5 mr-2" />
                                        <span>{dest.duration}</span>
                                    </div>
                                    <div className="flex items-center text-slate-600 mb-2">
                                        <Star className="w-5 h-5 mr-2 text-yellow-400" />
                                        <span>{dest.rating}</span>
                                    </div>
                                    <div className="text-emerald-600 font-bold mb-4">{dest.price}</div>
                                    <motion.button
                                        className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-2 rounded-full font-medium flex items-center space-x-2"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <span>Explorar</span>
                                        <ArrowRight className="w-5 h-5" />
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Testimonials Section */}
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
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                            index === currentTestimonial
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

            {/* Footer */}
            <footer className="bg-slate-900 text-white py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
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

                        <div>
                            <h3 className="text-lg font-bold mb-4">Enlaces Rápidos</h3>
                            <ul className="space-y-2">
                                {['Inicio', 'Destinos', 'Lugares', 'Servicios', 'Sobre Nosotros', 'Contacto'].map((link) => (
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