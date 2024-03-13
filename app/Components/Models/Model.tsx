'use client';

import { useGlobalState } from '@/app/Context/globalProvider';
import React from 'react';
import styled from 'styled-components';

interface Props {
    content: React.ReactNode;
}

const Model = ({ content }: Props) => {
    const {closeModel} = useGlobalState();
    const {theme} = useGlobalState();
  return (
    <ModelStyled theme={theme}>
        <div className="model-overlay" onClick={closeModel}></div>
        <div className="model-content">{content}</div>        
    </ModelStyled>
  );
}

const ModelStyled = styled.div`
  position: fixed;
  top: 0;
  left: 20rem;
  height: 100%;
  width: 100vh;
  z-index: 5;
  display: flex;
  align-items: center;

  .model-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0. 0. 0. 0.45);
    filter: blur(4px);
  }

  .model-content {
    padding: 2rem;
    position: relative;
    max-width: 630px;
    width: 100%;
    z-index: 6;
    border-radius: 1rem;
    background-color: ${(props) => props.theme.colorBg2};
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.3);
    border-radius: ${(props) => props.theme.borderRadiusMd2};
  }
`;

export default Model