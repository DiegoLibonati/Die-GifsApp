import React from "react";

import type { JSX } from "react";

import Header from "@/components/Header/Header";

import GifDivePage from "@/pages/GifDivePage/GifDivePage";

const App = (): JSX.Element => {
  return (
    <React.Fragment>
      {/* Header */}
      <Header></Header>

      {/* Main */}
      <GifDivePage></GifDivePage>
    </React.Fragment>
  );
};

export default App;
