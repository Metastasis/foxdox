import { useRouter } from 'next/router'
import {Download} from '../../../analysis';

export default function DownloadPage() {
  const router = useRouter();
  return <Download fileId={String(router.query.fileId || '')} />;
}
