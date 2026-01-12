import { StyleSheet, Text, View, NativeModules, Platform } from "react-native";
import { useEffect, useState, useRef } from "react";
import {
  Camera,
  runAsync,
  useCameraDevice,
  useFrameProcessor,
} from "react-native-vision-camera";
import {
  Face,
  useFaceDetector,
  FrameFaceDetectionOptions,
} from "react-native-vision-camera-face-detector";
import { Worklets } from "react-native-worklets-core";

export default function DetectedFaces({ faces }: { faces: Face[] }) {
  // {"bounds": {"height": 192, "width": 192, "x": 180, "y": 315},
  // "pitchAngle": -4.934042453765869,
  // "rollAngle": 3.268526792526245,
  // "yawAngle": -31.998899459838867}]

  // pluggedin device
  // videoHeight 480
  // videoWidth 640

  const adjustboundsCoords = (faces: Face[]): Face[] => {
    return faces.map((face) => {
      face.bounds.height = (face.bounds.height / 3) * 4;
      // face.bounds.width = (face.bounds.width / 3) * 4;
      return face;
    });
  };

  const numberOfViews = 10;
  const adjustedFaces = adjustboundsCoords(faces);

  return (
    <View style={{ flex: 1 }}>
      {adjustedFaces.map((face, index) => (
        <>
          <View
            key={index * numberOfViews + 5}
            style={[
              styles.faceDot,
              {
                right: 0 - 10,
                top: 0 - 10,
              },
            ]}
          />
          <View
            key={index * numberOfViews}
            style={[
              styles.faceDot,
              {
                right: face.bounds.x + face.bounds.width / 2,
                top: face.bounds.y + face.bounds.height / 2,
              },
            ]}
          />
          <View
            key={index * numberOfViews + 1}
            style={[
              styles.faceDot,
              {
                backgroundColor: "blue",
                right: face.bounds.x - 10,
                top: face.bounds.y - 10,
              },
            ]}
          />
          <View
            key={index * numberOfViews + 2}
            style={[
              styles.faceDot,
              {
                backgroundColor: "green",
                right: face.bounds.x + face.bounds.width - 10,
                top: face.bounds.y + face.bounds.height - 10,
              },
            ]}
          />
          <View
            key={index * numberOfViews + 3}
            style={[
              styles.faceDot,
              {
                backgroundColor: "yellow",
                right: face.bounds.x + face.bounds.width - 10,
                top: face.bounds.y - 10,
              },
            ]}
          />
          <View
            key={index * numberOfViews + 4}
            style={[
              styles.faceDot,
              {
                backgroundColor: "white",
                right: face.bounds.x - 10,
                top: face.bounds.y + face.bounds.height - 10,
              },
            ]}
          />
        </>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  faceDot: {
    position: "absolute",
    width: 20,
    height: 20,
    backgroundColor: "red",
    borderRadius: 10,
  },
});
