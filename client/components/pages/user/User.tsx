import React from "react";

import { Props, State } from "./user.interfaces";

import "./user.scss";

export default class User extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      id: 1
    };
  }

  componentDidMount() {
    this.props.loadUser(this.state.id);
  }

  componentDidUpdate(_prevProps: Props, prevState: State) {
    if (this.state.id !== prevState.id) {
      this.props.loadUser(this.state.id);
    }
  }

  onClickEventHandler = (event: React.MouseEvent<HTMLInputElement>) => {
    if (event.currentTarget.value !== null && event.currentTarget.value !== undefined) {
      this.setState({
        id: parseInt(event.currentTarget.value, undefined)
      });
    }
  };

  renderButton = () => {
    const button = [];
    for (let i: number = 1; i <= 12; i++) {
      button.push(
        <input
          className={"btn btn-success m-1"}
          type={"button"}
          key={i}
          onClick={this.onClickEventHandler}
          value={i as number}
        />
      );
    }

    return button;
  };

  render() {
    const { t, user } = this.props;

    if (user.value === undefined) {
      return null;
    }

    return (
      <>
        <h1 className={"text-center"}>{t("Welcome Manzol!!!")}</h1>
        <table>
          <thead>
            <tr>
              <th>{t("id")}</th>
              <th>{t("avatar")}</th>
              <th>{t("firstname")}</th>
              <th>{t("lastname")}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{user.value.data.id}</td>
              <td>
                <img src={user.value.data.avatar} alt="" width={40} height={40} />
              </td>
              <td>{user.value.data.first_name}</td>
              <td>{user.value.data.last_name}</td>
            </tr>
          </tbody>
        </table>
        <div className={"d-flex justify-content-center"}>{this.renderButton()}</div>
      </>
    );
  }
}
