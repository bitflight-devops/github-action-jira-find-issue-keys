/// <reference types="node" />
export interface AddAttachment {
    /** The ID or key of the issue that attachments are added to. */
    issueIdOrKey: string;
    attachment: AddAttachment.Attachment | AddAttachment.Attachment[];
}
export declare namespace AddAttachment {
    interface Attachment {
        filename: string;
        file: Buffer | ReadableStream | string | Blob | File;
    }
}
