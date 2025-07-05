import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import {
    Star,
    MapPin,
    Calendar,
    Users,
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
} from 'lucide-react';

const heroImages = [
    {
        src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop',
        title: 'Explora Bolivia',
        subtitle: 'Aventuras Futuristas',
        description: 'Viajes que trascienden el tiempo'
    },
    {
        src: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=1920&h=1080&fit=crop',
        title: 'Salar de Uyuni',
        subtitle: 'Un portal al infinito',
        description: 'Reflejos que desafían la realidad'
    },
    {
        src: 'https://images.unsplash.com/photo-1574191105771-1975c3e508d0?w=1920&h=1080&fit=crop',
        title: 'Lago Titicaca',
        subtitle: 'Orígenes cósmicos',
        description: 'Conexión con el alma ancestral'
    },
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
        description: 'Un paisaje lunar que desafía la imaginación con formaciones únicas.'
    },
    {
        name: 'Lago Titicaca',
        coordinates: { lat: -15.9254, lng: -69.3354 },
        location: 'Copacabana, La Paz, Bolivia',
        image: 'https://images.unsplash.com/photo-1574191105771-1975c3e508d0?w=800&h=600&fit=crop',
        rating: 4.8,
        price: '$65',
        duration: '2 días',
        category: 'Cultural',
        description: 'El lago navegable más alto, hogar de culturas milenarias.'
    },
    {
        name: 'Yungas Road',
        coordinates: { lat: -16.3333, lng: -68.0167 },
        location: 'Yungas, La Paz, Bolivia',
        image: 'https://images.unsplash.com/photo-1503437313881-503a91226402?w=800&h=600&fit=crop',
        rating: 4.8,
        price: '$90',
        duration: '1 día',
        category: 'Aventura',
        description: 'Una adrenalínica ruta en bicicleta por un camino legendario.'
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
        description: 'El corazón histórico de La Paz, lleno de historia y cultura.'
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
        description: 'Un desafío de montañismo con vistas espectaculares.'
    },
];

const testimonials = [
    {
        name: 'Lucía Vargas',
        location: 'Chile',
        text: 'Una experiencia que redefine viajar. El Salar de Uyuni fue como estar en otro planeta.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
    },
    {
        name: 'Alex Müller',
        location: 'Alemania',
        text: 'LGECOTOURS llevó mi aventura a otro nivel. La organización fue impecable.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
];

export default function FuturisticTourismWebsite() {
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
        }, 7000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const { scrollY: locationsScrollY } = useScroll();
    const opacity = useTransform(locationsScrollY, [400, 600], [0.7, 1]);
    const yTransform = useTransform(locationsScrollY, [400, 600], [50, 0]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                ease: 'easeOut'
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50, rotateX: -15 },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                duration: 0.8,
                type: 'spring',
                stiffness: 100,
                damping: 20
            }
        }
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
        <div className="relative min-h-screen bg-[#1E1B4B] font-sans text-[#F1F5F9]">
            {/* Navigation */}
            <motion.nav
                className="fixed top-4 right-4 z-50"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <button
                    className="w-12 h-12 bg-[#6B46C1]/80 backdrop-blur-md rounded-full flex items-center justify-center text-[#F1F5F9] hover:bg-[#3B82F6] transition-all"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            className="absolute top-16 right-0 bg-[#1E1B4B]/95 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-[#6B46C1]/30"
                            initial={{ opacity: 0, scale: 0.8, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: -20 }}
                            transition={{ duration: 0.4 }}
                        >
                            {['Inicio', 'Lugares', 'Testimonios', 'Contacto'].map((item, index) => (
                                <motion.a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    className="block text-[#F1F5F9] hover:text-[#EC4899] font-semibold text-lg py-2 px-4 rounded-lg transition-all"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item}
                                </motion.a>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>

            {/* Hero Section */}
            <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden">
                <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-[#1E1B4B]/80 to-[#3B82F6]/20"
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 5, repeat: Infinity }}
                />
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentImageIndex}
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${heroImages[currentImageIndex].src})` }}
                        initial={{ opacity: 0, scale: 1.2 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.2 }}
                        transition={{ duration: 1.5, ease: 'easeInOut' }}
                    />
                </AnimatePresence>
                <motion.div
                    className="relative z-10 text-center max-w-4xl mx-auto px-6"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    <motion.h1
                        className="text-5xl sm:text-7xl font-extrabold text-[#F1F5F9] mb-6 tracking-tight drop-shadow-lg"
                        animate={{ textShadow: ['0 0 10px #EC4899', '0 0 20px #3B82F6', '0 0 10px #EC4899'] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    >
                        {heroImages[currentImageIndex].title}
                    </motion.h1>
                    <motion.p
                        className="text-xl sm:text-2xl mb-8 font-medium text-[#A78BFA]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        {heroImages[currentImageIndex].subtitle}
                    </motion.p>
                    <motion.button
                        className="bg-[#6B46C1] text-[#F1F5F9] px-8 py-4 rounded-full font-semibold text-lg uppercase tracking-wide shadow-lg hover:bg-[#EC4899] transition-all"
                        whileHover={{ scale: 1.1, boxShadow: '0 0 15px #EC4899' }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Embárcate
                    </motion.button>
                </motion.div>
            </section>

            {/* Locations Section */}
            <section id="lugares" className="relative py-24 bg-[#1E1B4B] overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1472214103451-9374bd1c798e')] bg-cover bg-center opacity-10" />
                <div className="max-w-7xl mx-auto px-6 sm:px-8">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, type: 'spring', stiffness: 100 }}
                    >
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#F1F5F9] mb-6 tracking-tight">
                            {['Lugares', 'de La Paz'].map((word, idx) => (
                                <motion.span
                                    key={idx}
                                    initial={{ opacity: 0, rotateY: 90 }}
                                    whileInView={{ opacity: 1, rotateY: 0 }}
                                    transition={{ duration: 0.6, delay: idx * 0.3 }}
                                    className="inline-block"
                                >
                                    {word} 
                                </motion.span>
                            ))}
                        </h2>
                        <motion.p
                            className="text-lg sm:text-xl text-[#A78BFA] max-w-3xl mx-auto leading-relaxed"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            Explora los destinos más vibrantes de La Paz con un toque futurista.
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
                            { label: 'Categoría', value: activeFilter, setter: setActiveFilter, options: ['Todos', 'Aventura', 'Cultural', 'Naturaleza'] },
                            { label: 'Costo', value: costFilter, setter: setCostFilter, options: ['Todos', 'Bajo ($0-$50)', 'Medio ($51-$100)', 'Alto ($101+)'] },
                            { label: 'Duración', value: durationFilter, setter: setDurationFilter, options: ['Todos', '1 día', '2-3 días', '4+ días'] },
                        ].map((filter, idx) => (
                            <motion.div
                                key={filter.label}
                                className="relative"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                            >
                                <select
                                    className="bg-[#2D2A6E]/80 backdrop-blur-md border border-[#6B46C1]/50 rounded-full px-6 py-3 text-[#F1F5F9] font-medium focus:ring-2 focus:ring-[#EC4899] pr-10 hover:bg-[#3B82F6]/50 transition-all"
                                    value={filter.value}
                                    onChange={(e) => filter.setter(e.target.value)}
                                >
                                    {filter.options.map(opt => (
                                        <option key={opt} value={opt} className="bg-[#1E1B4B] text-[#F1F5F9]">{opt}</option>
                                    ))}
                                </select>
                                <ChevronRight className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#A78BFA]" />
                            </motion.div>
                        ))}
                        <motion.button
                            onClick={() => setShowMap(!showMap)}
                            className="bg-[#6B46C1] text-[#F1F5F9] px-6 py-3 rounded-full font-medium flex items-center space-x-2 hover:bg-[#EC4899] transition-all"
                            whileHover={{ scale: 1.05, boxShadow: '0 0 15px #EC4899' }}
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
                                className="mb-12 bg-[#2D2A6E]/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-[#6B46C1]/50"
                                initial={{ opacity: 0, height: 0, rotateX: -15 }}
                                animate={{ opacity: 1, height: '400px', rotateX: 0 }}
                                exit={{ opacity: 0, height: 0, rotateX: -15 }}
                                transition={{ duration: 0.7, type: 'spring' }}
                            >
                                <div className="h-full w-full flex items-center justify-center bg-[#1E1B4B]/50 rounded-xl">
                                    <p className="text-[#A78BFA] text-lg">
                                        Mapa 3D interactivo de La Paz (Integrar Three.js con coordenadas: {filteredLocations.map(loc => `${loc.name}: ${loc.coordinates.lat}, ${loc.coordinates.lng}`).join('; ')})
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
                        style={{ opacity, y: yTransform }}
                    >
                        {filteredLocations.map((location, index) => (
                            <Tilt key={index} tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.05} transitionSpeed={500}>
                                <motion.div
                                    className="relative bg-[#2D2A6E]/90 backdrop-blur-md rounded-2xl shadow-lg border border-[#6B46C1]/50 overflow-hidden"
                                    variants={itemVariants}
                                >
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-br from-[#6B46C1]/20 to-[#3B82F6]/20"
                                        animate={{ opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                    />
                                    <img
                                        src={location.image}
                                        alt={location.name}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-6 relative z-10">
                                        <h3 className="text-xl font-bold text-[#F1F5F9] mb-2">{location.name}</h3>
                                        <div className="flex items-center text-[#A78BFA] mb-2">
                                            <MapPin className="w-5 h-5 mr-2" />
                                            <span>{location.location}</span>
                                        </div>
                                        <div className="flex items-center text-[#A78BFA] mb-2">
                                            <Map className="w-5 h-5 mr-2" />
                                            <span>Lat: {location.coordinates.lat}, Lng: {location.coordinates.lng}</span>
                                        </div>
                                        <div className="flex items-center text-[#A78BFA] mb-2">
                                            <Calendar className="w-5 h-5 mr-2" />
                                            <span>{location.duration}</span>
                                        </div>
                                        <div className="flex items-center text-[#A78BFA] mb-2">
                                            <Star className="w-5 h-5 mr-2 text-[#EC4899]" />
                                            <span>{location.rating}</span>
                                        </div>
                                        <div className="text-[#EC4899] font-bold mb-4">{location.price}</div>
                                        <p className="text-[#A78BFA] mb-4">{location.description}</p>
                                        <motion.button
                                            className="bg-[#6B46C1] text-[#F1F5F9] px-6 py-2 rounded-full font-medium flex items-center space-x-2 hover:bg-[#EC4899] transition-all"
                                            whileHover={{ scale: 1.05, boxShadow: '0 0 15px #EC4899' }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <span>Explorar</span>
                                            <ChevronRight className="w-5 h-5" />
                                        </motion.button>
                                    </div>
                                </motion.div>
                            </Tilt>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonios" className="relative py-24 bg-[#1E1B4B] overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1472214103451-9374bd1c798e')] bg-cover bg-center opacity-10" />
                <div className="max-w-4xl mx-auto px-6 sm:px-8">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, type: 'spring' }}
                    >
                        <h2 className="text-4xl sm:text-5xl font-extrabold text-[#F1F5F9] mb-6 tracking-tight">
                            Voces de Viajeros
                        </h2>
                        <motion.p
                            className="text-lg sm:text-xl text-[#A78BFA] max-w-2xl mx-auto"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            Historias que resuenan desde los confines de Bolivia.
                        </motion.p>
                    </motion.div>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentTestimonial}
                            className="relative bg-[#2D2A6E]/90 backdrop-blur-md rounded-2xl p-8 text-center shadow-lg border border-[#6B46C1]/50"
                            initial={{ opacity: 0, x: 100, rotateY: 15 }}
                            animate={{ opacity: 1, x: 0, rotateY: 0 }}
                            exit={{ opacity: 0, x: -100, rotateY: -15 }}
                            transition={{ duration: 0.7, type: 'spring' }}
                        >
                            <motion.img
                                src={testimonials[currentTestimonial].image}
                                alt={testimonials[currentTestimonial].name}
                                className="w-20 h-20 rounded-full mx-auto mb-6 shadow-lg border-2 border-[#EC4899]/50"
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
                                    <Star key={i} className="w-6 h-6 text-[#EC4899] fill-current" />
                                ))}
                            </motion.div>
                            <blockquote className="text-xl text-[#F1F5F9] italic mb-6">
                                "{testimonials[currentTestimonial].text}"
                            </blockquote>
                            <div className="text-lg font-bold text-[#F1F5F9]">{testimonials[currentTestimonial].name}</div>
                            <div className="text-[#A78BFA]">{testimonials[currentTestimonial].location}</div>
                        </motion.div>
                    </AnimatePresence>
                    <div className="flex justify-center space-x-4 mt-8">
                        <motion.button
                            onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                            className="p-3 bg-[#6B46C1]/80 rounded-full text-[#F1F5F9] hover:bg-[#EC4899] transition-all"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </motion.button>
                        <motion.button
                            onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
                            className="p-3 bg-[#6B46C1]/80 rounded-full text-[#F1F5F9] hover:bg-[#EC4899] transition-all"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <ChevronRight className="w-6 h-6" />
                        </motion.button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#1E1B4B] py-16">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <motion.div
                        className="flex justify-center items-center space-x-3 mb-6"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="w-10 h-10 bg-[#6B46C1] rounded-full flex items-center justify-center">
                            <Mountain className="w-6 h-6 text-[#F1F5F9]" />
                        </div>
                        <span className="text-2xl font-bold text-[#EC4899]">LGECOTOURS</span>
                    </motion.div>
                    <p className="text-[#A78BFA] mb-6 max-w-md mx-auto">
                        Viajes que conectan con el alma de Bolivia en un universo de aventuras.
                    </p>
                    <div className="flex justify-center space-x-4 mb-8">
                        {[Facebook, Instagram, Twitter].map((Icon, index) => (
                            <motion.a
                                key={index}
                                href="#"
                                className="p-2 bg-[#2D2A6E] rounded-full text-[#F1F5F9] hover:bg-[#EC4899] transition-all"
                                whileHover={{ scale: 1.2, rotate: 360 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Icon className="w-5 h-5" />
                            </motion.a>
                        ))}
                    </div>
                    <div className="text-[#A78BFA] text-sm">
                        © 2025 LGECOTOURS Bolivia. Todos los derechos reservados.
                    </div>
                </div>
            </footer>

            {/* Floating WhatsApp Button */}
            <motion.div
                className="fixed bottom-6 right-6 z-50"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: 'spring', stiffness: 200 }}
            >
                <motion.button
                    className="w-16 h-16 bg-[#EC4899] text-[#F1F5F9] rounded-full shadow-lg flex items-center justify-center"
                    whileHover={{ scale: 1.2, boxShadow: '0 0 20px #EC4899' }}
                    whileTap={{ scale: 0.9 }}
                    animate={{ rotate: [0, 360], transition: { duration: 5, repeat: Infinity, ease: 'linear' } }}
                >
                    <Phone className="w-6 h-6" />
                </motion.button>
            </motion.div>
        </div>
    );
}