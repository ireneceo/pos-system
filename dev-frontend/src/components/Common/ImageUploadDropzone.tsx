import React, { useState, useRef, DragEvent, ChangeEvent } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { getAuthToken } from '../../utils/auth';
interface ImageUploadDropzoneProps {
  value: string;
  onChange: (imageUrl: string) => void;
  label?: string;
  helpText?: string;
  maxSize?: number; // in MB
  previewSize?: number; // in pixels
  showRemoveButton?: boolean;
  changeButtonText?: string;
  removeButtonText?: string;
  imageAltText?: string;
}

const Container = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`;

const HelpText = styled.p`
  font-size: 12px;
  color: #8898AA;
  margin-top: 4px;
  margin-bottom: 16px;
`;

const DropzoneWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const DropzoneArea = styled.div<{ isDragging: boolean; hasImage: boolean; isUploading: boolean }>`
  width: ${props => props.hasImage ? '150px' : '100%'};
  height: 150px;
  border: 2px dashed ${props => props.isDragging ? '#635BFF' : '#CBD5E1'};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${props => props.isDragging ? 'rgba(99, 91, 255, 0.05)' : '#F8FAFC'};
  cursor: ${props => props.isUploading ? 'wait' : 'pointer'};
  transition: all 0.2s;
  overflow: hidden;
  position: relative;
  opacity: ${props => props.isUploading ? 0.7 : 1};

  &:hover {
    border-color: ${props => props.hasImage ? '#CBD5E1' : '#635BFF'};
    background: ${props => props.hasImage ? '#F8FAFC' : 'rgba(99, 91, 255, 0.03)'};
  }

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

const DropzoneContent = styled.div`
  text-align: center;
  padding: 20px;
  pointer-events: none;
`;


const DropzoneText = styled.p`
  color: #6B7280;
  font-size: 14px;
  margin-bottom: 8px;
  font-weight: 500;
`;

const DropzoneSubtext = styled.p`
  color: #9CA3AF;
  font-size: 12px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const UploadButton = styled.label<{ disabled?: boolean }>`
  padding: 8px 16px;
  border: 1px solid #635BFF;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #635BFF;
  cursor: ${props => props.disabled ? 'wait' : 'pointer'};
  transition: all 0.2s;
  display: inline-block;
  text-align: center;
  opacity: ${props => props.disabled ? 0.5 : 1};

  &:hover {
    background: ${props => props.disabled ? 'transparent' : '#635BFF'};
    color: ${props => props.disabled ? '#635BFF' : 'white'};
  }

  input {
    display: none;
  }
`;

const RemoveButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #DC2626;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #DC2626;
  background: white;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #DC2626;
    color: white;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const LoadingSpinner = styled.div`
  width: 24px;
  height: 24px;
  border: 3px solid #E5E7EB;
  border-top-color: #635BFF;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

/**
 * 이미지 URL인지 확인 (base64가 아닌 URL 형식)
 */
/**
 * API base URL 가져오기
 */
const getApiBaseUrl = (): string => {
  // 환경에 따라 API URL 결정
  if (window.location.hostname === 'localhost') {
    return 'http://localhost:3000';
  }
  if (window.location.hostname === 'dev.purplehere.com') {
    return 'https://dev.purplehere.com';
  }
  return 'https://purplehere.com';
};

const ImageUploadDropzone: React.FC<ImageUploadDropzoneProps> = ({
  value,
  onChange,
  label = 'Logo Upload',
  helpText = 'Upload an image for your logo',
  maxSize = 2,
  previewSize = 150,
  showRemoveButton = true,
  changeButtonText = 'Change Image',
  removeButtonText = 'Remove Image',
  imageAltText = 'Uploaded'
}) => {
  const { t } = useTranslation('common');
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropzoneRef = useRef<HTMLDivElement>(null);

  /**
   * 이미지를 서버에 업로드하고 URL 반환
   */
  const uploadImageToServer = async (base64Image: string): Promise<string | null> => {
    try {
      const token = getAuthToken();
      const response = await fetch(`${getApiBaseUrl()}/api/upload/image`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ image: base64Image })
      });

      const data = await response.json();
      if (data.success) {
        return data.data.original; // 원본 이미지 URL 반환
      } else {
        console.error('Image upload failed:', data.message);
        return null;
      }
    } catch (error) {
      console.error('Image upload error:', error);
      return null;
    }
  };

  const validateAndProcessFile = async (file: File) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      alert(`Image size should be less than ${maxSize}MB`);
      return;
    }

    setIsUploading(true);

    // SVG: upload as-is without canvas processing
    if (file.type === 'image/svg+xml') {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64 = event.target?.result as string;
        const imageUrl = await uploadImageToServer(base64);
        setIsUploading(false);
        if (imageUrl) {
          onChange(imageUrl);
        } else {
          alert('Failed to upload image. Please try again.');
        }
      };
      reader.readAsDataURL(file);
      return;
    }

    // Raster images: compress and resize
    const reader = new FileReader();
    reader.onload = async (event) => {
      const img = new Image();
      img.onload = async () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          setIsUploading(false);
          return;
        }

        // Calculate new dimensions (max 1200x1200 for uploads)
        const maxDimension = 1200;
        let width = img.width;
        let height = img.height;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = (height / width) * maxDimension;
            width = maxDimension;
          } else {
            width = (width / height) * maxDimension;
            height = maxDimension;
          }
        }

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(img, 0, 0, width, height);

        // Preserve PNG format for transparency support, compress JPEG otherwise
        const isPng = file.type === 'image/png';
        const compressedBase64 = isPng
          ? canvas.toDataURL('image/png')
          : canvas.toDataURL('image/jpeg', 0.85);

        const imageUrl = await uploadImageToServer(compressedBase64);

        setIsUploading(false);

        if (imageUrl) {
          onChange(imageUrl);
        } else {
          alert('Failed to upload image. Please try again.');
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isUploading) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // Only set dragging to false if we're leaving the dropzone itself
    if (e.currentTarget === dropzoneRef.current) {
      setIsDragging(false);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (isUploading) return;

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      validateAndProcessFile(files[0]);
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (isUploading) return;

    const files = e.target.files;
    if (files && files.length > 0) {
      validateAndProcessFile(files[0]);
    }
    // Reset input value to allow re-selecting the same file
    e.target.value = '';
  };

  const handleDropzoneClick = () => {
    if (!value && !isUploading) {
      fileInputRef.current?.click();
    }
  };

  const handleRemove = () => {
    onChange('');
  };

  // 이미지 소스 결정 (URL이면 API base URL 추가)
  const getImageSrc = (imageValue: string): string => {
    if (!imageValue) return '';
    if (imageValue.startsWith('http')) return imageValue;
    if (imageValue.startsWith('/uploads/')) {
      return `${getApiBaseUrl()}${imageValue}`;
    }
    // base64 또는 기타 형식은 그대로 반환
    return imageValue;
  };

  return (
    <Container>
      {label && <Label>{label}</Label>}
      {helpText && <HelpText>{helpText}</HelpText>}

      <DropzoneWrapper>
        <DropzoneArea
          ref={dropzoneRef}
          isDragging={isDragging}
          hasImage={!!value}
          isUploading={isUploading}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleDropzoneClick}
        >
          {isUploading ? (
            <DropzoneContent>
              <LoadingSpinner />
              <DropzoneText style={{ marginTop: '12px' }}>Uploading...</DropzoneText>
            </DropzoneContent>
          ) : value ? (
            <img src={getImageSrc(value)} alt={imageAltText} />
          ) : (
            <DropzoneContent>
              <DropzoneText>
                {isDragging ? 'Drop image here' : 'Drag & drop or click to upload'}
              </DropzoneText>
              <DropzoneSubtext>
                PNG, JPG, GIF up to {maxSize}MB
              </DropzoneSubtext>
            </DropzoneContent>
          )}
        </DropzoneArea>

        {value && !isUploading && (
          <ButtonGroup>
            <UploadButton disabled={isUploading}>
              {changeButtonText}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                disabled={isUploading}
              />
            </UploadButton>
            {showRemoveButton && (
              <RemoveButton onClick={handleRemove} disabled={isUploading}>
                {removeButtonText}
              </RemoveButton>
            )}
          </ButtonGroup>
        )}
      </DropzoneWrapper>

      {!value && !isUploading && (
        <HiddenInput
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
        />
      )}
    </Container>
  );
};

export default ImageUploadDropzone;
