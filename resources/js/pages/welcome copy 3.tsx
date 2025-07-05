import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const heroImages = [
  {
    src: 'https://wallpapers.com/images/hd/travel-hd-bezzbjmijn9wq5bs.jpg',
    title: 'Descubre paisajes impresionantes',
    subtitle: 'Viaja con nosotros',
  },
  {
    src: 'https://www.incatravel-agency.com/wp-content/uploads/2018/03/city-tour-cusco-plaza-de-armas.jpg',
    title: 'Explora la magia de Cusco',
    subtitle: 'Historia y aventura',
  },
  {
    src: 'https://wallpapers.com/images/hd/4k-ultra-hd-landscape-wallpaper-sa8ffsciekildmug.jpg',
    title: 'Escápate a la naturaleza',
    subtitle: 'Bienestar y tranquilidad',
  },
];

export default function Welcome() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (idx) => {
    setCurrentImageIndex(idx);
  };

  const imageVariants = {
    initial: { opacity: 0, scale: 1.1 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.5, ease: 'easeInOut' },
    },
    exit: {
      opacity: 0,
      scale: 1.05,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
    zoomLoop: {
      scale: [1, 1.03, 1],
      transition: { duration: 10, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const cards = heroImages.map((img, i) => ({ ...img, index: i }));

  return (
    <>
      <Head title="LGECOTOURS Bolivia - Tu Aventura Comienza Aquí" />

      <div className="relative min-h-screen bg-[#F2F2F2] font-sans">
        <Navbar />

        {/* Hero con carrusel */}
        <section className="relative w-full h-screen flex items-center justify-start overflow-hidden">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={currentImageIndex}
              className="absolute inset-0"
              variants={imageVariants}
              initial="initial"
              animate={['animate', 'zoomLoop']}
              exit="exit"
              style={{
                backgroundImage: `url(${heroImages[currentImageIndex].src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-black opacity-40" />
            </motion.div>
          </AnimatePresence>

          <div className="relative z-20 p-8 max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg">
                  {heroImages[currentImageIndex].title}
                </h1>
                <p className="text-xl md:text-2xl text-white drop-shadow-md">
                  {heroImages[currentImageIndex].subtitle}
                </p>
                
              </motion.div>
            </AnimatePresence>

            {/* Dots */}
            <div className="flex space-x-3 mt-6">
              {heroImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleDotClick(idx)}
                  className={`w-3 h-3 rounded-full transition-transform duration-300 ${
                    idx === currentImageIndex ? 'bg-[#E63946] scale-125' : 'bg-white opacity-50'
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Sección de cards giratorias */}
        <section
          className="relative z-10 w-full py-20 px-8"
          style={{
            backgroundImage:
              "url('https://static.vecteezy.com/system/resources/previews/002/150/522/non_2x/travel-holiday-background-free-photo.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-extrabold text-white mb-12 text-center drop-shadow-lg">
              Nuestros Destinos Destacados
            </h2>
            <div className="flex flex-wrap justify-center gap-8">
              {cards.map(({ src, title, subtitle }, i) => (
                <motion.div
                  key={i}
                  className="w-64 h-80 bg-white rounded-xl overflow-hidden shadow-lg"
                  whileHover={{ rotateY: 180 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="w-full h-full relative">
                    <img src={src} alt={title} className="w-full h-2/3 object-cover" />
                    <div className="p-4">
                      <h3 className="text-xl font-semibold">{title}</h3>
                      <p className="text-gray-600">{subtitle}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
