import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PawPrint } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

/**
 * Página de inicio de sesión para protectoras y administradores.
 * Maneja la autenticación y redirección según el rol del usuario.
 */
const LoginPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    /**
     * Maneja el envío del formulario de login.
     * Simula una verificación de credenciales y redirige al panel correspondiente.
     */
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // 1. Check if it's an Admin
            const { data: adminData } = await supabase
                .from('admins')
                .select('*')
                .eq('email', email)
                .single();

            if (adminData && adminData.password === password) {
                setIsLoading(false);
                navigate('/super-admin');
                return;
            }

            // 2. Check if it's a Shelter
            const { data: shelterData } = await supabase
                .from('shelters')
                .select('*')
                .eq('email', email)
                .single();

            if (shelterData) {
                if (shelterData.password === password) {
                    if (shelterData.status === 'Activa') {
                        setIsLoading(false);
                        navigate('/admin');
                    } else {
                        alert('Tu cuenta aún no está activa. Por favor espera a que un administrador la apruebe.');
                        setIsLoading(false);
                    }
                    return;
                }
            }

            // 3. If neither
            alert('Email o contraseña incorrectos');

        } catch (error) {
            console.error('Login error:', error);
            alert('Ha ocurrido un error al iniciar sesión');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="space-y-1 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                            <PawPrint className="h-8 w-8" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold">Acceso Protectoras</CardTitle>
                    <CardDescription>
                        Introduce tus credenciales para gestionar el inventario
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="protectora@ejemplo.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Contraseña</Label>
                            <Input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        <Button className="w-full bg-primary hover:bg-primary/90 text-white" disabled={isLoading}>
                            {isLoading ? 'Iniciando sesión...' : 'Entrar'}
                        </Button>
                        <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
                            Volver al inicio
                        </Link>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default LoginPage;
