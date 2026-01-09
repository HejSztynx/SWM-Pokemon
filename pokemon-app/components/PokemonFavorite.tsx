import { Button, Text, View } from "react-native";
import { usePokemonContext } from "./context/PokemonContext";
import { PokemonContextData } from "./types";
import PokemonCard from "./PokemonCard";
import { useCallback } from "react";

export default function PokemonFavorite() {
  const { favoritePokemon, setFavoritePokemon }: PokemonContextData =
    usePokemonContext();

  const handlePressUnfavorite = useCallback(() => {
    setFavoritePokemon(null);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Text>There will be your favorite pokemon</Text>
      {favoritePokemon ? (
        <View style={{ flex: 1 }}>
          <PokemonCard pokemonData={favoritePokemon} onPress={() => {}} />
          <Button title="unfavorite" onPress={handlePressUnfavorite} />
        </View>
      ) : (
        <Text>No favorite Pokemon</Text>
      )}
    </View>
  );
}
