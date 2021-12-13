import React from 'react';
import useSwr from 'swr';
import {downloadViaLink} from '../api';

interface Props {
  fileId: string
}

export default function AnalysisDownload(props: Props) {
  const loadApi = useSwr(
    ['analysis-download', props.fileId],
    () => downloadViaLink({fileId: props.fileId}).then(() => window.close())
  );
  if (loadApi.error) {
    return (
      <div>
        <h3>Не удалось скачать файл</h3>
        <p>Попробуйте еще раз позже</p>
      </div>
    );
  }
  return (
    <div>
      <h3>Загрузка произойдет через несколько секунд...</h3>
      <p>Если загрузка не произошла, обновите страницу</p>
    </div>
  );
}
