import { columns, StudentData } from "@/components/history-table/columns"
import { DataTable } from "@/components/history-table/DataTable"
const data: StudentData[] = [
  {
    id: "1",
    studentCode: "21546821",
    entryTime: new Date("2024-01-15T08:30:00"),
    departureTime: new Date("2024-01-15T12:45:00")
  },
  {
    id: "2",
    studentCode: "21546822",
    entryTime: new Date("2024-01-15T09:15:00"),
    departureTime: new Date("2024-01-15T13:20:00")
  },
  {
    id: "3",
    studentCode: "21546823",
    entryTime: new Date("2024-01-15T08:00:00"),
    departureTime: new Date("2024-01-15T14:00:00")
  },
  {
    id: "4",
    studentCode: "217883232",
    entryTime: new Date("2024-01-15T08:45:00"),
    departureTime: new Date("2024-01-15T12:30:00")
  },
  {
    id: "5",
    studentCode: "217883232",
    entryTime: new Date("2024-01-15T08:45:00"),
    departureTime: new Date("2024-01-15T16:30:00")
  },
  {
    id: "5",
    studentCode: "217883232",
    entryTime: new Date("2024-01-15T08:45:00"),
    departureTime: new Date("2024-01-15T16:30:00")
  },
  {
    id: "5",
    studentCode: "217883232",
    entryTime: new Date("2024-01-15T08:45:00"),
    departureTime: new Date("2024-01-15T16:30:00")
  },
  {
    id: "5",
    studentCode: "217883232",
    entryTime: new Date("2024-01-15T08:45:00"),
    departureTime: new Date("2024-01-15T16:30:00")
  },
  {
    id: "5",
    studentCode: "217883232",
    entryTime: new Date("2024-01-15T08:45:00"),
    departureTime: new Date("2024-01-15T16:30:00")
  },
  {
    id: "5",
    studentCode: "217883232",
    entryTime: new Date("2024-01-15T08:45:00"),
    departureTime: new Date("2024-01-15T16:30:00")
  },
  {
    id: "5",
    studentCode: "217883232",
    entryTime: new Date("2024-01-15T08:45:00"),
    departureTime: new Date("2024-01-15T16:30:00")
  },
  {
    id: "5",
    studentCode: "217883232",
    entryTime: new Date("2024-01-15T08:45:00"),
    departureTime: new Date("2024-01-15T16:30:00")
  },
  {
    id: "5",
    studentCode: "217883232",
    entryTime: new Date("2024-01-15T08:45:00"),
    departureTime: new Date("2024-01-15T16:30:00")
  },
  {
    id: "5",
    studentCode: "217883232",
    entryTime: new Date("2024-01-15T08:45:00"),
    departureTime: new Date("2024-01-15T16:30:00")
  },
  {
    id: "5",
    studentCode: "217883232",
    entryTime: new Date("2024-01-15T08:45:00"),
    departureTime: new Date("2024-01-15T16:30:00")
  },
  {
    id: "5",
    studentCode: "217883232",
    entryTime: new Date("2024-01-15T08:45:00"),
    departureTime: new Date("2024-01-15T16:30:00")
  },
  {
    id: "5",
    studentCode: "217883232",
    entryTime: new Date("2024-01-15T08:45:00"),
    departureTime: new Date("2024-01-15T16:30:00")
  },
  {
    id: "5",
    studentCode: "217883232",
    entryTime: new Date("2024-01-15T08:45:00"),
    departureTime: new Date("2024-01-15T16:30:00")
  },
  {
    id: "5",
    studentCode: "217883232",
    entryTime: new Date("2024-01-15T08:45:00"),
    departureTime: new Date("2024-01-15T16:30:00")
  },
  {
    id: "5",
    studentCode: "217883232",
    entryTime: new Date("2024-01-15T08:45:00"),
    departureTime: new Date("2024-01-15T16:30:00")
  },
  {
    id: "5",
    studentCode: "217883232",
    entryTime: new Date("2024-01-15T08:45:00"),
    departureTime: new Date("2024-01-15T16:30:00")
  },
  {
    id: "5",
    studentCode: "217883232",
    entryTime: new Date("2024-01-15T08:45:00"),
    departureTime: new Date("2024-01-15T16:30:00")
  },
  {
    id: "5",
    studentCode: "217883232",
    entryTime: new Date("2024-01-15T08:45:00"),
    departureTime: new Date("2024-01-15T16:30:00")
  },
  {
    id: "5",
    studentCode: "217883232",
    entryTime: new Date("2024-01-15T08:45:00"),
    departureTime: new Date("2024-01-15T16:30:00")
  },
  {
    id: "5",
    studentCode: "217883232",
    entryTime: new Date("2024-01-15T08:45:00"),
    departureTime: new Date("2024-01-15T16:30:00")
  },
  {
    id: "5",
    studentCode: "217883232",
    entryTime: new Date("2024-01-15T08:45:00"),
    departureTime: new Date("2024-01-15T16:30:00")
  },
  {
    id: "5",
    studentCode: "217883232",
    entryTime: new Date("2024-01-15T08:45:00"),
    departureTime: new Date("2024-01-15T16:30:00")
  },
]
export const HistoryPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-10">Historial</h1>
      <div className="w-10/12 mx-auto">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  )
}
