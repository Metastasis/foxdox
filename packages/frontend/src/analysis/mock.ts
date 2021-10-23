import {rest} from 'msw';
import {z} from 'zod';


export const analysisSchema = z.object({
  id: z.string().uuid(),
  title: z.string().nonempty(),
  bioMaterialExtractionDate: z.date()
});
export type Analysis = z.infer<typeof analysisSchema>;
const searchParamsSchema = z.object({
  title: z.string().nonempty()
});
const analysisItems = [
  {
    id: '1',
    title: 'Биохимические исследования',
    bioMaterialExtractionDate: new Date('2020-09-08')
  },
  {
    id: '2',
    title: 'Метаболиты',
    bioMaterialExtractionDate: new Date('2020-09-07')
  },
  {
    id: '3',
    title: 'Гормоны, метаболиты, специфические белки',
    bioMaterialExtractionDate: new Date('2020-09-06')
  }
];
export const handlers = [
  rest.post('/analysis/search', (req, res, ctx) => {
    const maybeBody = searchParamsSchema.safeParse(req.body);
    if (!maybeBody.success) {
      return res(
        ctx.status(400),
        ctx.json({error: maybeBody.error})
      );
    }
    const items = analysisItems.filter(
      item => item.title.indexOf(maybeBody.data.title.trim().toLowerCase()) >= 0
    );
    items.sort((a, b) => Number(a.bioMaterialExtractionDate) - Number(b.bioMaterialExtractionDate));
    return res(
      ctx.status(200),
      ctx.json({
        items
      }),
    );
  }),
];
