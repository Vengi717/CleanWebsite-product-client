import { PDFViewer } from '@react-pdf/renderer';
import React, { useState, useEffect } from 'react';

function MyComponent() {
  const [pdfBlob, setPdfBlob] = useState(null);

  useEffect(() => {
    // Replace this with your actual Firebase Storage URL
    const pdfUrl =
      'https://firebasestorage.googleapis.com/v0/b/hr-v2-79983.appspot.com/o/v2%2Fcompany%2FNDA%20FOR%20Utopia%20Tech%20PTY%20LTD%20(2)_2022-12-20%2003-40-22?alt=media&token=86eebb27-e45f-442a-8f41-b9eac28beb43';

    fetch(pdfUrl)
      .then(response => response.blob())
      .then(blob => {
        const pdfBlob = URL.createObjectURL(blob);
        setPdfBlob(pdfBlob);
      });
  }, []);

  return (
    <div>
      {pdfBlob ? (
        <PDFViewer src={pdfBlob} />
      ) : (
        'Loading PDF...'
      )}
    </div>
  );
}

export default MyComponent;
