import { columns, StudentData } from "@/components/history-table/columns"
import { DataTable } from "@/components/history-table/DataTable"
import { useEffect, useState } from "react"
import Database from '@tauri-apps/plugin-sql';

export const HistoryPage = () => {
  const [data, setData] = useState<StudentData[]>([]);
  useEffect(()=>{
    const getData = async () => {
      const db = await Database.load('sqlite:registrohoras.db');
      const result : { id: number;
        student_code: String;
        check_in: Date;
        check_out: Date  }[] = await db.select('SELECT * FROM attendance_records');
      setData(result.map((result) => {
        
        return  {
          id: result.id,
          studentCode:result.student_code,
          entryTime: new Date(result.check_in),
          departureTime: result.check_out ? new Date(result.check_out) : null,
        }
      }))

    }
    getData();
  },[]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-10">Historial</h1>
      <div className="w-10/12 mx-auto">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  )
}
