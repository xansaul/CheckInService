
import { ColumnDef } from "@tanstack/react-table"
import { dateBetween } from "./DataTable";
import { Checkbox } from "../ui/checkbox";
import { calculateDuration } from "@/utils/calculateDuration";

export type StudentData = {
    id: number;
    studentCode: String;
    entryTime: Date;
    departureTime: Date | null | string;
}

const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-Es', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
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
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => {
                row.toggleSelected(!!value)
                console.log(row.original)
            }}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
    {
        accessorKey: "studentCode",
        header: "Codigo de estudiante",
    },
    {
        accessorKey: "entryTimeDate",
        header: "Fecha",
        cell: ({ row }) => {
            const date = row.getValue("entryTime");
            return date instanceof Date ? formatDate(date) : "Invalid Date";
        }
    },
    {
        accessorKey: "entryTime",
        header: "Hora de entrada",
        cell: ({ row }) => formatTime(row.getValue("entryTime")),
        filterFn: dateBetween
    },
    {
        accessorKey: "departureTime",
        header: "Hora de salida",
        cell: ({ row }) => !!row.getValue("departureTime") ? formatTime(row.getValue("departureTime")) : "No registrada"
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
