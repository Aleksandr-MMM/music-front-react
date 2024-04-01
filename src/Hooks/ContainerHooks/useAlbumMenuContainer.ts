import {albumsSelectors} from "../../store/selectors";
import {useReduxSelector} from "../../store/reduxStore";
import {useEffect} from "react";
import {AppDispatch} from "../../ITypes";
import {getMyAlbumById} from "../../store/reducers/albumSlice";

export const useAddNewFriendContainer = (dispatch:AppDispatch) => {
    const myAlbums=useReduxSelector(albumsSelectors.myAlbums())
    useEffect(()=>{
        if(myAlbums.length===0) {
            dispatch(getMyAlbumById())
        }
    },[dispatch,myAlbums])
    return myAlbums
}