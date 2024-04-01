import {FormikInput} from "../../Component/Formik/FormikInput";

export const FormikPasswordComponent = () => {
    return (<FormikInput labelProps={{children:"Password"}} elementProps={{type:'password',id:"password"}}/>)
}
// elementProps={{id:"password",type:'password'}}
// labelProps={{children:"password"}}