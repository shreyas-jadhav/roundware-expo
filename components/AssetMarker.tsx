import React, { useState } from "react";
import { Marker, Callout } from "react-native-maps";
import { Text } from "react-native";
import { Asset } from "../types/asset";
import AudioPlayer from "./AudioPlayer";
import { theme } from "../styles/theme";

interface Props {
  asset: Asset;
}
const AssetMarker = ({ asset }: Props) => {
  const [loadAudio, LoadAudio] = useState(false);
  return (
    <Marker
      coordinate={{
        latitude: Number(asset.latitude),
        longitude: Number(asset.longitude),
      }}
      onPress={() => LoadAudio(true)}
    >
      <Callout
        tooltip={false}
        style={{
          width: 300,
          height: 150,
          backgroundColor: "#fff",
        }}
      >
        <Text>{new Date(asset.created).toDateString()}</Text>
        {loadAudio && asset.file && asset.media_type == "audio" && (
          <AudioPlayer src={asset.file} />
        )}
      </Callout>
    </Marker>
  );
};

export default AssetMarker;
