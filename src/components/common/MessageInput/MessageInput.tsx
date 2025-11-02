import { cn } from '@/lib/utils';
import React, { useRef, useState } from 'react';
import { Button } from '../button';
import { Textarea } from '../Textarea';

export interface MessageInputProps {
  onSend: (
    content: string,
    type: 'text' | 'image' | 'video' | 'audio' | 'file',
    file?: File
  ) => void;
  onTyping?: (isTyping: boolean) => void;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
  className?: string;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  onSend,
  onTyping,
  placeholder = 'Nhập tin nhắn...',
  disabled = false,
  maxLength = 1000,
  className,
}) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setMessage(value);

    // Typing indicator
    if (onTyping) {
      onTyping(true);
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      typingTimeoutRef.current = setTimeout(() => {
        onTyping(false);
      }, 1000);
    }
  };

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message.trim(), 'text');
      setMessage('');
      if (onTyping) {
        onTyping(false);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileType = file.type.startsWith('image/')
        ? 'image'
        : file.type.startsWith('video/')
        ? 'video'
        : 'file';
      onSend('', fileType, file);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        const file = new File([blob], 'voice-message.wav', {
          type: 'audio/wav',
        });
        onSend('', 'audio', file);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className={cn('border-t border-gray-200 p-3 bg-white ', className)}>
      <div className="flex flex-col w-full max-w-4xl mx-auto">
        {/* Main input area */}
        <div className="flex items-center gap-2">
          {/* File upload */}
          <div className="flex-shrink-0">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*,.pdf,.doc,.docx"
              onChange={handleFileSelect}
              className="hidden"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => fileInputRef.current?.click()}
              disabled={disabled}
              className="h-9 w-9 rounded-full hover:bg-gray-100"
            >
              📎
            </Button>
          </div>

          {/* Message input */}
          <div className="flex-1 relative">
            <Textarea
              value={message}
              onChange={handleMessageChange}
              onKeyDown={handleKeyPress}
              placeholder={placeholder}
              disabled={disabled}
              maxLength={maxLength}
              rows={1}
              className="resize-none min-h-[40px] max-h-[120px] pr-[100px] py-2 px-4 rounded-full border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />

            {/* Character count - Positioned absolutely */}
            {message.length > maxLength * 0.8 && (
              <div className="absolute right-3 bottom-2 text-xs text-gray-400">
                {message.length}/{maxLength}
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <Button
              variant="ghost"
              size="icon"
              onMouseDown={startRecording}
              onMouseUp={stopRecording}
              onMouseLeave={stopRecording}
              disabled={disabled}
              className={cn(
                'h-9 w-9 rounded-full',
                isRecording
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'hover:bg-gray-100'
              )}
            >
              🎤
            </Button>

            <Button
              onClick={handleSend}
              disabled={disabled || !message.trim()}
              className="h-9 px-4 rounded-full bg-blue-500 hover:bg-blue-600 text-white disabled:bg-gray-200"
            >
              Gửi
            </Button>
          </div>
        </div>

        {/* Recording indicator */}
        {isRecording && (
          <div className="flex items-center justify-center mt-2 text-red-500 text-sm font-medium">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2"></div>
            Đang ghi âm... (thả chuột để dừng)
          </div>
        )}
      </div>
    </div>
  );
};
