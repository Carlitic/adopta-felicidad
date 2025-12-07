import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAnimalContext } from '@/context/AnimalContext';
import { useShelterContext } from '@/context/ShelterContext';

export const AnimalManagementTable = () => {
    const { animals, deleteAnimal } = useAnimalContext();
    const { shelters } = useShelterContext();

    const getShelterName = (shelterId: string | number) => {
        const shelter = shelters.find(s => String(s.id) === String(shelterId));
        return shelter ? shelter.name : 'Desconocido';
    };

    const handleDelete = (id: string) => {
        if (confirm('ADM: ¿Estás seguro de forzar la eliminación de este animal?')) {
            deleteAnimal(id);
        }
    };

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Foto</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Protectora</TableHead>
                    <TableHead>Especie</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones Admin</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {animals.map((animal) => (
                    <TableRow key={animal.id}>
                        <TableCell>
                            <div className="h-10 w-10 rounded-md overflow-hidden">
                                <img
                                    src={animal.image}
                                    alt={animal.name}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </TableCell>
                        <TableCell className="font-medium">{animal.name}</TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                            {getShelterName(animal.shelterId)}
                        </TableCell>
                        <TableCell>{animal.species}</TableCell>
                        <TableCell>
                            <Badge
                                variant={animal.status === 'Disponible' ? 'default' : 'secondary'}
                                className={animal.status === 'Disponible' ? 'bg-green-500' : ''}
                            >
                                {animal.status}
                            </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-destructive hover:bg-destructive/10"
                                onClick={() => handleDelete(animal.id)}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
