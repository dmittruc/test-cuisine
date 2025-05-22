import Link from 'next/link';

interface IProps {
  query?: string;
  cuisine?: string;
  maxTime?: string;
}

interface Recipe {
  id: number;
  title: string;
  image: string;
}

const RecipeResultsServer = async ({ query, cuisine, maxTime }: IProps) => {
  try {
    const params = new URLSearchParams({
      apiKey: process.env.PUBLIC_SPOONACULAR_API_KEY || '',
      number: '10',
    });

    if (query) params.append('query', query);
    if (cuisine) params.append('cuisine', cuisine);
    if (maxTime) params.append('maxReadyTime', maxTime);

    const res = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?${params.toString()}`,
      {
        cache: 'no-store',
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch recipes: ${res.statusText}`);
    }

    const data = await res.json();
    const recipes: Recipe[] = data.results || [];

    return (
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Search Results</h2>
        {recipes.length === 0 ? (
          <div>No recipes found</div>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <li
                key={recipe.id}
                className="border rounded overflow-hidden hover:shadow-lg transition"
              >
                <Link href={`/recipes/${recipe.id}`}>
                  <div className="cursor-pointer">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold">{recipe.title}</h3>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  } catch (error) {
    console.error('Error:', error);
    return (
      <div className="text-center text-red-600">
        Error loading recipes. Try again later.
      </div>
    );
  }
};

export default RecipeResultsServer;
