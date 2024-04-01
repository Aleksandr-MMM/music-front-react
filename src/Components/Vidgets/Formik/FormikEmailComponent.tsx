import {FormikInput} from "../../Component/Formik/FormikInput";

export const FormikEmailComponent = () => {
    // return (<FormikInput name="email"
    //                      id="email"
    //                      type="email"
    //                      placeholder="example@mail.ru"
    //                      autoFocus={true}
    //                      autoComplete={'true'}>
    //     Email Address
    // </FormikInput>)
    return (<FormikInput labelProps={{children:"Email"}}
                         elementProps={{id:"email",type:"email",placeholder:"example@mail.ru",autoFocus:true}}/>
    )
}