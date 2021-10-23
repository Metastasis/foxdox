import {z} from 'zod';


export const analysisSchema = z.object({
  id: z.string().uuid(),
  title: z.string().nonempty(),
  bioMaterialExtractionDate: z.preprocess((val) => typeof val === 'string' ? new Date(val) : val, z.date())
});
export const analysisItemsSchema = z.array(analysisSchema);
export type Analysis = z.infer<typeof analysisSchema>;

export const searchParamsSchema = z.object({
  title: z.string().optional()
});
export type SearchParams = z.infer<typeof searchParamsSchema>;
