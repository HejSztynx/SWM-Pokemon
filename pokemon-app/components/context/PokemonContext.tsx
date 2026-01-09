import React, { createContext, useContext, useState } from "react";
import { PokemonContextData, PokemonData } from "../types";
import { defaultPokemon } from "../constants";

const defaultPokemonContextData: PokemonContextData = {
  favoritePokemon: null,
  setFavoritePokemon: () => {},
};

const PokemonContext = createContext<PokemonContextData>(
  defaultPokemonContextData
);

export const usePokemonContext = () => useContext(PokemonContext);

export const PokemonProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favoritePokemon, setFavoritePokemon] = useState<PokemonData | null>(
    null
  );

  const pokemonContext: PokemonContextData = {
    favoritePokemon,
    setFavoritePokemon,
  };

  return (
    <PokemonContext.Provider value={pokemonContext}>
      {children}
    </PokemonContext.Provider>
  );
};
