import {DetailedHTMLProps, FC, HTMLAttributes} from "react";
import {IconBaseProps, IconType} from "react-icons";
import {IFCPropsChildrenNode, IFCPropsWrapper} from "../../../ITypes";
import defaultStyle from './Icons.module.scss'

type IconsProps = IFCPropsWrapper<Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'style'>> & {
    icon: IconType, iconProps?: Omit<IconBaseProps, 'size'>, widget?: IFCPropsChildrenNode['children'],
    iconSize: number
};
export const Icons: FC<IconsProps> = (props) => {
    const {icon, iconProps, wrapper, iconSize, widget} = props
    return (
        <div {...wrapper} style={{'--iconSize': `${iconSize}`}}
             className={`${defaultStyle.icon} ${wrapper?.className}`}>
            {icon({...iconProps, size: iconSize / 1.1})}
            {widget}
        </div>
    );
};