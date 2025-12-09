import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Shelter } from '@/data/mockShelters';
import { supabase } from '@/lib/supabase';

interface ShelterContextType {
    shelters: Shelter[];
    isLoading: boolean;
    addShelter: (shelter: Omit<Shelter, 'id' | 'status' | 'joinedDate'>) => Promise<void>;
    updateShelter: (shelter: Shelter) => Promise<void>;
    deleteShelter: (id: number) => Promise<void>;
}

const ShelterContext = createContext<ShelterContextType | undefined>(undefined);

export const ShelterProvider = ({ children }: { children: ReactNode }) => {
    const [shelters, setShelters] = useState<Shelter[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchShelters();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchShelters = async () => {
        try {
            const { data, error } = await supabase.from('shelters').select('*');
            if (error) throw error;
            if (data) setShelters(data as unknown as Shelter[]); // Cast to match interface for now
        } catch (error) {
            console.error('Error fetching shelters:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const addShelter = async (newShelterData: Omit<Shelter, 'id' | 'status' | 'joinedDate'>) => {
        try {
            // Map frontend fields to DB columns
            const dbPayload = {
                name: newShelterData.name,
                email: newShelterData.email,
                phone: newShelterData.phone,
                city: newShelterData.city,
                province: newShelterData.province,
                location: newShelterData.location,
                donation_number: newShelterData.donationNumber,
                // password removed
                status: 'Pendiente'
            };

            const { data, error } = await supabase.from('shelters').insert([dbPayload]).select();
            if (error) throw error;
            if (data) {
                // Refresh local state or append
                setShelters(prev => [...prev, data[0] as unknown as Shelter]);
            }
        } catch (error) {
            console.error('Error adding shelter:', error);
            alert('Error al registrar la protectora. Por favor inténtalo de nuevo.');
        }
    };

    const updateShelter = async (updatedShelter: Shelter) => {
        // Implementation for update if needed (omitted for brevity if not strictly requested, but good to have signature)
        try {
            const { error } = await supabase.from('shelters').update(updatedShelter).eq('id', updatedShelter.id);
            if (error) throw error;
            setShelters(prev => prev.map(s => s.id === updatedShelter.id ? updatedShelter : s));
        } catch (error) {
            console.error('Error updating shelter:', error);
        }
    };

    const deleteShelter = async (id: number) => {
        try {
            const { error } = await supabase.from('shelters').delete().eq('id', id);
            if (error) throw error;
            setShelters(prev => prev.filter(s => s.id !== id));
        } catch (error) {
            console.error('Error deleting shelter:', error);
        }
    };

    return (
        <ShelterContext.Provider value={{ shelters, isLoading, addShelter, updateShelter, deleteShelter }}>
            {children}
        </ShelterContext.Provider>
    );
};

export const useShelterContext = () => {
    const context = useContext(ShelterContext);
    if (context === undefined) {
        throw new Error('useShelterContext must be used within a ShelterProvider');
    }
    return context;
};
