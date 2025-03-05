import { saveAs } from 'file-saver';
import * as XLSX from "xlsx"
import { Button } from './ui/button';
import { calculateDuration } from '@/utils/calculateDuration';

export const ExcelExport = ({ data, fileName, totalHours }: { data: any, fileName: string, totalHours: string }) => {
  const exportToExcel = () => {
    
    const rowsWithDuration = data.map((row: any) => {
      const entryTime = row.entryTime;
      const departureTime = row.departureTime;
      const duration = departureTime ? calculateDuration(entryTime, departureTime) : 'En curso';
      return {...row, duration};
    });
    
    const worksheet = XLSX.utils.json_to_sheet([...rowsWithDuration, { 'Total Hours': totalHours }]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], {type: 'application/octet-stream'});
    saveAs(blob, `${fileName}.xlsx`);
  };


  return (
    <Button onClick={exportToExcel}>Export to Excel</Button>
  );
}

