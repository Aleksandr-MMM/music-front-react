export const checkStatusCodeException=(status:number, errorMessage:string):void=>{
    if (status > 300) {
        throw Error(`Error status ${status}: ${errorMessage}`)
    }
}