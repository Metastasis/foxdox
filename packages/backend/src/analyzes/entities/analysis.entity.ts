import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type DateTimeIso = Date;
export type Uuidv4 = string;
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
}

export const AnalysisSchema = SchemaFactory.createForClass(Analysis);
