import React from "react";

import { Header } from "@src/components/Header/Header";

import { GifsPage } from "@src/pages/GifsPage/GifsPage";

export const App = (): JSX.Element => {
  return (
    <React.Fragment>
      {/* Header */}
      <Header></Header>

      {/* Main */}
      <GifsPage></GifsPage>
    </React.Fragment>
  );
};
