import { Text } from "react-native";
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from "react-native-vision-camera";

export default function PokemonCamera() {
  const device = useCameraDevice("front");
  const { hasPermission, requestPermission } = useCameraPermission();

  if (!hasPermission) {
    requestPermission();

    return <Text>No permission</Text>;
  }
  if (device == null) return <Text>No device</Text>;
  return <Camera style={{ flex: 1 }} device={device} isActive={true} />;
}
