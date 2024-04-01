import React, {Dispatch, FC, SetStateAction} from "react";
import {CustomButton} from "../../Component/Button/CustomButton";
import {FCArguments} from "../../../ITypes";
import style from './TrackLoadingButton.module.scss'

type TrackLoadingButtonProps = { button?: Omit<Omit<FCArguments<typeof CustomButton>, 'onClick'>, 'children'> }
    & { loadingFile: Dispatch<SetStateAction<boolean>> };
    // & IFCPropsWrapper<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>>;
export const TrackLoadingButton: FC<TrackLoadingButtonProps> = ({button, loadingFile}) => {
    return (<div className={style.trackBtnWrapper}>
            <CustomButton {...button} children={'Loading track'} onClick={() => {
                loadingFile((prevState) => !prevState)}}/>
        </div>
    );
};