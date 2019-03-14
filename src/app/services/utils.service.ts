export const getBase64FromFile = (file): Promise<string | ArrayBuffer> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

export const copyToClipboard = (text): boolean => {
  const textArea: HTMLTextAreaElement = document.createElement('textarea');
  let success: boolean = false;

  // Place in top-left corner of screen regardless of scroll position.
  textArea.style.position = 'fixed';
  textArea.style.top = '0';
  textArea.style.left = '0';

  // Ensure it has a small width and height. Setting to 1px / 1em...
  // ...doesn't work as this gives a negative w/h on some browsers.
  textArea.style.width = '2em';
  textArea.style.height = '2em';

  // We don't need padding, reducing the size if it does flash render.
  textArea.style.padding = '0';

  // Clean up any borders
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';

  // Avoid flash of white box if rendered for any reason.
  textArea.style.background = 'transparent';

  // Set the actual value
  textArea.value = text;

  // Now, render the element
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    success = document.execCommand('copy');
  } catch (err) {
    console.error('Unable to copy to clipboard with text value', text);
  }

  // Remove the element
  document.body.removeChild(textArea);

  return success;
};
