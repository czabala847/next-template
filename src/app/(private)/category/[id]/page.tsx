import { notFound } from "next/navigation"

const ALLOWED_CATEGORIES = ["category-1", "category-2", "category-3"];

type CategoryProps = {
  params: {
    id: string;
  };
};

const Category = async ({ params }: CategoryProps) => {
  const { id } = await params;

  // Validate if the category ID is allowed
  if (!ALLOWED_CATEGORIES.includes(id)) {
    notFound();
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Categoría: {id}</h1>
      <p className="mt-4 text-muted-foreground">
        Esta es la página de la categoría {id}
      </p>
    </div>
  );
};

export default Category;
