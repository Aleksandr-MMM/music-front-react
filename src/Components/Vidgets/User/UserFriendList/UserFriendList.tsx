import React, {FunctionComponent} from "react";
import style from './UserFriendList.module.css'
import useUserFriendsContainer from "../../../../Hooks/ContainerHooks/usersHooks/useUserFriendsContainer";

export const UserFriendList: FunctionComponent = () => {
    const {friends, subscribe} = useUserFriendsContainer()
    return (<div className={style.userFriendList}>
        <div>{friends.length !== 0 ? `У вас ${friends.length} друг` : 'Нет друзей'}</div>
        <div>{subscribe.length !== 0 ? `${subscribe.length} новый запрос в друзья` : 'Новых приглашений в друзья нет'}</div>
    </div>)
}