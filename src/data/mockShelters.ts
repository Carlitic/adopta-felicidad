/**
 * Interfaz que define la estructura de datos de una protectora.
 */
export interface Shelter {
    id: number;
    name: string;
    email: string;
    phone: string;
    location: string;
    city: string;
    province: string;
    status: 'Activa' | 'Pendiente' | 'Inactiva';
    joinedDate: string;
    donationNumber?: string;
}

export const shelters: Shelter[] = [
    {
        id: 1,
        name: 'Refugio Esperanza',
        email: 'contacto@refugioesperanza.com',
        location: 'Madrid',
        city: 'Madrid',
        province: 'Madrid',
        phone: '600 123 456',
        donationNumber: 'ES12 3456 7890 1234 5678 9012',
        status: 'Activa',
        joinedDate: '2023-01-15',
    },
    {
        id: 2,
        name: 'Amigos Peludos',
        email: 'info@amigospeludos.org',
        location: 'Barcelona',
        city: 'Barcelona',
        province: 'Barcelona',
        phone: '600 654 321',
        status: 'Activa',
        joinedDate: '2023-05-20',
    },
    {
        id: 3,
        name: 'Huellas de Amor',
        email: 'adopciones@huellasdeamor.es',
        location: 'Valencia',
        city: 'Valencia',
        province: 'Valencia',
        phone: '600 987 654',
        status: 'Inactiva',
        joinedDate: '2022-11-10',
    },
];
