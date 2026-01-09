import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Button, StyleSheet, Text, View } from "react-native";
import { usePokemonContext } from "./context/PokemonContext";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import React from "react";
import { PokemonData } from "./types";

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

  return (
    <BottomSheet ref={bottomSheetRef}>
      {selectedPokemon && (
        <BottomSheetView>
          <View style={styles.sheetContent}>
            <Text style={styles.title}>{selectedPokemon.name}</Text>
            <Button title="Set as favorite" onPress={handlePressSetFavorite} />
          </View>
        </BottomSheetView>
      )}
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  sheetContent: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
});
