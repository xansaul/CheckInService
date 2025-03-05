import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import Database from '@tauri-apps/plugin-sql';
import { toast } from "sonner";

export const RegisterPage = () => {
  const [studentCode, setStudentCode] = useState('');

  const handleSubmit = async () => {
    if (!studentCode) {
      toast.error('Por favor ingrese un código de estudiante')
      return;
    }
    
    try {
      const db = await Database.load('sqlite:registrohoras.db');
      
      // Create table if it doesn't exist
      await db.execute(`
        CREATE TABLE IF NOT EXISTS attendance_records (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          student_code TEXT NOT NULL,
          check_in TEXT NOT NULL,
          check_out TEXT,
          total_hours REAL
        )
      `);
      
      // if(true){
      //   await db.execute("delete from attendance_records")
      //   return;
      // }
      const currentDate = new Date();
      const currentISOTime = currentDate.toISOString();

      const existingRecord = await db.select(
        `SELECT * FROM attendance_records 
         WHERE student_code = ? 
         AND DATE(check_in) = DATE(?) 
         AND check_out IS NULL`,
        [studentCode, currentISOTime]
      );

      if ((existingRecord as any).length === 0) {
        await db.execute(
          'INSERT INTO attendance_records (student_code, check_in) VALUES (?, ?)',
          [studentCode, currentISOTime]
        );
        toast.success('Entrada registrada exitosamente');
      } else {
        const record = (existingRecord as any)[0];
        const checkInTime = new Date(record.check_in);
        const checkOutTime = new Date();
        const totalHours = (checkOutTime.getTime() - checkInTime.getTime()) / (1000 * 60 * 60);

        await db.execute(
          `UPDATE attendance_records 
           SET check_out = ?, total_hours = ? 
           WHERE id = ?`,
          [currentISOTime, totalHours, record.id]
        );
        toast.success(`Salida registrada exitosamente. Total horas: ${totalHours.toFixed(2)}`)
 
      }

      setStudentCode(''); 
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al registrar. Por favor intente nuevamente.');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">Registrarse/Salida</h1>
      <div className="h-[50vh] w-full flex justify-center items-center flex-col">
        <div className="w-5/12 mb-4">
          <Label htmlFor="codigo" className="block mb-2">Codigo De Alumno</Label>
          <Input 
            type="text" 
            id="codigo" 
            placeholder="21546821" 
            value={studentCode}
            onChange={(e) => setStudentCode(e.target.value)}
          />
        </div>
        <Button onClick={handleSubmit}>Registrar</Button>
      </div>
    </div>
  )
}
