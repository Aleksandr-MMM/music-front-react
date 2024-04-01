import style from "../../Profile/UserFriendList/UserFriendList.module.scss";
import {Icons} from "../../Icons/Icons";
import {LiaUserFriendsSolid} from "react-icons/lia";
import React, {FC} from "react";
import {NavLink} from "react-router-dom";

export const AddNewUser: FC = () => {
    return (
        <div>
            <span style={{color: "black", fontWeight: 'bold', cursor: 'default'}}>
                У вас пока нет друзей.
            </span>
            <NavLink to={'/find/users'} style={{justifyContent: 'center'}} className={style.link}>
                <div className={style.addFriend}>
                    <Icons icon={LiaUserFriendsSolid} iconProps={{color: '#16A4E0E5'}} wrapper={{className: style.icon}}
                           iconSize={30}/>
                    <div>
                        поиск друзей
                    </div>
                </div>
            </NavLink>
        </div>
    );
};