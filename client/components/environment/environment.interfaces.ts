import { History } from "history";
import { i18n } from "i18next";
import { Store } from "redux";
import { Persistor } from "redux-persist";

import { mapDispatchToProps, mapStateToProps } from "./environment.container";

export interface PublicProps {
  history: History;
  store: Store;
  persistor: Persistor;
  i18n: i18n;
}

export type StoreProps = ReturnType<typeof mapStateToProps>;
export type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export type Props = PublicProps & StoreProps & DispatchProps;
