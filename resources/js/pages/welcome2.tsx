import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';
import Tilt from 'react-parallax-tilt';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
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
} from 'lucide-react';

const heroImages = [
    {
        src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop',
        title: 'Portal a Bolivia',
        subtitle: 'Viajes interdimensionales',
        description: 'Explora un universo de maravillas'
    },
    {
        src: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=1920&h=1080&fit=crop',
        title: 'Salar de Uyuni',
        subtitle: 'Reflejo del cosmos',
        description: 'Un espejo hacia el infinito'
    },
    {
        src: 'https://images.unsplash.com/photo-1574191105771-1975c3e508d0?w=1920&h=1080&fit=crop',
        title: 'Lago Titicaca',
        subtitle: 'Origen del tiempo',
        description: 'Conexión con lo ancestral'
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
        description: 'Un paisaje extraterrestre con formaciones rocosas únicas.'
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
        description: 'El lago navegable más alto, un portal a culturas milenarias.'
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
        description: 'Una ruta de adrenalina pura en un camino legendario.'
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
        description: 'El núcleo histórico de La Paz, vibrante y lleno de historia.'
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
        description: 'Un desafío épico con vistas a glaciares imponentes.'
    },
];

const testimonials = [
    {
        name: 'Sofía Ramírez',
        location: 'Argentina',
        text: 'Un viaje que me transportó a otra dimensión. LGECOTOURS es el futuro del turismo.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
    },
    {
        name: 'Kai Nakamura',
        location: 'Japón',
        text: 'La experiencia más inmersiva que he tenido. Cada detalle fue perfecto.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
];

export default function CyberTourismWebsite() {
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

    const [particles] = useSpring(() => ({
        from: { opacity: 0 },
        to: { opacity: 1 },
        config: { duration: 2000 },
        loop: true
    }));

    return (
        <div className="relative min-h-screen bg-[#0A0033] font-sans text-[#F1F5F9]" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            {/* Particle Background */}
            <animated.div
                className="absolute inset-0 pointer-events-none"
                style={{
                    ...particles,
                    background: 'radial-gradient(circle, rgba(0,247,255,0.1) 0%, rgba(57,255,20,0.05) 50%, transparent 100%)'
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
                    className="w-14 h-14 bg-[#00F7FF]/20 backdrop-blur-md rounded-full flex items-center justify-center text-[#F1F5F9] hover:bg-[#FF007A] transition-all"
                    whileHover={{ scale: 1.2, rotate: 45 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                </motion.button>
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            className="absolute top-16 right-0 bg-[#2A0A6B]/95 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-[#00F7FF]/30"
                            initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            exit={{ opacity: 0, scale: 0.5, rotate: -45 }}
                            transition={{ duration: 0.5, type: 'spring' }}
                        >
                            {['Inicio', 'Lugares', 'Testimonios', 'Contacto'].map((item, index) => (
                                <motion.a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    className="block text-[#F1F5F9] hover:text-[#39FF14] font-semibold text-lg py-2 px-4 rounded-lg transition-all"
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item}
                                </motion.a>
                            ))}
                            <motion.button
                                className="mt-4 w-full bg-[#00F7FF] text-[#0A0033] px-4 py-2 rounded-full font-semibold"
                                whileHover={{ scale: 1.05, boxShadow: '0 0 15px #00F7FF' }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Reservar
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>

            {/* Hero Section */}
            <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden">
                <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-[#2A0A6B]/60 to-[#00F7FF]/10"
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
                        className="text-5xl sm:text-7xl font-extrabold text-[#F1F5F9] mb-6 tracking-tight"
                        animate={{ textShadow: ['0 0 15px #00F7FF', '0 0 25px #39FF14', '0 0 15px #FF007A'] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    >
                        {heroImages[currentImageIndex].title}
                    </motion.h1>
                    <motion.p
                        className="text-xl sm:text-2xl mb-8 font-medium text-[#39FF14]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        {heroImages[currentImageIndex].subtitle}
                    </motion.p>
                    <motion.button
                        className="bg-[#00F7FF] text-[#0A0033] px-8 py-4 rounded-full font-semibold text-lg uppercase tracking-wide shadow-lg hover:bg-[#FF007A] transition-all"
                        whileHover={{ scale: 1.1, boxShadow: '0 0 20px #FF007A' }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Iniciar Viaje
                    </motion.button>
                </motion.div>
            </section>

            {/* Locations Section */}
            <section id="lugares" className="relative py-24 bg-[#0A0033] overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa')] bg-cover bg-center opacity-5" />
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
                            className="text-lg sm:text-xl text-[#39FF14] max-w-3xl mx-auto leading-relaxed"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            Descubre destinos que desafían la realidad en un viaje inmersivo.
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
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                            >
                                <select
                                    className="bg-[#2A0A6B]/80 backdrop-blur-md border border-[#00F7FF]/50 rounded-full px-6 py-3 text-[#F1F5F9] font-medium focus:ring-2 focus:ring-[#FF007A] pr-10 hover:bg-[#39FF14]/20 transition-all"
                                    value={filter.value}
                                    onChange={(e) => filter.setter(e.target.value)}
                                >
                                    {filter.options.map(opt => (
                                        <option key={opt} value={opt} className="bg-[#0A0033] text-[#F1F5F9]">{opt}</option>
                                    ))}
                                </select>
                                <ChevronRight className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#00F7FF]" />
                            </motion.div>
                        ))}
                        <motion.button
                            onClick={() => setShowMap(!showMap)}
                            className="bg-[#00F7FF] text-[#0A0033] px-6 py-3 rounded-full font-medium flex items-center space-x-2 hover:bg-[#FF007A] transition-all"
                            whileHover={{ scale: 1.05, boxShadow: '0 0 20px #FF007A' }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Map className="w-5 h-5" />
                            <span>{showMap ? 'Ocultar Mapa' : 'Ver Mapa 3D'}</span>
                        </motion.button>
                        <motion.button
                            className="bg-[#39FF14]/20 text-[#39FF14] px-6 py-3 rounded-full font-medium flex items-center space-x-2 hover:bg-[#39FF14]/50 transition-all"
                            whileHover={{ scale: 1.05, boxShadow: '0 0 20px #39FF14' }}
                            whileTap={{ scale: 0.95 }}
                            title="Habla para filtrar (Ejemplo: 'Mostrar aventuras')"
                        >
                            <Mic className="w-5 h-5" />
                            <span>Voz</span>
                        </motion.button>
                    </motion.div>

                    {/* 3D Map */}
                    <AnimatePresence>
                        {showMap && (
                            <motion.div
                                className="mb-12 bg-[#2A0A6B]/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-[#00F7FF]/50"
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
                                        <meshStandardMaterial color="#00F7FF" wireframe />
                                    </Sphere>
                                    {filteredLocations.map((loc, idx) => (
                                        <Sphere
                                            key={idx}
                                            args={[0.05, 16, 16]}
                                            position={[loc.coordinates.lng / 90, loc.coordinates.lat / 90, 1.1]}
                                        >
                                            <meshStandardMaterial color="#FF007A" />
                                        </Sphere>
                                    ))}
                                </Canvas>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* AI Recommendations */}
                    <motion.div
                        className="mb-12 bg-[#2A0A6B]/80 backdrop-blur-md rounded-2xl p-6 text-[#F1F5F9] border border-[#39FF14]/50"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h3 className="text-xl font-bold mb-4">Recomendaciones IA</h3>
                        <p className="text-[#39FF14]">
                            Basado en tus filtros: {activeFilter !== 'Todos' ? activeFilter : 'Exploración General'}, 
                            te recomendamos {filteredLocations[0]?.name || 'explorar más destinos'}.
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
                                    className="relative bg-[#2A0A6B]/90 backdrop-blur-md rounded-2xl shadow-lg border border-[#00F7FF]/50 overflow-hidden"
                                    style={useSpring({
                                        from: { transform: 'rotateY(180deg)' },
                                        to: { transform: 'rotateY(0deg)' },
                                        delay: index * 200,
                                        config: { tension: 120, friction: 14 }
                                    })}
                                >
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-br from-[#00F7FF]/20 to-[#FF007A]/20"
                                        animate={{ opacity: [0.4, 1, 0.4] }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                    />
                                    <img
                                        src={location.image}
                                        alt={location.name}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-6 relative z-10">
                                        <h3 className="text-xl font-bold text-[#F1F5F9] mb-2">{location.name}</h3>
                                        <div className="flex items-center text-[#39FF14] mb-2">
                                            <MapPin className="w-5 h-5 mr-2" />
                                            <span>{location.location}</span>
                                        </div>
                                        <div className="flex items-center text-[#39FF14] mb-2">
                                            <Map className="w-5 h-5 mr-2" />
                                            <span>Lat: {location.coordinates.lat}, Lng: {location.coordinates.lng}</span>
                                        </div>
                                        <div className="flex items-center text-[#39FF14] mb-2">
                                            <Calendar className="w-5 h-5 mr-2" />
                                            <span>{location.duration}</span>
                                        </div>
                                        <div className="flex items-center text-[#39FF14] mb-2">
                                            <Star className="w-5 h-5 mr-2 text-[#FF007A]" />
                                            <span>{location.rating}</span>
                                        </div>
                                        <div className="text-[#FF007A] font-bold mb-4">{location.price}</div>
                                        <p className="text-[#39FF14] mb-4">{location.description}</p>
                                        <div className="flex space-x-4">
                                            <motion.button
                                                className="bg-[#00F7FF] text-[#0A0033] px-4 py-2 rounded-full font-medium flex items-center space-x-2 hover:bg-[#FF007A] transition-all"
                                                whileHover={{ scale: 1.05, boxShadow: '0 0 15px #FF007A' }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => {
                                                    setSelectedLocation(location);
                                                    setShowBooking(true);
                                                }}
                                            >
                                                <span>Reservar</span>
                                                <Send className="w-5 h-5" />
                                            </motion.button>
                                            <motion.button
                                                className="bg-[#39FF14]/20 text-[#39FF14] px-4 py-2 rounded-full font-medium hover:bg-[#39FF14]/50 transition-all"
                                                whileHover={{ scale: 1.05, boxShadow: '0 0 15px #39FF14' }}
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
                        className="fixed inset-0 bg-[#0A0033]/90 backdrop-blur-md z-50 flex items-center justify-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.div
                            className="bg-[#2A0A6B]/90 backdrop-blur-md rounded-2xl p-8 max-w-md w-full border border-[#00F7FF]/50"
                            initial={{ y: 50 }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.5, type: 'spring' }}
                        >
                            <h3 className="text-2xl font-bold text-[#F1F5F9] mb-6">Reserva: {selectedLocation?.name}</h3>
                            <input
                                type="text"
                                placeholder="Nombre"
                                className="w-full px-4 py-3 mb-4 bg-[#0A0033] border border-[#00F7FF]/50 rounded-lg text-[#F1F5F9] focus:ring-2 focus:ring-[#FF007A]"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full px-4 py-3 mb-4 bg-[#0A0033] border border-[#00F7FF]/50 rounded-lg text-[#F1F5F9] focus:ring-2 focus:ring-[#FF007A]"
                            />
                            <input
                                type="date"
                                className="w-full px-4 py-3 mb-4 bg-[#0A0033] border border-[#00F7FF]/50 rounded-lg text-[#F1F5F9] focus:ring-2 focus:ring-[#FF007A]"
                            />
                            <div className="flex justify-between">
                                <motion.button
                                    className="bg-[#00F7FF] text-[#0A0033] px-6 py-3 rounded-full font-medium hover:bg-[#FF007A] transition-all"
                                    whileHover={{ scale: 1.05, boxShadow: '0 0 15px #FF007A' }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setShowBooking(false)}
                                >
                                    Confirmar
                                </motion.button>
                                <motion.button
                                    className="bg-[#39FF14]/20 text-[#39FF14] px-6 py-3 rounded-full font-medium hover:bg-[#39FF14]/50 transition-all"
                                    whileHover={{ scale: 1.05, boxShadow: '0 0 15px #39FF14' }}
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
            <section id="testimonios" className="relative py-24 bg-[#0A0033] overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa')] bg-cover bg-center opacity-5" />
                <div className="max-w-4xl mx-auto px-6 sm:px-8">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, type: 'spring' }}
                    >
                        <h2 className="text-4xl sm:text-5xl font-extrabold text-[#F1F5F9] mb-6 tracking-tight">
                            Ecos del Futuro
                        </h2>
                        <motion.p
                            className="text-lg sm:text-xl text-[#39FF14] max-w-2xl mx-auto"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            Testimonios que resuenan desde los confines del cosmos.
                        </motion.p>
                    </motion.div>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentTestimonial}
                            className="relative bg-[#2A0A6B]/90 backdrop-blur-md rounded-2xl p-8 text-center shadow-lg border border-[#00F7FF]/50"
                            initial={{ opacity: 0, x: 100, rotateY: 30 }}
                            animate={{ opacity: 1, x: 0, rotateY: 0 }}
                            exit={{ opacity: 0, x: -100, rotateY: -30 }}
                            transition={{ duration: 0.7, type: 'spring' }}
                        >
                            <motion.img
                                src={testimonials[currentTestimonial].image}
                                alt={testimonials[currentTestimonial].name}
                                className="w-20 h-20 rounded-full mx-auto mb-6 shadow-lg border-2 border-[#FF007A]/50"
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
                                    <Star key={i} className="w-6 h-6 text-[#FF007A] fill-current" />
                                ))}
                            </motion.div>
                            <blockquote className="text-xl text-[#F1F5F9] italic mb-6">
                                "{testimonials[currentTestimonial].text}"
                            </blockquote>
                            <div className="text-lg font-bold text-[#F1F5F9]">{testimonials[currentTestimonial].name}</div>
                            <div className="text-[#39FF14]">{testimonials[currentTestimonial].location}</div>
                        </motion.div>
                    </AnimatePresence>
                    <div className="flex justify-center space-x-4 mt-8">
                        <motion.button
                            onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                            className="p-3 bg-[#00F7FF]/20 rounded-full text-[#F1F5F9] hover:bg-[#FF007A] transition-all"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </motion.button>
                        <motion.button
                            onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
                            className="p-3 bg-[#00F7FF]/20 rounded-full text-[#F1F5F9] hover:bg-[#FF007A] transition-all"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <ChevronRight className="w-6 h-6" />
                        </motion.button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#0A0033] py-16">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <motion.div
                        className="flex justify-center items-center space-x-3 mb-6"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="w-10 h-10 bg-[#00F7FF] rounded-full flex items-center justify-center">
                            <Mountain className="w-6 h-6 text-[#0A0033]" />
                        </div>
                        <span className="text-2xl font-bold text-[#FF007A]">LGECOTOURS</span>
                    </motion.div>
                    <p className="text-[#39FF14] mb-6 max-w-md mx-auto">
                        Conquista el universo con experiencias de viaje únicas.
                    </p>
                    <div className="flex justify-center space-x-4 mb-8">
                        {[Facebook, Instagram, Twitter].map((Icon, index) => (
                            <motion.a
                                key={index}
                                href="#"
                                className="p-2 bg-[#2A0A6B] rounded-full text-[#F1F5F9] hover:bg-[#39FF14] transition-all"
                                whileHover={{ scale: 1.2, rotate: 360 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Icon className="w-5 h-5" />
                            </motion.a>
                        ))}
                    </div>
                    <div className="text-[#39FF14] text-sm">
                        © 2025 LGECOTOURS Bolivia. Derechos Reservados.
                    </div>
                </div>
            </footer>

            {/* Floating WhatsApp & Voice Assistant */}
            <motion.div
                className="fixed bottom-6 right-6 z-50 flex flex-col space-y-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: 'spring', stiffness: 200 }}
            >
                <motion.button
                    className="w-16 h-16 bg-[#FF007A] text-[#F1F5F9] rounded-full shadow-lg flex items-center justify-center"
                    whileHover={{ scale: 1.2, boxShadow: '0 0 20px #FF007A' }}
                    whileTap={{ scale: 0.9 }}
                    animate={{ rotate: [0, 360], transition: { duration: 5, repeat: Infinity, ease: 'linear' } }}
                >
                    <Phone className="w-6 h-6" />
                </motion.button>
                <motion.button
                    className="w-16 h-16 bg-[#39FF14]/20 text-[#39FF14] rounded-full shadow-lg flex items-center justify-center"
                    whileHover={{ scale: 1.2, boxShadow: '0 0 20px #39FF14' }}
                    whileTap={{ scale: 0.9 }}
                    title="Asistente Virtual (Ejemplo: 'Recomendar aventuras')"
                >
                    <Mic className="w-6 h-6" />
                </motion.button>
            </motion.div>
        </div>
    );
}