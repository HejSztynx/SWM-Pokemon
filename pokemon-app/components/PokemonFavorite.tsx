import { Text, View } from "react-native";
import { usePokemonContext } from "./context/PokemonContext";
import { PokemonContextData } from "./types";
import PokemonCard from "./PokemonCard";

export default function PokemonFavorite() {
  const pokemonContext: PokemonContextData = usePokemonContext();

  const favoritePokemon = pokemonContext.favoritePokemon;

  return (
    <View style={{ flex: 1 }}>
      <Text>There will be your favorite pokemon</Text>
      {favoritePokemon ? (
        <PokemonCard pokemonData={favoritePokemon} />
      ) : (
        <Text>No favorite Pokemon</Text>
      )}
    </View>
  );
}
