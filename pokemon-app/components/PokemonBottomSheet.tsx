import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { usePokemonContext } from "./context/PokemonContext";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import React from "react";
import { PokemonData } from "./types";
import { playSound } from "@/util/soundApi";

type PokemonBottomSheetProps = {
  bottomSheetRef: React.RefObject<BottomSheetMethods | null>;
  selectedPokemon: PokemonData | null;
};

export default function PokemonBottomSheet({
  bottomSheetRef,
  selectedPokemon,
}: PokemonBottomSheetProps) {
  const { setFavoritePokemon } = usePokemonContext();

  const handlePressSetFavorite = () => {
    setFavoritePokemon(selectedPokemon);
  };

  const handlePressSayHello = async () => {
    if (!selectedPokemon || !selectedPokemon.cryUrl) return;

    const cryUrl = selectedPokemon.cryUrl;
    playSound(cryUrl);
  };

  return (
    <BottomSheet ref={bottomSheetRef}>
      {selectedPokemon && (
        <BottomSheetView>
          <View style={styles.sheetContent}>
            <Text style={styles.title}>{selectedPokemon.name}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={handlePressSetFavorite}
            >
              <Text style={styles.buttonText}>Set as favorite</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={handlePressSayHello}
            >
              <Text style={styles.buttonText}>Say hello</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      )}
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  sheetContent: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "light",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
