import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, GraduationCap } from 'lucide-react';

/**
 * Página "Sobre Nosotros".
 * Muestra información sobre el propósito del proyecto y créditos al autor.
 */
const AboutPage = () => {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-3xl mx-auto space-y-8">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-primary">Sobre Adopta Felicidad</h1>
                    <p className="text-xl text-muted-foreground">
                        Conectando corazones, un hogar a la vez.
                    </p>
                </div>

                <Card className="bg-white/50 backdrop-blur-sm border-primary/20">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-2xl text-primary">
                            <Heart className="h-6 w-6" />
                            Nuestro Propósito
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-lg leading-relaxed space-y-4">
                        <p>
                            Adopta Felicidad nace con una misión clara: <strong>ayudar a las protectoras de animales</strong> a dar visibilidad a sus peludos y facilitar el proceso de adopción para las personas que buscan un nuevo miembro para su familia.
                        </p>
                        <p>
                            Creemos que cada animal merece un hogar lleno de amor y que la tecnología puede ser el puente que une a las mascotas con sus futuros dueños.
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-white/50 backdrop-blur-sm border-primary/20">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-2xl text-primary">
                            <GraduationCap className="h-6 w-6" />
                            El Creador
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-lg leading-relaxed space-y-4">
                        <p>
                            Este proyecto ha sido desarrollado con pasión y dedicación por <strong>Carlos Javier Castaños Blanco</strong>.
                        </p>
                        <p>
                            Soy un estudiante de <strong>Desarrollo de Aplicaciones Web (DAW)</strong> comprometido con crear software que tenga un impacto positivo en la sociedad. Adopta Felicidad es el resultado de aplicar mis conocimientos técnicos para resolver un problema real y ayudar a quienes no tienen voz.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AboutPage;
