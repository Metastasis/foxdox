import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { DateTimeISO } from '../types';

export type FileDocument = File & Document;

@Schema({
  timestamps: true,
})
export class File {
  @Prop({ type: String, default: uuidv4 })
  _id: string;

  @Prop({ type: String, required: true })
  fileName: string;

  @Prop({ type: String, required: true })
  fileType: string;

  @Prop({ type: Buffer, required: true })
  buffer: Buffer;

  @Prop({ type: Number, required: true })
  fileSize: number;

  @Prop({ type: Date })
  createdAt: DateTimeISO;

  @Prop({ type: Date })
  updatedAt: DateTimeISO;
}

export const FileSchema = SchemaFactory.createForClass(File);
