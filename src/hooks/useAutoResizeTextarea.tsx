import { RefObject, useEffect } from 'react';

export const useAutoResizeTextarea = (
  textareaRef: RefObject<HTMLTextAreaElement>,
  value: string
) => {
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [value, textareaRef]);
};