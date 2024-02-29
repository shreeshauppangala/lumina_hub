import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { Box, FormHelperText, IconButton, SxProps, Theme, Typography } from '@mui/material';
import Dropzone, { Accept, useDropzone } from 'react-dropzone';
import Docs from '@/app/Assets/Images/Docs.png';
import PDF from '@/app/Assets/Images/PDF.png';
import Excel from '@/app/Assets/Images/Excel.png';
import PPT from '@/app/Assets/Images/PPT.png';
import { truncateString } from '@/app/utils';
import { LargeGreyCloseIcon, LargeGreyUploadIcon, RedLargeDeleteIcon } from '@/app/Assets/Icons';
import { CustomAvatar, DropZoneWrapper } from './styles';
import { InputLabelComponent } from '../Input/styles';

interface PropsI {
  setFiles: Dispatch<SetStateAction<File[] | string[]>>;
  files: File[] | string[];
  sx?: SxProps<Theme>;
  accept: Accept;
  onlyImages?: boolean;
  required?: boolean;
  label?: string;
  multiple?: boolean;
}

const DropZone = ({
  setFiles,
  files,
  sx,
  accept,
  onlyImages,
  required,
  label,
  multiple = false,
}: PropsI) => {
  const { fileRejections, acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
  });

  const acceptedFileExtensions = Object.values(accept).reduce((acc, val) => acc.concat(val), []);

  const processImageFile = (file: File): Promise<File> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(Object.assign(file, { preview: event.target?.result }));
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });

  /**
   * useEffect hook that is triggered when the `acceptedFiles` array changes.
   * If the array is not empty, it checks the type of each file in the array.
   * If the type includes 'image', it reads the file as a data URL and sets the file
   * with a preview image. If the type includes 'pdf', 'sheet', 'text/plain',
   * 'msword', or 'wordprocessingml.document', it sets the file with a corresponding
   * preview icon. If the type includes 'presentation' or 'ms-powerpoint', it sets
   * the file with a preview icon for PowerPoint.
   * @param {Array<File>} acceptedFiles - The array of accepted files.
   * @returns None
   */

  useEffect(() => {
    acceptedFiles.forEach(async (file) => {
      if (file.type.includes('image')) {
        file = await processImageFile(file);
      } else if (file.type.includes('pdf')) {
        file = Object.assign(file, {
          preview: PDF.src,
        });
      } else if (file.type.includes('sheet')) {
        file = Object.assign(file, {
          preview: Excel.src,
        });
      } else if (
        file.type.includes('text/plain') ||
        file.type.includes('application/msword') ||
        file.type.includes(
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        )
      ) {
        file = Object.assign(file, {
          preview: Docs.src,
        });
      } else if (file.type.includes('presentation') || file.type.includes('ms-powerpoint')) {
        file = Object.assign(file, {
          preview: PPT.src,
        });
      }
      setFiles((prevValues) => (multiple ? ([...prevValues, file] as File[]) : ([file] as File[])));
    });
  }, [acceptedFiles, multiple, setFiles]);

  return (
    <Box>
      {label && (
        <InputLabelComponent
          sx={(theme) => ({
            color: theme.palette.common.black,
          })}
          className='labelBody'
        >
          {label} {required && <span className='required'>*</span>}
        </InputLabelComponent>
      )}
      <DropZoneWrapper>
        <Dropzone multiple={multiple}>
          {() => (
            <Box display='flex' gap={8} alignItems='center' justifyContent='center'>
              <Box className='dropzone' {...getRootProps()}>
                <Box display='grid' gap={5}>
                  <Box display='flex' justifyContent='center'>
                    <LargeGreyUploadIcon />
                  </Box>
                  <Typography textAlign='center'> Drag & drop file or Browse</Typography>
                  <FormHelperText className='file_name'>
                    note: only {acceptedFileExtensions.map((extension) => extension).join(', ')}{' '}
                    files are accepted
                  </FormHelperText>
                  <input {...getInputProps()} />
                  {isDragActive && <Typography>Drop the files here ...</Typography>}
                </Box>
              </Box>
            </Box>
          )}
        </Dropzone>
        {fileRejections.length ? (
          <ul>
            {fileRejections.map((fileRejection) =>
              fileRejection.errors.map((err) => (
                <li key={err.code}>
                  <Box display='flex' gap={2}>
                    <FormHelperText className='file_name'>
                      {' '}
                      {fileRejection.file.name} -{' '}
                    </FormHelperText>
                    <FormHelperText error className='file_name'>
                      {err.message}
                    </FormHelperText>
                  </Box>
                </li>
              )),
            )}
          </ul>
        ) : null}
        <Box className='preview_box' mt={files.length ? 15 : 0}>
          {files.map((file) => {
            const fileName = typeof file === 'object' ? file.name : file;
            const preview =
              typeof file === 'object' ? (file as File & { preview: string }).preview : file;
            return onlyImages ? (
              <Box className='image_box'>
                <Box>
                  <CustomAvatar
                    className='only_image_preview'
                    variant='square'
                    src={preview}
                    alt={fileName}
                    sx={sx}
                  />
                  <Typography className='file_name'>{truncateString(fileName, 60)}</Typography>
                </Box>
                <IconButton
                  onClick={() => {
                    setFiles(
                      (prevFiles) => prevFiles.filter((prevFile) => prevFile !== file) as File[],
                    );
                  }}
                >
                  <LargeGreyCloseIcon />
                </IconButton>
              </Box>
            ) : (
              <Box key={fileName} className='file'>
                <Box display='flex' alignItems='center' gap={6}>
                  <CustomAvatar variant='square' src={preview} alt={fileName} sx={sx} />
                  <Typography className='file_name'>{truncateString(fileName, 60)}</Typography>
                </Box>
                <IconButton
                  onClick={() => {
                    setFiles(
                      (prevFiles) => prevFiles.filter((prevFile) => prevFile !== file) as File[],
                    );
                  }}
                >
                  <RedLargeDeleteIcon />
                </IconButton>
              </Box>
            );
          })}
        </Box>
      </DropZoneWrapper>
    </Box>
  );
};

export default DropZone;
