import {useLocation} from "react-router-dom";
import {AppDispatch} from "../../ITypes";
import {useEffect} from "react";
import {getAlbumById, getMyAlbumById} from "../../store/reducers/albumSlice";
import {useReduxSelector} from "../../store/reduxStore";
import {albumsSelectors} from "../../store/selectors";


export const useAlbumPageContainer = (dispatch:AppDispatch) => {
    const albumIdUrl = useLocation().pathname.substring(7);
    const myAlbums = useReduxSelector(albumsSelectors.myAlbums())
    const trackList=useReduxSelector(albumsSelectors.trackList(albumIdUrl))
    const albumId=useReduxSelector(albumsSelectors.id(albumIdUrl))
    const lastUpdate=useReduxSelector(albumsSelectors.lastUpdate(albumIdUrl))
    const albumName=useReduxSelector(albumsSelectors.albumName(albumIdUrl))
    const isMyAlbum=!!myAlbums.find(value=>value.id===albumIdUrl)
    useEffect(() => {
        if (!albumId||!lastUpdate) {
            dispatch(getAlbumById(albumIdUrl))
        }
    }, [dispatch,albumIdUrl,albumId,lastUpdate])
    useEffect(() => {
        if (myAlbums.length===0) {
            dispatch(getMyAlbumById())
        }
    }, [dispatch,myAlbums.length])

    return {albumId,trackList,lastUpdate,albumName,isMyAlbum}
}