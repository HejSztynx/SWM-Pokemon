import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { Face } from "react-native-vision-camera-face-detector";
import { usePokemonContext } from "../context/PokemonContext";

const dotRadius = 10;
const imageDim = 200;

export default function DetectedFaces({ faces }: { faces: Face[] }) {
  // {"bounds": {"height": 192, "width": 192, "x": 180, "y": 315},
  // "pitchAngle": -4.934042453765869,
  // "rollAngle": 3.268526792526245,
  // "yawAngle": -31.998899459838867}]

  // pluggedin device
  // videoHeight 480
  // videoWidth 640

  const { favoritePokemon } = usePokemonContext();

  // console.log("format: " + )

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
        <View key={index}>
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
          <View
            key={index * 10 + 2}
            style={[
              styles.faceDot,
              {
                right: face.bounds.x + face.bounds.width / 2 - dotRadius,
                top: face.bounds.y + face.bounds.height / 5 - dotRadius,
              },
            ]}
          />
          <View
            key={index * 10 + 3}
            style={[
              styles.faceDot,
              {
                right: face.bounds.x,
                top: face.bounds.y,
              },
            ]}
          />
          <View
            key={index * 10 + 4}
            style={[
              styles.faceDot,
              {
                right: face.bounds.x + face.bounds.width,
                top: face.bounds.y + face.bounds.height,
              },
            ]}
          />
          <View
            key={index * 10 + 5}
            style={[
              styles.faceDot,
              {
                right: face.bounds.x + face.bounds.width,
                top: face.bounds.y,
              },
            ]}
          />
          <View
            key={index * 10 + 6}
            style={[
              styles.faceDot,
              {
                right: face.bounds.x,
                top: face.bounds.y + face.bounds.height,
              },
            ]}
          />
          <View
            key={index * 10 + 7}
            style={[
              styles.faceDot,
              {
                backgroundColor: "blue",
                right: 240,
                top: face.bounds.y + face.bounds.height,
              },
            ]}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  faceDot: {
    position: "absolute",
    width: dotRadius * 2,
    height: dotRadius * 2,
    backgroundColor: "red",
    borderRadius: 10,
  },
  foreheadImage: {
    height: imageDim,
    width: imageDim,
    position: "absolute",
  },
});
