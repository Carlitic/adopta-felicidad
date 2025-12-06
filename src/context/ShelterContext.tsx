import { createContext, useContext, useState, ReactNode } from 'react';
import { Shelter, shelters as initialShelters } from '@/data/mockShelters';

interface ShelterContextType {
    shelters: Shelter[];
    addShelter: (shelter: Omit<Shelter, 'id' | 'status' | 'joinedDate'>) => void;
    updateShelter: (shelter: Shelter) => void;
    deleteShelter: (id: number) => void;
}

const ShelterContext = createContext<ShelterContextType | undefined>(undefined);

export const ShelterProvider = ({ children }: { children: ReactNode }) => {
    // Estado local para almacenar la lista de refugios/protectoras
    const [shelters, setShelters] = useState<Shelter[]>(initialShelters);

    /**
     * Añade una nueva protectora al sistema.
     * Genera un ID numérico secuencial y establece el estado como 'Pendiente'.
     * @param newShelterData Datos de la nueva protectora
     */

    const addShelter = (newShelterData: Omit<Shelter, 'id' | 'status' | 'joinedDate'>) => {
        const newShelter: Shelter = {
            ...newShelterData,
            id: Math.max(...shelters.map(s => s.id), 0) + 1,
            status: 'Pendiente',
            joinedDate: new Date().toISOString().split('T')[0],
        };
        setShelters([...shelters, newShelter]);
    };

    /**
     * Actualiza los datos de una protectora existente.
     * @param updatedShelter Objeto protectora con los datos actualizados
     */
    const updateShelter = (updatedShelter: Shelter) => {
        setShelters(shelters.map(s => s.id === updatedShelter.id ? updatedShelter : s));
    };

    /**
     * Elimina una protectora del sistema.
     * @param id ID de la protectora a eliminar
     */
    const deleteShelter = (id: number) => {
        setShelters(shelters.filter(s => s.id !== id));
    };

    return (
        <ShelterContext.Provider value={{ shelters, addShelter, updateShelter, deleteShelter }}>
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
