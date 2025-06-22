"use client";

import { useGetPokemonByNameQuery } from "../redux/services/pokemon";

export default function Pokemon() {
  const { data, error, isLoading } = useGetPokemonByNameQuery("bulbasaur", {
    // pollingInterval: 2000,
  });

  if (isLoading) {
    return <div className="text-2xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-2xl">Error</div>;
  }

  return (
    <div>
      {data.game_indices.map(
        (
          game: { version: { name: string }; game_index: number },
          index: number
        ) => (
          <div key={index}>{game.version.name}</div>
        )
      )}
    </div>
  );
}
