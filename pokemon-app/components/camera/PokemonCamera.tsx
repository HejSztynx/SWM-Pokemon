import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState, useRef } from "react";
import {
  Camera,
  runAsync,
  useCameraDevice,
  useCameraFormat,
  useFrameProcessor,
} from "react-native-vision-camera";
import {
  Face,
  useFaceDetector,
  FrameFaceDetectionOptions,
} from "react-native-vision-camera-face-detector";
import { Worklets } from "react-native-worklets-core";
import DetectedFaces from "./DetectedFaces";
import { useIsFocused } from "@react-navigation/native";
import { useAppState } from "@react-native-community/hooks";
import TakePhotoButton from "./TakePhotoButton";

export default function App() {
  const device = useCameraDevice("front");
  const isFocused = useIsFocused();
  const appState = useAppState();
  const isActive = isFocused && appState === "active";

  const camera = useRef<Camera>(null);

  const faceDetectionOptions = useRef<FrameFaceDetectionOptions>({
    // detection options
  }).current;

  const [faces, setFaces] = useState<Face[]>([]);
  const { detectFaces, stopListeners } = useFaceDetector(faceDetectionOptions);

  useEffect(() => {
    return () => {
      // you must call `stopListeners` when current component is unmounted
      stopListeners();
    };
  }, []);

  useEffect(() => {
    if (!device) {
      // you must call `stopListeners` when `Camera` component is unmounted
      stopListeners();
      return;
    }

    device.formats.forEach((entry) => {
      //   console.log(entry);
    });

    (async () => {
      const status = await Camera.requestCameraPermission();
      console.log({ status });
    })();
  }, [device]);

  const handleDetectedFaces = Worklets.createRunOnJS((faces: Face[]) => {
    if (faces.length > 0) {
      console.log("faces detected", faces);
    }
    setFaces(faces);
  });

  const frameProcessor = useFrameProcessor(
    (frame) => {
      "worklet";
      runAsync(frame, () => {
        "worklet";
        const faces = detectFaces(frame);
        // ... chain some asynchronous frame processor
        // ... do something asynchronously with frame
        handleDetectedFaces(faces);
      });
      // ... chain frame processors
      // ... do something with frame
    },
    [handleDetectedFaces]
  );

  if (!device) {
    return <Text>No Device</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isActive}
        photo={true}
        frameProcessor={frameProcessor}
        resizeMode="cover"
      />
      <DetectedFaces faces={faces} />
      <TakePhotoButton cameraRef={camera} />
    </View>
  );
}
