import Resizer from "react-image-file-resizer";

// type can be 'base64', 'file', or 'blob'
const resizeImg = (file, maxWidth, maxHeight, type='base64') =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      maxWidth,
      maxHeight,
      "JPEG",
      90,
      0,
      (uri) => {
        resolve(uri);
      },
      type
    );
  });

  export default resizeImg;

