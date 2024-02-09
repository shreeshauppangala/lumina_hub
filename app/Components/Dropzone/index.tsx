import React, { useEffect } from 'react';
import { Box, FormHelperText, SxProps, Theme, Typography } from '@mui/material';
import Dropzone, { Accept, useDropzone } from 'react-dropzone';
import Docs from '@/app/Assets/Images/Docs.png';
import PDF from '@/app/Assets/Images/PDF.png';
import Excel from '@/app/Assets/Images/Excel.png';
import PPT from '@/app/Assets/Images/PPT.png';
import { CustomAvatar, DropZoneWrapper } from './styles';

interface PropsI {
  setFiles: (file: File[] | string[]) => void;
  files: File[] | string[];
  sx?: SxProps<Theme>;
  accept?: Accept;
}

const DropZone = ({ setFiles, files, sx, accept }: PropsI) => {
  const { fileRejections, acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
  });
  /**
   * useEffect hook that is triggered when the `acceptedFiles` array changes.
   * If the array is not empty, it checks the type of the first file in the array.
   * If the type includes 'image', it reads the file as a data URL and sets the file
   * with a preview image. If the type includes 'pdf', 'sheet', 'text/plain',
   * 'msword', or 'wordprocessingml.document', it sets the file with a corresponding
   * preview icon. If the type includes 'presentation' or 'ms-powerpoint', it sets
   * the file with a preview icon for PowerPoint.
   * @param {Array<File>} acceptedFiles - The array of accepted files.
   * @returns None
   */
  type FileWithPreview = File & { preview?: string | ArrayBuffer | null | undefined };
  useEffect(() => {
    acceptedFiles.forEach((file: FileWithPreview) => {
      if (file?.type.includes('image')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const image = event?.target?.result;
          file = Object.assign(file, {
            preview: image,
          });
        };
        reader.readAsDataURL(file);
      } else if (file?.type.includes('pdf')) {
        file = Object.assign(file, {
          preview: PDF,
        });
      } else if (file?.type.includes('sheet')) {
        file = Object.assign(file, {
          preview: Excel,
        });
      } else if (
        file?.type.includes('text/plain') ||
        file?.type.includes('application/msword') ||
        file?.type.includes(
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        )
      ) {
        file = Object.assign(file, {
          preview: Docs,
        });
      } else if (file?.type.includes('presentation') || file?.type.includes('ms-powerpoint')) {
        file = Object.assign(file, {
          preview: PPT,
        });
      }
    });
    setFiles([...files, ...acceptedFiles] as File[]);
  }, [acceptedFiles]);

  return (
    <DropZoneWrapper>
      <Dropzone multiple>
        {() => (
          <Box display='flex' gap={8} alignItems='center' justifyContent='center'>
            <Box className='dropzone' {...getRootProps()}>
              Drag & drop file or Browse
              <input {...getInputProps()} />
              {isDragActive && <Typography>Drop the files here ...</Typography>}
            </Box>
            {fileRejections.length
              ? fileRejections.map((fle) =>
                  fle.errors.map((err) => (
                    <FormHelperText error key={err.code} className='file_name'>
                      {err.message}
                    </FormHelperText>
                  )),
                )
              : ''}
          </Box>
        )}
      </Dropzone>
      <Box className='preview_box'>
        {files?.map((file) => {
          const fileName = typeof file === 'object' ? (file as any).name : file;
          const preview = typeof file === 'object' ? (file as any).preview : file;
          return (
            <Box key={fileName} className='file'>
              <CustomAvatar variant='square' src={preview} alt='id' className='preview' sx={sx} />
              <Typography className='file_name'>{fileName}</Typography>
            </Box>
          );
        })}
      </Box>
    </DropZoneWrapper>
  );
};

export default DropZone;
