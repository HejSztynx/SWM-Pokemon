import { Dispatch, SetStateAction } from "react";

export interface PokemonData {
  id: number;
  name: string;
  imageUrl: string;
}

export interface PokemonContextData {
  favoritePokemon: PokemonData | null;
  setFavoritePokemon: Dispatch<SetStateAction<PokemonData | null>>;
}
