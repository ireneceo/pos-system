import React from 'react';
import styled from 'styled-components';

interface AttachmentFile {
  url: string;
  originalName: string;
  size: number;
  mimeType: string;
}

interface AttachmentListProps {
  attachments: AttachmentFile[];
}

const Container = styled.div`
  margin-top: 12px;
`;

const Label = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`;

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Item = styled.a`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  background: #F8F9FA;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  text-decoration: none;
  color: #0A2540;
  font-size: 12px;
  transition: all 0.15s;
  max-width: 240px;

  &:hover {
    border-color: #635BFF;
    background: #F4F3FF;
  }
`;

const FileIcon = styled.span`
  font-size: 14px;
  flex-shrink: 0;
`;

const FileName = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
`;

const FileSize = styled.span`
  color: #9CA3AF;
  flex-shrink: 0;
  font-size: 11px;
`;

const ImagePreview = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
`;

const ImageThumb = styled.a`
  display: block;
  width: 80px;
  height: 80px;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #E6EBF1;
  transition: all 0.15s;

  &:hover {
    border-color: #635BFF;
    box-shadow: 0 2px 8px rgba(99, 91, 255, 0.15);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

function getFileIcon(mimeType: string): string {
  if (mimeType === 'application/pdf') return '\u{1F4C4}';
  if (mimeType.includes('word') || mimeType.includes('document')) return '\u{1F4DD}';
  if (mimeType.includes('sheet') || mimeType.includes('excel')) return '\u{1F4CA}';
  if (mimeType.includes('zip') || mimeType.includes('compressed')) return '\u{1F4E6}';
  return '\u{1F4CE}';
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

const AttachmentList: React.FC<AttachmentListProps> = ({ attachments }) => {
  if (!attachments || attachments.length === 0) return null;

  const images = attachments.filter(a => a.mimeType?.startsWith('image/'));
  const documents = attachments.filter(a => !a.mimeType?.startsWith('image/'));

  return (
    <Container>
      <Label>Attachments ({attachments.length})</Label>

      {images.length > 0 && (
        <ImagePreview>
          {images.map((img, idx) => (
            <ImageThumb key={idx} href={img.url} target="_blank" rel="noopener noreferrer" title={img.originalName}>
              <img src={img.url} alt={img.originalName} />
            </ImageThumb>
          ))}
        </ImagePreview>
      )}

      {documents.length > 0 && (
        <List>
          {documents.map((doc, idx) => (
            <Item key={idx} href={doc.url} target="_blank" rel="noopener noreferrer" download={doc.originalName}>
              <FileIcon>{getFileIcon(doc.mimeType)}</FileIcon>
              <FileName>{doc.originalName}</FileName>
              <FileSize>{formatFileSize(doc.size)}</FileSize>
            </Item>
          ))}
        </List>
      )}
    </Container>
  );
};

export default AttachmentList;
