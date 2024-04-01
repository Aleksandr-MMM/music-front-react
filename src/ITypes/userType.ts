import {profileResponseType} from "./backendType";
import {urlLoadingType, urlType} from "./otherTypes";


export type userType = profileResponseType
export type userPhotoType = { photo: urlType & urlLoadingType }

// type wrapperUserPhotoOnClick = { onClick?: ((photo?: urlType['path']) => void) } | undefined

// type styledUserPhotoType = IFCStyledProps<(IFCPropsElementClassname | undefined) & (IFCPropsElementStyle | undefined),
//     (IFCPropsElementClassname | undefined) & (IFCPropsElementStyle | undefined) & wrapperUserPhotoOnClick>;

// type photoSelectorType = { photoSelectorPath: (state: RootState) => urlType['path'] }
// type isLoadingSelectorType = { isLoadingSelector:(args:any)=> (state: RootState) => urlLoadingType["isLoading"] }
// type useUserPhotoContainerType = {
//     useUserPhotoContainer: (dispatch: AppDispatch, id: string | null, thunk: asyncThunk,
//                             photoSelector: photoSelectorType['photoSelectorPath'],
//                             isLoadingSelector: isLoadingSelectorType['isLoadingSelector'])
//         => urlType & urlLoadingType,
// };
// export type UserPhotoType = IFCPropsDispatch & IFCPropsId & useUserPhotoContainerType & { thunk: asyncThunk } &
//     styledUserPhotoType & photoSelectorType & isLoadingSelectorType & wrapperUserPhotoOnClick;