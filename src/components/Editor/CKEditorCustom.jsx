import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';

const CKEditorCustom = () => {
  // function uploadAdapter(loader) {
  //   return {
  //     upload: () => {
  //       return new Promise((resolve, reject) => {
  //         const body = new FormData();
  //         loader.file.then((file) => {
  //           body.append('files', file);
  //           // let headers = new Headers();
  //           // headers.append("Origin", "http://localhost:3000");
  //           fetch('https://api.imgbb.com/1/upload?key=ba3c30c5e82434be56b4cece81e66674', {
  //             method: 'post',
  //             body: body,
  //             // mode: "no-cors"
  //           })
  //             .then((res) => res.json())
  //             .then((res) => {
  //               console.log('🚀 ~ file: CKEditorCustom.jsx ~ line 31 ~ .then ~ res', res);
  //               resolve({
  //                 default: `${API_URL}/${res.filename}`,
  //               });
  //             })
  //             .catch((err) => {
  //               reject(err);
  //             });
  //         });
  //       });
  //     },
  //   };
  // }

  // const uploadPlugin = (editor) => {
  //   editor.plugins.get('FileRepository').createUploadAdapter = (loader) => uploadAdapter(loader);
  // };

  return (
    <CKEditor
      config={{
        plugins: [SimpleUploadAdapter],
        simpleUpload: {
          uploadUrl: 'https://api.imgbb.com/1/upload?key=ba3c30c5e82434be56b4cece81e66674',
        },
        // Enable the XMLHttpRequest.withCredentials property.
        withCredentials: true,

        // Headers sent along with the XMLHttpRequest to the upload server.
        headers: {
          'X-CSRF-TOKEN': 'CSFR-Token',
          Authorization: 'Bearer <JSON Web Token>',
        },
      }}
      // editor={ClassicEditor}
      data='<p>Hello from CKEditor 5!</p>'
      onReady={(editor) => {
        // You can store the "editor" and use when it is needed.
        console.log('Editor is ready to use!', editor);
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        console.log({ event, editor, data });
      }}
      onBlur={(event, editor) => {
        console.log('Blur.', editor);
      }}
      onFocus={(event, editor) => {
        console.log('Focus.', editor);
      }}
    />
  );
};

export default CKEditorCustom;
