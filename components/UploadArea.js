function UploadArea({ onFileSelect }) {
    const [isDragOver, setIsDragOver] = React.useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type === 'application/pdf') {
            onFileSelect(file);
        }
    };

    const handleFileInput = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'application/pdf') {
            onFileSelect(file);
        }
    };

    return (
        <div
            className={`upload-area glass-effect p-8 text-center mx-auto max-w-xl cursor-pointer ${
                isDragOver ? 'drag-over' : ''
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById('fileInput').click()}
            data-name="upload-area"
        >
            <i className="fas fa-file-pdf text-5xl mb-4 text-purple-300"></i>
            <h3 className="text-xl mb-2" data-name="upload-title">
                Drop your PDF file here
            </h3>
            <p className="text-gray-400 text-sm" data-name="upload-subtitle">
                or click to browse
            </p>
            <input
                type="file"
                id="fileInput"
                className="hidden"
                accept=".pdf"
                onChange={handleFileInput}
                data-name="file-input"
            />
        </div>
    );
}
