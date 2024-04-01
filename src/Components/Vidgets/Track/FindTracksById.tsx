import React, {FC, useState} from "react";
import {albumSliceType, delTrackInMyAlbum} from "../../../store/reducers/albumSlice";
import {useFindTrackByIdContainer} from "../../../Hooks/ContainerHooks/trackHooks/useFindTrackByIdContainer";
import {TrackLoader} from "./TrackLoader";
import {AppDispatch, IFCPropsDispatch} from "../../../ITypes";
import {trackSliceType} from "../../../store/reducers/trackSlice";
import style from './FindTrackById.module.scss'
import {ElementEvents} from "../../../events/ElementEvents";
import {CgClose} from "react-icons/cg";
import {BaseLink} from "../Link/BaseLink";
import {CreateNewTrackInMyAlbum} from "../Formik/CreatedForm/CreateNewTrackInMyAlbum";
import {CustomButton} from "../../Component/Button/CustomButton";

type albumIdType = { albumId: albumSliceType['albums'][number]['id'] }
type trackType = trackSliceType["tracks"][number]
type findTrackByIdProps = {
    useFindTrackByIdContainer: (trackId: trackType["id"], dispatch: AppDispatch) => readonly [trackType | undefined]
} & { id: string } & IFCPropsDispatch & albumIdType & { isMyAlbum: boolean };
const FindTrackById: FC<findTrackByIdProps> = (props) => {
    const {useFindTrackByIdContainer, id, dispatch, albumId, isMyAlbum} = props
    const [track] = useFindTrackByIdContainer(id, dispatch)

    return (track ?
            <TrackLoader {...{
                dispatch, dateOfCreation: track.dateOfCreation, author: track.author, trackName: track.trackName,
                lastUpdate: track.lastUpdate, id: track.id,
                // виджет удаление трека из плейлиста
                widgetFC: isMyAlbum ?
                    <div style={{position: 'relative'}}>
                        <CgClose color={'red'} className={style.closeIcon} size={25}
                                 title={'Удалить трек'}
                                 onClick={ElementEvents.menu.updateTrackInAlbum(dispatch, albumId, track.id, delTrackInMyAlbum)}/>
                    </div> : <></>
            }}/>
            : null
    );
};

type FindTrackByIdProps = { trackList: albumSliceType['albums'][number]['trackList'] | [] | undefined }
    & { isMyAlbum: boolean };
export const FindTracksById: FC<FindTrackByIdProps & IFCPropsDispatch & albumIdType> = (props) => {
    const {trackList, dispatch, albumId, isMyAlbum} = props
    const [isForm, changeForm] = useState(true)
    return (
        <>
            <div className={style.trackWrapper}>
                {trackList && trackList?.length !== 0 ?
                    trackList.map(trackId => <FindTrackById key={trackId} id={trackId} dispatch={dispatch}
                                                            isMyAlbum={isMyAlbum}
                                                            albumId={albumId}
                                                            useFindTrackByIdContainer={useFindTrackByIdContainer}/>)
                    : isMyAlbum ?
                        <BaseLink path={'/track'} navLinkName={'Найти музыку для плейлиста'}/>
                        : undefined
                }

            </div>
            {isMyAlbum ? isForm ?
                    <div className={style.addNewTrackBtn}>
                        <CustomButton children={'Add new track'}
                                      onClick={ElementEvents.other.changeBooleanState(changeForm)}/>
                    </div> :
                    <CreateNewTrackInMyAlbum dispatch={dispatch}/> :
                undefined
            }
        </>

    );
};