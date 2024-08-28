import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const ImagePreview = styled('img')({
  width: '100%',
  height: 'auto',
  borderRadius: '4px',
  marginBottom: '8px',
});

export default function Upload({ onFileChange }) {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);

  const handleFileChange = (event) => {
    console.log('Event:', event);
    try {
      if (event && event.currentTarget && event.currentTarget.files) {
        const selectedFile = event.currentTarget.files[0];
        if (selectedFile) {
          setFile(selectedFile);
          setFileUrl(URL.createObjectURL(selectedFile));
          if (onFileChange) {
            onFileChange(selectedFile);
          }
        }
      } else {
        console.error('Event or event.currentTarget.files is null or undefined');
      }
    } catch (error) {
      console.error('Error handling file change:', error);
    }
  };
  
  
  
  const handleRemoveFile = () => {
    setFile(null);
    setFileUrl(null);
    if (onFileChange) {
      onFileChange(null); // вызов функции при удалении файла
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, width: '100%' }}>
      {file && (
        <Box sx={{ position: 'relative', width: '100%' }}>
          <ImagePreview src={fileUrl} alt="Preview" />
          <IconButton
            size="small"
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              bgcolor: 'background.paper',
              ":hover": { bgcolor: '#7a9cd6' },
            }}
            onClick={handleRemoveFile}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      )}
      {!file && (
        <Button
          component="label"
          role={undefined}
          variant="contained"
          startIcon={<CloudUploadIcon />}
          sx={{ ":hover": { bgcolor: '#7a9cd6' } }}
        >
          Загрузить фото
          <VisuallyHiddenInput type="file" accept="image/*" onChange={handleFileChange} />
        </Button>
      )}
    </Box>
  );
}
