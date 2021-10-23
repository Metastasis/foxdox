import {rest} from 'msw';
import {searchParamsSchema} from './schema';


const analysisItems = [
  {
    id: '9b765264-caf8-46b8-a81a-bc463b69de20',
    title: 'Биохимические исследования',
    bioMaterialExtractionDate: new Date('2020-09-08')
  },
  {
    id: '3b7e8f2b-48f4-471c-8516-fc2f5a35044a',
    title: 'Метаболиты',
    bioMaterialExtractionDate: new Date('2020-09-07')
  },
  {
    id: '3144bc38-2e09-4ce6-8d1a-8a7a42d0bd3e',
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
    const searchTerm = maybeBody.data.title?.trim()?.toLowerCase();
    const items = searchTerm ? analysisItems.filter(
      item => item.title.indexOf(searchTerm) >= 0
    ) : analysisItems;
    items.sort((a, b) => Number(b.bioMaterialExtractionDate) - Number(a.bioMaterialExtractionDate));
    return res(
      ctx.status(200),
      ctx.json({
        items
      }),
    );
  }),
];
