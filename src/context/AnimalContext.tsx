import { createContext, useContext, useState, ReactNode } from 'react';
import { animals as initialAnimals, Animal } from '@/data/mockData';

interface AnimalContextType {
    animals: Animal[];
    addAnimal: (animal: Omit<Animal, 'id' | 'status' | 'personality' | 'health'>) => void;
    updateAnimal: (animal: Animal) => void;
    deleteAnimal: (id: string) => void;
}

const AnimalContext = createContext<AnimalContextType | undefined>(undefined);

export const AnimalProvider = ({ children }: { children: ReactNode }) => {
    // Estado local para almacenar la lista de animales
    const [animals, setAnimals] = useState<Animal[]>(initialAnimals);

    /**
     * Añade un nuevo animal al estado.
     * Genera un ID único, establece el estado inicial como 'Disponible'
     * y asigna un refugio por defecto.
     * @param newAnimalData Datos del nuevo animal (sin id, status, etc.)
     */

    const addAnimal = (newAnimalData: Omit<Animal, 'id' | 'status' | 'personality' | 'health'>) => {
        const newAnimal: Animal = {
            ...newAnimalData,
            id: (animals.length + 1).toString(),
            status: 'Disponible',
            personality: [],
            health: 'Desconocido',
            shelterId: 1,
        };
        setAnimals([...animals, newAnimal]);
    };

    /**
     * Actualiza la información de un animal existente.
     * @param updatedAnimal Objeto animal con los datos actualizados
     */
    const updateAnimal = (updatedAnimal: Animal) => {
        setAnimals(animals.map(a => a.id === updatedAnimal.id ? updatedAnimal : a));
    };

    /**
     * Elimina un animal del estado por su ID.
     * @param id ID del animal a eliminar
     */
    const deleteAnimal = (id: string) => {
        setAnimals(animals.filter(a => a.id !== id));
    };

    return (
        <AnimalContext.Provider value={{ animals, addAnimal, updateAnimal, deleteAnimal }}>
            {children}
        </AnimalContext.Provider>
    );
};

export const useAnimalContext = () => {
    const context = useContext(AnimalContext);
    if (context === undefined) {
        throw new Error('useAnimalContext must be used within an AnimalProvider');
    }
    return context;
};
