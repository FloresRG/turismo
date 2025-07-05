import { Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const { auth } = usePage().props;
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Detecta scroll para cambiar estilo
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Variantes para items de nav
  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  };

  // Overlay hover
  const overlayVariants = {
    initial: { width: 0 },
    hover: { width: '100%', transition: { duration: 0.4, ease: 'easeOut' } },
    noHover: { width: 0, transition: { duration: 0.3, ease: 'easeIn' } },
  };

  const NavButton = ({ href, children, index }) => (
    <motion.div
      custom={index}
      variants={navItemVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className={`relative p-3 px-5 rounded-full cursor-pointer overflow-hidden ${
        scrolled ? 'bg-transparent' : 'bg-white/10 backdrop-blur-md border border-white/5'
      }`}
    >
      <motion.div
        className="absolute inset-0 bg-orange-400/80 rounded-full z-0"
        variants={overlayVariants}
        initial="initial"
        animate={scrolled ? 'noHover' : 'initial'}
        whileHover="hover"
      />
      <Link href={href} className="relative z-10 text-white font-medium block">
        {children}
      </Link>
    </motion.div>
  );

  return (
    <AnimatePresence>
      <motion.nav
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
        className={`fixed top-0 left-0 w-full z-50 p-6 transition-all duration-500 ${
          scrolled ? 'bg-gray-800 shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <motion.div variants={navItemVariants} custom={-1} initial="hidden" animate="visible">
            <Link href="/" className="text-3xl font-extrabold text-white tracking-wide">
              LGECOTOURS Bolivia
            </Link>
          </motion.div>

          {/* Menú Desktop */}
          <div className="hidden md:flex space-x-4 items-center">
            {['Destinos', 'Experiencias', 'Planifica tu viaje', 'Contacto'].map((text, i) => (
              <NavButton key={i} href="#" index={i}>
                {text}
              </NavButton>
            ))}
            <NavButton href={auth.user ? route('dashboard') : route('login')} index={4}>
              {auth.user ? 'Dashboard' : 'Iniciar Sesión'}
            </NavButton>
            {!auth.user && (
              <motion.div
                custom={5}
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.05, boxShadow: '0px 8px 16px rgba(52, 186, 88, 0.3)' }}
                className="p-3 px-5 rounded-full bg-red-600 text-white font-semibold shadow-md transition-all duration-300 relative z-10"
              >
                <Link href={route('register')}>Registrarse</Link>
              </motion.div>
            )}
          </div>

          {/* Menú Móvil */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white text-2xl z-10"
              aria-label="Toggle menu"
            >
              {menuOpen ? '✕' : '☰'}
            </button>
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-full left-0 w-full bg-gray-900 overflow-hidden"
                >
                  {['Destinos', 'Experiencias', 'Planifica tu viaje', 'Contacto'].map((text, i) => (
                    <Link
                      key={i}
                      href="#"
                      className="block px-6 py-4 border-b border-gray-700 text-white"
                    >
                      {text}
                    </Link>
                  ))}
                  <Link
                    href={auth.user ? route('dashboard') : route('login')}
                    className="block px-6 py-4 border-b border-gray-700 text-white"
                  >
                    {auth.user ? 'Dashboard' : 'Iniciar Sesión'}
                  </Link>
                  {!auth.user && (
                    <Link
                      href={route('register')}
                      className="block px-6 py-4 text-red-400 font-semibold"
                    >
                      Registrarse
                    </Link>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.nav>
    </AnimatePresence>
  );
}
    