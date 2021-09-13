import withRoot from "./home/withRoot";
// --- Post bootstrap -----
import React from "react";
import ProductCategories from "./home/hmodules/ProductCategories";
import AppFooter from "./home/hmodules/AppFooter";
import ProductHero from "./home/hmodules/ProductHero";
import ProductValues from "./home/hmodules/ProductValues";
import AppAppBar from "./home/hmodules/AppAppBar";

function Index() {
  return (
    <React.Fragment>
      <AppAppBar />
      <ProductHero />
      <ProductValues />
      <ProductCategories />
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(Index);
