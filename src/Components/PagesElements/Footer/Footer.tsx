import React, {FC} from "react";
import style from './Footer.module.scss'


export const Footer: FC = () => {

    return (
        <footer className={style.footer}>
            <a className={style.git_hub_link}
               href="https://github.com/Aleksandr-MMM" target={'_blank'} rel="noreferrer">Ссылка на github.com </a>
        </footer>)
}