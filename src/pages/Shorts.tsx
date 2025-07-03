import { useState, useRef, useEffect } from 'react';
import { Heart, MessageCircle, Share2, MoreVertical, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';

const shortsData = [
  {
    id: 1,
    user: {
      name: '김코치',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    },
    videoUrl: 'https://videos.pexels.com/video-files/4434246/4434246-hd_720_1366_25fps.mp4',
    caption: '오늘의 1분 어깨 운동! 덤벨 숄더 프레스 꿀팁 #어깨운동 #홈트',
    likes: '12.3k',
    comments: '245',
    shares: '1.2k',
  },
  {
    id: 2,
    user: {
      name: '요가마스터 제인',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704e',
    },
    videoUrl: 'https://videos.pexels.com/video-files/8096245/8096245-hd_720_1366_25fps.mp4',
    caption: '스트레스 확 풀리는 5분 요가 스트레칭. 같이 따라해봐요! #요가 #스트레칭',
    likes: '8.9k',
    comments: '180',
    shares: '980',
  },
  {
    id: 3,
    user: {
      name: '다이어트 챌린저',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704f',
    },
    videoUrl: 'https://videos.pexels.com/video-files/4754009/4754009-hd_720_1366_25fps.mp4',
    caption: '체지방 태우는 최고의 HIIT 운동. 땀 폭발 보장! #다이어트 #HIIT',
    likes: '25.1k',
    comments: '512',
    shares: '3.4k',
  },
];

const Shorts = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [activeVideo, setActiveVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === activeVideo) {
          video.play().catch(error => console.log("Autoplay was prevented:", error));
          video.muted = isMuted;
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }, [activeVideo, isMuted]);

  useEffect(() => {
    const currentVideo = videoRefs.current[activeVideo];
    if (currentVideo) {
      if (isPlaying) {
        currentVideo.play().catch(error => console.log("Play was prevented:", error));
      } else {
        currentVideo.pause();
      }
    }
  }, [isPlaying, activeVideo]);

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, clientHeight } = containerRef.current;
      const newActiveVideo = Math.round(scrollTop / clientHeight);
      if (newActiveVideo !== activeVideo) {
        setActiveVideo(newActiveVideo);
        setIsPlaying(true);
      }
    }
  };

  const togglePlay = () => {
    setIsPlaying(prev => !prev);
  };

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  return (
    <div className="h-[calc(100vh-4rem)] w-full flex items-center justify-center bg-black/30 backdrop-blur-md">
      <div className="relative h-full max-h-[85vh] w-full max-w-[420px] aspect-[9/16] bg-black rounded-2xl shadow-2xl overflow-hidden">
        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="h-full w-full snap-y snap-mandatory overflow-y-scroll scrollbar-hide"
        >
          {shortsData.map((short, index) => (
            <div key={short.id} className="relative h-full w-full snap-start flex items-center justify-center">
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                src={short.videoUrl}
                loop
                playsInline
                className="h-full w-full object-cover"
                onClick={togglePlay}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

              <div className="absolute top-4 right-4 z-10">
                <Button variant="ghost" size="icon" onClick={toggleMute} className="text-white hover:bg-white/20">
                  {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                </Button>
              </div>

              {!isPlaying && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <Play size={80} className="text-white/70" />
                </div>
              )}

              <div className="absolute bottom-0 left-0 p-4 text-white w-full z-10">
                <div className="flex items-center gap-2 mb-2">
                  <Avatar>
                    <AvatarImage src={short.user.avatar} alt={short.user.name} />
                    <AvatarFallback>{short.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <p className="font-semibold">{short.user.name}</p>
                  <Button variant="outline" size="sm" className="ml-2 bg-transparent border-white text-white hover:bg-white/20 hover:text-white">팔로우</Button>
                </div>
                <p className="text-sm mb-4">{short.caption}</p>
              </div>

              <div className="absolute bottom-4 right-4 flex flex-col items-center gap-4 text-white z-10">
                <div className="flex flex-col items-center">
                  <Button variant="ghost" size="icon" className="rounded-full h-12 w-12 text-white hover:bg-white/20">
                    <Heart size={28} />
                  </Button>
                  <span className="text-sm font-bold">{short.likes}</span>
                </div>
                <div className="flex flex-col items-center">
                  <Button variant="ghost" size="icon" className="rounded-full h-12 w-12 text-white hover:bg-white/20">
                    <MessageCircle size={28} />
                  </Button>
                  <span className="text-sm font-bold">{short.comments}</span>
                </div>
                <div className="flex flex-col items-center">
                  <Button variant="ghost" size="icon" className="rounded-full h-12 w-12 text-white hover:bg-white/20">
                    <Share2 size={28} />
                  </Button>
                  <span className="text-sm font-bold">{short.shares}</span>
                </div>
                <Button variant="ghost" size="icon" className="rounded-full h-12 w-12 text-white hover:bg-white/20">
                  <MoreVertical size={28} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shorts;
