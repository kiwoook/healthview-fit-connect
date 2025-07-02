import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageCircle, Heart, Share, Clock, TrendingUp, Plus, Edit3, Image as ImageIcon, X as XIcon } from "lucide-react";
import { CommunityPostDetail } from "@/components/CommunityPostDetail";
import { toast } from "@/hooks/use-toast";

const Community = () => {
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const [currentTab, setCurrentTab] = useState("latest");
  const [isWriteDialogOpen, setIsWriteDialogOpen] = useState(false);
  const [isQuickPostDialogOpen, setIsQuickPostDialogOpen] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "질문"
  });
  const [quickPost, setQuickPost] = useState("");
  const [quickPostImage, setQuickPostImage] = useState<File | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const posts = [
    {
      id: 1,
      author: "헬스초보김씨",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
      category: "질문",
      title: "벤치프레스 자세가 맞는지 확인해주세요",
      content: "벤치프레스를 시작한 지 한달 정도인데, 가슴에 자극이 잘 안 오는 것 같아요. 어깨가 아픈 경우도 있고... 제 자세에 문제가 있을까요?\n\n특히 바벨을 내릴 때 어느 위치까지 내려야 하는지, 그리고 올릴 때 팔꿈치 각도는 어떻게 해야 하는지 궁금합니다. 유튜브 영상들을 봐도 다 다르게 말해서 혼란스러워요.",
      tags: ["초보자", "벤치프레스", "자세교정"],
      time: "2시간 전",
      likes: 12,
      comments: 8,
      views: 145
    },
    {
      id: 2,
      author: "운동마니아",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c5f0?w=50&h=50&fit=crop&crop=face",
      category: "후기",
      title: "3개월 홈트 후기 - 10kg 감량 성공!",
      content: "코로나로 헬스장을 못 가게 되면서 홈트를 시작했는데, 꾸준히 하니까 진짜 효과가 있더라고요! 식단 조절과 함께 3개월만에 10kg 감량에 성공했습니다.\n\n제가 한 루틴들 공유해드릴게요:\n- 월,수,금: 근력운동 (푸시업, 스쿼트, 플랭크 등)\n- 화,목,토: 유산소 (버피, 점핑잭, 마운틴 클라이머)\n- 일: 휴식\n\n식단은 탄수화물을 줄이고 단백질 위주로 먹었어요. 특히 저녁에는 닭가슴살 샐러드만 먹었습니다.",
      tags: ["홈트", "다이어트", "후기"],
      time: "5시간 전",
      likes: 87,
      comments: 23,
      views: 892
    },
    {
      id: 3,
      author: "김준수 트레이너",
      avatar: "https://images.unsplash.com/photo-1472076638602-b1d57f0dbc28?w=50&h=50&fit=crop&crop=face",
      category: "팁",
      title: "겨울철 운동 동기부여 유지하는 5가지 방법",
      content: "추운 겨울, 운동하기 싫어지는 계절이죠. 10년간 트레이너로 활동하면서 겨울철에도 꾸준히 운동할 수 있는 실용적인 팁들을 정리해봤습니다.",
      tags: ["동기부여", "겨울운동", "트레이너팁"],
      time: "1일 전",
      likes: 156,
      comments: 34,
      views: 1250,
      verified: true
    },
    {
      id: 4,
      author: "다이어터",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
      category: "질문",
      title: "단백질 섭취량 계산이 어려워요",
      content: "근육량 증가가 목표인데 단백질을 얼마나 먹어야 할지 모르겠어요. 체중 1kg당 2g 먹어야 한다고 하는데, 현실적으로 가능할까요?",
      tags: ["단백질", "영양", "근육증가"],
      time: "2일 전",
      likes: 23,
      comments: 15,
      views: 334
    },
    {
      id: 5,
      author: "오운완맨",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face",
      category: "잡담",
      title: "",
      content: "오늘 하체 운동 완료! 스쿼트 5세트 데드리프트 4세트 🔥 내일은 상체 ㄱㄱ #오운완 #하체데이",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
      tags: ["오운완", "하체"],
      time: "30분 전",
      likes: 5,
      comments: 2,
      views: 28,
      isQuickPost: true
    },
    {
      id: 6,
      author: "헬스조아",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop&crop=face",
      category: "잡담", 
      title: "",
      content: "새해 목표로 3개월에 5kg 감량 잡았는데 벌써 2kg 빠졌어요! 이 속도면 목표 달성 가능할 것 같아요 💪 #다이어트 #새해목표",
      tags: ["다이어트", "목표달성"],
      time: "1시간 전",
      likes: 18,
      comments: 7,
      views: 94,
      isQuickPost: true
    }
  ];

  const popularTags = [
    { name: "초보자", count: 89 },
    { name: "홈트", count: 67 },
    { name: "다이어트", count: 54 },
    { name: "오운완", count: 48 },
    { name: "근력운동", count: 43 },
    { name: "자세교정", count: 38 },
    { name: "단백질", count: 29 },
    { name: "후기", count: 25 },
    { name: "트레이너팁", count: 21 }
  ];

  const hotTopics = [
    { title: "2024년 운동 목표 설정하기", replies: 127 },
    { title: "헬스장 vs 홈트레이닝 어떤게 나을까요?", replies: 89 },
    { title: "운동 후 근육통 완화 방법", replies: 76 },
    { title: "여성 운동 초보자를 위한 가이드", replies: 64 },
    { title: "크레아틴 복용법과 효과", replies: 52 }
  ];

  // 필터링된 포스트
  const getFilteredPosts = () => {
    const sortedPosts = [...posts];
    
    switch (currentTab) {
      case "popular":
        return sortedPosts.sort((a, b) => (b.likes + b.comments) - (a.likes + a.comments));
      case "question":
        return sortedPosts.filter(post => post.category === "질문");
      case "tips":
        return sortedPosts.filter(post => post.category === "팁");
      case "chat":
        return sortedPosts.filter(post => post.category === "잡담");
      default:
        return sortedPosts.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
    }
  };

  const handleWritePost = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) {
      toast({
        title: "입력 오류",
        description: "제목과 내용을 모두 입력해주세요.",
        variant: "destructive"
      });
      return;
    }

    // 실제로는 API 호출
    toast({
      title: "게시글이 작성되었습니다!",
      description: "커뮤니티에 새로운 글이 업로드되었습니다."
    });

    setNewPost({ title: "", content: "", category: "질문" });
    setIsWriteDialogOpen(false);
  };

  const handleQuickPost = () => {
    if (!quickPost.trim()) {
      toast({
        title: "입력 오류", 
        description: "내용을 입력해주세요.",
        variant: "destructive"
      });
      return;
    }

    // 실제로는 API 호출
    toast({
      title: "잡담이 공유되었습니다!",
      description: "커뮤니티에 새로운 잡담이 올라갔습니다."
    });

    setQuickPost("");
    setQuickPostImage(null);
    setIsQuickPostDialogOpen(false);
  };

  const selectedPostData = posts.find(post => post.id === selectedPost);

  if (selectedPostData) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <CommunityPostDetail 
          post={selectedPostData} 
          onBack={() => setSelectedPost(null)} 
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">커뮤니티</h1>
        <p className="text-gray-600">운동 경험을 공유하고 서로 도움을 주고받아요</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* 메인 콘텐츠 */}
        <div className="lg:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
              <div className="flex justify-between items-center flex-wrap gap-4">
                <TabsList className="grid w-fit grid-cols-5">
                  <TabsTrigger value="latest">최신순</TabsTrigger>
                  <TabsTrigger value="popular">인기순</TabsTrigger>
                  <TabsTrigger value="question">질문</TabsTrigger>
                  <TabsTrigger value="tips">팁</TabsTrigger>
                  <TabsTrigger value="chat">잡담</TabsTrigger>
                </TabsList>
                <div className="flex gap-2">
                  <Dialog open={isQuickPostDialogOpen} onOpenChange={setIsQuickPostDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Edit3 className="h-4 w-4 mr-2" />
                        오운완
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>오늘의 운동 공유하기</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Textarea
                          placeholder="오늘의 운동을 자유롭게 공유해보세요! #오운완 #헬스 등 해시태그도 함께 써주세요"
                          value={quickPost}
                          onChange={(e) => setQuickPost(e.target.value)}
                          rows={4}
                        />
                        {quickPostImage && (
                          <div className="relative mt-2">
                            <img src={URL.createObjectURL(quickPostImage)} alt="미리보기" className="max-h-60 w-full object-contain rounded-md border" />
                            <Button
                              variant="destructive"
                              size="icon"
                              className="absolute top-2 right-2 h-6 w-6 rounded-full"
                              onClick={() => setQuickPostImage(null)}
                            >
                              <XIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                        <div className="flex justify-between items-center mt-2">
                          <Button variant="ghost" size="icon" onClick={() => imageInputRef.current?.click()}>
                            <ImageIcon className="h-5 w-5 text-gray-500" />
                          </Button>
                          <input
                            type="file"
                            ref={imageInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                setQuickPostImage(e.target.files[0]);
                              }
                            }}
                          />
                          <div className="flex gap-2">
                            <Button variant="outline" onClick={() => {
                              setIsQuickPostDialogOpen(false);
                              setQuickPostImage(null);
                            }}>
                              취소
                            </Button>
                            <Button onClick={handleQuickPost}>
                              공유하기
                            </Button>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Dialog open={isWriteDialogOpen} onOpenChange={setIsWriteDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        글쓰기
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>새 게시글 작성</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium">카테고리</label>
                          <Select value={newPost.category} onValueChange={(value) => setNewPost({...newPost, category: value})}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="질문">질문</SelectItem>
                              <SelectItem value="팁">팁</SelectItem>
                              <SelectItem value="후기">후기</SelectItem>
                              <SelectItem value="자유">자유</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm font-medium">제목</label>
                          <Input
                            placeholder="게시글 제목을 입력하세요"
                            value={newPost.title}
                            onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">내용</label>
                          <Textarea
                            placeholder="게시글 내용을 입력하세요"
                            value={newPost.content}
                            onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                            rows={8}
                          />
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" onClick={() => setIsWriteDialogOpen(false)}>
                            취소
                          </Button>
                          <Button onClick={handleWritePost}>
                            게시하기
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <TabsContent value="latest" className="space-y-4 mt-6">
                {getFilteredPosts().map((post) => (
                  <Card key={post.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="w-10 h-10" verified={post.verified}>
                          <AvatarImage src={post.avatar} alt={post.author} />
                          <AvatarFallback>{post.author.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium">{post.author}</span>
                            <Badge variant="secondary" className="text-xs">
                              {post.category}
                            </Badge>
                            <span className="text-xs text-gray-500">•</span>
                            <span className="text-xs text-gray-500">{post.time}</span>
                          </div>
                          
                          {post.title && (
                            <h3 
                              className="font-semibold text-lg mb-2 hover:text-blue-600 cursor-pointer"
                              onClick={() => setSelectedPost(post.id)}
                            >
                              {post.title}
                            </h3>
                          )}
                          
                          <p className={`text-gray-600 mb-3 ${post.isQuickPost ? 'text-base' : 'line-clamp-2'}`}>
                            {post.content}
                          </p>

                          {post.image && (
                            <div className="mb-3 rounded-lg overflow-hidden border cursor-pointer" onClick={() => setSelectedPost(post.id)}>
                              <img src={post.image} alt="게시글 이미지" className="w-full h-auto object-cover" />
                            </div>
                          )}
                          
                          <div className="flex flex-wrap gap-1 mb-3">
                            {post.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Heart className="w-4 h-4" />
                              <span>{post.likes}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageCircle className="w-4 h-4" />
                              <span>{post.comments}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span>조회 {post.views}</span>
                            </div>
                            <div className="flex items-center gap-1 ml-auto">
                              <Share className="w-4 h-4" />
                              <span>공유</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="popular" className="space-y-4 mt-6">
                {getFilteredPosts().map((post) => (
                  <Card key={post.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="w-10 h-10" verified={post.verified}>
                          <AvatarImage src={post.avatar} alt={post.author} />
                          <AvatarFallback>{post.author.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium">{post.author}</span>
                            <Badge variant="secondary" className="text-xs">
                              {post.category}
                            </Badge>
                            <span className="text-xs text-gray-500">•</span>
                            <span className="text-xs text-gray-500">{post.time}</span>
                          </div>
                          
                          {post.title && (
                            <h3 
                              className="font-semibold text-lg mb-2 hover:text-blue-600 cursor-pointer"
                              onClick={() => setSelectedPost(post.id)}
                            >
                              {post.title}
                            </h3>
                          )}
                          
                          <p className={`text-gray-600 mb-3 ${post.isQuickPost ? 'text-base' : 'line-clamp-2'}`}>
                            {post.content}
                          </p>

                          {post.image && (
                            <div className="mb-3 rounded-lg overflow-hidden border cursor-pointer" onClick={() => setSelectedPost(post.id)}>
                              <img src={post.image} alt="게시글 이미지" className="w-full h-auto object-cover" />
                            </div>
                          )}
                          
                          <div className="flex flex-wrap gap-1 mb-3">
                            {post.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Heart className="w-4 h-4" />
                              <span>{post.likes}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageCircle className="w-4 h-4" />
                              <span>{post.comments}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span>조회 {post.views}</span>
                            </div>
                            <div className="flex items-center gap-1 ml-auto">
                              <Share className="w-4 h-4" />
                              <span>공유</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="question" className="space-y-4 mt-6">
                {getFilteredPosts().map((post) => (
                  <Card key={post.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="w-10 h-10" verified={post.verified}>
                          <AvatarImage src={post.avatar} alt={post.author} />
                          <AvatarFallback>{post.author.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium">{post.author}</span>
                            <Badge variant="secondary" className="text-xs">
                              {post.category}
                            </Badge>
                            <span className="text-xs text-gray-500">•</span>
                            <span className="text-xs text-gray-500">{post.time}</span>
                          </div>
                          
                          <h3 
                            className="font-semibold text-lg mb-2 hover:text-blue-600 cursor-pointer"
                            onClick={() => setSelectedPost(post.id)}
                          >
                            {post.title}
                          </h3>
                          
                          <p className="text-gray-600 mb-3 line-clamp-2">
                            {post.content}
                          </p>
                          
                          <div className="flex flex-wrap gap-1 mb-3">
                            {post.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Heart className="w-4 h-4" />
                              <span>{post.likes}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageCircle className="w-4 h-4" />
                              <span>{post.comments}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span>조회 {post.views}</span>
                            </div>
                            <div className="flex items-center gap-1 ml-auto">
                              <Share className="w-4 h-4" />
                              <span>공유</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="tips" className="space-y-4 mt-6">
                {getFilteredPosts().map((post) => (
                  <Card key={post.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="w-10 h-10" verified={post.verified}>
                          <AvatarImage src={post.avatar} alt={post.author} />
                          <AvatarFallback>{post.author.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium">{post.author}</span>
                            <Badge variant="secondary" className="text-xs">
                              {post.category}
                            </Badge>
                            <span className="text-xs text-gray-500">•</span>
                            <span className="text-xs text-gray-500">{post.time}</span>
                          </div>
                          
                          <h3 
                            className="font-semibold text-lg mb-2 hover:text-blue-600 cursor-pointer"
                            onClick={() => setSelectedPost(post.id)}
                          >
                            {post.title}
                          </h3>
                          
                          <p className="text-gray-600 mb-3 line-clamp-2">
                            {post.content}
                          </p>
                          
                          <div className="flex flex-wrap gap-1 mb-3">
                            {post.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Heart className="w-4 h-4" />
                              <span>{post.likes}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageCircle className="w-4 h-4" />
                              <span>{post.comments}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span>조회 {post.views}</span>
                            </div>
                            <div className="flex items-center gap-1 ml-auto">
                              <Share className="w-4 h-4" />
                              <span>공유</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="chat" className="space-y-4 mt-6">
                {getFilteredPosts().map((post) => (
                  <Card key={post.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={post.avatar} alt={post.author} />
                          <AvatarFallback>{post.author.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium">{post.author}</span>
                            <Badge variant="secondary" className="text-xs">
                              {post.category}
                            </Badge>
                            <span className="text-xs text-gray-500">•</span>
                            <span className="text-xs text-gray-500">{post.time}</span>
                          </div>
                          
                          <p className="text-gray-600 mb-3">
                            {post.content}
                          </p>
                          
                          <div className="flex flex-wrap gap-1 mb-3">
                            {post.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Heart className="w-4 h-4" />
                              <span>{post.likes}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageCircle className="w-4 h-4" />
                              <span>{post.comments}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span>조회 {post.views}</span>
                            </div>
                            <div className="flex items-center gap-1 ml-auto">
                              <Share className="w-4 h-4" />
                              <span>공유</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* 사이드바 */}
        <div className="space-y-6">
          {/* 인기 주제 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                인기 주제
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {hotTopics.map((topic, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 text-xs flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium hover:text-blue-600 cursor-pointer line-clamp-2">
                        {topic.title}
                      </h4>
                      <p className="text-xs text-gray-500">{topic.replies}개 댓글</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 인기 태그 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">인기 태그</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <Badge 
                    key={tag.name} 
                    variant="secondary" 
                    className="text-xs cursor-pointer hover:bg-blue-100"
                  >
                    #{tag.name} ({tag.count})
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 커뮤니티 규칙 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">커뮤니티 가이드</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• 서로 존중하며 건설적인 대화를 나눠요</p>
                <p>• 개인정보는 공유하지 않아요</p>
                <p>• 광고성 게시글은 삼가해 주세요</p>
                <p>• 운동 관련 질문은 언제든 환영해요</p>
                <p>• 경험과 노하우를 적극 공유해 주세요</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Community;
