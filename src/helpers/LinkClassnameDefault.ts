import style from "../style/otherStyle/LinkLightTheme.module.scss";

export const LinkClassnameDefault = (navData: { isActive: boolean, isPending: boolean }) =>
    (navData.isActive ? style.linkActive : style.link);