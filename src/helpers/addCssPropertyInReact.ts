// eslint-disable-next-line react/no-typos
import "react";
type CustomPropString = { [key in `--${string}`]: string };
declare module "react" {
    export interface CSSProperties extends CustomPropString {}
}
