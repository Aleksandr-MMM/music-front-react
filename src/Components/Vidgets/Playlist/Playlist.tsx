import React, {FC, ReactNode} from "react";
import {IFCPropsDispatch, objectByKey} from "../../../ITypes";
import {profileSliceType} from "../../../store/reducers/profileSlice";
import {CreateNewPlaylist} from "./CreateNewPlaylist";
import wrStyle from './Playlist.module.scss'
import {BaseLink} from "../Link/BaseLink";

type PlaylistProps = { usePlaylistContainer: () => profileSliceType["albumList"] }
    & IFCPropsDispatch & { isMyPlaylists: boolean }
type ProfilePlaylistsType = objectByKey<PlaylistProps, 'usePlaylistContainer'>
const ProfilePlaylists: FC<ProfilePlaylistsType> = (props) => {
    const {usePlaylistContainer} = props
    let playlistsNode: ReactNode[] = []
    const albums = usePlaylistContainer()
    for (let i = 0; i < albums.length; i++) {
        playlistsNode.push(<div className={wrStyle.linkWrapper} key={i}>
                <p style={{display: 'inline',cursor:'default',fontWeight:'bold'}}>Название альбома :</p>
                <BaseLink navLinkName={albums[i].albumName} path={`../album/${albums[i].id}`}
                          styleNavLink={{style: {display: 'block'}}}/>
            </div>
        );
    }
    return (<>
            <div style={{fontWeight: 'bold'}}>
                Мои плейлисты :
            </div>
            <div>
                {playlistsNode}
            </div>
        </>
    )
}
export const Playlist: FC<PlaylistProps> = (props) => {
    const {usePlaylistContainer, dispatch, isMyPlaylists} = props
    const albums = usePlaylistContainer()
    return <div className={`${wrStyle.wrapper}`}>
        {albums.length === 0 ?
            <div>
                Плейлисты не найденны
            </div>
            : <ProfilePlaylists {...{usePlaylistContainer}} />
        }
        {isMyPlaylists ? <CreateNewPlaylist {...{dispatch}}/> : undefined}
    </div>
}