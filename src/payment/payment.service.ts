import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Payments } from '@prisma/client';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import { CreatePaymentDto } from './dtos/createPayment.dto';

@Injectable()
export class PaymentService {
  private s3Client = new S3Client({
    region: process.env.AWS_REGION,
  });

  constructor(private prismaService: PrismaService) {}

  public async create(data: CreatePaymentDto): Promise<Payments> {
    return await this.prismaService.payments.create({ data });
  }

  public async find(params: {
    account_id: number;
    startDate?: string;
    endDate?: string;
  }): Promise<Payments[]> {
    const filterOptions = {
      //Adicionar lib date-fns depois
      lte: params.endDate ? new Date(`${params.endDate}`) : undefined,
      gte: params.startDate ? new Date(`${params.startDate}`) : undefined,
    };
    return await this.prismaService.payments.findMany({
      where: {
        account_id: params.account_id,
        date: filterOptions,
      },
      orderBy: {
        date: 'asc',
      },
    });
  }

  public async upload(fileName: string, file: Buffer) {
    const fileExtension = fileName.substring(fileName.lastIndexOf('.'));
    const newFileName = `${uuidv4()}${fileExtension}`;
    const urlName = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${newFileName}`;

    try {
      const uploadFile = await this.s3Client.send(
        new PutObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: newFileName,
          Body: file,
        }),
      );

      if (uploadFile.$metadata.httpStatusCode !== 200) {
        throw new Error('Error while uploading file');
      }

      return urlName;
    } catch (error) {
      throw new Error('Error while uploading file: ' + error.message);
    }
  }
}
