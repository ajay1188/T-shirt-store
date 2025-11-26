import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import type { FileRejection } from 'react-dropzone';
import { Upload, X, Image as ImageIcon, Check } from 'lucide-react';

interface ImageUploadProps {
    onImageSelect: (file: File) => void;
    currentImage?: string;
    maxSize?: number; // in MB
}

export default function ImageUpload({ onImageSelect, currentImage, maxSize = 5 }: ImageUploadProps) {
    const [preview, setPreview] = useState<string | null>(currentImage || null);
    const [error, setError] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);

    const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
        setError(null);

        if (rejectedFiles.length > 0) {
            const rejection = rejectedFiles[0];
            if (rejection.errors[0]?.code === 'file-too-large') {
                setError(`File is too large. Maximum size is ${maxSize}MB`);
            } else if (rejection.errors[0]?.code === 'file-invalid-type') {
                setError('Invalid file type. Please upload an image (JPG, PNG, GIF, WebP)');
            } else {
                setError('Failed to upload file');
            }
            return;
        }

        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);

            // Simulate upload (in production, upload to server/cloud)
            setUploading(true);
            setTimeout(() => {
                onImageSelect(file);
                setUploading(false);
            }, 1000);
        }
    }, [onImageSelect, maxSize]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
        },
        maxSize: maxSize * 1024 * 1024, // Convert MB to bytes
        multiple: false
    });

    const removeImage = () => {
        setPreview(null);
        setError(null);
    };

    return (
        <div className="space-y-4">
            {!preview ? (
                <div
                    {...getRootProps()}
                    className={`
                        border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300
                        ${isDragActive
                            ? 'border-indigo-500 bg-indigo-50'
                            : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50'
                        }
                        ${error ? 'border-red-300 bg-red-50' : ''}
                    `}
                >
                    <input {...getInputProps()} />
                    <div className="flex flex-col items-center gap-3">
                        <div className={`p-4 rounded-full ${isDragActive ? 'bg-indigo-100' : 'bg-gray-100'}`}>
                            <Upload className={`h-8 w-8 ${isDragActive ? 'text-indigo-600' : 'text-gray-400'}`} />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-700">
                                {isDragActive ? 'Drop the image here' : 'Drag & drop an image here'}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                                or click to browse (max {maxSize}MB)
                            </p>
                        </div>
                        <p className="text-xs text-gray-400">
                            Supported formats: JPG, PNG, GIF, WebP
                        </p>
                    </div>
                </div>
            ) : (
                <div className="relative group">
                    <div className="relative rounded-xl overflow-hidden border-2 border-gray-200">
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-64 object-cover"
                        />
                        {uploading && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <div className="flex flex-col items-center gap-2 text-white">
                                    <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <p className="text-sm font-medium">Uploading...</p>
                                </div>
                            </div>
                        )}
                        {!uploading && (
                            <div className="absolute top-2 right-2 flex gap-2">
                                <div className="bg-green-500 text-white p-2 rounded-lg shadow-lg">
                                    <Check className="h-4 w-4" />
                                </div>
                                <button
                                    onClick={removeImage}
                                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg shadow-lg transition-colors"
                                    aria-label="Remove image"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                        <ImageIcon className="h-4 w-4" />
                        <span>Image uploaded successfully</span>
                    </div>
                </div>
            )}

            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                    <X className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700">{error}</p>
                </div>
            )}
        </div>
    );
}
