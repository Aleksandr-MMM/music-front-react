import {FC} from "react";
import svgLogo from '../../../assets/note.svg'
import {
    IFCPropsElementClassname, IFCPropsElementStyle, IFCStyledProps,
} from "../../../ITypes";

type logoStyledPropsElementType = IFCStyledProps<IFCPropsElementClassname & IFCPropsElementStyle>
export const Logo: FC<logoStyledPropsElementType> = (props) => {
    const {wrapper, element} = props
    return (
        <div className={wrapper?.className ? wrapper.className : undefined} style={wrapper?.style}>
            <img className={element?.className ? element.className : undefined}
                 style={element?.style}
                 src={svgLogo} alt="webSite logo"/>
        </div>)
}