import {useState} from "react";
import { useReduxSelector} from "../../store/reduxStore";
import {authSliceSelectors} from "../../store/selectors";
import {useLocation} from "react-router-dom";

/**
 * Контейнерный хук
 */
export default function useNavbarContainer() {
    const [isNavbar, openNavbar] = useState(false)
    return {
        myAccId:useReduxSelector(authSliceSelectors.id()),
        location : useLocation().pathname,
        isNavbar,openNavbar
    }
}