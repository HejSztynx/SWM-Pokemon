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
  const [viewSize, setViewSize] = useState({ width: 0, height: 0 });

  const device = useCameraDevice("front");
  const isFocused = useIsFocused();
  const appState = useAppState();
  const isActive = isFocused && appState === "active";

  const camera = useRef<Camera>(null);

  const format = useCameraFormat(device, [
    { videoResolution: "max" },
    { photoResolution: "max" },
  ]);

  const faceDetectionOptions = useRef<FrameFaceDetectionOptions>({}).current;

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

    (async () => {
      const status = await Camera.requestCameraPermission();
      console.log({ status });
    })();
  }, [device]);

  const handleDetectedFaces = Worklets.createRunOnJS((faces: Face[]) => {
    setFaces(faces);
  });

  const frameProcessor = useFrameProcessor(
    (frame) => {
      "worklet";
      runAsync(frame, () => {
        "worklet";
        const faces = detectFaces(frame);
        handleDetectedFaces(faces);
      });
    },
    [handleDetectedFaces],
  );

  if (!device || !format) {
    return <Text>No Device</Text>;
  }

  return (
    <View
      style={StyleSheet.absoluteFill}
      onLayout={(event) => {
        const { width, height } = event.nativeEvent.layout;
        setViewSize({ width, height });
      }}
    >
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        format={format}
        isActive={isActive}
        photo={true}
        frameProcessor={frameProcessor}
        resizeMode="cover"
      />
      <DetectedFaces
        faces={faces}
        cameraViewDimensions={{
          cameraHeight: format.videoHeight,
          cameraWidth: format.videoWidth,
          viewHeight: viewSize.height,
          viewWidth: viewSize.width,
        }}
      />
      <TakePhotoButton cameraRef={camera} />
    </View>
  );
}
