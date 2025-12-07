import { PawPrint } from 'lucide-react';

/**
 * Componente de pie de página.
 * Muestra el copyright y el logo de la aplicación.
 */
const Footer = () => {
    return (
        <footer className="bg-muted/30 border-t mt-auto">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <PawPrint className="h-5 w-5" />
                        <span className="font-semibold">Adopta Felicidad</span>
                    </div>
                    <p className="text-sm text-muted-foreground text-center md:text-right">
                        © {new Date().getFullYear()} Adopta Felicidad. v1.0.0
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
