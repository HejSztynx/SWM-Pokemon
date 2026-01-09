import { AudioContext } from "react-native-audio-api";

export const playSound = async (audioPath: string) => {
  const audioContext = new AudioContext();

  const audioBuffer = await fetch(audioPath)
    .then((response) => response.arrayBuffer())
    .then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer));

  const playerNode = audioContext.createBufferSource();
  playerNode.buffer = audioBuffer;

  playerNode.connect(audioContext.destination);
  playerNode.start(audioContext.currentTime);
};
