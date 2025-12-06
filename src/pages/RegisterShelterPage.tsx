import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PawPrint } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { useShelterContext } from '@/context/ShelterContext';

/**
 * Página de registro para nuevas protectoras.
 * Permite a las protectoras enviar una solicitud para unirse a la plataforma.
 */
const RegisterShelterPage = () => {
    const navigate = useNavigate();
    const { addShelter } = useShelterContext();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        city: '',
        province: '',
        phone: '',
        email: '',
        donationNumber: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    /**
     * Maneja el envío del formulario de registro.
     * Añade la protectora al contexto con estado 'Pendiente' y simula una llamada a API.
     */
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            addShelter({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                city: formData.city,
                province: formData.province,
                location: formData.city, // Using city as location for now
                donationNumber: formData.donationNumber,
            });
            setIsLoading(false);
            alert('Solicitud enviada con éxito. Un administrador revisará tu solicitud.');
            navigate('/');
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4 py-8">
            <Card className="w-full max-w-lg shadow-lg">
                <CardHeader className="space-y-1 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                            <PawPrint className="h-8 w-8" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold">Registro de Protectora</CardTitle>
                    <CardDescription>
                        Únete a nuestra red y ayuda a más animales a encontrar un hogar
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nombre de la Protectora</Label>
                            <Input id="name" required value={formData.name} onChange={handleChange} placeholder="Ej. Refugio Esperanza" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="city">Ciudad</Label>
                                <Input id="city" required value={formData.city} onChange={handleChange} placeholder="Madrid" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="province">Provincia</Label>
                                <Input id="province" required value={formData.province} onChange={handleChange} placeholder="Madrid" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Teléfono</Label>
                            <Input id="phone" type="tel" required value={formData.phone} onChange={handleChange} placeholder="600 000 000" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Correo Electrónico</Label>
                            <Input id="email" type="email" required value={formData.email} onChange={handleChange} placeholder="contacto@refugio.com" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="donationNumber">Número de Cuenta para Donaciones (Opcional)</Label>
                            <Input id="donationNumber" value={formData.donationNumber} onChange={handleChange} placeholder="ES00 0000 0000 0000 0000 0000" />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        <Button className="w-full bg-primary hover:bg-primary/90 text-white" disabled={isLoading}>
                            {isLoading ? 'Enviando Solicitud...' : 'Enviar Solicitud'}
                        </Button>
                        <Link to="/login" className="text-sm text-muted-foreground hover:text-primary">
                            ¿Ya tienes cuenta? Inicia sesión
                        </Link>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default RegisterShelterPage;
