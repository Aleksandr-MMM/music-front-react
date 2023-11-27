import {IisAuth} from "./IContainerPropsTypes";

interface IRouterIsPath{
    path:string
}
export interface IRouterTypes extends IisAuth,IRouterIsPath{
}