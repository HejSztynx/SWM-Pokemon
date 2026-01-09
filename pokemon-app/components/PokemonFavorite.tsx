import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {favoritePokemon ? (
        <View>
          <PokemonCard pokemonData={favoritePokemon} onPress={() => {}} />
          <TouchableOpacity
            style={styles.button}
            onPress={handlePressUnfavorite}
          >
            <Text style={styles.buttonText}>Unfavorite</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text>No favorite Pokemon</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
