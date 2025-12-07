import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Edit, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAnimalContext } from '@/context/AnimalContext';
import { supabase } from '@/lib/supabase';

const AdminDashboard = () => {
    // Obtiene las funciones y datos del contexto de animales
    const { animals, addAnimal, updateAnimal, deleteAnimal } = useAnimalContext();

    // Estados para controlar los diálogos de creación y edición
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editingAnimal, setEditingAnimal] = useState<any>(null);
    const [newAnimal, setNewAnimal] = useState({
        name: '',
        species: '',
        breed: '',
        age: '',
        size: '',
        image: '',
        description: '',
    });

    const [uploading, setUploading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewAnimal({ ...newAnimal, [e.target.id]: e.target.value });
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            if (!e.target.files || e.target.files.length === 0) {
                return;
            }
            setUploading(true);
            const file = e.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('animal-images')
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            const { data } = supabase.storage.from('animal-images').getPublicUrl(filePath);

            setNewAnimal({ ...newAnimal, image: data.publicUrl });
        } catch (error) {
            alert('Error subiendo la imagen');
            console.error(error);
        } finally {
            setUploading(false);
        }
    };

    /**
     * Maneja el envío del formulario para crear un nuevo animal.
     * Convierte los tipos necesarios y limpia el formulario tras el éxito.
     */
    const handleAddAnimal = (e: React.FormEvent) => {
        e.preventDefault();
        addAnimal({
            ...newAnimal,
            species: newAnimal.species as 'Perro' | 'Gato',
            size: newAnimal.size as 'Pequeño' | 'Mediano' | 'Grande',
            shelterId: 1, // Por defecto asignamos al refugio principal
            // status: 'Disponible' // Status por defecto
        });
        setIsDialogOpen(false);
        setNewAnimal({
            name: '',
            species: '',
            breed: '',
            age: '',
            size: '',
            image: '',
            description: '',
        });
    };

    const startEdit = (animal: any) => {
        setEditingAnimal({ ...animal });
        setIsEditOpen(true);
    };

    const saveEdit = () => {
        if (editingAnimal) {
            updateAnimal(editingAnimal);
            setIsEditOpen(false);
            setEditingAnimal(null);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Panel de Administración</h1>
                    <p className="text-muted-foreground">Gestiona el inventario de animales</p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-primary hover:bg-primary/90 text-white">
                            <Plus className="mr-2 h-4 w-4" /> Añadir Nuevo Animal
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Añadir Nuevo Animal</DialogTitle>
                            <DialogDescription>
                                Rellena los datos del animal para añadirlo al inventario.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleAddAnimal}>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        Nombre
                                    </Label>
                                    <Input
                                        id="name"
                                        value={newAnimal.name}
                                        onChange={handleInputChange}
                                        className="col-span-3"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="species" className="text-right">
                                        Especie
                                    </Label>
                                    <Input
                                        id="species"
                                        value={newAnimal.species}
                                        onChange={handleInputChange}
                                        className="col-span-3"
                                        placeholder="Perro, Gato..."
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="image" className="text-right">
                                        Foto
                                    </Label>
                                    <div className="col-span-3">
                                        <Input
                                            id="image-upload"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            disabled={uploading}
                                            className="mb-2"
                                        />
                                        {newAnimal.image && (
                                            <p className="text-xs text-green-600">¡Imagen subida correctamente!</p>
                                        )}
                                        {uploading && <p className="text-xs text-muted-foreground">Subiendo...</p>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="description" className="text-right">
                                        Descripción
                                    </Label>
                                    <Textarea
                                        id="description"
                                        value={newAnimal.description}
                                        onChange={handleInputChange}
                                        className="col-span-3"
                                        required
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Guardar Animal</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Foto</TableHead>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Especie</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {animals.map((animal) => (
                            <TableRow key={animal.id}>
                                <TableCell>
                                    <div className="h-12 w-12 rounded-md overflow-hidden">
                                        <img
                                            src={animal.image}
                                            alt={animal.name}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium">{animal.name}</TableCell>
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
                                    <div className="flex justify-end gap-2">
                                        <Button variant="ghost" size="icon" className="hover:text-primary" onClick={() => startEdit(animal)}>
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="hover:text-destructive" onClick={() => {
                                            if (confirm('¿Estás seguro de eliminar este animal?')) {
                                                deleteAnimal(animal.id);
                                            }
                                        }}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="mt-4 text-right">
                <Link to="/">
                    <Button variant="link" className="text-muted-foreground">Cerrar Sesión</Button>
                </Link>
            </div>

            {/* Edit Dialog */}
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Editar Animal</DialogTitle>
                        <DialogDescription>
                            Modifica los datos del animal.
                        </DialogDescription>
                    </DialogHeader>
                    {editingAnimal && (
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-name" className="text-right">Nombre</Label>
                                <Input
                                    id="edit-name"
                                    value={editingAnimal.name}
                                    onChange={(e) => setEditingAnimal({ ...editingAnimal, name: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-status" className="text-right">Estado</Label>
                                <select
                                    id="edit-status"
                                    value={editingAnimal.status}
                                    onChange={(e) => setEditingAnimal({ ...editingAnimal, status: e.target.value })}
                                    className="col-span-3 flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <option value="Disponible">Disponible</option>
                                    <option value="Adoptado">Adoptado</option>
                                    <option value="En Acogida">En Acogida</option>
                                </select>
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button type="submit" onClick={saveEdit}>Guardar Cambios</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AdminDashboard;
