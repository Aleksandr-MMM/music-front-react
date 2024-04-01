import React, {FC} from "react";
import {AppDispatch, IFCPropsDispatch} from "../../../../ITypes";
import {TrackLoader} from "../../../Vidgets/Track/TrackLoader";
import style from './TrackPage.module.scss'
import {trackSliceType} from "../../../../store/reducers/trackSlice";
import {AlbumMenu} from "../../../Vidgets/Album/AlbumMenu";

type TrackPagePropsType = { useTrackPageContainer: (dispatch: AppDispatch) => { tracks: trackSliceType['tracks'] } }
export const TrackPage: FC<IFCPropsDispatch & TrackPagePropsType> = (props) => {
    const {dispatch, useTrackPageContainer} = props
    const {tracks} = useTrackPageContainer(dispatch)
    return (
        <div className={style.trackPage}>
            {tracks.map(track => <TrackLoader {...{
                widgetFC:<AlbumMenu dispatch={dispatch} trackId={track.id}/>,
                dispatch, dateOfCreation: track.dateOfCreation, key: track.id,
                author: track.author, trackName: track.trackName, lastUpdate: track.lastUpdate, id: track.id
            }}/>)}
        </div>
    );
};