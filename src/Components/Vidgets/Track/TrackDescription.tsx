import {FC} from "react";
import style from './TrackDescription.module.scss'
import {trackSliceType} from "../../../store/reducers/trackSlice";

type TrackDescriptionPropsType =
    Pick<trackSliceType['tracks'][number], 'trackName'>
    & Pick<trackSliceType['tracks'][number], 'author'>
    & Pick<trackSliceType['tracks'][number], 'dateOfCreation'>;
export const TrackDescription: FC<TrackDescriptionPropsType> = (props) => {
    const {trackName, dateOfCreation, author} = props
    return (<>
            <div className={style.wrapper}>
                <p className={style.titleName}>{`Название песни:`}</p>
                <p className={style.description}>{`${trackName ? trackName : 'Без название'}`}</p>
            </div>
            <div className={style.wrapper}>
                <p className={style.titleName}>{`Дата загрузки:`}</p>
                <p className={style.description}>{`${dateOfCreation}`}</p>
            </div>
            <div className={style.wrapper}>
                <p className={style.titleName}>{`Исполнитель:`}</p>
                <p className={style.description}>{`${author ? author : 'Исполнитель не известен'}`}</p>
            </div>
        </>

    );
};