import { Image } from "expo-image";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { PokemonData } from "./types";

const PokemonCard: React.FC<{
  pokemonData: PokemonData;
  onPress: () => void;
}> = ({ pokemonData, onPress }) => {
  const { id, name, imageUrl } = pokemonData;

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <Image
          source={{ uri: imageUrl }}
          style={{ width: 200, height: 200, marginVertical: 5 }}
          cachePolicy="memory-disk"
        />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.id}>#{id.toString().padStart(3, "0")}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
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
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  infoContainer: {
    padding: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  id: {
    fontSize: 12,
    color: "#666",
  },
});

export default PokemonCard;
