import React, { createContext, useContext, useEffect, useState } from "react";
import { PokemonContextData, PokemonData } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const defaultPokemonContextData: PokemonContextData = {
  favoritePokemon: null,
  setFavoritePokemon: () => {},
};

const PokemonContext = createContext<PokemonContextData>(
  defaultPokemonContextData
);

export const PokemonProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favoritePokemon, setFavoritePokemon] = useState<PokemonData | null>(
    null
  );

  useEffect(() => {
    const loadFavoritePokemon = async () => {
      const pokemonJson = await AsyncStorage.getItem("favoritePokemon");
      if (pokemonJson) {
        setFavoritePokemon(JSON.parse(pokemonJson));
      }
    };

    loadFavoritePokemon();
  }, []);

  useEffect(() => {
    const saveFavoritePokemon = async () => {
      if (favoritePokemon) {
        await AsyncStorage.setItem(
          "favoritePokemon",
          JSON.stringify(favoritePokemon)
        );
      } else {
        await AsyncStorage.removeItem("favoritePokemon");
      }
    };

    saveFavoritePokemon();
  }, [favoritePokemon]);

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

export const usePokemonContext = () => {
  const context = useContext(PokemonContext);
  if (!context)
    throw new Error("usePokemon must be used within a PokemonProvider");
  return context;
};
