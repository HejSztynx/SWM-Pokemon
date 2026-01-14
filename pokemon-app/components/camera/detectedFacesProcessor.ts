import { Platform } from "react-native";
import { Face } from "react-native-vision-camera-face-detector";

export interface CameraViewDimensions {
  cameraWidth: number;
  cameraHeight: number;
  viewWidth: number;
  viewHeight: number;
}

export const adjustboundsCoords = (
  faces: Face[],
  cameraViewDimensions: CameraViewDimensions
): Face[] => {
  const { cameraHeight, cameraWidth, viewHeight, viewWidth } =
    cameraViewDimensions;

  const ifSwap = cameraHeight < cameraWidth;
  const okCameraHeight = ifSwap ? cameraWidth : cameraHeight;
  const okCameraWidth = ifSwap ? cameraHeight : cameraWidth;

  const scaleHeightFactor = viewHeight / okCameraHeight;
  const visibleCameraWidth = viewWidth / scaleHeightFactor;
  const croppedCameraSideSize = (okCameraWidth - visibleCameraWidth) / 2;

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
