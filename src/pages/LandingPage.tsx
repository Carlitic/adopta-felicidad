import { useAnimalContext } from '@/context/AnimalContext';
import AnimalCard from '@/components/AnimalCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const LandingPage = () => {
    // Obtiene los animales del contexto y selecciona los primeros 3 para destacar
    const { animals } = useAnimalContext();
    const featuredAnimals = animals.slice(0, 3);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: 'url("https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&q=80&w=2000")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className="absolute inset-0 bg-black/40" />
                </div>

                <div className="relative z-10 container mx-auto px-4 text-center text-white">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight drop-shadow-lg">
                        Encuentra a tu nuevo<br />mejor amigo
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto drop-shadow-md text-gray-100">
                        Miles de animales esperan un hogar lleno de amor. <br />
                        Adopta, no compres.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/catalogo">
                            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white text-lg px-8 py-6 h-auto rounded-full">
                                Ver Animales
                            </Button>
                        </Link>
                        <Link to="/about">
                            <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur hover:bg-white/20 text-white border-white text-lg px-8 py-6 h-auto rounded-full">
                                Cómo Funciona
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Section */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-foreground mb-2">Animales Destacados</h2>
                            <p className="text-muted-foreground">Conoce a algunos de nuestros amigos que buscan hogar</p>
                        </div>
                        <Link to="/catalogo" className="hidden md:flex items-center text-primary hover:underline font-medium">
                            Ver todos <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredAnimals.map((animal) => (
                            <AnimalCard key={animal.id} animal={animal} />
                        ))}
                    </div>

                    <div className="mt-12 text-center md:hidden">
                        <Link to="/catalogo">
                            <Button variant="outline" className="w-full">
                                Ver todos los animales
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 bg-secondary/10">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4 text-foreground">¿Eres una protectora?</h2>
                    <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                        Únete a nuestra plataforma para dar mayor visibilidad a tus animales y gestionar tus adopciones de forma sencilla.
                    </p>
                    <Link to="/login">
                        <Button size="lg" variant="secondary" className="bg-secondary hover:bg-secondary/90 text-white">
                            Acceso para Protectoras
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
