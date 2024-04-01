import * as Yup from "yup";
import React from "react";


export class FormikValidation {
    private static readonly property = {
        password: {
            valueMin: 4,
            valueMax: 20,
            regex: /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W))/
        },
        statusLengthMax: 300
    } as const
    private static readonly errorMessage = {
        required: 'Поле обязательнно для заполнения' as const,
        password: {
            passwordLength: 'Длинна пароля должна быть не',
            latinCharacters: 'латинских символов',
            lowerCharacters: 'строчной буквы',
            upperCharacters: 'прописной буквы',
            number: 'цифры [0-9]',
            specialCharacter: 'специальный символ',
        } as const,
        passwordLength: 'Длинна пароля должна быть не',
        incorrectEmail: 'Неверный формат Email',
        file: {
            required_file: 'Файл обязателен для отправки',
            incorrect_file_type: "Не корректный тип файла"
        }
    } as const
    private static readonly validationHelpers = {
        isValidFiles: (files: FileList | null, filesCallback: (file: File) => boolean): boolean => {
            let valid = true;
            if (files) {
                const fileArr = Array.from(files);
                // fileArr.forEach((file) => {
                //     const size = file.size / 1024 / 1024;
                //     if (size > 10) {
                //         valid = false;
                //     }
                // });
                fileArr.forEach((file) => {
                    if (filesCallback(file)) {
                        valid = false;
                    }
                });
            } else {
                valid = false
            }
            return valid;
        }
    } as const
    private static readonly entity = {
        email: Yup.string().email(`${FormikValidation.errorMessage.incorrectEmail}`)
            .required(FormikValidation.errorMessage.required),
        password: Yup.string()
            .required(FormikValidation.errorMessage.required)
            .matches(FormikValidation.property.password.regex,
                {
                    message: `Пароль должен состоять как минимум из: ${FormikValidation.errorMessage.password.latinCharacters},
                ${FormikValidation.errorMessage.password.upperCharacters},${FormikValidation.errorMessage.password.lowerCharacters},
                ${FormikValidation.errorMessage.password.number} и ${FormikValidation.errorMessage.password.specialCharacter}`
                })
            .max(FormikValidation.property.password.valueMax,
                `${FormikValidation.errorMessage.passwordLength} более 
                ${FormikValidation.property.password.valueMax} символов`)
            .min(FormikValidation.property.password.valueMin,
                `${FormikValidation.errorMessage.passwordLength} менее 
                ${FormikValidation.property.password.valueMin} символов`),
        confirmPassword: Yup.string()
            .required(FormikValidation.errorMessage.required)
            .oneOf([Yup.ref('password')], 'Пароли должны совпадать'),
        playlist: Yup.string()
            .required(FormikValidation.errorMessage.required)
            .max(FormikValidation.property.password.valueMax,
                `Название должно содержать не более ${FormikValidation.property.password.valueMax} символов`)
            .min(FormikValidation.property.password.valueMin,
                `Название должно содержать не менее ${FormikValidation.property.password.valueMin} символов`),
        /*
        Валидация Formik input формы для файла
         */
        file: <T extends { files: HTMLInputElement['files'] }>(fileRef: React.MutableRefObject<T>) => Yup.mixed()
            .test("is-file-too-big", "Файл должен быть не более 10 мб.", () => {
                const files = fileRef?.current?.files;
                return FormikValidation.validationHelpers.isValidFiles(files,
                    (file) => (file.size / 1024 / 1024) > 10)
            })
            .test("is_correct_file_type", FormikValidation.errorMessage.file.incorrect_file_type,
                () => {
                    // let valid = true;
                    // const files = fileRef?.current?.files;
                    // if (files) {
                    //     const fileArr = Array.from(files);
                    //     fileArr.forEach((file) => {
                    //         const type = file.type.split("/")[1];
                    //         const validTypes = [
                    //             "zip",
                    //             "xml",
                    //             "xhtml+xml",
                    //             "plain",
                    //             "svg+xml",
                    //             "rtf",
                    //             "pdf",
                    //             "jpeg",
                    //             "png",
                    //             "jpg",
                    //             "ogg",
                    //             "json",
                    //             "html",
                    //             "gif",
                    //             "csv"
                    //         ];
                    //         if (!validTypes.includes(type)) {
                    //             valid = false;
                    //         }
                    //     });
                    // }
                    // return valid;

                    // let valid = true;
                    const files = fileRef?.current?.files;
                    // if (files) {
                    //     const fileArr = Array.from(files);
                    //     fileArr.forEach((file) => {
                    //         const type = file.type.split("/")[1];
                    //         const validTypes = [
                    //             "zip",
                    //             "xml",
                    //             "xhtml+xml",
                    //             "plain",
                    //             "svg+xml",
                    //             "rtf",
                    //             "pdf",
                    //             "jpeg",
                    //             "png",
                    //             "jpg",
                    //             "ogg",
                    //             "json",
                    //             "html",
                    //             "gif",
                    //             "csv"
                    //         ];
                    //         if (!validTypes.includes(type)) {
                    //             valid = false;
                    //         }
                    //     });
                    // }
                    // return valid;
                    return FormikValidation.validationHelpers.isValidFiles(files,
                        (file) => {
                            const type = file.type.split("/")[1];
                            const validTypes = ['mp3','mpeg',];
                            return !validTypes.includes(type)
                        }
                    )
                })
            .required(FormikValidation.errorMessage.file.required_file)
    }
    public static readonly schema = {
        login: Yup.object({
            password: FormikValidation.entity.password,
            email: FormikValidation.entity.email,
        } as const),
        registration: Yup.object({
            password: FormikValidation.entity.password,
            email: FormikValidation.entity.email,
            confirmPassword: FormikValidation.entity.confirmPassword
        } as const),
        playlist: Yup.object({
            albumName: FormikValidation.entity.playlist,
        } as const),

        addTrackInMyAlbum: (fileRef: any) => Yup.object({
            trackName: FormikValidation.entity.playlist,
            author: FormikValidation.entity.playlist,
            // addTrackFile:FormikValidation.entity.file
            addTrackFile: FormikValidation.entity.file(fileRef)
        } as const),
    }
}

// const t ={Yup.object({
//         files: Yup.mixed()
//             .test("is-file-too-big", "File exceeds 10MB", () => {
//                 let valid = true;
//                 const files = fileRef?.current?.files;
//                 if (files) {
//                     const fileArr = Array.from(files);
//                     fileArr.forEach((file) => {
//                         const size = file.size / 1024 / 1024;
//                         if (size > 10) {
//                             valid = false;
//                         }
//                     });
//                 }
//                 return valid;
//             })
//             .test(
//                 "is-file-of-correct-type",
//                 "File is not of supported type",
//                 () => {
//                     let valid = true;
//                     const files = fileRef?.current?.files;
//                     if (files) {
//                         const fileArr = Array.from(files);
//                         fileArr.forEach((file) => {
//                             const type = file.type.split("/")[1];
//                             const validTypes = [
//                                 "zip",
//                                 "xml",
//                                 "xhtml+xml",
//                                 "plain",
//                                 "svg+xml",
//                                 "rtf",
//                                 "pdf",
//                                 "jpeg",
//                                 "png",
//                                 "jpg",
//                                 "ogg",
//                                 "json",
//                                 "html",
//                                 "gif",
//                                 "csv"
//                             ];
//                             if (!validTypes.includes(type)) {
//                                 valid = false;
//                             }
//                         });
//                     }
//                     return valid;
//                 }
//             )
//     }
//     )}