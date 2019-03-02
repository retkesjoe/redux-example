import { RedirectProps, RouteProps } from "react-router";

export interface Route extends RouteProps {}
export interface Redirect extends RedirectProps {}

export interface PublicProps {
  routes?: Route[];
  redirects?: Redirect[];
}

export type Props = PublicProps;
