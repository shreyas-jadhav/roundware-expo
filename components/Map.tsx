import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useRoundware } from "../providers/RoundwareProvider";
import AssetMarker from "./AssetMarker";

export default function Map() {
  const { assets } = useRoundware();
  console.log(assets.length);
  return (
    <MapView style={styles.map}>
      {assets.map((a) => (
        <AssetMarker key={a.id} asset={a} />
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    ...StyleSheet.absoluteFillObject,
  },
});
