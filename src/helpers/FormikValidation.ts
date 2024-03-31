import * as Yup from "yup";
export class FormikValidation {

    private static readonly property = {
        password: {
            valueMin: 4,
            valueMax: 20,
            regex:/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W))/
        } as const,
        statusLengthMax: 300 as const
    }
    private static readonly errorMessage = {
        required: 'Поле обязательнно для заполнения' as const,
        password:{
            passwordLength: 'Длинна пароля должна быть не' ,
            latinCharacters: 'латинских символов',
            lowerCharacters: 'строчной буквы',
            upperCharacters: 'прописной буквы',
            number: 'цифры [0-9]',
            specialCharacter: 'специальный символ',
        },
        passwordLength: 'Длинна пароля должна быть не',
        incorrectEmail: 'Неверный формат Email'
    }
    private static readonly entity = {
        email: Yup.string().email(`${FormikValidation.errorMessage.incorrectEmail}`)
            .required(FormikValidation.errorMessage.required),
        password: Yup.string()
            .required(FormikValidation.errorMessage.required)
            .matches(FormikValidation.property.password.regex,
                {message:`Пароль должен состоять как минимум из: ${FormikValidation.errorMessage.password.latinCharacters},
                ${FormikValidation.errorMessage.password.upperCharacters},${FormikValidation.errorMessage.password.lowerCharacters},
                ${FormikValidation.errorMessage.password.number} и ${FormikValidation.errorMessage.password.specialCharacter}`})
            .max(FormikValidation.property.password.valueMax,
                `${FormikValidation.errorMessage.passwordLength} более 
                ${FormikValidation.property.password.valueMax} символов`)
            .min(FormikValidation.property.password.valueMin,
                `${FormikValidation.errorMessage.passwordLength} менее 
                ${FormikValidation.property.password.valueMin} символов`),
        confirmPassword: Yup
            .string()
            .required(FormikValidation.errorMessage.required)
            .oneOf([Yup.ref('password')], 'Пароли должны совпадать')
    }
    public static readonly schema ={
        login:Yup.object({
            password: FormikValidation.entity.password,
            email: FormikValidation.entity.email,
        } as const),
        registration: Yup.object({
            password: FormikValidation.entity.password,
            email: FormikValidation.entity.email,
            confirmPassword: FormikValidation.entity.confirmPassword
        } as const)
    }
}