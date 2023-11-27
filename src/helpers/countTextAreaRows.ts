export const countTextAreaRows = (textAreaValue: string | null) => {
    let width=11.1112
    let textAreaRowsCount = 1
    if (textAreaValue?.length) {
        width=width*textAreaValue.length>401?400:width*textAreaValue.length
        textAreaRowsCount = Math.ceil(textAreaValue.length / 36)
        textAreaRowsCount = textAreaRowsCount > 1 ? textAreaRowsCount : 1
    }
    return [textAreaRowsCount,width] as const
}