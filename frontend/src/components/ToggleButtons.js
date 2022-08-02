import React, { useState } from 'react';
import SectionButton from './SectionButton';

export default function ToggleButtons(props) {
  const sectionButtons = props.sections.map((element) => {
    return (
      <SectionButton
        title={element}
        currentSection={props.currentSection}
        key={element}
        updateSection={props.updateSection}
      />
    );
  });

  return (
    <div className='text-xl bg-white flex grow rounded-full border-yellow-300 border'>
      {sectionButtons}
    </div>
  );
}
