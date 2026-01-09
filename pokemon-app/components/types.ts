import { Dispatch, SetStateAction } from "react";

export interface PokemonData {
  id: number;
  name: string;
  imageUrl: string;
  types: PokemonType[];
  cryUrl: string;
}

export interface PokemonTypeDto {
  type: {
    name: string;
  };
}

export interface PokemonType {
  name: string;
}

export interface PokemonContextData {
  favoritePokemon: PokemonData | null;
  setFavoritePokemon: Dispatch<SetStateAction<PokemonData | null>>;
}
