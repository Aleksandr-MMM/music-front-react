import {DetailedHTMLProps, FC, HTMLAttributes, ReactNode} from "react";
import style from './Breadcrumb.module.scss'
import {IFCPropsChildrenFC} from "../../../ITypes";

type breadcrumbType = { breadcrumb: (DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>)[]}
type separatorType = { separator?: { className?: Element["className"] } & IFCPropsChildrenFC }
export const Breadcrumb: FC<separatorType & breadcrumbType> = (props) => {
    const {separator, breadcrumb} = props
    let breadcrumbElement: ReactNode[] = []
    for (let i = 0; breadcrumb.length > i; i++) {
        i !== 0 ?
            breadcrumbElement.push(<span key={i}>
            {separator?.children ? separator.children :
                <span className={style.breadcrumbSeparator}>|</span>}
                <span {...breadcrumb[i]}/>
        </span>) :
            breadcrumbElement.push(<span {...breadcrumb[i]} key={i}/>)
    }
    return (
        <div className={style.breadcrumbWrapper}>
            {breadcrumbElement}
        </div>
    )
}