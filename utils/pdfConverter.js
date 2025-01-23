async function convertPdfToJpg(file, onProgress) {
    try {
        const fileReader = new FileReader();
        
        return new Promise((resolve, reject) => {
            fileReader.onload = async function() {
                try {
                    const typedArray = new Uint8Array(this.result);
                    const pdf = await pdfjsLib.getDocument(typedArray).promise;
                    const totalPages = pdf.numPages;
                    const images = [];

                    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
                        const page = await pdf.getPage(pageNum);
                        const viewport = page.getViewport({ scale: 2.0 });
                        
                        const canvas = document.createElement('canvas');
                        const context = canvas.getContext('2d');
                        canvas.height = viewport.height;
                        canvas.width = viewport.width;

                        await page.render({
                            canvasContext: context,
                            viewport: viewport
                        }).promise;

                        images.push(canvas.toDataURL('image/jpeg', 0.8));
                        onProgress(Math.round((pageNum / totalPages) * 100));
                    }

                    resolve(images);
                } catch (error) {
                    reportError(error);
                    reject(error);
                }
            };

            fileReader.readAsArrayBuffer(file);
        });
    } catch (error) {
        reportError(error);
        throw error;
    }
}
