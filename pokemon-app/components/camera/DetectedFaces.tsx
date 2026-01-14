import { Image } from "expo-image";
import { Platform, StyleSheet, useWindowDimensions, View } from "react-native";
import { Face } from "react-native-vision-camera-face-detector";
import { usePokemonContext } from "../context/PokemonContext";
import React from "react";

interface DetectedFacesProps {
  faces: Face[];
  cameraWidth: number;
  cameraHeight: number;
  viewWidth: number;
  viewHeight: number;
}

const imageDim = 200;
const DOT_SIZE = 20;

const swapDimensions = (d1: number, d2: number) => {
  return d1 < d2;
};

export default function DetectedFaces({
  faces,
  cameraWidth,
  cameraHeight,
  viewWidth,
  viewHeight,
}: DetectedFacesProps) {
  const ifSwap = swapDimensions(cameraHeight, cameraWidth);

  const okCameraHeight = ifSwap ? cameraWidth : cameraHeight;
  const okCameraWidth = ifSwap ? cameraHeight : cameraWidth;

  const scaleHeightFactor = viewHeight / okCameraHeight;
  const visibleCameraWidth = viewWidth / scaleHeightFactor;
  const croppedCameraSideSize = (okCameraWidth - visibleCameraWidth) / 2;

  const { favoritePokemon } = usePokemonContext();

  const adjustboundsCoords = (faces: Face[]): Face[] => {
    return faces.map((face) => {
      if (Platform.OS === "ios") {
        console.log("swap ios");
        const temp = face.bounds.x;
        face.bounds.x = face.bounds.y;
        face.bounds.y = temp;
      }

      face.bounds.x -= croppedCameraSideSize;

      face.bounds.x *= scaleHeightFactor;
      face.bounds.y *= scaleHeightFactor;

      face.bounds.width *= scaleHeightFactor;
      face.bounds.height *= scaleHeightFactor;

      return face;
    });
  };

  const adjustedFaces = adjustboundsCoords(faces);
  const pokemonImageUrl = favoritePokemon?.imageUrl;

  return (
    <View style={{ flex: 1 }}>
      {adjustedFaces.map((face, faceIndex) => {
        //   const { x, y, width, height } = face.bounds;

        //   // Calculate corner coordinates based on Top-Left (x,y) plus dimensions
        //   const corners = [
        //     { x: x, y: y }, // Top Left
        //     { x: x + width, y: y }, // Top Right
        //     { x: x, y: y + height }, // Bottom Left
        //     { x: x + width, y: y + height }, // Bottom Right
        //   ];

        //   return (
        //     // Use a Fragment to group the 4 dots for this specific face
        //     <React.Fragment key={faceIndex}>
        //       {corners.map((corner, cornerIndex) => (
        //         <View
        //           key={`face-${faceIndex}-corner-${cornerIndex}`}
        //           style={[
        //             styles.cornerDot,
        //             {
        //               // Position using standard left/top coordinates
        //               right: corner.x,
        //               top: corner.y,
        //               // Center the dot precisely over the coordinate point
        //               // by shifting it back by half its size.
        //               transform: [
        //                 { translateX: -DOT_SIZE / 2 },
        //                 { translateY: -DOT_SIZE / 2 },
        //               ],
        //             },
        //           ]}
        //         />
        //       ))}
        //     </React.Fragment>
        //   );

        return (
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
        );
      })}
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
    borderRadius: DOT_SIZE / 2, // Make it a circle
    backgroundColor: "red", // High visibility color
    zIndex: 10, // Ensure they sit on top
  },
});
