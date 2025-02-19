import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import Database from '@tauri-apps/plugin-sql';

export const RegisterPage = () => {
  const [studentCode, setStudentCode] = useState('');

  const handleSubmit = async () => {
    if (!studentCode) {
      alert('Por favor ingrese un código de estudiante');
      return;
    }

    try {
      const db = await Database.load('sqlite:registrohoras.db');
      
      
      const today = new Date().toISOString().split('T')[0];
      const existingRecord = await db.select(
        `SELECT * FROM attendance_records 
         WHERE student_code = ? 
         AND DATE(check_in) = DATE(?) 
         AND check_out IS NULL`,
        [studentCode, today]
      );

      const currentTime = new Date();
      const isoTime = currentTime.toISOString();

      if ((existingRecord  as any).length === 0) {
        // Create new entry
        await db.execute(
          'INSERT INTO attendance_records (student_code, check_in) VALUES (?, ?)',
          [studentCode, isoTime]
        );
        alert('Entrada registrada exitosamente');
      } else {
        const record = (existingRecord  as any)[0];
        const checkInTime = new Date(record.check_in);
        
        // Calculate total hours with 2 decimal precision
        const totalHours = Number(
          ((currentTime.getTime() - checkInTime.getTime()) / (1000 * 60 * 60)).toFixed(2)
        );

        if (totalHours < 0) {
          throw new Error('Error en el cálculo de horas');
        }

        await db.execute(
          `UPDATE attendance_records 
           SET check_out = ?, total_hours = ? 
           WHERE id = ?`,
          [isoTime, totalHours, record.id]
        );
        alert(`Salida registrada exitosamente. Total horas: ${totalHours}`);
      }

      setStudentCode(''); // Clear input after successful operation
    } catch (error) {
      console.error('Error:', error);
      alert('Error al registrar. Por favor intente nuevamente.');
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
