import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import AttachmentList from './AttachmentList';
import { linkifyText } from '../../utils/linkify';

import { getAuthToken } from '../../utils/auth';
interface AttachmentFile {
  url: string;
  originalName: string;
  size: number;
  mimeType: string;
}

interface Comment {
  id: number;
  entity_type: string;
  entity_id: string;
  author_id: number;
  author_name: string;
  author_role: string;
  content: string;
  attachments: AttachmentFile[];
  is_internal: boolean;
  createdAt: string;
  author?: { id: number; full_name: string; role: string };
}

interface CommentSectionProps {
  entityType: 'support_ticket' | 'operation_ticket' | 'notice' | 'hardware_quote';
  entityId: string;
  currentUserId?: number | string;
  onMarkRead?: () => void;
}

const SectionContainer = styled.div`
  margin-top: 24px;
  border-top: 1px solid #E6EBF1;
  padding-top: 20px;
`;

const SectionTitle = styled.h4`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 16px 0;
`;

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
  max-height: 300px;
  overflow-y: auto;
`;

const CommentItem = styled.div<{ isInternal?: boolean }>`
  display: flex;
  gap: 12px;
  padding: 12px;
  background: ${props => props.isInternal ? '#FFFBEB' : '#F8F9FA'};
  border-radius: 8px;
  ${props => props.isInternal && `
    border: 1px dashed #F59E0B;
  `}
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #635BFF;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 600;
  flex-shrink: 0;
`;

const CommentBody = styled.div`
  flex: 1;
  min-width: 0;
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
  flex-wrap: wrap;
`;

const AuthorName = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
`;

const RoleBadge = styled.span`
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #EEF2FF;
  color: #4338CA;
`;

const InternalBadge = styled.span`
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #FEF3C7;
  color: #92400E;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 3px;
`;

const CommentDate = styled.span`
  font-size: 11px;
  color: #9CA3AF;
  margin-left: auto;
`;

const CommentText = styled.p`
  font-size: 13px;
  color: #374151;
  margin: 0;
  line-height: 1.5;
  white-space: pre-wrap;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 11px;
  cursor: pointer;
  padding: 0;
  margin-left: 8px;
  &:hover { color: #EF4444; }
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const InputRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
`;

const CommentInput = styled.textarea`
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 13px;
  resize: none;
  min-height: 40px;
  max-height: 100px;
  font-family: inherit;
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
  &::placeholder { color: #9CA3AF; }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 4px;
`;

const AttachButton = styled.button`
  padding: 10px 12px;
  background: #F3F4F6;
  color: #6B7280;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  line-height: 1;
  &:hover { background: #E5E7EB; color: #0A2540; }
`;

const SendButton = styled.button`
  padding: 10px 16px;
  background: #635BFF;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  &:hover { background: #5046E5; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

const EmptyText = styled.p`
  font-size: 13px;
  color: #9CA3AF;
  text-align: center;
  padding: 12px 0;
`;

const PendingFiles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

const PendingFile = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  background: #F0F0FF;
  border-radius: 4px;
  font-size: 11px;
  color: #635BFF;
`;

const PendingRemove = styled.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 12px;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  &:hover { color: #EF4444; }
`;

const UploadingText = styled.span`
  font-size: 11px;
  color: #635BFF;
  padding: 3px 8px;
`;

const ErrorText = styled.span`
  font-size: 11px;
  color: #EF4444;
  padding: 3px 8px;
`;

const HiddenInput = styled.input`
  display: none;
`;

const InputOptions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const InternalToggle = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #6B7280;
  cursor: pointer;
  user-select: none;

  input {
    width: 14px;
    height: 14px;
    accent-color: #D97706;
    cursor: pointer;
  }
`;

const ALLOWED_EXTENSIONS = '.jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.zip';

const CommentSection: React.FC<CommentSectionProps> = ({ entityType, entityId, currentUserId, onMarkRead }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isInternal, setIsInternal] = useState(false);
  const [pendingFiles, setPendingFiles] = useState<AttachmentFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchComments = async () => {
    try {
      const token = getAuthToken();
      const response = await fetch(`/api/comments/${entityType}/${entityId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const result = await response.json();
        if (result.success) setComments(result.data);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const markAsRead = async () => {
    try {
      const token = getAuthToken();
      await fetch('/api/comments/mark-read', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ entity_type: entityType, entity_id: entityId })
      });
      if (onMarkRead) onMarkRead();
      window.dispatchEvent(new Event('refreshBadgeCounts'));
    } catch (error) {
      console.error('Error marking comments as read:', error);
    }
  };

  useEffect(() => {
    if (entityId) {
      fetchComments();
      markAsRead();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entityType, entityId]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    const remaining = 5 - pendingFiles.length;
    // Copy to array BEFORE resetting input (live FileList becomes empty on reset)
    const toUpload = Array.from(fileList).slice(0, remaining);
    e.target.value = '';
    if (toUpload.length === 0) return;

    setUploading(true);
    setUploadError('');
    try {
      const formData = new FormData();
      toUpload.forEach(file => formData.append('files', file));

      const token = getAuthToken();
      const response = await fetch('/api/upload/files', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });

      const result = await response.json();
      if (result.success && result.data) {
        setPendingFiles(prev => [...prev, ...result.data]);
      } else {
        setUploadError(result.message || 'Upload failed');
      }
    } catch (error) {
      console.error('File upload error:', error);
      setUploadError('File upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const removePendingFile = (index: number) => {
    const file = pendingFiles[index];
    const token = getAuthToken();
    fetch('/api/upload/file', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ url: file.url })
    }).catch(() => {});
    setPendingFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (uploading) return; // Wait for file upload to finish
    const hasContent = newComment.trim();
    const hasFiles = pendingFiles.length > 0;
    if ((!hasContent && !hasFiles) || submitting) return;

    setSubmitting(true);
    try {
      const token = getAuthToken();
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          entity_type: entityType,
          entity_id: entityId,
          content: newComment.trim(),
          attachments: hasFiles ? pendingFiles : undefined,
          is_internal: isInternal || undefined
        })
      });
      if (response.ok) {
        setNewComment('');
        setPendingFiles([]);
        setIsInternal(false);
        fetchComments();
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (commentId: number) => {
    try {
      const token = getAuthToken();
      const response = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) fetchComments();
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <SectionContainer>
      <SectionTitle>Comments ({comments.length})</SectionTitle>
      {comments.length > 0 ? (
        <CommentList>
          {comments.map(comment => (
            <CommentItem key={comment.id} isInternal={comment.is_internal}>
              <Avatar>{(comment.author?.full_name || comment.author_name || '?')[0].toUpperCase()}</Avatar>
              <CommentBody>
                <CommentHeader>
                  <AuthorName>{comment.author?.full_name || comment.author_name}</AuthorName>
                  <RoleBadge>{comment.author?.role || comment.author_role}</RoleBadge>
                  {comment.is_internal && (
                    <InternalBadge>Internal</InternalBadge>
                  )}
                  <CommentDate>{formatDate(comment.createdAt)}</CommentDate>
                  {currentUserId && comment.author_id === Number(currentUserId) && (
                    <DeleteButton onClick={() => handleDelete(comment.id)}>Delete</DeleteButton>
                  )}
                </CommentHeader>
                {comment.content && <CommentText>{comment.content.split('\n').map((line, i) => (
                  <React.Fragment key={i}>{i > 0 && <br />}{linkifyText(line)}</React.Fragment>
                ))}</CommentText>}
                {comment.attachments && comment.attachments.length > 0 && (
                  <AttachmentList attachments={comment.attachments} />
                )}
              </CommentBody>
            </CommentItem>
          ))}
        </CommentList>
      ) : (
        <EmptyText>No comments yet</EmptyText>
      )}
      <InputArea>
        <InputRow>
          <CommentInput
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isInternal ? "Write an internal note... (visible only to your role group)" : "Add a comment... (Enter to send, Shift+Enter for newline)"}
            rows={1}
          />
          <ButtonGroup>
            <AttachButton onClick={() => fileInputRef.current?.click()} title="Attach file">
              &#128206;
            </AttachButton>
            <SendButton
              onClick={handleSubmit}
              disabled={(!newComment.trim() && pendingFiles.length === 0) || submitting || uploading}
            >
              Send
            </SendButton>
          </ButtonGroup>
        </InputRow>
        <InputOptions>
          <InternalToggle>
            <input
              type="checkbox"
              checked={isInternal}
              onChange={(e) => setIsInternal(e.target.checked)}
            />
            Internal note (visible only to your role group)
          </InternalToggle>
        </InputOptions>
        {(pendingFiles.length > 0 || uploading || uploadError) && (
          <PendingFiles>
            {uploading && <UploadingText>Uploading...</UploadingText>}
            {uploadError && <ErrorText>{uploadError}</ErrorText>}
            {pendingFiles.map((file, idx) => (
              <PendingFile key={file.url}>
                {file.originalName.length > 20 ? file.originalName.slice(0, 17) + '...' : file.originalName}
                <PendingRemove onClick={() => removePendingFile(idx)}>&#x2715;</PendingRemove>
              </PendingFile>
            ))}
          </PendingFiles>
        )}
      </InputArea>
      <HiddenInput
        ref={fileInputRef}
        type="file"
        accept={ALLOWED_EXTENSIONS}
        multiple
        onChange={handleFileSelect}
      />
    </SectionContainer>
  );
};

export default CommentSection;
