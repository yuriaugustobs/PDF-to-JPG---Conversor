function ConversionStatus({ progress, fileName }) {
    return progress > 0 && progress < 100 ? (
        <div className="mt-8 max-w-xl mx-auto glass-effect p-6" data-name="conversion-status">
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-300" data-name="file-name">{fileName}</span>
                <span className="text-sm text-purple-300" data-name="progress-percentage">{progress}%</span>
            </div>
            <div 
                className="progress-bar h-2 rounded-full bg-gray-700"
                style={{ '--progress': `${progress}%` }}
                data-name="progress-bar"
            ></div>
        </div>
    ) : null;
}
