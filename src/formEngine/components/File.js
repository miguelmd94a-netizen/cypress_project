import { DropzoneArea } from 'material-ui-dropzone';
import React, { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce/lib';

import { Box, CircularProgress, makeStyles, Typography } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import DeleteIcon from '@material-ui/icons/Delete';
import YouTubeIcon from '@material-ui/icons/YouTube';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import DescriptionIcon from '@material-ui/icons/Description';
import { uploadFormImg } from '../../services/unarmed';
import PreviewLabel from './PreviewLabel';
import { LabelError } from './MultipleChoice';

const useStyles = makeStyles(() => ({
  dropzoneBox: {
    background: '#4762FA08',
    borderRadius: 4,
    border: '1px dashed #364F7431',
    padding: 34,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: 16,
  },

  dropzoneText: {
    display: 'block',
    fontSize: 12,
    marginTop: 10,
  },
  deleteIcon: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto',
    cursor: 'pointer',
  },
  centerIcon: {
    position: 'absolute',
    fontSize: 60,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto',
    cursor: 'pointer',
  },
}));

const getFileTypes = (types) =>
  types?.map((type) => {
    switch (type) {
      case 'JPG':
        return ['image/jpg', 'image/jpeg'];
      case 'PNG':
        return 'image/png';
      case 'BMP':
        return 'image/bmp';
      case 'MP4':
        return 'video/mp4';
      case 'MOV':
        return 'video/quicktime';
      case 'PDF':
        return 'application/pdf';
      case 'XLSX':
        return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      case 'XLS':
        return 'application/vnd.ms-excel';
      case 'DOC':
        return ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

      default:
        return `.${type.toLowerCase()}`;
    }
  });

export const wiredValue = (questionBankIndex, getFormValue, setter) => {
  if (typeof questionBankIndex === 'number') {
    if (getFormValue()?.[questionBankIndex]) {
      setter(getFormValue()[questionBankIndex]);
    }
  } else if (getFormValue()) {
    setter(getFormValue());
  }
};

export const setterState = (questionBankIndex, setter, value) => {
  if (typeof questionBankIndex === 'number') {
    const values = [];
    values[questionBankIndex] = value;
    setter(values);

    return;
  }
  setter(value);
};

function CircularProgressWithLabel(props) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption" component="div" color="textSecondary">{`${props.value}%`}</Typography>
      </Box>
    </Box>
  );
}

function renderPreviewIcon(type, src) {
  const centerIcon = {
    position: 'absolute',
    fontSize: 60,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto',
    cursor: 'pointer',
  };
  if (type.includes('image')) {
    return (
      <img
        src={src}
        alt="404"
        style={{
          width: 100,
          height: 100,
          objectFit: 'contain',
          marginRight: 10,
        }}
      />
    );
  }
  if (type.includes('video')) {
    return <YouTubeIcon style={centerIcon} />;
  }

  if (type === 'application/pdf') {
    return <PictureAsPdfIcon style={centerIcon} />;
  }

  if (
    type === 'application/msword' ||
    type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    return <DescriptionIcon style={centerIcon} />;
  }
}

export default function File({ data, onSaveFormValues, getFormValue, organizationId, imagesPreview, componentIndex }) {
  const classes = useStyles();
  const [key, setKey] = useState(0);
  const [debounceKey] = useDebounce(key, 1000);
  const [images, setImages] = useState([]);
  const [hashFiles, setHashFiles] = useState([]);
  const [loadingPecetage, setLoadingPercentage] = useState(0);

  useEffect(() => {
    wiredValue(data.questionBankIndex, getFormValue, setHashFiles);
  }, [data]);

  const onSetImagesPreview = (images) => {
    imagesPreview.setImagesPreview((_imagesPreview) => ({
      ..._imagesPreview,
      [imagesPreview?.pageIndex]: {
        ...(imagesPreview?.imagesPreview?.[imagesPreview?.pageIndex] || {}),
        [imagesPreview?.sectionIndex]: {
          ...(imagesPreview?.imagesPreview?.[imagesPreview?.pageIndex]?.[imagesPreview?.sectionIndex] || {}),
          [componentIndex]: [
            ...(imagesPreview?.imagesPreview?.[imagesPreview?.pageIndex]?.[imagesPreview?.sectionIndex]?.[
              componentIndex
            ] || []),
            ...images,
          ],
        },
      },
    }));
  };

  useEffect(() => {
    const _images =
      imagesPreview?.imagesPreview?.[imagesPreview?.pageIndex]?.[imagesPreview?.sectionIndex]?.[componentIndex] || [];

    setImages(_images);
  }, [imagesPreview]);

  const onDeleteImg = (index) => {
    const imgs = [...images];
    const ids = [...hashFiles];
    let imagesCopy = Array.from(
      imagesPreview?.imagesPreview?.[imagesPreview?.pageIndex]?.[imagesPreview?.sectionIndex]?.[componentIndex] || []
    );

    imgs.splice(index, 1);
    ids.splice(index, 1);
    imagesCopy = imgs;
    setImages([...imgs]);
    setHashFiles([...ids]);
    onSetImagesPreview(imagesCopy);
    setterState(data.questionBankIndex, onSaveFormValues, [...hashFiles]);
  };

  const uploadOnLoad = async (fl) => {
    const imagesArr = [];
    const hashArr = [];

    for (const file of fl) {
      if (file.size > 100000000) {
        toast.warning(
          'Large file upload in-progress, please do not refresh the page until the upload process is completed.'
        );
      }
      const imgData = new FormData();
      imgData.append('file', file);
      imgData.append('organizationId', organizationId);

      try {
        const img = await uploadFormImg(imgData, setLoadingPercentage);
        imagesArr.push({ src: img.public_url, mimeType: img.mimetype });
        hashArr.push(img.hashId);

        toast.success('File Uploaded Successfully');
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
      }
    }
    setImages([...images, ...imagesArr]);
    let imagesCopy = Array.from(
      imagesPreview?.imagesPreview?.[imagesPreview?.pageIndex]?.[imagesPreview?.sectionIndex]?.[componentIndex] || []
    );
    imagesCopy = [...images, ...imagesArr];
    onSetImagesPreview(imagesCopy);
    setHashFiles([...hashFiles, ...hashArr]);
    setterState(data.questionBankIndex, onSaveFormValues, [...hashFiles, ...hashArr]);
    setKey(key + 1);
  };

  return (
    <Box marginBottom="20px">
      <PreviewLabel required={data?.required} description={data?.description} question={data?.question} />
      <Box position="relative">
        <Box position="absolute" width="100%" style={{ opacity: 0 }}>
          {data && (
            <DropzoneArea
              key={debounceKey}
              acceptedFiles={
                data?.fileTypes
                  ? getFileTypes(data?.fileTypes)
                  : ['image/*', 'video/*', '.pdf', '.doc', '.docx', '.xls', '.xlsx']
              }
              maxFileSize={data?.maxFileSize * 1000000 || 500000000}
              onDropRejected={(files) => {
                if (files[0].size > data?.maxFileSize * 1000000) {
                  toast.error(
                    'The file is too large, please upload to a file repository and share the link on incident External links section.'
                  );
                }
                if (data?.fileTypes && !getFileTypes(data?.fileTypes).flat().includes(files[0].type)) {
                  toast.error('File type is not supported');
                }
              }}
              onChange={(fl) => {
                if (fl.length > 0) {
                  uploadOnLoad(fl);
                }
              }}
              clearOnUnmount
              filesLimit={3}
              showPreviewsInDropzone={false}
            />
          )}
        </Box>
        <Box width="100%" height={150} className={classes.dropzoneBox}>
          <CloudUploadIcon htmlColor="#92AEFE" style={{ fontSize: 44 }} />
          <Typography className={classes.dropzoneText}>
            Drag files here or <span style={{ color: '#2E66FE', fontWeight: '500' }}>browser</span>
          </Typography>
        </Box>
        <Box display="flex" marginTop="20px" alignItems="center">
          {images?.map((image, i) => (
            <PreviewImg key={i}>
              {renderPreviewIcon(image.mimeType, image.src)}
              <BackDrop>
                <DeleteIcon
                  fontSize="large"
                  htmlColor="#fff"
                  className={classes.deleteIcon}
                  onClick={() => onDeleteImg(i)}
                />
              </BackDrop>
            </PreviewImg>
          ))}
          {loadingPecetage > 0 && loadingPecetage < 100 && <CircularProgressWithLabel value={loadingPecetage} />}
        </Box>
      </Box>
      {data?.showRequired && <LabelError>{data?.requiredMessage}</LabelError>}
    </Box>
  );
}

const PreviewImg = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
  border-radius: 7px;
  overflow: hidden;
  margin-right: 10px;
  & div:hover {
    opacity: 1;
  }
`;

const BackDrop = styled.div`
  background: rgba(0, 0, 0, 0.4);
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  display: flex;
  align-content: center;
  justify-content: center;
  transition: all 0.3s ease;
`;
