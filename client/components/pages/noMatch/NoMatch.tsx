import React from "react";

import { Props } from "./noMatch.interfaces";

export default class NoMatch extends React.PureComponent<Props> {
  render() {
    const { t } = this.props;

    return (
      <div>
        {t("Page Not Found")}
        {t("Try again")}
      </div>
    );
  }
}
