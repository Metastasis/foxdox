import React from 'react';
import {downloadViaLink} from './api';

interface Props {
  fileId: string
}

export default function Download(props: Props) {
  React.useEffect(() => {
    downloadViaLink({fileId: props.fileId});
  });
  return (
    <div>
      <h3>Загрузка произойдет через несколько секунд...</h3>
      <p>Если загрузка не произошла, обновите страницу</p>
    </div>
  );
}
