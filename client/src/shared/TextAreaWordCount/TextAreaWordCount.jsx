import React, { useState } from 'react';

import { TextAreaContainer } from './TextAreaWordCount.styles';

const TextAreaWordCount = ({ value, onChange, minWordCount, maxWordCount }) => {
  const [wordCount, setWordCount] = useState(0);

  const onChangeHandler = (e) => {
    let text = e.target.value;
    const newWordCount = text === '' ? 0 : text.trim().split(/\s+/).length;

    // Remove whitespaces at the ends
    if (newWordCount === maxWordCount) {
      text = text.trim();
    }

    // Hard limit at maxWordCount
    if (newWordCount <= maxWordCount) {
      setWordCount(newWordCount);
      onChange(text, newWordCount >= minWordCount);
    }
  };

  return (
    <TextAreaContainer>
      <textarea rows={3} value={value} onChange={onChangeHandler}></textarea>
      <label
        className="wordCount"
        style={{ color: wordCount < minWordCount ? 'red' : 'green' }}
      >
        {wordCount} word{wordCount !== 1 ? 's' : ''} (required: {minWordCount}-
        {maxWordCount} words)
      </label>
    </TextAreaContainer>
  );
};

export default TextAreaWordCount;
