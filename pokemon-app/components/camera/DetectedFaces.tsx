import { Image } from "expo-image";
import { Platform, StyleSheet, View } from "react-native";
// import { Face } from "react-native-vision-camera-face-detector";
import { usePokemonContext } from "../context/PokemonContext";
import React from "react";
import {
  // adjustboundsCoords,
  CameraViewDimensions,
} from "./detectedFacesProcessor";

interface DetectedFacesProps {
  // faces: Face[];
  cameraViewDimensions: CameraViewDimensions;
}

const imageDim = 200;
const DOT_SIZE = 20;

export default function DetectedFaces({
  // faces,
  cameraViewDimensions,
}: DetectedFacesProps) {
  const { favoritePokemon } = usePokemonContext();

  // const adjustedFaces = adjustboundsCoords(faces, cameraViewDimensions);
  const pokemonImageUrl = favoritePokemon?.imageUrl;

  return (
    <View style={{ flex: 1 }}>
      {/* {adjustedFaces.map((face, faceIndex) => (
        <Image
          key={faceIndex}
          source={{ uri: pokemonImageUrl }}
          style={[
            styles.foreheadImage,
            {
              marginVertical: 5,
              right: face.bounds.x + face.bounds.width / 2 - imageDim / 2,
              top: face.bounds.y + face.bounds.height / 5 - imageDim / 2,
            },
          ]}
          cachePolicy="memory-disk"
        />
      ))} */}
    </View>
  );
}

const styles = StyleSheet.create({
  foreheadImage: {
    height: imageDim,
    width: imageDim,
    position: "absolute",
  },
  cornerDot: {
    position: "absolute",
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: "red",
    zIndex: 10,
  },
});
