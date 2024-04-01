import React, {FC, useState} from "react";
import style from './AlbumMenu.module.scss'
import {trackSliceType} from "../../../store/reducers/trackSlice";
import {useAddNewFriendContainer} from "../../../Hooks/ContainerHooks/useAlbumMenuContainer";
import {IFCPropsDispatch} from "../../../ITypes";
import {CgClose} from "react-icons/cg";
import {FiPlus} from "react-icons/fi";
import {ElementEvents} from "../../../events/ElementEvents";
import {MdOutlinePlaylistAdd, MdOutlinePlaylistAddCheck} from "react-icons/md";
import {addTrackInMyAlbum, albumSliceType, delTrackInMyAlbum} from "../../../store/reducers/albumSlice";
import preloaderSvg from '../../../assets/preloader.svg'
import Menu from "../Menu/Menu";
import {AddFCDelay} from "../../../helpers/AddFCDelay";

type AlbumMenuProps = { trackId: trackSliceType['tracks'][number]['id'] }

type loaderStateType = 'addTrack' | 'addTrackLoading' | 'delTrackLoading' | 'delTrack';
type addMyPlaylistProps = IFCPropsDispatch & AlbumMenuProps & { albumId: albumSliceType['myAlbums'][number]['id'] };

const AddMyPlaylistLoader: FC<addMyPlaylistProps> = (props) => {
    const {dispatch, trackId, albumId} = props
    const [iconElement, changeIcon] = useState<loaderStateType>('addTrack');
    return (iconElement === 'addTrack' ?
            <MdOutlinePlaylistAdd className={style.addTrackInAlbumIcon} title={'добавить в мой плейлист'}
                                  onClick={ElementEvents.menu.updateTrackInAlbum(dispatch, albumId, trackId,
                                      addTrackInMyAlbum, changeIcon)}/>
            : iconElement === 'delTrack' ?
                <MdOutlinePlaylistAddCheck color={'green'} title={'отменить добавление'} style={{cursor: 'pointer'}}
                                           onClick={ElementEvents.menu.updateTrackInAlbum(dispatch, albumId, trackId
                                               , delTrackInMyAlbum, changeIcon)}/>
                :
                <>
                    <img src={preloaderSvg} style={{width: '20px'}} alt="preloader"/>
                    <AddFCDelay delayMSeconds={2000} closeMenu={changeIcon}
                                closeMenuChangeValue={prevState => prevState === 'addTrackLoading' ? 'addTrack' : 'delTrack'}/>
                </>
    )
}

export const AlbumMenu: FC<AlbumMenuProps & IFCPropsDispatch> = (props) => {
    const {dispatch, trackId} = props
    const [menu, changeMenu] = useState(false)
    return (
        <div className={`${style.menuWrapper}`}>
            {
                !menu ?
                    <FiPlus className={`${style.openMenu}`} onClick={ElementEvents.other.changeBooleanState(changeMenu)}
                            color={'green'} size={25} title={'Открыть меню'}/> :
                    <Menu dispatch={dispatch} header={{name: 'Мои плейлисты'}} useContainer={useAddNewFriendContainer}
                          FCCloseIcon={<CgClose color={'red'} className={style.closeIcon} size={25}
                                                title={'Удалить из плейлиста'}
                                                onClick={ElementEvents.other.changeBooleanState(changeMenu)}/>}
                          liElement={album =>
                              <>
                                  <AddMyPlaylistLoader {...{trackId, albumId: album.id, dispatch}}/>
                                  <p style={{marginLeft: '10px',cursor:'default'}} children={album.albumName}/>
                              </>
                          }/>
            }
        </div>
    );
};