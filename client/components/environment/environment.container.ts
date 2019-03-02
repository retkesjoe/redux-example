import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";

import { AppState } from "store";

import Environment from "./Environment";
import { DispatchProps, PublicProps, StoreProps } from "./environment.interfaces";

export const mapStateToProps = (_state: AppState) => ({
  user: ""
});

export const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({}, dispatch);

export default hot(module)(
  connect<StoreProps, DispatchProps, PublicProps>(
    mapStateToProps,
    mapDispatchToProps
  )(Environment)
);
