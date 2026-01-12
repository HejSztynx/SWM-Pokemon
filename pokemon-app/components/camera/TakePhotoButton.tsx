import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Camera } from "react-native-vision-camera";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";

export default function TakePhotoButton({
  cameraRef,
}: {
  cameraRef: React.RefObject<Camera | null>;
}) {
  const takePicture = async () => {
    console.log("PICTURE");

    if (!cameraRef) {
      return;
    }

    const file = await cameraRef.current?.takePhoto();
    if (!file) {
      console.log("Failed to take a photo");
      return;
    }

    await CameraRoll.saveAsset(`file://${file.path}`, {
      type: "photo",
    });
  };

  return (
    <View
      style={{
        alignItems: "center",
      }}
    >
      <TouchableOpacity style={styles.button} onPress={takePicture}>
        <View style={styles.innerCircle} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 70, // Diameter of the outer circle
    height: 70, // Diameter of the outer circle
    borderRadius: 35, // Half of the width/height
    backgroundColor: "white", // Outer circle color
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
  },
  innerCircle: {
    width: 62, // Diameter of the inner circle
    height: 62, // Diameter of the inner circle
    borderRadius: 31, // Half of the width/height
    backgroundColor: "blue", // Inner circle color
  },
});
