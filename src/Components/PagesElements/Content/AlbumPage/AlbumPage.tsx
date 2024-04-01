import React, {CSSProperties, FC} from "react";
import {IFCPropsDispatch, IFCPropsWrapper} from "../../../../ITypes";
import {useAlbumPageContainer} from "../../../../Hooks/ContainerHooks/useAlbumPageContainer";
import {albumSliceType} from "../../../../store/reducers/albumSlice";
import {FindTracksById} from "../../../Vidgets/Track/FindTracksById";
import style from './AlbumPage.module.scss'
import {TextPropertyWithLabel} from "../../../Vidgets/TextProperty/TextPropertyWithLabel/TextPropertyWithLabel";

type albumAliasType = albumSliceType['albums'][number]
type albumInfoPropsType = IFCPropsWrapper<{ className?: string | undefined, style?: CSSProperties | undefined }> &
    { albumName: albumAliasType["albumName"] | undefined }
    & { lastUpdate: albumAliasType["lastUpdate"] | undefined };
const AlbumInfo: FC<albumInfoPropsType> = ({albumName, lastUpdate, wrapper}) => {
    return (
        <div style={{...wrapper?.style}} className={wrapper?.className}>
            <TextPropertyWithLabel discriminant={'text'} text={albumName ? albumName : 'плейлист не найден'}
                                   labelElement={{
                                       style: {fontWeight: "bold", marginRight: '10px', cursor: 'default'},
                                       children: 'Название плейлиста :'
                                   }}
                                   propertyStyle={{style: {display: "inline"}}}/>
            <TextPropertyWithLabel discriminant={'text'} text={lastUpdate ? lastUpdate : 'неизвестно'}
                                   labelElement={{
                                       style: {fontWeight: "bold", marginRight: '10px', cursor: 'default'},
                                       children: 'Дата создания :'
                                   }}
                                   propertyStyle={{style: {display: "inline"}}}/>
        </div>
    );
};
export const AlbumPage: FC<IFCPropsDispatch> = ({dispatch}) => {
    const {albumName, lastUpdate, trackList, albumId,isMyAlbum} = useAlbumPageContainer(dispatch);
    console.log('render AlbumPage')
    return (
        <div className={style.albumContent}>
            <AlbumInfo {...{albumName, lastUpdate, trackList, wrapper: {className: style.wrapper}}}/>
            {
                albumId ?
                    <FindTracksById {...{isMyAlbum,trackList,dispatch,albumId}}/> :
                    undefined
            }
        </div>
    );
};