import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
  const attendanceRecords = [
    {
      studentCode: "STU001",
      entryTime: "08:00 AM",
      departureTime: "04:00 PM",
    },
    {
      studentCode: "STU002",
      entryTime: "08:15 AM",
      departureTime: "04:30 PM",
    },
    {
      studentCode: "STU003",
      entryTime: "08:30 AM",
      departureTime: "04:15 PM",
    },
    {
      studentCode: "STU004",
      entryTime: "08:05 AM",
      departureTime: "04:20 PM",
    },
    {
      studentCode: "STU005",
      entryTime: "08:10 AM",
      departureTime: "04:10 PM",
    },
  ]
  
export function HistoryTable() {
    return (
      <Table>
        <TableCaption>
        Registros de asistencia estudiantil</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Codigo de estudiante</TableHead>
            <TableHead>hora de entrada</TableHead>
            <TableHead>hora de salida</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attendanceRecords.map((record) => (
            <TableRow key={record.studentCode}>
              <TableCell className="font-medium">{record.studentCode}</TableCell>
              <TableCell>{record.entryTime}</TableCell>
              <TableCell>{record.departureTime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
  