import React from "react";
import { Appbar as PaperAppbar } from "react-native-paper";
const Appbar = () => {
  return (
    <PaperAppbar>
      {/* <PaperAppbar.BackAction /> */}
      <PaperAppbar.Content title="Roundware" />
    </PaperAppbar>
  );
};

export default Appbar;
