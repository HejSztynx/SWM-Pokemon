import { LatLng } from "react-native-maps";
import { PokemonData } from "../types";

export interface PokemonMarker {
  pokemonData: PokemonData;
  coordinate: LatLng;
}
