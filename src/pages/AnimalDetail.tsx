import { useParams, Link } from 'react-router-dom';
import { animals } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Check, Heart, Share2 } from 'lucide-react';
import { useState } from 'react';

const AnimalDetail = () => {
    // Obtiene el ID del animal de la URL y busca sus datos
    const { id } = useParams();
    const animal = animals.find((a) => a.id === id);
    const [submitted, setSubmitted] = useState(false);

    if (!animal) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h2 className="text-2xl font-bold mb-4">Animal no encontrado</h2>
                <Link to="/catalogo">
                    <Button>Volver al catálogo</Button>
                </Link>
            </div>
        );
    }

    /**
     * Maneja el envío del formulario de adopción.
     * Simula una llamada a la API y muestra un mensaje de éxito.
     */
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        // Simulate API call
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Link to="/catalogo" className="inline-flex items-center text-muted-foreground hover:text-primary mb-6">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver al catálogo
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Column: Images */}
                <div className="space-y-4">
                    <div className="aspect-square rounded-xl overflow-hidden shadow-lg">
                        <img
                            src={animal.image}
                            alt={animal.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {/* Placeholder for gallery thumbnails */}
                    <div className="grid grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="aspect-square rounded-lg overflow-hidden bg-muted cursor-pointer hover:opacity-80 transition-opacity">
                                <img
                                    src={animal.image}
                                    alt={`${animal.name} ${i}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column: Info & Form */}
                <div className="space-y-8">
                    <div>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h1 className="text-4xl font-bold text-foreground mb-2">{animal.name}</h1>
                                <p className="text-xl text-muted-foreground">{animal.breed}</p>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="icon" className="rounded-full">
                                    <Share2 className="h-5 w-5" />
                                </Button>
                                <Button variant="outline" size="icon" className="rounded-full text-red-500 hover:text-red-600">
                                    <Heart className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-6">
                            <Badge variant="secondary" className="text-base px-3 py-1">
                                {animal.age}
                            </Badge>
                            <Badge variant="outline" className="text-base px-3 py-1">
                                {animal.size}
                            </Badge>
                            <Badge
                                className={`text-base px-3 py-1 ${animal.status === 'Disponible' ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500'
                                    }`}
                            >
                                {animal.status}
                            </Badge>
                        </div>

                        <div className="prose max-w-none text-muted-foreground mb-8">
                            <p className="text-lg leading-relaxed">{animal.description}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-6 mb-8">
                            <div>
                                <h3 className="font-semibold text-foreground mb-2">Personalidad</h3>
                                <ul className="list-disc list-inside text-muted-foreground">
                                    {animal.personality.map((trait) => (
                                        <li key={trait}>{trait}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground mb-2">Salud</h3>
                                <p className="text-muted-foreground">{animal.health}</p>
                            </div>
                        </div>
                    </div>

                    <Card className="border-2 border-primary/10 shadow-xl">
                        <CardHeader>
                            <CardTitle>¿Te interesa adoptar a {animal.name}?</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {submitted ? (
                                <div className="text-center py-8 text-green-600">
                                    <div className="flex justify-center mb-4">
                                        <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                                            <Check className="h-6 w-6" />
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">¡Solicitud Enviada!</h3>
                                    <p>La protectora se pondrá en contacto contigo pronto.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Nombre completo</Label>
                                            <Input id="name" required placeholder="Tu nombre" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input id="email" type="email" required placeholder="tu@email.com" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Teléfono</Label>
                                        <Input id="phone" type="tel" placeholder="+34 600 000 000" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="message">Mensaje</Label>
                                        <Textarea
                                            id="message"
                                            placeholder={`Hola, me gustaría saber más sobre ${animal.name}...`}
                                            className="min-h-[100px]"
                                        />
                                    </div>
                                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white text-lg py-6">
                                        Enviar Solicitud de Adopción
                                    </Button>
                                </form>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default AnimalDetail;
