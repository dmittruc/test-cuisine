import axios from 'axios';

type Props = {
  params: {
    id: string;
  };
};

type RecipeDetails = {
  id: number;
  title: string;
  image: string;
  summary: string;
  instructions: string;
};

const RecipeDetailsPage = async ({ params }: Props) => {
  const { id } = params;

  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information`,
      {
        params: {
          apiKey: process.env.PUBLIC_SPOONACULAR_API_KEY,
        },
      }
    );

    const recipe: RecipeDetails = response.data;

    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full max-w-md rounded mb-4"
        />
        <div
          className="mb-4 prose prose-sm sm:prose lg:prose-lg xl:prose-xl"
          dangerouslySetInnerHTML={{ __html: recipe.summary }}
        />
        <div
          className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl"
          dangerouslySetInnerHTML={{ __html: recipe.instructions }}
        />
      </div>
    );
  } catch (e) {
    console.log('error', e);
    return (
      <div className="container mx-auto p-4 text-red-600">
        Error loading a recipe. Try again later
      </div>
    );
  }
};

export default RecipeDetailsPage;
