import {rest} from 'msw';
import {Analysis, analysisSchema, searchParamsSchema} from './schema';
import faker from 'faker';
// @ts-ignore
// import biochemistry from '../public/__mock__/simple.pdf';

const biochemistry = '/__mock__/simple.pdf';
const files = {
  biochemistry: {
    fileId: '1b100000-caf1-10b1-a10a-bc100b10de10',
    fileUrl: biochemistry,
    fileType: 'application/pdf',
    fileName: 'simple.pdf'
  }
};

let analysisItems: Analysis[] = [
  {
    id: '9b765264-caf8-46b8-a81a-bc463b69de20',
    title: 'Биохимические исследования',
    bioMaterialExtractionDate: new Date('2020-09-08'),
    files: [
      {
        fileId: files.biochemistry.fileId,
        fileType: files.biochemistry.fileType,
        fileName: files.biochemistry.fileName
      }
    ]
  },
  {
    id: '3b7e8f2b-48f4-471c-8516-fc2f5a35044a',
    title: 'Метаболиты',
    bioMaterialExtractionDate: new Date('2020-09-07'),
    files: []
  },
  {
    id: '3144bc38-2e09-4ce6-8d1a-8a7a42d0bd3e',
    title: 'Гормоны, метаболиты, специфические белки',
    bioMaterialExtractionDate: new Date('2020-09-06'),
    files: []
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
    const analysisId = maybeBody.data.id?.trim()?.toLowerCase();
    if (analysisId) {
      const analysis = analysisItems.find(i => i.id === analysisId);
      return analysis ? res(ctx.json(analysis)) : res(ctx.status(404));
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
  rest.post('/analysis/download', async (req, res, ctx) => {
    const fileId = (req.body as any).fileId;
    const file = Object.values(files).find(file => file.fileId === fileId);
    if (!file) {
      return res(ctx.status(200), ctx.json(req.body));
    }
    const buf = await fetch(file.fileUrl).then(r => r.arrayBuffer());
    return res(
      ctx.set('Content-Length', buf.byteLength.toString()),
      ctx.set('Content-Disposition', `attachment; filename*="${file.fileName}"`),
      ctx.set('Content-Type', file.fileType),
      ctx.body(buf)
    );
  }),
  rest.post('/analysis/create', async (req, res, ctx) => {
    if (typeof req.body !== 'object') {
      return res(ctx.status(400));
    }
    const analysis = {
      id: faker.datatype.uuid(),
      title: req.body.title as string,
      bioMaterialExtractionDate: req.body.bioMaterialExtractionDate as Date,
      files: req.body.files
    };
    analysisItems.push(analysis);
    return res(
      ctx.json(analysis)
    );
  }),
  rest.post('/analysis/update', async (req, res, ctx) => {
    const nextAnalysis = analysisSchema.parse(req.body);
    analysisItems = analysisItems.reduce((acc, item) => {
      if (item.id === nextAnalysis.id) {
        acc.push(nextAnalysis);
        return acc;
      }
      acc.push(item);
      return acc;
    }, [] as Analysis[]);
    return res(
      ctx.json(nextAnalysis)
    );
  }),
  rest.post('/analysis/upload-file', async (req, res, ctx) => {
    if (typeof req.body !== 'object' || !req.body) {
      return res(ctx.status(400));
    }
    return res(
      ctx.json({
        fileId: faker.datatype.uuid(),
        fileName: req.body.file.name,
        fileType: req.body.file.type
      })
    );
  })
];
