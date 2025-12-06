import { useState, useMemo } from 'react';
import { useAnimalContext } from '@/context/AnimalContext';
import AnimalCard from '@/components/AnimalCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Filter, Search } from 'lucide-react';

const CatalogPage = () => {
    // Obtiene los animales del contexto
    const { animals } = useAnimalContext();

    // Estados para los filtros de búsqueda
    const [search, setSearch] = useState('');
    const [speciesFilter, setSpeciesFilter] = useState('all');
    const [sizeFilter, setSizeFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');

    /**
     * Filtra la lista de animales basándose en los criterios seleccionados.
     * Utiliza useMemo para optimizar el rendimiento y evitar recálculos innecesarios.
     */
    const filteredAnimals = useMemo(() => {
        return animals.filter((animal) => {
            const matchesSearch = animal.name.toLowerCase().includes(search.toLowerCase()) ||
                animal.breed.toLowerCase().includes(search.toLowerCase());
            const matchesSpecies = speciesFilter === 'all' || animal.species === speciesFilter;
            const matchesSize = sizeFilter === 'all' || animal.size === sizeFilter;
            const matchesStatus = statusFilter === 'all' || animal.status === statusFilter;

            return matchesSearch && matchesSpecies && matchesSize && matchesStatus;
        });
    }, [search, speciesFilter, sizeFilter, statusFilter]);

    const FilterContent = () => (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold mb-4">Filtros</h3>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label>Especie</Label>
                        <Select value={speciesFilter} onValueChange={setSpeciesFilter}>
                            <SelectTrigger>
                                <SelectValue placeholder="Todas las especies" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todas</SelectItem>
                                <SelectItem value="Perro">Perro</SelectItem>
                                <SelectItem value="Gato">Gato</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Tamaño</Label>
                        <Select value={sizeFilter} onValueChange={setSizeFilter}>
                            <SelectTrigger>
                                <SelectValue placeholder="Todos los tamaños" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todos</SelectItem>
                                <SelectItem value="Pequeño">Pequeño</SelectItem>
                                <SelectItem value="Mediano">Mediano</SelectItem>
                                <SelectItem value="Grande">Grande</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Estado</Label>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger>
                                <SelectValue placeholder="Todos los estados" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todos</SelectItem>
                                <SelectItem value="Disponible">Disponible</SelectItem>
                                <SelectItem value="En Proceso">En Proceso</SelectItem>
                                <SelectItem value="Adoptado">Adoptado</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                            setSpeciesFilter('all');
                            setSizeFilter('all');
                            setStatusFilter('all');
                            setSearch('');
                        }}
                    >
                        Limpiar Filtros
                    </Button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Nuestros Animales</h1>
                    <p className="text-muted-foreground">Encuentra a tu compañero ideal</p>
                </div>

                <div className="flex gap-2 w-full md:w-auto">
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Buscar por nombre o raza..."
                            className="pl-8"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" className="md:hidden">
                                <Filter className="h-4 w-4 mr-2" />
                                Filtros
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left">
                            <FilterContent />
                        </SheetContent>
                    </Sheet>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Desktop Sidebar */}
                <aside className="hidden md:block w-64 flex-shrink-0">
                    <div className="sticky top-24">
                        <FilterContent />
                    </div>
                </aside>

                {/* Grid */}
                <div className="flex-1">
                    {filteredAnimals.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredAnimals.map((animal) => (
                                <AnimalCard key={animal.id} animal={animal} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-lg text-muted-foreground">No se encontraron animales con estos filtros.</p>
                            <Button
                                variant="link"
                                onClick={() => {
                                    setSpeciesFilter('all');
                                    setSizeFilter('all');
                                    setStatusFilter('all');
                                    setSearch('');
                                }}
                            >
                                Limpiar búsqueda
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CatalogPage;
