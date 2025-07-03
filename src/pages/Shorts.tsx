import React, { useState, useRef, useEffect } from 'react';
import { Heart, MessageCircle, Share2, MoreVertical, VolumeX, Volume2, Play, Search } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const shortsCategories = [
  '전체', '가슴', '등', '하체', '어깨', '스트레칭', 'HIIT', '헬스밈',
  '요가', '필라테스', '재활', '운동꿀팁', '식단'
];

const shortsData = [
  {
    id: 1,
    user: { name: '김코치', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
    videoUrl: 'https://videos.pexels.com/video-files/4434246/4434246-hd_720_1366_25fps.mp4',
    caption: '오늘의 1분 어깨 운동! 덤벨 숄더 프레스 꿀팁 #어깨운동 #홈트',
    likes: '12.3k', comments: '245', shares: '1.2k', category: '어깨',
  },
  {
    id: 2,
    user: { name: '요가마스터 제인', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704e' },
    videoUrl: 'https://videos.pexels.com/video-files/4753997/4753997-hd_720_1366_25fps.mp4',
    caption: '스트레스 확 풀리는 5분 요가 스트레칭. 같이 따라해봐요! #요가 #스트레칭',
    likes: '8.9k', comments: '180', shares: '980', category: '요가',
  },
  {
    id: 3,
    user: { name: '다이어트 챌린저', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704f' },
    videoUrl: 'https://videos.pexels.com/video-files/4754009/4754009-hd_720_1366_25fps.mp4',
    caption: '체지방 태우는 최고의 HIIT 운동. 땀 폭발 보장! #다이어트 #HIIT',
    likes: '25.1k', comments: '512', shares: '3.4k', category: 'HIIT',
  },
  {
    id: 4,
    user: { name: '헬창TV', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704a' },
    videoUrl: 'https://videos.pexels.com/video-files/7570420/7570420-hd_720_1366_25fps.mp4',
    caption: '헬스장에서 이런 사람 꼭 있다 ㅋㅋ #헬스밈 #공감',
    likes: '31.5k', comments: '1.1k', shares: '4.2k', category: '헬스밈',
  },
  {
    id: 5,
    user: { name: '근육요정', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704b' },
    videoUrl: 'https://videos.pexels.com/video-files/6456272/6456272-hd_720_1366_25fps.mp4',
    caption: '완벽한 스쿼트를 위한 꿀팁! #하체 #스쿼트',
    likes: '18.2k', comments: '350', shares: '1.8k', category: '하체',
  },
  {
    id: 6,
    user: { name: '백프로', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704c' },
    videoUrl: 'https://videos.pexels.com/video-files/8138374/8138374-hd_720_1366_25fps.mp4',
    caption: '등 근육을 키우는 최고의 운동, 랫풀다운! #등 #랫풀다운',
    likes: '15.7k', comments: '410', shares: '1.5k', category: '등',
  },
  {
    id: 7,
    user: { name: '필라테스 여신', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704g' },
    videoUrl: 'https://videos.pexels.com/video-files/8032014/8032014-hd_720_1366_25fps.mp4',
    caption: '코어 강화 필라테스 동작 #필라테스 #코어운동',
    likes: '9.8k', comments: '210', shares: '850', category: '필라테스',
  },
  {
    id: 8,
    user: { name: '재활 트레이너', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704h' },
    videoUrl: 'https://videos.pexels.com/video-files/8096245/8096245-hd_720_1366_25fps.mp4',
    caption: '무릎 통증 완화를 위한 재활 운동 #재활 #무릎통증',
    likes: '7.2k', comments: '150', shares: '600', category: '재활',
  },
  {
    id: 9,
    user: { name: '영양사 브이로그', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704i' },
    videoUrl: 'https://videos.pexels.com/video-files/3894562/3894562-hd_720_1366_25fps.mp4',
    caption: '근성장을 위한 단백질 식단 #식단 #프로틴',
    likes: '22.1k', comments: '680', shares: '2.9k', category: '식단',
  },
  {
    id: 10,
    user: { name: '운동꿀팁 저장소', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704j' },
    videoUrl: 'https://videos.pexels.com/video-files/4056462/4056462-hd_720_1366_25fps.mp4',
    caption: '운동 전 부상 방지 스트레칭! #운동꿀팁 #부상방지',
    likes: '19.8k', comments: '450', shares: '2.1k', category: '운동꿀팁',
  },
];

const Shorts = () => {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [filteredShorts, setFilteredShorts] = useState(shortsData);
  const [isCategorySelectorOpen, setIsCategorySelectorOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [activeVideo, setActiveVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const newFilteredShorts = selectedCategory === '전체'
      ? shortsData
      : shortsData.filter(short => short.category === selectedCategory);
    setFilteredShorts(newFilteredShorts);

    setActiveVideo(0);
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
    videoRefs.current = []; 
    setIsPlaying(true);
  }, [selectedCategory]);

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
  }, [activeVideo, isMuted, filteredShorts]);

  useEffect(() => {
    const currentVideo = videoRefs.current[activeVideo];
    if (currentVideo) {
      if (isPlaying) {
        currentVideo.play().catch(error => console.log("Play was prevented:", error));
      } else {
        currentVideo.pause();
      }
    }
  }, [isPlaying, activeVideo, filteredShorts]);

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

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsCategorySelectorOpen(false);
  };

  return (
    <div className="h-[calc(100vh-4rem)] w-full flex items-center justify-center bg-black/30 backdrop-blur-md">
      <div className="relative h-full max-h-[85vh] w-full max-w-[420px] aspect-[9/16] bg-black rounded-2xl shadow-2xl overflow-hidden">
        <div className="absolute top-4 left-4 z-20">
          <Dialog open={isCategorySelectorOpen} onOpenChange={setIsCategorySelectorOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <Search size={24} />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[90vw] sm:max-w-md">
              <DialogHeader>
                <DialogTitle>관심 주제를 선택하세요</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-3 gap-2 py-4">
                {shortsCategories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'secondary' : 'outline'}
                    onClick={() => handleCategorySelect(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="h-full w-full snap-y snap-mandatory overflow-y-scroll scrollbar-hide"
        >
          {filteredShorts.length > 0 ? (
            filteredShorts.map((short, index) => (
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
            ))
          ) : (
            <div className="h-full w-full flex items-center justify-center text-white">
              <p>이 카테고리에는 영상이 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shorts;
