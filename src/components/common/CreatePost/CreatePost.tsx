import React, { useState, useRef } from 'react';
import { Image, Video, Smile, MapPin, X } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Avatar } from '../Avatar';
import { Button } from '../button';
import { Textarea } from '../Textarea';

export interface CreatePostProps {
    user: {
        name: string;
        username: string;
        avatar?: string;
    };
    placeholder?: string;
    maxLength?: number;
    onSubmit: (data: {
        content: string;
        images: File[];
        video?: File;
        location?: string;
    }) => void;
    className?: string;
    disabled?: boolean;
    loading?: boolean;
}

export const CreatePost: React.FC<CreatePostProps> = ({
    user,
    placeholder = "Bạn đang nghĩ gì?",
    maxLength = 280,
    onSubmit,
    className,
    disabled = false,
    loading = false,
}) => {
    const [content, setContent] = useState('');
    const [images, setImages] = useState<File[]>([]);
    const [video, setVideo] = useState<File | null>(null);
    const [location, setLocation] = useState('');
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [videoPreviews, setVideoPreview] = useState<string | null>(null);

    const imageInputRef = useRef<HTMLInputElement>(null);
    const videoInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length + images.length > 4) {
            alert('Tối đa 4 hình ảnh');
            return;
        }

        setImages(prev => [...prev, ...files]);

        // Create previews
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreviews(prev => [...prev, e.target?.result as string]);
            };
            reader.readAsDataURL(file);
        });

        // Clear video if images are added
        if (video) {
            setVideo(null);
            setVideoPreview(null);
        }
    };

    const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setVideo(file);

        const reader = new FileReader();
        reader.onload = (e) => {
            setVideoPreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);

        // Clear images if video is added
        if (images.length > 0) {
            setImages([]);
            setImagePreviews([]);
        }
    };

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
    };

    const removeVideo = () => {
        setVideo(null);
        setVideoPreview(null);
    };

    const handleSubmit = () => {
        if (!content.trim() && images.length === 0 && !video) return;

        onSubmit({
            content: content.trim(),
            images,
            video: video || undefined,
            location: location.trim() || undefined,
        });

        // Reset form
        setContent('');
        setImages([]);
        setVideo(null);
        setLocation('');
        setImagePreviews([]);
        setVideoPreview(null);
    };

    const isSubmitDisabled = disabled || loading || (!content.trim() && images.length === 0 && !video);

    return (
        <div className={cn(
            "bg-white border border-gray-200 rounded-2xl p-4",
            className
        )}>
            <div className="flex space-x-3">
                <Avatar
                    src={user.avatar}
                    alt={user.name}
                    size="md"
                />

                <div className="flex-1 min-w-0">
                    <Textarea
                        placeholder={placeholder}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        maxLength={maxLength}
                        showCharCount
                        resizable={false}
                        rows={3}
                        className="border-none shadow-none resize-none focus:ring-0 p-0 text-lg placeholder-gray-500"
                        disabled={disabled}
                    />

                    {/* Location */}
                    {location && (
                        <div className="flex items-center space-x-2 mt-2 px-3 py-2 bg-gray-50 rounded-lg">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-700">{location}</span>
                            <button
                                onClick={() => setLocation('')}
                                className="p-1 hover:bg-gray-200 rounded-full"
                            >
                                <X className="w-3 h-3 text-gray-500" />
                            </button>
                        </div>
                    )}

                    {/* Media Previews */}
                    {imagePreviews.length > 0 && (
                        <div className={cn(
                            "mt-3 rounded-2xl overflow-hidden border border-gray-200",
                            imagePreviews.length === 1 && "max-h-96",
                            imagePreviews.length === 2 && "grid grid-cols-2 gap-2",
                            imagePreviews.length === 3 && "grid grid-cols-2 gap-2",
                            imagePreviews.length >= 4 && "grid grid-cols-2 gap-2"
                        )}>
                            {imagePreviews.map((preview, index) => (
                                <div
                                    key={index}
                                    className={cn(
                                        "relative group",
                                        imagePreviews.length === 3 && index === 0 && "row-span-2"
                                    )}
                                >
                                    <img
                                        src={preview}
                                        alt={`Preview ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        onClick={() => removeImage(index)}
                                        className="absolute top-2 right-2 p-1 bg-black/50 hover:bg-black/70 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X className="w-4 h-4 text-white" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {videoPreviews && (
                        <div className="mt-3 rounded-2xl overflow-hidden border border-gray-200 relative group">
                            <video
                                src={videoPreviews}
                                className="w-full h-auto max-h-96 object-cover"
                                controls
                            />
                            <button
                                onClick={removeVideo}
                                className="absolute top-2 right-2 p-1 bg-black/50 hover:bg-black/70 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X className="w-4 h-4 text-white" />
                            </button>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-1">
                            <input
                                ref={imageInputRef}
                                type="file"
                                accept="image/*"
                                multiple
                                className="hidden"
                                onChange={handleImageUpload}
                                disabled={disabled || !!video}
                            />
                            <button
                                onClick={() => imageInputRef.current?.click()}
                                disabled={disabled || !!video}
                                className={cn(
                                    "p-2 rounded-full transition-colors",
                                    disabled || video
                                        ? "text-gray-300 cursor-not-allowed"
                                        : "text-blue-500 hover:bg-blue-50"
                                )}
                            >
                                <Image className="w-5 h-5" />
                            </button>

                            <input
                                ref={videoInputRef}
                                type="file"
                                accept="video/*"
                                className="hidden"
                                onChange={handleVideoUpload}
                                disabled={disabled || images.length > 0}
                            />
                            <button
                                onClick={() => videoInputRef.current?.click()}
                                disabled={disabled || images.length > 0}
                                className={cn(
                                    "p-2 rounded-full transition-colors",
                                    disabled || images.length > 0
                                        ? "text-gray-300 cursor-not-allowed"
                                        : "text-purple-500 hover:bg-purple-50"
                                )}
                            >
                                <Video className="w-5 h-5" />
                            </button>

                            <button
                                disabled={disabled}
                                className={cn(
                                    "p-2 rounded-full transition-colors",
                                    disabled
                                        ? "text-gray-300 cursor-not-allowed"
                                        : "text-yellow-500 hover:bg-yellow-50"
                                )}
                            >
                                <Smile className="w-5 h-5" />
                            </button>

                            <button
                                onClick={() => setLocation('Hà Nội, Việt Nam')}
                                disabled={disabled}
                                className={cn(
                                    "p-2 rounded-full transition-colors",
                                    disabled
                                        ? "text-gray-300 cursor-not-allowed"
                                        : "text-green-500 hover:bg-green-50"
                                )}
                            >
                                <MapPin className="w-5 h-5" />
                            </button>
                        </div>

                        <Button
                            onClick={handleSubmit}
                            disabled={isSubmitDisabled}
                            loading={loading}
                            className="px-6"
                        >
                            Đăng
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;
