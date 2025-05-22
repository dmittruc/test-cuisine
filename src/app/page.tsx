'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Page = () => {
  const [query, setQuery] = useState<string>('');
  const [cuisine, setCuisine] = useState<string>('');
  const [maxTime, setMaxTime] = useState<number>(0);
  const [isBtnEnabled, setIsBtnEnabled] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setIsBtnEnabled(!!query || !!cuisine || maxTime > 0);
  }, [query, cuisine, maxTime]);

  const handleClickBtn = () => {
    const params = new URLSearchParams();
    if (query) params.set('query', query);
    if (cuisine) params.set('cuisine', cuisine);
    if (maxTime > 0) params.set('maxTime', maxTime.toString());
    router.push(`/recipes?${params.toString()}`);
  };

  return (
    <div className="container mx-auto p-4">
      <form className="flex flex-col gap-4 max-w-md">
        <div>
          <label htmlFor="query" className="block text-sm font-medium mb-1">
            Search (e.g. pasta)
          </label>
          <input
            type="text"
            id="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter a dish"
          />
        </div>
        <div>
          <label htmlFor="cuisine" className="block text-sm font-medium mb-1">
            Сuisine
          </label>
          <select
            id="cuisine"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">choose a cuisine</option>
            <option value="Italian">Italian</option>
            <option value="Mexican">Mexican</option>
            <option value="Chinese">Chinese</option>
            <option value="Chinese">French</option>
          </select>
        </div>
        <div>
          <label htmlFor="maxTime" className="block text-sm font-medium mb-1">
            Maximum cooking time (minutes)
          </label>
          <input
            type="number"
            id="maxTime"
            value={maxTime || ''}
            onChange={(e) => setMaxTime(Number(e.target.value))}
            className="w-full p-2 border rounded"
            placeholder="Enter time in minutes"
            min="0"
          />
        </div>
        <button
          type="button"
          onClick={handleClickBtn}
          disabled={!isBtnEnabled}
          className={`p-2 rounded text-white ${
            isBtnEnabled
              ? 'bg-blue-500 hover:bg-blue-600'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Page;
