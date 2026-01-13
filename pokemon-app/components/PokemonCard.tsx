import { Image } from "expo-image";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { PokemonData } from "./types";
import { typeColors } from "./constants";
import { usePokemonContext } from "./context/PokemonContext";

const PokemonCard: React.FC<{
  pokemonData: PokemonData;
  onPress?: () => void;
}> = ({ pokemonData, onPress = () => {} }) => {
  const { id, name, imageUrl, types } = pokemonData;

  const { favoritePokemon } = usePokemonContext();

  const isFavoritePokemon = (pokemonData: PokemonData): boolean => {
    if (!favoritePokemon) return false;

    return favoritePokemon.id == pokemonData.id;
  };

  const favoritePokemonStyle = isFavoritePokemon(pokemonData)
    ? {
        borderColor: "#f9ff54ff",
        borderWidth: 5,
      }
    : {};

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.card, favoritePokemonStyle]}>
        <Image
          source={{ uri: imageUrl }}
          style={{ width: 200, height: 200, marginVertical: 5 }}
          cachePolicy="memory-disk"
        />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.typesContainer}>
            {types.map((type, i) => {
              return (
                <Text
                  key={i}
                  style={[
                    styles.types,
                    { backgroundColor: typeColors.get(type.name) || "#000" },
                  ]}
                >
                  {type.name}
                </Text>
              );
            })}
          </View>
          <Text style={styles.id}>#{id.toString().padStart(3, "0")}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderColor: "#ccc",
    borderWidth: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginVertical: 10,
    marginHorizontal: 25,
    overflow: "hidden",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  infoContainer: {
    alignItems: "center",
    gap: 5,
    padding: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "light",
    marginBottom: 5,
  },
  id: {
    fontSize: 12,
    color: "#666",
  },
  typesContainer: {
    flexDirection: "row",
    gap: 5,
  },
  types: {
    fontSize: 14,
    color: "white",
    borderRadius: 5,
    padding: 2,
  },
});

export default PokemonCard;
