import { useState, useMemo } from 'react';

type UsePicturePreview = {
  stringPicture: string | null,
  changePictureFile: (newPicture: File) => void
  resetPicture: () => void
  pictureFile: File | null
  haveFile: boolean
};

const usePicturePreview = (): UsePicturePreview => {
  const [base64String, setBase64String] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const changePictureFile = (newPicture: File): void => {
    setFile(newPicture);
    if (!newPicture) {
      setBase64String(null);
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64String(reader.result as string);
    };
    reader.readAsDataURL(newPicture);
  };

  const resetPicture = () => {
    setBase64String(null)
    setFile(null)
  }

  return {
    stringPicture: base64String,
    changePictureFile,
    resetPicture,
    pictureFile: file,
    haveFile: useMemo(() => file !== null, [file]),
  };
};

export default usePicturePreview;
