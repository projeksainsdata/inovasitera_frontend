import React, { useState, useCallback } from 'react';
import { Dropzone, FileMosaic } from "@files-ui/react";
import { Box, Text } from '@chakra-ui/react';

interface CustomFileUploadProps {
  onChange: (files: File[]) => void;
  maxFiles?: number;
  accept?: string;
  value?: File[];
}

const CustomFileUpload: React.FC<CustomFileUploadProps> = ({
  onChange,
  maxFiles = 10,
  accept = "image/*",
  value = []
}) => {
  const [files, setFiles] = useState<any[]>(value.map(file => ({
    file,
    id: Math.random().toString(36).substring(7),
    valid: true
  })));

  const updateFiles = useCallback((incomingFiles: any[]) => {
    setFiles(incomingFiles);
    onChange(incomingFiles.map(f => f.file));
  }, [onChange]);

  const removeFile = useCallback((id: string) => {
    setFiles(currentFiles => {
      const updatedFiles = currentFiles.filter(f => f.id !== id);
      onChange(updatedFiles.map(f => f.file));
      return updatedFiles;
    });
  }, [onChange]);

  return (
    <Box>
      <Dropzone
        onChange={updateFiles}
        value={files}
        maxFiles={maxFiles}
        accept={accept}
        minHeight="300px"
      >
        {files.map((file) => (
          <FileMosaic
            key={file.id}
            {...file}
            onDelete={removeFile}
            info
            preview
          />
        ))}
      </Dropzone>
      <Text mt={2} fontSize="sm" color="gray.600">
        Drag and drop files here or click to select files. 
        Maximum {maxFiles} files allowed.
      </Text>
    </Box>
  );
};

export default CustomFileUpload;