
import { useState } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Heart, Share, ArrowLeft, Send } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface Comment {
  id: number;
  author: string;
  avatar: string;
  content: string;
  time: string;
  likes: number;
  replies: Reply[];
}

interface Reply {
  id: number;
  author: string;
  avatar: string;
  content: string;
  time: string;
  likes: number;
}

interface Post {
  id: number;
  author: string;
  avatar: string;
  category: string;
  title: string;
  content: string;
  tags: string[];
  time: string;
  likes: number;
  comments: number;
  views: number;
  verified?: boolean;
}

interface CommunityPostDetailProps {
  post: Post;
  onBack: () => void;
}

export const CommunityPostDetail = ({ post, onBack }: CommunityPostDetailProps) => {
  const { user } = useAuth();
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [newReply, setNewReply] = useState('');
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: "운동고수",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
      content: "벤치프레스 할 때 어깨 블레이드를 뒤로 당기고 가슴을 내밀어야 해요. 그리고 바벨을 내릴 때 가슴 중앙 부분에 살짝 터치하고 올리는 것이 중요합니다.",
      time: "1시간 전",
      likes: 8,
      replies: [
        {
          id: 1,
          author: "헬스초보김씨",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
          content: "감사합니다! 내일 헬스장에서 시도해볼게요.",
          time: "30분 전",
          likes: 2
        }
      ]
    },
    {
      id: 2,
      author: "김준수 트레이너",
      avatar: "https://images.unsplash.com/photo-1472076638602-b1d57f0dbc28?w=50&h=50&fit=crop&crop=face",
      content: "자세가 제일 중요해요. 무게를 줄이더라도 정확한 자세로 하는 것을 추천드립니다. 어깨 통증이 있다면 일단 휴식을 취하시고, 가능하면 트레이너에게 직접 지도받아보세요.",
      time: "45분 전",
      likes: 15,
      replies: []
    }
  ]);

  const handleSubmitComment = () => {
    if (!user) {
      toast.error('로그인이 필요합니다.');
      return;
    }
    
    if (!newComment.trim()) {
      toast.error('댓글 내용을 입력해주세요.');
      return;
    }

    const comment: Comment = {
      id: comments.length + 1,
      author: user.name,
      avatar: "",
      content: newComment,
      time: "방금 전",
      likes: 0,
      replies: []
    };

    setComments([...comments, comment]);
    setNewComment('');
    toast.success('댓글이 등록되었습니다.');
  };

  const handleSubmitReply = (commentId: number) => {
    if (!user) {
      toast.error('로그인이 필요합니다.');
      return;
    }
    
    if (!newReply.trim()) {
      toast.error('답글 내용을 입력해주세요.');
      return;
    }

    const reply: Reply = {
      id: Date.now(),
      author: user.name,
      avatar: "",
      content: newReply,
      time: "방금 전",
      likes: 0
    };

    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, replies: [...comment.replies, reply] }
        : comment
    ));
    
    setNewReply('');
    setReplyTo(null);
    toast.success('답글이 등록되었습니다.');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* 뒤로가기 버튼 */}
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="w-4 h-4 mr-2" />
        목록으로 돌아가기
      </Button>

      {/* 게시글 상세 */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src={post.avatar} alt={post.author} />
              <AvatarFallback>{post.author.slice(0, 2)}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium">{post.author}</span>
                {post.verified && (
                  <Badge variant="outline" className="text-xs px-1 py-0">
                    인증
                  </Badge>
                )}
                <Badge variant="secondary" className="text-xs">
                  {post.category}
                </Badge>
                <span className="text-xs text-gray-500">•</span>
                <span className="text-xs text-gray-500">{post.time}</span>
              </div>
              
              <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
              
              <div className="prose max-w-none mb-4">
                <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
              </div>
              
              <div className="flex flex-wrap gap-1 mb-4">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  <span>{post.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>{comments.length}</span>
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

      {/* 댓글 작성 */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">댓글 {comments.length}개</h3>
        </CardHeader>
        <CardContent>
          {user ? (
            <div className="space-y-4">
              <div className="flex gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    placeholder="댓글을 입력하세요..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="min-h-[80px]"
                  />
                  <div className="flex justify-end mt-2">
                    <Button onClick={handleSubmitComment} size="sm">
                      <Send className="w-4 h-4 mr-1" />
                      댓글 등록
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500 py-4">
              댓글을 작성하려면 로그인이 필요합니다.
            </p>
          )}
        </CardContent>
      </Card>

      {/* 댓글 목록 */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <Card key={comment.id}>
            <CardContent className="p-4">
              <div className="flex gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={comment.avatar} alt={comment.author} />
                  <AvatarFallback>{comment.author.slice(0, 2)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{comment.author}</span>
                    <span className="text-xs text-gray-500">{comment.time}</span>
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-2">{comment.content}</p>
                  
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <button className="flex items-center gap-1 hover:text-blue-600">
                      <Heart className="w-3 h-3" />
                      <span>{comment.likes}</span>
                    </button>
                    <button 
                      className="hover:text-blue-600"
                      onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                    >
                      답글
                    </button>
                  </div>

                  {/* 답글 목록 */}
                  {comment.replies.length > 0 && (
                    <div className="mt-3 space-y-3">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="flex gap-2 pl-4 border-l-2 border-gray-100">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src={reply.avatar} alt={reply.author} />
                            <AvatarFallback className="text-xs">{reply.author.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-xs">{reply.author}</span>
                              <span className="text-xs text-gray-500">{reply.time}</span>
                            </div>
                            <p className="text-xs text-gray-700">{reply.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 답글 작성 */}
                  {replyTo === comment.id && user && (
                    <div className="mt-3 pl-4 border-l-2 border-blue-200">
                      <div className="flex gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="text-xs">{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <Textarea
                            placeholder="답글을 입력하세요..."
                            value={newReply}
                            onChange={(e) => setNewReply(e.target.value)}
                            className="min-h-[60px] text-sm"
                          />
                          <div className="flex justify-end gap-2 mt-2">
                            <Button variant="ghost" size="sm" onClick={() => setReplyTo(null)}>
                              취소
                            </Button>
                            <Button size="sm" onClick={() => handleSubmitReply(comment.id)}>
                              답글 등록
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
