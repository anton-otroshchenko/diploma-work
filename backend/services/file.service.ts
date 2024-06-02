import crypto from 'node:crypto';

import { PutObjectCommand, S3Client,} from '@aws-sdk/client-s3';

import {ENV} from '../enums/env.enum';


import {type FileRepository} from '../repositories/file.repository';

type Constructor = {
    fileRepository: FileRepository;
};

class File {
    private storage: S3Client;

    private fileRepository: FileRepository;


    public constructor({ fileRepository }: Constructor) {
        this.fileRepository = fileRepository;

        const { SECRET_KEY, ACCESS_KEY } =
            ENV.AWS

        this.storage = new S3Client({
            region: 'eu-north-1',
            credentials: {
                accessKeyId: ACCESS_KEY as string,
                secretAccessKey: SECRET_KEY as string,
            },
        });
    }

    public async upload({
                            file,
                        }: {
        file: Buffer | string;
    }): Promise<{ id: number; url: string }> {;
        const fileName = crypto.randomUUID();

        const command = new PutObjectCommand({
            Bucket: ENV.AWS.BUCKET_NAME,
            Key: fileName,
            Body: typeof file === 'string' ? this.getBufferFromBase64(file) : file,
        });

        await this.storage.send(command);

        const url = this.getFileUrl(fileName);

        return this.fileRepository.create(
            {
                url
            }
        );
    }

    private getFileUrl(fileName: string): string {

        return `https://${ENV.AWS.BUCKET_NAME}.s3.amazonaws.com/${fileName}`;
    }

    private getBufferFromBase64(base64: string): Buffer {
        return Buffer.from(base64, 'base64');
    }
}

export { File };