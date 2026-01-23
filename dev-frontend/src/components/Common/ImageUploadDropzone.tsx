import React, { useState, useRef, DragEvent, ChangeEvent } from 'react';
import styled from 'styled-components';

interface ImageUploadDropzoneProps {
  value: string;
  onChange: (base64: string) => void;
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

const DropzoneArea = styled.div<{ isDragging: boolean; hasImage: boolean }>`
  width: ${props => props.hasImage ? '150px' : '100%'};
  height: 150px;
  border: 2px dashed ${props => props.isDragging ? '#635BFF' : '#CBD5E1'};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${props => props.isDragging ? 'rgba(99, 91, 255, 0.05)' : '#F8FAFC'};
  cursor: pointer;
  transition: all 0.2s;
  overflow: hidden;
  position: relative;

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

const UploadButton = styled.label`
  padding: 8px 16px;
  border: 1px solid #635BFF;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #635BFF;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-block;
  text-align: center;

  &:hover {
    background: #635BFF;
    color: white;
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
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropzoneRef = useRef<HTMLDivElement>(null);

  const validateAndProcessFile = (file: File) => {
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

    // Compress and resize image before converting to base64
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Create canvas for resizing
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Calculate new dimensions (max 800x800 for menu items)
        const maxDimension = 800;
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

        // Draw and compress image
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to base64 with compression (85% quality for JPEG)
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.85);
        onChange(compressedBase64);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
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

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      validateAndProcessFile(files[0]);
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      validateAndProcessFile(files[0]);
    }
  };

  const handleDropzoneClick = () => {
    if (!value) {
      fileInputRef.current?.click();
    }
  };

  const handleRemove = () => {
    onChange('');
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
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleDropzoneClick}
        >
          {value ? (
            <img src={value} alt={imageAltText} />
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

        {value && (
          <ButtonGroup>
            <UploadButton>
              {changeButtonText}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
              />
            </UploadButton>
            {showRemoveButton && (
              <RemoveButton onClick={handleRemove}>
                {removeButtonText}
              </RemoveButton>
            )}
          </ButtonGroup>
        )}
      </DropzoneWrapper>

      {!value && (
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
