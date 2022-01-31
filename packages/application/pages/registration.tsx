import type {NextPage} from 'next';
import { useRouter } from 'next/router';
import useSwr from 'swr';
import {register} from '../self-service';


const Page: NextPage = () => {
  const router = useRouter();
  const flow = router.query.flow;
  useSwr('/self-service/registration/browser', register);
  return (
    <div>
      <h4>Регистрация</h4>
      {flow}
    </div>
  );
};

export default Page;
