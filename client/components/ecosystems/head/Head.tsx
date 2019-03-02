import React from "react";
import { Helmet } from "react-helmet";

import manifest from "../../../assets/static/manifest.json";

import { Props } from "./head.interfaces";

export const Head: React.SFC<Props> = props => {
  const { metaTitle } = props;
  return (
    <Helmet>
      <title>{`${metaTitle} - ${manifest.name}`}</title>
    </Helmet>
  );
};
