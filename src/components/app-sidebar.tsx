import * as React from "react"
import { useState } from "react"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSubItem } from "@/components/ui/sidebar"
import { Link } from "react-router"
import { CalendarPlus2, Eye, Trash2 } from "lucide-react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import Database from '@tauri-apps/plugin-sql';
import { toast } from "sonner"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const handleDeleteDatabase = async () => {
        try {
            const db = await Database.load('sqlite:registrohoras.db');
            await db.execute('DROP TABLE IF EXISTS attendance_records');
            toast.success('Base de datos eliminada');
            setIsDeleteDialogOpen(false);
        } catch (error) {
            console.error('Error deleting database:', error);
            toast.error('Error al eliminar la base de datos');
        }
    };

    return (
        <Sidebar variant="inset" {...props}>
            <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuSubItem>
                    <div className="flex gap-5 items-center">
                        <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                            <img src="/radiocucei.png"   />
                        </div>
                        <span className="font-bold">Radio CUCEI</span>
                    </div>
                </SidebarMenuSubItem>
            </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>                            
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link to="/">
                                        <CalendarPlus2 />
                                        <span>Registrarse</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link to="/history" >
                                        <Eye />
                                        <span>Ver historial</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton onClick={() => setIsDeleteDialogOpen(true)}>
                                    <Trash2 />
                                    <span>Eliminar Base de Datos</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta acción eliminará permanentemente todos los registros de la base de datos.
                            Esta acción no se puede deshacer.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteDatabase} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            Eliminar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Sidebar>
    )
}
