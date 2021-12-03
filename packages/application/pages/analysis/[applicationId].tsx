import type {NextPage} from 'next';
import { useRouter } from 'next/router';
import {AnalysisView} from '../../analysis';

const Page: NextPage = () => {
  const router = useRouter();
  return <AnalysisView id={String(router.query.applicationId || '')} />;
};

export default Page;
