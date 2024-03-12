'use client';

import { useGlobalState } from '@/app/Context/globalProvider';
import React from 'react';

interface Props {
    content: React.ReactNode;
}

const Model = ({ content }) => {
    const {closeModel} = useGlobalState();
  return (
    <div>
        <div className="model-overlay" onClick={closeModel}></div>
        {content}
    </div>
  )
}

export default Model