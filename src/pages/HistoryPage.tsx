import { HistoryTable } from "@/components/history-table"

export const HistoryPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-10">Historial</h1>
      <div className="w-10/12 mx-auto">
        <HistoryTable />
      </div>
    </div>
  )
}
