import { Navigate } from "react-router-dom";
import {IChildrenFCProperty} from "../../../ITypes/BaseHtmlTypes";
import {IRouterTypes} from "../../../ITypes/IRouterTypes";

type redirectRouterType =Required<IChildrenFCProperty>&IRouterTypes
export const ProtectedAuthRouter = ({ children,isAuth,path }:redirectRouterType) => {
    if (!isAuth) {
        return <Navigate to={path} replace/>;
    }
    return children;
};