import { Button } from "@/shared/presentation/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/presentation/components/ui/card";
import Link from "next/link";
import { BiCategory, BiError } from "react-icons/bi";

const CategoryNotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center from-gray-50 to-gray-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
            <BiError className="h-10 w-10 text-destructive" />
          </div>
          <CardTitle className="text-2xl font-bold">Categoría No Encontrada</CardTitle>
          <CardDescription className="text-base">
            La categoría que buscas no existe o no está disponible
          </CardDescription>
        </CardHeader>
        
        <CardContent className="text-center">
          <div className="mb-4 flex items-center justify-center gap-2 text-muted-foreground">
            <BiCategory className="h-5 w-5" />
            <p className="text-sm">
              Las categorías disponibles son: <span className="font-semibold">category-1</span>, <span className="font-semibold">category-2</span> y <span className="font-semibold">category-3</span>
            </p>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-center">
          <Button asChild className="w-full sm:w-auto">
            <Link href="/">
              Volver al Inicio
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CategoryNotFound;