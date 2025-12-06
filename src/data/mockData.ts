/**
 * Interfaz que define la estructura de datos de un animal.
 */
export interface Animal {
    id: string;
    name: string;
    species: 'Perro' | 'Gato';
    breed: string;
    age: string;
    size: 'Pequeño' | 'Mediano' | 'Grande';
    status: 'Disponible' | 'Adoptado' | 'En Proceso';
    image: string;
    description: string;
    personality: string[];
    health: string;
    shelterId: number;
}

export const animals: Animal[] = [
    {
        id: '1',
        name: 'Max',
        species: 'Perro',
        breed: 'Mestizo',
        age: '2 años',
        size: 'Mediano',
        status: 'Disponible',
        image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=800',
        description: 'Max es un perro lleno de energía y amor. Le encanta correr por el parque y jugar con la pelota. Es muy sociable con otros perros.',
        personality: ['Juguetón', 'Cariñoso', 'Activo'],
        health: 'Vacunado, desparasitado y castrado.',
        shelterId: 1
    },
    {
        id: '2',
        name: 'Luna',
        species: 'Gato',
        breed: 'Europeo Común',
        age: '1 año',
        size: 'Pequeño',
        status: 'Disponible',
        image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=800',
        description: 'Luna es una gatita tranquila y observadora. Disfruta de las siestas al sol y de los mimos suaves. Ideal para un hogar tranquilo.',
        personality: ['Tranquila', 'Independiente', 'Curiosa'],
        health: 'Vacunada y esterilizada. Test de leucemia negativo.',
        shelterId: 2
    },
    {
        id: '3',
        name: 'Rocky',
        species: 'Perro',
        breed: 'Labrador Retriever',
        age: '4 años',
        size: 'Grande',
        status: 'En Proceso',
        image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&q=80&w=800',
        description: 'Rocky es un bonachón. Se lleva bien con niños y otros animales. Es el compañero perfecto para largas caminatas.',
        personality: ['Leal', 'Protector', 'Amigable'],
        health: 'Sano y al día con sus vacunas.',
        shelterId: 1
    },
    {
        id: '4',
        name: 'Mishka',
        species: 'Gato',
        breed: 'Siamés',
        age: '6 meses',
        size: 'Pequeño',
        status: 'Disponible',
        image: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?auto=format&fit=crop&q=80&w=800',
        description: 'Mishka es pura diversión. No para quieta y le encanta investigar cada rincón de la casa. Necesita alguien que juegue mucho con ella.',
        personality: ['Traviesa', 'Vocal', 'Inteligente'],
        health: 'Primera vacuna puesta.',
        shelterId: 3
    },
    {
        id: '5',
        name: 'Coco',
        species: 'Perro',
        breed: 'Podenco',
        age: '3 años',
        size: 'Mediano',
        status: 'Disponible',
        image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=800',
        description: 'Coco fue rescatado de la calle pero no ha perdido la fe en los humanos. Es un poco tímido al principio pero muy dulce cuando coge confianza.',
        personality: ['Tímido', 'Dulce', 'Tranquilo'],
        health: 'En tratamiento por una pequeña herida, pero sano.',
        shelterId: 2
    },
    {
        id: '6',
        name: 'Bella',
        species: 'Perro',
        breed: 'Golden Retriever',
        age: '5 años',
        size: 'Grande',
        status: 'Adoptado',
        image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=800',
        description: 'Bella encontró su hogar definitivo. Era la favorita de todos los voluntarios por su paciencia infinita.',
        personality: ['Paciente', 'Amorosa', 'Obediente'],
        health: 'Perfecto estado.',
        shelterId: 1
    }
];
