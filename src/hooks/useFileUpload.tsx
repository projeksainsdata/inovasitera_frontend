import { useState, useCallback } from 'react';

interface FileWithPreview extends File {
    preview: string;
}

interface UseFileUploadReturn {
    files: FileWithPreview[];
    onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    removeFile: (index: number) => void;
    clearFiles: () => void;
}

const useFileUpload = (maxFiles: number = 10): UseFileUploadReturn => {
    const [files, setFiles] = useState<FileWithPreview[]>([]);

    const onFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(event.target.files || []);
        const newFiles = selectedFiles.slice(0, maxFiles - files.length).map(file => ({
            ...file,
            preview: URL.createObjectURL(file)
        }));

        setFiles(prevFiles => [...prevFiles, ...newFiles]);
    }, [files, maxFiles]);

    const removeFile = useCallback((index: number) => {
        setFiles(prevFiles => {
            const updatedFiles = [...prevFiles];
            if (updatedFiles[index]) {
                URL.revokeObjectURL(updatedFiles[index].preview);
            }
            updatedFiles.splice(index, 1);
            return updatedFiles;
        });
    }, []);

    const clearFiles = useCallback(() => {
        files.forEach(file => URL.revokeObjectURL(file.preview));
        setFiles([]);
    }, [files]);

    return { files, onFileChange, removeFile, clearFiles };
};

export default useFileUpload;