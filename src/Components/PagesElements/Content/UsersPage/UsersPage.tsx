import {FC} from "react";
import {IDispatchInProps} from "../../../../ITypes/BaseHtmlTypes";
import {useUsersContainer} from "../../../../Hooks/ContainerHooks/usersHooks/useUsersContainer";
import {User} from "../../../Vidgets/User/User/User";
import {AppDispatch} from "../../../../ITypes/IReduxTypes";

type usersType= {id: string, nickName: string | null, photo: string | null}[]
const user = (users:usersType,dispatch:AppDispatch)=>{
    const user=[]
    for(let i=0;users.length>i;i++) {
        user.push(<User id={users[i].id} nickName={users[i].nickName} key={users[i].id} dispatch={dispatch} userCount={i}/>)
    }
    return user
}
export const UsersPage: FC<IDispatchInProps> = ({dispatch}) => {
    const {users} = useUsersContainer(dispatch)
    return (
        <div>
            {user(users,dispatch)}
        </div>
    );
};