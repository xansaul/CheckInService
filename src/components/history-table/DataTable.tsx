import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  ColumnFiltersState,
  getFilteredRowModel,
  useReactTable,
  getPaginationRowModel,
  PaginationState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { DatePickerWithRange } from "../DatePickerWithRange";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from "../ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ExcelExport } from "../ExcelExport";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onDelete: (id: number) => Promise<void>;
}

export const dateBetween = (row: any, columnId: string, value: DateRange) => {
  if (!value?.from || !value?.to) return true;
  const cellValue = row.getValue(columnId) as Date;
  const from = new Date(value.from);
  const to = new Date(value.to);
  to.setHours(23, 59, 59, 999);
  return cellValue >= from && cellValue <= to;
};

export function DataTable<TData, TValue>({
  columns,
  data,
  onDelete,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 15,
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const calculateTotalHours = () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    let totalMinutes = 0;

    selectedRows.forEach((row) => {
      const entryTime = (row.original as any).entryTime;
      const departureTime = (row.original as any).departureTime;
      if(departureTime === "No registrada") {
        return
      }

      if (entryTime && departureTime) {
        totalMinutes += Math.floor(
          (departureTime.getTime() - entryTime.getTime()) / (1000 * 60)
        );
      }
    });

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours} ${hours === 1 ? "hora" : "horas"}${
      minutes > 0 ? ` ${minutes} min` : ""
    }`;
  };

  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    filterFns: {
      dateBetween,
    },
    state: {
      sorting,
      columnFilters,
      pagination,
    },
  });

  return (
    <>
      <div className="flex justify-between">
        <Input
          placeholder="Filtrar por código"
          value={
            (table.getColumn("studentCode")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("studentCode")?.setFilterValue(event.target.value)
          }
          className="max-w-sm mb-4"
        />
        <DatePickerWithRange
          onDateRangeChange={(range) => {
            table.getColumn("entryTime")?.setFilterValue(range);
          }}
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onDoubleClick={() => {
                    setSelectedRow(row.original);

                    setIsModalOpen(true);
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="my-2 flex gap-3 justify-between w-full">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} Filas Seleccionadas
        </div>
        <Button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>
        <Button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Siguiente
        </Button>
        <AlertDialog open={isModalOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                ¿Estás seguro de eliminar este registro?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción no se puede deshacer. Se eliminará permanentemente
                el registro de la base de datos.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setIsModalOpen(false)}>
                Cancelar
              </AlertDialogCancel>

              <Button
                variant="destructive"
                onClick={async () => {
                  if (selectedRow && selectedRow.id) {
                    await onDelete(selectedRow.id);
                    setIsModalOpen(false);
                  }
                }}
              >
                Eliminar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Conteo de horas</CardTitle>
          <CardDescription>
            Selecciona columnas para contar las horas totales.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 items-center">
            <p>Total de horas: </p>
            <span className="font-bold text-xl">{calculateTotalHours()}</span>
          </div>
        </CardContent>
        <CardFooter>
          <ExcelExport
            data={table
              .getFilteredSelectedRowModel()
              .rows.map((row) => row.original)}
            fileName="DatosAlumno"
            totalHours={calculateTotalHours()}
          />
        </CardFooter>
      </Card>
    </>
  );
}
