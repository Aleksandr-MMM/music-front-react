import {useReduxSelector} from "../../store/reduxStore";
import {userSliceType} from "../../store/reducers/userSlice";
import {userSliceSelectors} from "../../store/selectors";
import {excludeFromObjectByValueType} from "../../ITypes/otherTypes";
import {ElementEvents} from "../../events/ElementEvents";
import {countTextAreaRows} from "../../helpers/countTextAreaRows";
import {useState} from "react";

type userSliceStateKeyType = keyof excludeFromObjectByValueType<userSliceType, string | null>
/**
 * Универсальный контейнерный хук для обработки useReduxSelector
 * возвращает свойство из стэйта userSlice
 */
export default function useUserTextAreaContainer(userSliceStateKey: userSliceStateKeyType) {
    const useUserSliceLock = () => {
        const selectorValue = useReduxSelector((state) =>
            userSliceSelectors.allEqualStringOrNull(state, userSliceStateKey))
        let selectorValueString=selectorValue===null?'Не указанно':selectorValue
        const rowsCount = countTextAreaRows(selectorValue)
        const [value, changeValue] = useState<string|null>(null)
        return [selectorValueString, ElementEvents.onBlurTextAreaEvent,
            rowsCount, changeValue,value] as const
    }
    return useUserSliceLock
}
