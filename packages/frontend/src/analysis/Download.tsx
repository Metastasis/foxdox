import React from 'react';
import {useParams} from 'react-router-dom';
import {downloadViaLink} from './api';


export default function Download() {
  const params = useParams<{ fileId: string }>();
  React.useEffect(() => {
    // downloadViaFormFile({fileId: params.fileId});
    downloadViaLink({fileId: params.fileId});
  });
  return (
    <div>
      <h3>Загрузка произойдет через несколько секунд...</h3>
      <p>Если загрузка не произошла, обновите страницу</p>
    </div>
  );
}
