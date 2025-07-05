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
    src: 'https://images.unsplash.com/photo-1485262202671-52d2bba88264?w=1920&h=1080&fit=crop',
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
    category: 'Aventura'
  },
  {
    id: 2,
    name: 'Lago Titicaca',
    location: 'La Paz, Bolivia',
    image: 'https://images.unsplash.com/photo-1485262202671-52d2bba88264?w=800&h=600&fit=crop',
    rating: 4.8,
    price: '$65',
    duration: '2 días',
    category: 'Cultural'
  },
  {
    id: 3,
    name: 'Valle de la Luna',
    location: 'La Paz, Bolivia',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    rating: 4.7,
    price: '$45',
    duration: '1 día',
    category: 'Naturaleza'
  },
  {
    id: 4,
    name: 'Parque Madidi',
    location: 'La Paz, Bolivia',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
    rating: 4.9,
    price: '$120',
    duration: '4 días',
    category: 'Aventura'
  }
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
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const filteredDestinations = activeFilter === 'Todos' 
    ? destinations 
    : destinations.filter(dest => dest.category === activeFilter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
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

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 font-sans">
      {/* Navegación */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <Mountain className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                LGECOTOURS
              </span>
            </motion.div>

            {/* Menú Desktop */}
            <div className="hidden md:flex items-center space-x-8">
              {['Inicio', 'Destinos', 'Servicios', 'Testimonios', 'Contacto'].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-slate-700 hover:text-emerald-600 font-medium transition-all duration-300 relative group"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 group-hover:w-full transition-all duration-300"></span>
                </motion.a>
              ))}
              <motion.button
                className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Reservar Ahora
              </motion.button>
            </div>

            {/* Botón menú móvil */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden bg-white border-t border-slate-200"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="px-4 py-4 space-y-3">
                {['Inicio', 'Destinos', 'Servicios', 'Testimonios', 'Contacto'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="block text-slate-700 hover:text-emerald-600 font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
                <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-2 rounded-full font-medium mt-4">
                  Reservar Ahora
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              transition: { duration: 1.5, ease: "easeInOut" }
            }}
            exit={{ 
              opacity: 0, 
              scale: 1.05,
              transition: { duration: 0.8 }
            }}
            style={{
              backgroundImage: `url(${heroImages[currentImageIndex].src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-20 text-center max-w-4xl mx-auto px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-6"
            >
              <motion.h1 
                className="text-5xl md:text-7xl font-black text-white drop-shadow-2xl leading-tight"
                style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
              >
                {heroImages[currentImageIndex].title}
              </motion.h1>
              <motion.p 
                className="text-xl md:text-3xl text-white/90 drop-shadow-lg font-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                {heroImages[currentImageIndex].subtitle}
              </motion.p>
              <motion.p 
                className="text-lg text-white/80 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                {heroImages[currentImageIndex].description}
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                <motion.button
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transition-all duration-300 flex items-center space-x-2"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Explorar Destinos</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
                <motion.button
                  className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-slate-800 transition-all duration-300 flex items-center space-x-2"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="w-5 h-5" />
                  <span>Ver Video</span>
                </motion.button>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Indicadores */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {heroImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  idx === currentImageIndex 
                    ? 'bg-white scale-125 shadow-lg' 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 right-8 text-white/70"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex flex-col items-center space-y-2">
            <span className="text-sm font-medium">Desliza</span>
            <div className="w-0.5 h-8 bg-white/50 rounded-full"></div>
          </div>
        </motion.div>
      </section>

      {/* Estadísticas */}
      <section className="relative bg-white py-16 -mt-16 z-30">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { number: '500+', label: 'Viajeros Felices' },
              { number: '50+', label: 'Destinos Únicos' },
              { number: '10+', label: 'Años de Experiencia' },
              { number: '4.9', label: 'Calificación Promedio' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                variants={itemVariants}
              >
                <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-slate-600 font-medium mt-2">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="py-20 bg-gradient-to-b from-white to-slate-50">
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
              Ofrecemos experiencias únicas diseñadas para crear recuerdos inolvidables
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group"
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Destinos */}
      <section id="destinos" className="py-20 bg-slate-50">
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
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
              Descubre los lugares más espectaculares de Bolivia
            </p>

            {/* Filtros */}
            <div className="flex flex-wrap justify-center gap-4">
              {['Todos', 'Aventura', 'Cultural', 'Naturaleza'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                    activeFilter === filter
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg'
                      : 'bg-white text-slate-600 hover:text-emerald-600 hover:shadow-md'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <AnimatePresence>
              {filteredDestinations.map((destination, index) => (
                <motion.div
                  key={destination.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
                  variants={itemVariants}
                  layout
                  whileHover={{ y: -10 }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {destination.category}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <motion.button
                        className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Heart className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-slate-800">{destination.name}</h3>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-slate-600">{destination.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-slate-500 mb-4">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{destination.location}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
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
                    </div>
                    
                    <motion.button
                      className="w-full mt-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Ver Detalles
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Testimonios */}
      <section id="testimonios" className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-6">
              Lo Que Dicen Nuestros Viajeros
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Experiencias reales de personas que han vivido aventuras increíbles con nosotros
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                className="text-center"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-8">
                  <img
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    className="w-20 h-20 rounded-full mx-auto mb-6 shadow-lg"
                  />
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-xl md:text-2xl text-slate-700 italic mb-6 leading-relaxed">
                    "{testimonials[currentTestimonial].text}"
                  </blockquote>
                  <div className="text-lg font-bold text-slate-800">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-slate-500">
                    {testimonials[currentTestimonial].location}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controles de testimonios */}
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? 'bg-emerald-500 scale-125'
                      : 'bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
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