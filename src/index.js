import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil'
import VideoDetailPage from './VideoDetailPage';

ReactDOM.render(
  
    <RecoilRoot>
      <VideoDetailPage />
      </RecoilRoot>
  ,
  document.getElementById('root')
);

