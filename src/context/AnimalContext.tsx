import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Animal } from '@/data/mockData';
import { supabase } from '@/lib/supabase';

interface AnimalContextType {
    animals: Animal[];
    isLoading: boolean;
    addAnimal: (animal: Omit<Animal, 'id' | 'status' | 'personality' | 'health'>) => Promise<void>;
    updateAnimal: (animal: Animal) => Promise<void>;
    deleteAnimal: (id: string) => Promise<void>;
}

const AnimalContext = createContext<AnimalContextType | undefined>(undefined);

export const AnimalProvider = ({ children }: { children: ReactNode }) => {
    const [animals, setAnimals] = useState<Animal[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchAnimals();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchAnimals = async () => {
        try {
            const { data, error } = await supabase.from('animals').select('*');
            if (error) throw error;
            // The DB id is number (bigint), frontend is string. We need to cast or convert.
            // For now, casting seems safest to avoid huge refactors of interfaces. 
            // Ideally we'd map data.
            const mappedAnimals = data?.map(d => ({
                ...d,
                id: d.id.toString(), // Ensure ID is string for frontend compatibility
                shelterId: Number(d.shelter_id) // Map camelCase from snake_case
            }));
            if (mappedAnimals) setAnimals(mappedAnimals as unknown as Animal[]);
        } catch (error) {
            console.error('Error fetching animals:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const addAnimal = async (newAnimalData: Omit<Animal, 'id' | 'status' | 'personality' | 'health'>) => {
        try {
            const dbPayload = {
                name: newAnimalData.name,
                species: newAnimalData.species,
                breed: newAnimalData.breed,
                age: newAnimalData.age,
                size: newAnimalData.size,
                // gender: newAnimalData.gender, // Not part of interface
                description: newAnimalData.description,
                // personality: newAnimalData.personality, // If array in DB supported
                // health: newAnimalData.health,
                image: newAnimalData.image,
                shelter_id: newAnimalData.shelterId,
            };

            const { data, error } = await supabase.from('animals').insert([dbPayload]).select();
            if (error) throw error;
            if (data) {
                const newAnimal = {
                    ...data[0],
                    id: data[0].id.toString(),
                    shelterId: data[0].shelter_id
                };
                setAnimals(prev => [...prev, newAnimal as unknown as Animal]);
            }
        } catch (error) {
            console.error('Error adding animal:', error);
        }
    };

    const updateAnimal = async (updatedAnimal: Animal) => {
        try {
            // Logic for update would go here
            setAnimals(prev => prev.map(a => a.id === updatedAnimal.id ? updatedAnimal : a));
        } catch (error) {
            console.error('Error updating animal:', error);
        }
    };

    const deleteAnimal = async (id: string) => {
        try {
            // Supabase delete logic
            const { error } = await supabase.from('animals').delete().eq('id', id);
            if (error) throw error;
            setAnimals(animals.filter(a => a.id !== id));
        } catch (error) {
            console.error('Error deleting animal:', error);
        }
    };

    return (
        <AnimalContext.Provider value={{ animals, isLoading, addAnimal, updateAnimal, deleteAnimal }}>
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
