import {useReduxSelector} from "../../store/reduxStore";
import {
    profileSliceSelectors,
    userSliceStateKeyStringOrNullType,
} from "../../store/selectors";
import {ElementEvents} from "../../events/ElementEvents";
import {countTextAreaRows} from "../../helpers/countTextAreaRows";
import {useState} from "react";


/**
 * Универсальный контейнерный хук для обработки useReduxSelector
 * возвращает свойство из стэйта userSlice
 */
export default function useUserTextAreaContainer(userSliceStateKey: userSliceStateKeyStringOrNullType) {
    const useUserSliceLock = () => {
        const selectorValue = useReduxSelector(profileSliceSelectors.allEqualStringOrNull(userSliceStateKey))
        const rowsCount = countTextAreaRows(selectorValue)
        const [value, changeValue] = useState<string|null>(null)
        return [selectorValue, ElementEvents.textArea.onBlur,
            rowsCount, changeValue,value] as const
    }
    return useUserSliceLock
}
