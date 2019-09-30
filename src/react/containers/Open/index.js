import React from 'react';
import './styles.css';

function buildFileSelector(){
  const fileSelector = document.createElement('input');
  fileSelector.setAttribute('type', 'file');
  fileSelector.setAttribute('multiple', 'multiple');
  return fileSelector;
}

function Open() {
  const fileSelector = buildFileSelector();
  fileSelector.click();

  return (
    <div className="Open">
    </div>
  );
}

export default Open;
