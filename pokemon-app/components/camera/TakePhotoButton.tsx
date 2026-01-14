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
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "white",
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
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: "blue",
  },
});
