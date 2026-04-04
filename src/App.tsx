import React from "react";

import Header from "@/components/Header/Header";

import GifsPage from "@/pages/GifsPage/GifsPage";

const App = () => {
  return (
    <React.Fragment>
      {/* Header */}
      <Header></Header>

      {/* Main */}
      <GifsPage></GifsPage>
    </React.Fragment>
  );
};

export default App;
