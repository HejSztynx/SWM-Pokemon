import React, { useCallback, useRef, useState } from "react";
import MapView, {
  LongPressEvent,
  Marker,
  MarkerPressEvent,
  Region,
} from "react-native-maps";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PokemonMarker } from "./types";
import { usePokemonContext } from "../context/PokemonContext";
import { Image } from "expo-image";
import PokemonCard from "../PokemonCard";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function PokemonMap() {
  //   const initialRegion = {
  //     latitude: 50.048712769315074,
  //     longitude: 19.96560463299045,
  //     latitudeDelta: 0.0922,
  //     longitudeDelta: 0.0421,
  //   };

  const { favoritePokemon } = usePokemonContext();

  const [markers, setMarkers] = useState<PokemonMarker[]>([]);

  //   const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalMarker, setModalMarker] = useState<PokemonMarker | null>(null);

  const bottomSheetRef = useRef(null);

  const initialRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const [region, setRegion] = useState(initialRegion);

  const handleRegionChange = (region: Region) => {
    setRegion(region);
    console.log("region change");
  };

  const [bottomSheetIndex, setBottomSheetIndex] = useState(-1); // Start closed

  const openPokemonModal = (marker: PokemonMarker) => {
    setModalMarker(marker);
    setBottomSheetIndex(0);
  };

  const placeMarker = (e: LongPressEvent) => {
    if (!favoritePokemon) return;

    const newMarker: PokemonMarker = {
      coordinate: e.nativeEvent.coordinate,
      pokemonData: favoritePokemon,
    };

    setMarkers([...markers, newMarker]);
  };

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          // region={region}
          // initialRegion={region}
          // onRegionChangeComplete={handleRegionChange}
          onLongPress={placeMarker}
        >
          {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker.coordinate}
              image={{
                uri: marker.pokemonData.imageUrl,
              }}
              onPress={() => openPokemonModal(marker)}
            />
          ))}
        </MapView>
        <BottomSheet
          ref={bottomSheetRef}
          enablePanDownToClose={true}
          onChange={setBottomSheetIndex}
          index={bottomSheetIndex}
        >
          <BottomSheetView>
            {modalMarker && (
              <View style={styles.sheetContent}>
                <PokemonCard pokemonData={modalMarker.pokemonData} />
              </View>
            )}
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  sheetContent: {
    padding: 20,
    alignItems: "center",
  },
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
