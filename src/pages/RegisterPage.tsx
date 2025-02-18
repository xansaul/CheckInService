import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


export const RegisterPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold">Registrarse/Salida</h1>
      <div className="h-[50vh] w-full flex justify-center items-center flex-col">
        <div className="w-5/12 mb-4">
          <Label htmlFor="codigo" className="block mb-2">Codigo De Alumno</Label>
          <Input type="text" id="codigo" placeholder="21546821" />
        </div>
        <Button>Registrar</Button>
      </div>
    </div>
  )
}
