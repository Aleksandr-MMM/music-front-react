export class ApiStream {
    public static async readReadableStream(response: Response): Promise<string | null> {
        const responseAttachmentBody = await response.body
        if (responseAttachmentBody) {
            let reader: ReadableStreamDefaultReader<Uint8Array> = responseAttachmentBody.getReader();
            const readableStream = new ReadableStream<Uint8Array>({
                    async start(controller) {
                        while (true) {
                            const {done, value} = await reader.read();
                            if (done) {
                                break;
                            }
                            controller.enqueue(value);
                        }
                        controller.close();
                        reader.releaseLock();
                    }
                }
            )
            const blob = new Response(readableStream).blob()
            return URL.createObjectURL(await blob)
        }
        return null
    }
}