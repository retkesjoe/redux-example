import { History } from "history";
import { WithNamespaces } from "react-i18next";

import { UserData } from "store/user";
import { mapDispatchToProps, mapStateToProps } from "./user.container";

export interface PublicProps {
  history: History;
  user?: UserData;
}
export interface ComponentState {
  id: number;
}

export type StoreProps = ReturnType<typeof mapStateToProps>;
export type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export type Props = PublicProps & StoreProps & DispatchProps & WithNamespaces;
export type State = Readonly<ComponentState>;
