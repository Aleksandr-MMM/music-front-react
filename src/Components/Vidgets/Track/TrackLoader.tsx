import React, {FC, ReactElement} from "react";
import {excludeObjectByKey, IFCPropsDispatch} from "../../../ITypes";
import {AudioPlayer} from "../AudioPlayer";
import {
    useTrackLoaderContainer
} from "../../../Hooks/ContainerHooks/trackHooks/useTrackLoaderContainer";
import {TrackDescription} from "./TrackDescription";
import {useDisplayTrackContainer} from "../../../Hooks/ContainerHooks/useAudioPlayer/useDisplayTrackContainer";
import {TrackPreloader} from "./TrackPreloader";
import {TrackLoadingButton} from "./TrackLoadingButton";
import style from './TrackLoader.module.scss'
import {trackSliceType} from "../../../store/reducers/trackSlice";


type TrackLoaderPropsType = IFCPropsDispatch & excludeObjectByKey<trackSliceType["tracks"][number], 'url'>;
type menuType = { widgetFC?: ReactElement<IFCPropsDispatch & Pick<trackSliceType["tracks"][number],'id'>> | ReactElement}
export const TrackLoader: FC<TrackLoaderPropsType & menuType> = (props) => {
    const {dispatch, id, dateOfCreation, author, trackName, lastUpdate,widgetFC} = props
    const [statusLoadingFile, isLoadingFile, changePreloader] = useTrackLoaderContainer(id, dispatch)
    const audioPlayerHook = useDisplayTrackContainer(id)
    return (<div className={style.track}>
            {widgetFC}
            <TrackDescription {...{trackName, dateOfCreation, author, lastUpdate}}/>
            {
                statusLoadingFile === 'loading' ?
                    <TrackPreloader/> :
                    isLoadingFile ?
                        <AudioPlayer {...{key: id, useDisplayTrackContainer: audioPlayerHook}}/>
                        :
                        <TrackLoadingButton {...{loadingFile: changePreloader}}/>
            }
        </div>
    );
};