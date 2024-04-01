import {FC} from "react";
import {useUsersContainer} from "../../../../Hooks/ContainerHooks/usersHooks/useUsersContainer";
import {UserPageCurrentUser} from "../../../Vidgets/User/UserPageCurrentUser";
import {IFCPropsDispatch} from "../../../../ITypes";

export const UsersPage: FC<IFCPropsDispatch> = ({dispatch}) => {
    const {users, myId} = useUsersContainer(dispatch)
    return (<>{users.map(user =>
            <UserPageCurrentUser id={user.id} myId={myId} nickName={user.nickName} key={user.id} dispatch={dispatch}/>)}
        </>
    );
};