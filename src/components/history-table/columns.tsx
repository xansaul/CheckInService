
import { ColumnDef } from "@tanstack/react-table"

export type StudentData = {
    id: string;
    studentCode: String;
    entryTime: Date;
    departureTime: Date;
}

const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
};

const calculateDuration = (entryTime: Date, departureTime: Date) => {
    const diffInMinutes = Math.floor((departureTime.getTime() - entryTime.getTime()) / (1000 * 60));
    const hours = Math.floor(diffInMinutes / 60);
    const minutes = diffInMinutes % 60;
    
    if (hours > 0) {
        return `${hours} ${hours === 1 ? 'hora' : 'horas'}${minutes > 0 ? ` ${minutes} min` : ''}`;
    }
    return `${minutes} min`;
};

const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

export const columns: ColumnDef<StudentData>[] = [
    {
        accessorKey: "studentCode",
        header: "Codigo de estudiante",
    },
    {
        accessorKey: "entryTime",
        header: "Fecha",
        cell: ({ row }) => formatDate(row.getValue("entryTime"))
    },
    {
        accessorKey: "entryTime",
        header: "Hora de entrada",
        cell: ({ row }) => formatTime(row.getValue("entryTime"))
    },
    {
        accessorKey: "departureTime",
        header: "Hora de salida",
        cell: ({ row }) => formatTime(row.getValue("departureTime"))
    },
    {
        id: "duration",
        header: "Duración",
        cell: ({ row }) => {
            const entryTime = row.getValue("entryTime") as Date;
            const departureTime = row.getValue("departureTime") as Date;
            return calculateDuration(entryTime, departureTime);
        }
    },
]
