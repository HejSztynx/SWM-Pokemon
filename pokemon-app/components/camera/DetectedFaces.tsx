import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { Face } from "react-native-vision-camera-face-detector";
import { usePokemonContext } from "../context/PokemonContext";

const imageDim = 200;

export default function DetectedFaces({ faces }: { faces: Face[] }) {
  const { favoritePokemon } = usePokemonContext();

  const adjustboundsCoords = (faces: Face[]): Face[] => {
    return faces.map((face) => {
      face.bounds.height = (face.bounds.height / 3) * 4;
      face.bounds.width = (face.bounds.width / 4) * 3;
      return face;
    });
  };

  const adjustedFaces = adjustboundsCoords(faces);
  const pokemonImageUrl = favoritePokemon?.imageUrl;

  return (
    <View style={{ flex: 1 }}>
      {adjustedFaces.map((face, index) => (
        <Image
          key={index}
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
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  foreheadImage: {
    height: imageDim,
    width: imageDim,
    position: "absolute",
  },
});
