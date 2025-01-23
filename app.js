function App() {
    const [file, setFile] = React.useState(null);
    const [progress, setProgress] = React.useState(0);
    const [convertedImages, setConvertedImages] = React.useState(null);

    const handleFileSelect = async (selectedFile) => {
        try {
            setFile(selectedFile);
            setProgress(0);
            setConvertedImages(null);

            const images = await convertPdfToJpg(selectedFile, (progress) => {
                setProgress(progress);
            });

            setConvertedImages(images);
        } catch (error) {
            reportError(error);
            alert('Error converting PDF. Please try again.');
        }
    };

    const handleDownload = () => {
        try {
            if (!convertedImages) return;

            convertedImages.forEach((imageData, index) => {
                const link = document.createElement('a');
                link.download = `${file.name.replace('.pdf', '')}_page${index + 1}.jpg`;
                link.href = imageData;
                link.click();
            });
        } catch (error) {
            reportError(error);
            alert('Error downloading images. Please try again.');
        }
    };

    return (
        <div className="min-h-screen py-12 px-4 relative" data-name="app-container">
            <div className="noise-bg"></div>
            <div className="relative z-10">
                <Header />
                <main className="container mx-auto mt-8 flex flex-col items-center">
                    <UploadArea onFileSelect={handleFileSelect} />
                    <ConversionStatus 
                        progress={progress} 
                        fileName={file?.name} 
                    />
                    <DownloadButton 
                        onDownload={handleDownload}
                        isVisible={convertedImages !== null}
                    />
                </main>
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
