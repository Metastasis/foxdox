import { useRouter } from 'next/router';
import {AnalysisDownload} from '../../../analysis';

export default function DownloadPage() {
  const router = useRouter();
  return <AnalysisDownload fileId={String(router.query.fileId || '')} />;
}
