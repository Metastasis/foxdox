import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { DateTimeISO } from '../types';

export type AnalysisDocument = Analysis & Document;

@Schema({
  timestamps: true,
})
export class Analysis {
  @Prop({ type: String, default: uuidv4 })
  _id: string;

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: Date, required: true })
  bioMaterialExtractionDate: Date;

  @Prop()
  files: Array<{ fileId: string }>;

  @Prop({ type: Date })
  createdAt: DateTimeISO;

  @Prop({ type: Date })
  updatedAt: DateTimeISO;
}

export const AnalysisSchema = SchemaFactory.createForClass(Analysis);
