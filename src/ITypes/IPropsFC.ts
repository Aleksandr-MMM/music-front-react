import {AppDispatch} from "./IReduxTypes";
import React from "react";

export declare namespace IPropsFC {
    interface isAuth {
        isAuth: boolean
    }

    interface id {
        id: string | null
    }

    interface dispatch {
        dispatch: AppDispatch
    }

    interface buttonAttributes {
        buttonAttributes?: React.ButtonHTMLAttributes<HTMLButtonElement>;
    }
    interface paragraphAttributes {
        pAttributes?: React.HTMLAttributes<HTMLParagraphElement>;
    }
}

export interface IisAuth {
    isAuth: boolean,
}

export interface IPropsId {
    id: string | null
}

export interface IDispatchInProps {
    dispatch: AppDispatch
}

export interface IButtonAttributes {
    buttonAttributes?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

export interface IParagraphAttributes {
    pAttributes?: React.HTMLAttributes<HTMLParagraphElement>;
}
