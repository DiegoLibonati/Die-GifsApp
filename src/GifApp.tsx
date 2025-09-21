import React from "react";

import { Header } from "@src/components/Header/Header";
import { Main } from "@src/components/Main/Main";

export const GifApp = (): JSX.Element => {
  return (
    <React.Fragment>
      {/* Header */}
      <Header></Header>

      {/* Main */}
      <Main></Main>
    </React.Fragment>
  );
};
