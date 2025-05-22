import { Suspense } from 'react';
import RecipeResultsServer from './RecipeResultsServer';

const RecipesPage = ({
  searchParams,
}: {
  searchParams: { query?: string; cuisine?: string; maxTime?: string };
}) => {
  const { query, cuisine, maxTime } = searchParams;

  return (
    <Suspense fallback={<div className="text-center">Loading recipes...</div>}>
      <RecipeResultsServer query={query} cuisine={cuisine} maxTime={maxTime} />
    </Suspense>
  );
};

export default RecipesPage;
