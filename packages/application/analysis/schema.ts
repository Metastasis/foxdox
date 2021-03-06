import {z} from 'zod';


export const fileSchema = z.object({
  fileId: z.string().uuid(),
  fileType: z.string().nonempty(),
  fileName: z.string().nonempty()
});
export const analysisSchema = z.object({
  id: z.string().uuid(),
  title: z.string().nonempty(),
  bioMaterialExtractionDate: z.preprocess((val) => typeof val === 'string' ? new Date(val) : val, z.date()),
  files: z.array(fileSchema)
});
export const analysisCreateSchema = z.object({
  id: z.string().uuid(),
});
export const analysisItemsSchema = z.array(analysisSchema);
export type Analysis = z.infer<typeof analysisSchema>;

export const searchParamsSchema = z.object({
  title: z.string().optional(),
  id: z.string().optional()
});
export type SearchParams = z.infer<typeof searchParamsSchema>;

export const fileParamsSchema = z.object({
  fileId: z.string().uuid(),
});
export type DownloadLinkParams = z.infer<typeof fileParamsSchema>;
