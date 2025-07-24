import React, { useState } from 'react';
import { Camera, Video, MapPin, X, Upload, Image, Plus, FileImage, FileVideo } from 'lucide-react';
import { useScopeBuilder } from './ScopeBuilderContext';
import { MediaFile, Annotation } from './types';

const MediaStep: React.FC = () => {
  const { state, updateScopeData } = useScopeBuilder();
  const { scopeData } = state;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [annotationMode, setAnnotationMode] = useState<'pin' | 'circle' | 'arrow' | null>(null);

  React.useEffect(() => {
    const handleAutoFill = () => {
      const mockPhotos: MediaFile[] = [
        {
          id: 'photo-demo-1',
          name: 'kitchen_sink_leak_overview.jpg',
          type: 'image',
          url: '/uploads/kitchen_sink_leak_overview.jpg',
          size: 2.3 * 1024 * 1024,
          uploadedAt: new Date().toISOString(),
          annotations: []
        },
        {
          id: 'photo-demo-2',
          name: 'under_cabinet_water_damage.jpg',
          type: 'image',
          url: '/uploads/under_cabinet_water_damage.jpg',
          size: 1.8 * 1024 * 1024,
          uploadedAt: new Date().toISOString(),
          annotations: []
        }
      ];

      const mockVideo: MediaFile = {
        id: 'video-demo-1',
        name: 'leak_demonstration_video.mp4',
        type: 'video',
        url: '/uploads/leak_demonstration_video.mp4',
        size: 18.7 * 1024 * 1024,
        uploadedAt: new Date().toISOString()
      };

      const mockAnnotations: Annotation[] = [
        {
          id: 'annotation-demo-1',
          x: 45,
          y: 60,
          type: 'pin',
          note: 'Main leak source - connection joint',
          severity: 'critical'
        },
        {
          id: 'annotation-demo-2',
          x: 70,
          y: 80,
          type: 'circle',
          note: 'Water damage area on cabinet floor',
          severity: 'warning'
        }
      ];

      updateScopeData({
        photos: mockPhotos,
        videoClip: mockVideo,
        annotations: mockAnnotations
      });
    };
    
    window.addEventListener('autoFillMedia', handleAutoFill);
    return () => window.removeEventListener('autoFillMedia', handleAutoFill);
  }, []);

  const handlePhotoUploadReal = () => {
    // Simulate file upload
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;
    input.onchange = (e) => {
      const files = Array.from((e.target as HTMLInputElement).files || []);
      const newPhotos = files.map(file => ({
        id: `photo-${Date.now()}-${Math.random()}`,
        name: file.name,
        type: 'image' as const,
        url: URL.createObjectURL(file),
        size: file.size,
        uploadedAt: new Date().toISOString(),
        annotations: []
      }));
      updateScopeData({
        photos: [...scopeData.photos, ...newPhotos].slice(0, 5) // Max 5 photos
      });
    };
    input.click();
  };

  const handleDemoPhotoUpload = () => {
    const newPhoto: MediaFile = {
      id: `photo-${Date.now()}`,
      name: `issue_photo_${scopeData.photos.length + 1}.jpg`,
      type: 'image',
      url: `/uploads/issue_photo_${scopeData.photos.length + 1}.jpg`,
      size: 2.1 * 1024 * 1024,
      uploadedAt: new Date().toISOString(),
      annotations: []
    };

    updateScopeData({
      photos: [...scopeData.photos, newPhoto]
    });
  };

  const handleVideoUpload = () => {
    // Simulate file upload
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'video/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const newVideo: MediaFile = {
          id: `video-${Date.now()}`,
          name: file.name,
          type: 'video',
          url: URL.createObjectURL(file),
          size: file.size,
          uploadedAt: new Date().toISOString()
        };
        updateScopeData({ videoClip: newVideo });
      }
    };
    input.click();
  };

  const handleDemoVideoUpload = () => {
    const newVideo: MediaFile = {
      id: `video-${Date.now()}`,
      name: `issue_video.mp4`,
      type: 'video',
      url: `/uploads/issue_video.mp4`,
      size: 15.3 * 1024 * 1024,
      uploadedAt: new Date().toISOString()
    };

    updateScopeData({ videoClip: newVideo });
  };

  const removePhoto = (photoId: string) => {
    updateScopeData({
      photos: scopeData.photos.filter(photo => photo.id !== photoId)
    });
  };

  const removeVideo = () => {
    updateScopeData({ videoClip: undefined });
  };

  const addAnnotation = (imageId: string, x: number, y: number) => {
    if (!annotationMode) return;

    const note = prompt(`Add a note for this ${annotationMode}:`);
    if (!note) return;

    const newAnnotation: Annotation = {
      id: `annotation-${Date.now()}`,
      x,
      y,
      type: annotationMode,
      note,
      severity: 'info'
    };

    updateScopeData({
      annotations: [...scopeData.annotations, newAnnotation]
    });

    setAnnotationMode(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-3">Document the issue</h2>
        <p className="text-gray-400 text-lg">Photos and videos help vendors provide accurate estimates</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Photo Upload */}
        <div className="space-y-6">
          <div className="bg-white/5 rounded-xl p-6 border border-gray-600/30 space-y-4">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Camera className="mr-3 text-teal-400" size={24} />
              Photos ({scopeData.photos.length}/5)
            </h3>
            
            {/* Upload Options */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handlePhotoUploadReal}
                disabled={scopeData.photos.length >= 5}
                className="flex flex-col items-center p-4 border-2 border-dashed border-blue-500/40 rounded-lg bg-blue-500/5 hover:bg-blue-500/10 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Upload className="mb-2 text-blue-400 group-hover:scale-110 transition-transform duration-300" size={24} />
                <div className="text-white font-medium text-sm">Upload Photos</div>
                <div className="text-gray-400 text-xs">From device</div>
              </button>
              
              <button
                onClick={handleDemoPhotoUpload}
                disabled={scopeData.photos.length >= 5}
                className="flex flex-col items-center p-4 border-2 border-dashed border-teal-500/40 rounded-lg bg-teal-500/5 hover:bg-teal-500/10 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Camera className="mb-2 text-teal-400 group-hover:scale-110 transition-transform duration-300" size={24} />
                <div className="text-white font-medium text-sm">Demo Photo</div>
                <div className="text-gray-400 text-xs">Add sample</div>
              </button>
            </div>

            {/* Photo Grid */}
            {scopeData.photos.length > 0 && (
              <div className="grid grid-cols-2 gap-3">
                {scopeData.photos.map((photo) => (
                  <div key={photo.id} className="relative group">
                    <div 
                      className="aspect-square bg-gray-700/50 rounded-lg border border-gray-600 flex items-center justify-center cursor-pointer hover:border-teal-500 transition-all duration-300"
                      onClick={() => setSelectedImage(photo.id)}
                    >
                      <Image className="text-gray-400" size={24} />
                      <div className="absolute inset-0 bg-black/60 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white text-xs font-medium">Click to annotate</span>
                      </div>
                    </div>
                    <button
                      onClick={() => removePhoto(photo.id)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors shadow-lg"
                    >
                      <X size={14} />
                    </button>
                    <div className="text-xs text-gray-400 mt-1 truncate">{photo.name}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Video Upload */}
        <div className="space-y-6">
          <div className="bg-white/5 rounded-xl p-6 border border-gray-600/30 space-y-4">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Video className="mr-3 text-teal-400" size={24} />
              Video (Optional)
            </h3>
            
            {!scopeData.videoClip ? (
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleVideoUpload}
                  className="flex flex-col items-center p-4 border-2 border-dashed border-purple-500/40 rounded-lg bg-purple-500/5 hover:bg-purple-500/10 transition-all duration-300 group"
                >
                  <Upload className="mb-2 text-purple-400 group-hover:scale-110 transition-transform duration-300" size={24} />
                  <div className="text-white font-medium text-sm">Upload Video</div>
                  <div className="text-gray-400 text-xs">From device</div>
                </button>
                
                <button
                  onClick={handleDemoVideoUpload}
                  className="flex flex-col items-center p-4 border-2 border-dashed border-orange-500/40 rounded-lg bg-orange-500/5 hover:bg-orange-500/10 transition-all duration-300 group"
                >
                  <Video className="mb-2 text-orange-400 group-hover:scale-110 transition-transform duration-300" size={24} />
                  <div className="text-white font-medium text-sm">Demo Video</div>
                  <div className="text-gray-400 text-xs">Add sample</div>
                </button>
              </div>
            ) : (
              <div className="relative">
                <div className="aspect-video bg-gray-700/50 rounded-lg border border-gray-600 flex items-center justify-center">
                  <Video className="text-gray-400" size={32} />
                </div>
                <button
                  onClick={removeVideo}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors shadow-lg"
                >
                  <X size={14} />
                </button>
                <div className="text-xs text-gray-400 mt-1">{scopeData.videoClip.name}</div>
              </div>
            )}
          </div>

          {/* Annotation Tools */}
          <div className="bg-white/5 rounded-xl p-6 border border-gray-600/30">
            <h4 className="text-lg font-semibold text-white mb-4">Annotation Tools</h4>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setAnnotationMode('pin')}
                className={`p-4 rounded-lg border transition-all duration-300 ${
                  annotationMode === 'pin'
                    ? 'border-teal-500 bg-teal-500/10 text-teal-400'
                    : 'border-gray-700 bg-gray-800/30 text-gray-300 hover:border-gray-600'
                }`}
              >
                <MapPin className="mx-auto mb-2" size={20} />
                <div className="text-sm font-medium">Pin</div>
              </button>
              <button
                onClick={() => setAnnotationMode('circle')}
                className={`p-4 rounded-lg border transition-all duration-300 ${
                  annotationMode === 'circle'
                    ? 'border-teal-500 bg-teal-500/10 text-teal-400'
                    : 'border-gray-700 bg-gray-800/30 text-gray-300 hover:border-gray-600'
                }`}
              >
                <div className="w-5 h-5 border-2 border-current rounded-full mx-auto mb-2"></div>
                <div className="text-sm font-medium">Circle</div>
              </button>
              <button
                onClick={() => setAnnotationMode('arrow')}
                className={`p-4 rounded-lg border transition-all duration-300 ${
                  annotationMode === 'arrow'
                    ? 'border-teal-500 bg-teal-500/10 text-teal-400'
                    : 'border-gray-700 bg-gray-800/30 text-gray-300 hover:border-gray-600'
                }`}
              >
                <div className="text-xl mx-auto mb-2">→</div>
                <div className="text-sm font-medium">Arrow</div>
              </button>
            </div>
            
            {annotationMode && (
              <div className="mt-4 p-3 bg-teal-500/10 rounded-lg border border-teal-500/20">
                <div className="text-teal-400 text-sm font-medium">
                  Click on a photo to add a {annotationMode}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Annotations List */}
      {scopeData.annotations.length > 0 && (
        <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50">
          <h3 className="text-lg font-semibold text-white mb-4">
            Annotations ({scopeData.annotations.length})
          </h3>
          <div className="space-y-2">
            {scopeData.annotations.map((annotation, index) => (
              <div key={annotation.id} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  {annotation.type === 'pin' ? (
                    <MapPin size={16} className="text-blue-400" />
                  ) : annotation.type === 'circle' ? (
                    <div className="w-4 h-4 border-2 border-yellow-400 rounded-full"></div>
                  ) : (
                    <span className="text-green-400">→</span>
                  )}
                  <div>
                    <div className="text-white font-medium">Annotation {index + 1}</div>
                    <div className="text-gray-400 text-sm">{annotation.note}</div>
                  </div>
                </div>
                <button
                  onClick={() => updateScopeData({
                    annotations: scopeData.annotations.filter(a => a.id !== annotation.id)
                  })}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Progress Indicator */}
      {scopeData.photos.length > 0 && (
        <div className="text-center animate-in fade-in duration-500">
          <div className="inline-flex items-center space-x-2 bg-teal-500/10 border border-teal-500/30 rounded-full px-6 py-3">
            <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
            <span className="text-teal-400 font-medium">Media documentation complete</span>
          </div>
        </div>
      )}

      {/* Image Annotation Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 rounded-2xl border border-gray-700/30 w-full max-w-4xl max-h-[95vh] overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-4 border-b border-gray-700/50">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white">Add Annotations</h3>
                <button 
                  onClick={() => setSelectedImage(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div 
                className="aspect-video bg-gray-700 rounded-lg border border-gray-600 flex items-center justify-center cursor-crosshair relative"
                onClick={(e) => {
                  if (annotationMode) {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width) * 100;
                    const y = ((e.clientY - rect.top) / rect.height) * 100;
                    addAnnotation(selectedImage, x, y);
                  }
                }}
              >
                <Camera className="text-gray-400" size={48} />
                {annotationMode && (
                  <div className="absolute inset-0 bg-teal-500/10 border-2 border-teal-500 border-dashed rounded-lg flex items-center justify-center">
                    <div className="text-teal-400 font-medium">Click to add {annotationMode}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaStep;