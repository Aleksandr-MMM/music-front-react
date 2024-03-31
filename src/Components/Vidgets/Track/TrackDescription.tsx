import {FC, useEffect, useState} from "react";
import {getFile} from "../../../store/reducers/trackSlice";
import {IFCPropsDispatch, IFCPropsId} from "../../../ITypes";
import {useReduxSelector} from "../../../store/reduxStore";
import {trackSelectors} from "../../../store/selectors";
import {AudioPlayer} from "../AudioPlayer";
import {
    useTrackLoaderContainer
} from "../../../Hooks/ContainerHooks/useTrackLoaderContainer";

type TrackLoaderPropsType = IFCPropsDispatch & { trackIndex: number }
export const TrackLoader: FC<TrackLoaderPropsType> = (props) => {
    const {dispatch, trackIndex} = props
    const [isLoadingFile, loadingFile] = useState(false);
    const isLoading = useReduxSelector(trackSelectors.isLoading(trackIndex))
    const [id,trackName,dateOfCreation,author] = useTrackLoaderContainer(trackIndex)
    useEffect(() => {
        if (isLoadingFile && id) {
            dispatch(getFile(id))
        }
    }, [isLoadingFile, id, dispatch]);
    return (<>
            <p>{`Название песни: ${trackName ? trackName : 'Без название'}`}</p>
            <p>{`Дата загрузки:  ${dateOfCreation}`}</p>
            <p>{`Исполнитель: ${author ? author : 'Исполнитель не известен'}`}</p>
            {!isLoadingFile && isLoading ?
                <div>
                    <button children={'loading file'} onClick={()=>{loadingFile((prevState)=>prevState)}}/>
                </div> :
                <AudioPlayer {...{
                    dispatch,
                    key: trackIndex,
                    useDescriptionContainer: useTrackLoaderContainer,
                    trackNumber: trackIndex
                }}/>
            }

        </>

    );
};