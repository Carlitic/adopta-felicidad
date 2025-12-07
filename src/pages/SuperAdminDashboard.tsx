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
import { Edit, Plus, Trash2, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useShelterContext } from '@/context/ShelterContext';
import { AnimalManagementTable } from '@/components/admin/AnimalManagementTable';

const SuperAdminDashboard = () => {
    // Obtiene las funciones y datos del contexto de protectoras
    const { shelters, addShelter, updateShelter, deleteShelter } = useShelterContext();

    // Estados para controlar los diálogos de creación y edición
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [editingShelter, setEditingShelter] = useState<any>(null);
    const [newShelter, setNewShelter] = useState({
        name: '',
        email: '',
        phone: '',
        city: '',
        province: '',
        donationNumber: '',
    });

    const pendingShelters = shelters.filter(s => s.status === 'Pendiente');
    const activeShelters = shelters.filter(s => s.status !== 'Pendiente');

    /**
     * Aprueba una solicitud de protectora pendiente.
     * Cambia el estado de la protectora a 'Activa'.
     * @param id ID de la protectora a aprobar
     */
    const handleApprove = (id: number) => {
        const shelter = shelters.find(s => s.id === id);
        if (shelter) {
            updateShelter({ ...shelter, status: 'Activa' });
        }
    };

    const handleDelete = (id: number) => {
        if (confirm('¿Estás seguro de que quieres eliminar esta protectora?')) {
            deleteShelter(id);
        }
    };

    const startEdit = (shelter: any) => {
        setEditingShelter({ ...shelter });
        setIsEditOpen(true);
    };

    const saveEdit = () => {
        if (editingShelter) {
            updateShelter(editingShelter);
            setIsEditOpen(false);
            setEditingShelter(null);
        }
    };

    const handleAddShelter = () => {
        addShelter({
            ...newShelter,
            location: newShelter.city,
        });
        setIsAddOpen(false);
        setNewShelter({
            name: '',
            email: '',
            phone: '',
            city: '',
            province: '',
            donationNumber: '',
        });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
                        <ShieldCheck className="h-8 w-8 text-primary" />
                        Panel Super Admin
                    </h1>
                    <p className="text-muted-foreground">Gestión de Protectoras Asociadas</p>
                </div>
                <Button onClick={() => setIsAddOpen(true)} className="bg-primary hover:bg-primary/90 text-white">
                    <Plus className="mr-2 h-4 w-4" /> Añadir Protectora
                </Button>
            </div>

            {/* Pending Requests Section */}
            {pendingShelters.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-yellow-600 flex items-center gap-2">
                        <ShieldCheck className="h-5 w-5" /> Solicitudes Pendientes
                    </h2>
                    <div className="bg-white rounded-lg border border-yellow-200 shadow-sm overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-yellow-50/50">
                                    <TableHead>Nombre</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Teléfono</TableHead>
                                    <TableHead>Ubicación</TableHead>
                                    <TableHead>Estado</TableHead>
                                    <TableHead>Fecha Registro</TableHead>
                                    <TableHead className="text-right">Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {pendingShelters.map((shelter) => (
                                    <TableRow key={shelter.id}>
                                        <TableCell className="font-medium">{shelter.name}</TableCell>
                                        <TableCell>{shelter.email}</TableCell>
                                        <TableCell>{shelter.phone}</TableCell>
                                        <TableCell>{shelter.city}, {shelter.province}</TableCell>
                                        <TableCell>
                                            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                                                {shelter.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{shelter.joinedDate}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    onClick={() => handleApprove(shelter.id)}
                                                    size="sm"
                                                    className="bg-green-600 hover:bg-green-700 text-white"
                                                >
                                                    <ShieldCheck className="mr-2 h-4 w-4" /> Aprobar
                                                </Button>
                                                <Button variant="ghost" size="icon" className="hover:text-destructive" onClick={() => handleDelete(shelter.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            )}

            {/* All Shelters Section */}
            <h2 className="text-xl font-semibold mb-4">Protectoras Registradas</h2>
            <div className="bg-white rounded-lg border shadow-sm overflow-hidden mb-12">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Teléfono</TableHead>
                            <TableHead>Ubicación</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead>Fecha Registro</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {activeShelters.map((shelter) => (
                            <TableRow key={shelter.id}>
                                <TableCell className="font-medium">{shelter.name}</TableCell>
                                <TableCell>{shelter.email}</TableCell>
                                <TableCell>{shelter.phone}</TableCell>
                                <TableCell>{shelter.city}, {shelter.province}</TableCell>
                                <TableCell>
                                    <Badge
                                        variant={shelter.status === 'Activa' ? 'default' : 'secondary'}
                                        className={shelter.status === 'Activa' ? 'bg-green-500' : 'bg-gray-500'}
                                    >
                                        {shelter.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{shelter.joinedDate}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button variant="ghost" size="icon" className="hover:text-primary" onClick={() => startEdit(shelter)}>
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="hover:text-destructive" onClick={() => handleDelete(shelter.id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Global Animals Management Section */}
            <h2 className="text-xl font-semibold mb-4 text-primary flex items-center gap-2">
                <ShieldCheck className="h-5 w-5" /> Gestión Global de Animales
            </h2>
            <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
                <AnimalManagementTable />
            </div>

            <div className="mt-8 text-right">
                <Link to="/">
                    <Button variant="link" className="text-muted-foreground">Cerrar Sesión</Button>
                </Link>
            </div>

            {/* Add Dialog */}
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Añadir Protectora</DialogTitle>
                        <DialogDescription>
                            Registra una nueva protectora manualmente.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="newName" className="text-right">Nombre</Label>
                            <Input
                                id="newName"
                                value={newShelter.name}
                                onChange={(e) => setNewShelter({ ...newShelter, name: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="newEmail" className="text-right">Email</Label>
                            <Input
                                id="newEmail"
                                value={newShelter.email}
                                onChange={(e) => setNewShelter({ ...newShelter, email: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="newPhone" className="text-right">Teléfono</Label>
                            <Input
                                id="newPhone"
                                value={newShelter.phone}
                                onChange={(e) => setNewShelter({ ...newShelter, phone: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="newCity" className="text-right">Ciudad</Label>
                            <Input
                                id="newCity"
                                value={newShelter.city}
                                onChange={(e) => setNewShelter({ ...newShelter, city: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="newProvince" className="text-right">Provincia</Label>
                            <Input
                                id="newProvince"
                                value={newShelter.province}
                                onChange={(e) => setNewShelter({ ...newShelter, province: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="newDonation" className="text-right">Donaciones</Label>
                            <Input
                                id="newDonation"
                                value={newShelter.donationNumber}
                                onChange={(e) => setNewShelter({ ...newShelter, donationNumber: e.target.value })}
                                className="col-span-3"
                                placeholder="ES00..."
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={handleAddShelter}>Añadir Protectora</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Editar Protectora</DialogTitle>
                        <DialogDescription>
                            Modifica los datos de la protectora.
                        </DialogDescription>
                    </DialogHeader>
                    {editingShelter && (
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">Nombre</Label>
                                <Input
                                    id="name"
                                    value={editingShelter.name}
                                    onChange={(e) => setEditingShelter({ ...editingShelter, name: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="email" className="text-right">Email</Label>
                                <Input
                                    id="email"
                                    value={editingShelter.email}
                                    onChange={(e) => setEditingShelter({ ...editingShelter, email: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="phone" className="text-right">Teléfono</Label>
                                <Input
                                    id="phone"
                                    value={editingShelter.phone}
                                    onChange={(e) => setEditingShelter({ ...editingShelter, phone: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="city" className="text-right">Ciudad</Label>
                                <Input
                                    id="city"
                                    value={editingShelter.city}
                                    onChange={(e) => setEditingShelter({ ...editingShelter, city: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="donationNumber" className="text-right">Donaciones</Label>
                                <Input
                                    id="donationNumber"
                                    value={editingShelter.donationNumber || ''}
                                    onChange={(e) => setEditingShelter({ ...editingShelter, donationNumber: e.target.value })}
                                    className="col-span-3"
                                    placeholder="ES00 0000 0000 0000 0000 0000"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="status" className="text-right">Estado</Label>
                                <select
                                    id="status"
                                    value={editingShelter.status}
                                    onChange={(e) => setEditingShelter({ ...editingShelter, status: e.target.value })}
                                    className="col-span-3 flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <option value="Activa">Activa</option>
                                    <option value="Inactiva">Inactiva</option>
                                    <option value="Pendiente">Pendiente</option>
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

export default SuperAdminDashboard;
