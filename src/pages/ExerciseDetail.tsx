import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Star, 
  AlertTriangle, 
  Play, 
  MessageSquare, 
  BookOpen, 
  Edit,
  Save,
  ExternalLink,
  Heart,
  Share2
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const ExerciseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userMemo, setUserMemo] = useState("");
  const [isEditingMemo, setIsEditingMemo] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  // 운동 상세 정보 (실제로는 API에서 가져올 데이터)
  const exercise = {
    id: parseInt(id || "1"),
    name: "벤치프레스",
    bodyPart: "가슴",
    level: "중급",
    equipment: "바벨",
    rating: 4.8,
    userTips: 127,
    videoCount: 15,
    injuryRisk: "중",
    description: "가슴 근육 발달에 가장 효과적인 기본 운동으로, 상체 근력의 기준이 되는 운동입니다.",
    primaryMuscles: ["대흉근", "전면삼각근", "삼두근"],
    secondaryMuscles: ["전거근", "복근"],
    equipment_needed: ["바벨", "벤치", "플레이트"],
    difficulty: "중급자 이상 권장",
    thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
    instructions: [
      "벤치에 등을 대고 누워 어깨를 뒤로 당겨 고정합니다.",
      "바벨을 어깨 너비보다 약간 넓게 잡습니다.",
      "바벨을 가슴 중앙 부위까지 천천히 내립니다.",
      "가슴 근육을 수축시키며 바벨을 위로 밀어 올립니다.",
      "팔꿈치를 완전히 펴지 말고 약간 굽힌 상태로 마무리합니다."
    ],
    precautions: [
      "무리한 중량보다는 정확한 자세를 우선시하세요",
      "반드시 스포터와 함께 운동하거나 안전장치를 사용하세요",
      "어깨에 부상이 있다면 피하거나 의사와 상담하세요",
      "운동 전 충분한 워밍업을 실시하세요"
    ],
    videos: [
      { title: "벤치프레스 기본 자세", channel: "피트니스 TV", views: "1.2M", url: "#" },
      { title: "벤치프레스 실수 TOP 5", channel: "헬스 마스터", views: "850K", url: "#" },
      { title: "벤치프레스 중량 늘리는 법", channel: "근력왕", views: "640K", url: "#" }
    ],
    tips: [
      {
        id: 1,
        author: "헬스마니아",
        rating: 5,
        content: "처음에는 빈 바벨로 자세를 완전히 익히고 나서 중량을 올리는 것을 추천합니다. 자세가 무너지면 부상 위험이 높아져요.",
        likes: 45,
        date: "2024-01-15"
      },
      {
        id: 2,
        author: "근력왕김",
        rating: 5,
        content: "호흡이 정말 중요해요. 바벨을 내릴 때 숨을 들이마시고, 올릴 때 천천히 내쉬면서 힘을 주세요. 혈압 상승도 예방할 수 있습니다.",
        likes: 38,
        date: "2024-01-12"
      }
    ]
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "낮음": return "text-green-600 bg-green-50";
      case "중": return "text-yellow-600 bg-yellow-50";
      case "높음": return "text-red-600 bg-red-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const saveMemo = () => {
    // 실제로는 API 호출
    setIsEditingMemo(false);
    toast({
      title: "메모가 저장되었습니다",
      description: "운동 시작 시 메모를 확인할 수 있습니다."
    });
  };

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
    toast({
      title: isFavorited ? "즐겨찾기에서 제거됨" : "즐겨찾기에 추가됨",
      description: isFavorited ? "즐겨찾기에서 제거되었습니다." : "즐겨찾기에 추가되었습니다."
    });
  };

  const shareExercise = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "링크가 복사되었습니다",
      description: "다른 사람과 이 운동 정보를 공유해보세요."
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* 헤더 */}
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          뒤로가기
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{exercise.name}</h1>
          <p className="text-muted-foreground">{exercise.description}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={toggleFavorite}>
            <Heart className={`h-4 w-4 mr-2 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
            {isFavorited ? '저장됨' : '저장'}
          </Button>
          <Button variant="outline" size="sm" onClick={shareExercise}>
            <Share2 className="h-4 w-4 mr-2" />
            공유
          </Button>
        </div>
      </div>

      {/* 기본 정보 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <img 
            src={exercise.thumbnail} 
            alt={exercise.name}
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">운동 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">운동 부위</span>
                <Badge variant="outline">{exercise.bodyPart}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">난이도</span>
                <Badge variant="outline">{exercise.level}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">필요 장비</span>
                <Badge variant="outline">{exercise.equipment}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">부상 위험도</span>
                <Badge className={`${getRiskColor(exercise.injuryRisk)} border-none`}>
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  {exercise.injuryRisk}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">평점</span>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{exercise.rating}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 나의 메모 */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>나만의 운동 메모</CardTitle>
            {!isEditingMemo ? (
              <Button variant="outline" size="sm" onClick={() => setIsEditingMemo(true)}>
                <Edit className="h-4 w-4 mr-2" />
                편집
              </Button>
            ) : (
              <Button size="sm" onClick={saveMemo}>
                <Save className="h-4 w-4 mr-2" />
                저장
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {isEditingMemo ? (
            <Textarea
              value={userMemo}
              onChange={(e) => setUserMemo(e.target.value)}
              placeholder="이 운동에 대한 개인적인 메모를 작성하세요. 루틴 시작 시 확인할 수 있습니다."
              rows={4}
            />
          ) : (
            <div className="min-h-[100px] p-4 bg-muted rounded-md">
              {userMemo || (
                <p className="text-muted-foreground italic">
                  아직 작성된 메모가 없습니다. 편집 버튼을 클릭하여 메모를 작성해보세요.
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* 상세 정보 탭 */}
      <Tabs defaultValue="instructions" className="mb-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="instructions">운동 방법</TabsTrigger>
          <TabsTrigger value="muscles">근육 정보</TabsTrigger>
          <TabsTrigger value="videos">영상 강의</TabsTrigger>
          <TabsTrigger value="tips">사용자 팁</TabsTrigger>
        </TabsList>

        <TabsContent value="instructions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>운동 수행 방법</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3">
                {exercise.instructions.map((instruction, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </span>
                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                주의사항 및 안전수칙
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {exercise.precautions.map((precaution, index) => (
                  <li key={index} className="flex gap-2">
                    <span className="text-red-500">•</span>
                    <span>{precaution}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="muscles">
          <Card>
            <CardHeader>
              <CardTitle>대상 근육</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">주동근</h4>
                <div className="flex flex-wrap gap-2">
                  {exercise.primaryMuscles.map((muscle) => (
                    <Badge key={muscle} variant="default">{muscle}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">보조근</h4>
                <div className="flex flex-wrap gap-2">
                  {exercise.secondaryMuscles.map((muscle) => (
                    <Badge key={muscle} variant="secondary">{muscle}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">필요 장비</h4>
                <div className="flex flex-wrap gap-2">
                  {exercise.equipment_needed.map((equipment) => (
                    <Badge key={equipment} variant="outline">{equipment}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="videos">
          <div className="space-y-4">
            {exercise.videos.map((video, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                      <Play className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{video.title}</h4>
                      <p className="text-sm text-muted-foreground">{video.channel}</p>
                      <p className="text-xs text-muted-foreground">조회수 {video.views}회</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      시청하기
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tips">
          <div className="space-y-4">
            {exercise.tips.map((tip) => (
              <Card key={tip.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{tip.author}</span>
                      <div className="flex">
                        {[...Array(tip.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">{tip.date}</span>
                  </div>
                  <p className="text-sm mb-3">{tip.content}</p>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Heart className="h-4 w-4 mr-1" />
                      {tip.likes}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      답글
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* 액션 버튼 */}
      <div className="flex gap-4">
        <Button className="flex-1">
          <BookOpen className="h-4 w-4 mr-2" />
          루틴에 추가하기
        </Button>
        <Button variant="outline" className="flex-1">
          <Play className="h-4 w-4 mr-2" />
          지금 운동하기
        </Button>
      </div>
    </div>
  );
};

export default ExerciseDetail;