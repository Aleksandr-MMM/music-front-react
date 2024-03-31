import {FC} from "react";
import {albumSliceType} from "../../../store/reducers/albumSlice";

type FindTrackByIdProps={ trackList: albumSliceType['albums'][number]['trackList']|[]};
export const FindTrackById:FC<FindTrackByIdProps> = (props) => {
 return (
  <div>

  </div>
 );
};