import { Link } from '@inertiajs/react';

export default function Footer() {
    return (
        <footer className="w-full bg-[#2D2D2D] text-[#FFFFFF] p-8 mt-16">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                <p>&copy; {new Date().getFullYear()} LGECOTOURS Bolivia. Todos los derechos reservados.</p>
                <div className="flex mt-4 md:mt-0 space-x-6">
                    <Link href="#" className="hover:text-[#F4A261] transition-colors duration-200">Política de Privacidad</Link>
                    <Link href="#" className="hover:text-[#F4A261] transition-colors duration-200">Términos y Condiciones</Link>
                    <Link href="#" className="hover:text-[#F4A261] transition-colors duration-200">Preguntas Frecuentes</Link>
                </div>
            </div>
        </footer>
    );
}