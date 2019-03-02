import { withNamespaces } from "react-i18next";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";

import { AppState } from "store";
import * as user from "store/user";

import User from "./User";
import { DispatchProps, PublicProps, StoreProps } from "./user.interfaces";

export const mapStateToProps = (state: AppState) => ({
  user: user.selectors.getUser(state)
});

export const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      loadUser: user.actions.getUser.started,
      restore: user.actions.restore
    },
    dispatch
  );

export default connect<StoreProps, DispatchProps, PublicProps>(
  mapStateToProps,
  mapDispatchToProps
)(withNamespaces(["common", "user"])(User));
