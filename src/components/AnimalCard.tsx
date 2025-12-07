import { Animal } from '@/data/mockData';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useShelterContext } from '@/context/ShelterContext';

interface AnimalCardProps {
    animal: Animal;
}

const AnimalCard = ({ animal }: AnimalCardProps) => {
    // Busca la información de la protectora asociada al animal usando el shelterId
    const { shelters } = useShelterContext();
    const shelter = shelters.find(s => s.id === animal.shelterId);

    return (
        <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-none shadow-md">
            <div className="relative aspect-square overflow-hidden">
                <img
                    src={animal.image}
                    alt={animal.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3">
                    <Badge
                        variant={animal.status === 'Disponible' ? 'default' : 'secondary'}
                        className={animal.status === 'Disponible' ? 'bg-green-500 hover:bg-green-600' : ''}
                    >
                        {animal.status}
                    </Badge>
                </div>
            </div>
            <CardHeader className="p-4 pb-0">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-xl font-bold text-foreground">{animal.name}</h3>
                        <p className="text-sm text-muted-foreground">{animal.breed}</p>
                    </div>
                    {shelter && (
                        <div className="text-right">
                            <p className="text-sm font-semibold text-primary">{shelter.name}</p>
                            <p className="text-xs text-muted-foreground">{shelter.city}, {shelter.province}</p>
                        </div>
                    )}
                </div>
            </CardHeader>
            <CardContent className="p-4 pt-2">
                <div className="flex gap-2 text-sm text-muted-foreground">
                    <span>{animal.age}</span>
                    <span>•</span>
                    <span>{animal.species}</span>
                    <span>•</span>
                    <span>{animal.size}</span>
                </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <Link to={`/animal/${animal.id}`} className="w-full">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                        Ver Ficha
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
};

export default AnimalCard;
