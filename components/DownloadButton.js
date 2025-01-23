function DownloadButton({ onDownload, isVisible }) {
    if (!isVisible) return null;

    return (
        <button
            className="download-button mt-8 px-8 py-3 rounded-full text-white font-semibold flex items-center gap-2"
            onClick={onDownload}
            data-name="download-button"
        >
            <i className="fas fa-download"></i>
            Download JPG
        </button>
    );
}
