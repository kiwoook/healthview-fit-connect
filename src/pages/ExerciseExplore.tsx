import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Star, AlertTriangle, Play, BookOpen, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ExerciseExplore = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBodyPart, setSelectedBodyPart] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedEquipment, setSelectedEquipment] = useState("all");

  // 운동 데이터베이스
  const exercises = [
    {
      id: 1,
      name: "벤치프레스",
      bodyPart: "가슴",
      level: "중급",
      equipment: "바벨",
      rating: 4.8,
      userTips: 127,
      videoCount: 15,
      injuryRisk: "중",
      description: "가슴 근육 발달에 가장 효과적인 기본 운동",
      primaryMuscles: ["대흉근", "전면삼각근", "삼두근"],
      equipment_needed: ["바벨", "벤치"],
      difficulty: "중급자 이상 권장",
      thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      name: "스쿼트",
      bodyPart: "하체",
      level: "초급",
      equipment: "맨몸",
      rating: 4.9,
      userTips: 203,
      videoCount: 22,
      injuryRisk: "낮음",
      description: "하체 전체 근육을 강화하는 최고의 기본 운동",
      primaryMuscles: ["대퇴사두근", "둔근", "햄스트링"],
      equipment_needed: ["없음"],
      difficulty: "초보자도 가능",
      thumbnail: "https://images.unsplash.com/photo-1434596922112-19c563067271?w=300&h=200&fit=crop"
    },
    {
      id: 3,
      name: "데드리프트",
      bodyPart: "등",
      level: "고급",
      equipment: "바벨",
      rating: 4.7,
      userTips: 89,
      videoCount: 18,
      injuryRisk: "높음",
      description: "전신 근력 향상에 최고의 복합 운동",
      primaryMuscles: ["척추기립근", "광배근", "승모근", "둔근"],
      equipment_needed: ["바벨", "플레이트"],
      difficulty: "고급자 권장",
      thumbnail: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=300&h=200&fit=crop"
    },
    {
      id: 4,
      name: "플랭크",
      bodyPart: "복부",
      level: "초급",
      equipment: "맨몸",
      rating: 4.6,
      userTips: 156,
      videoCount: 12,
      injuryRisk: "낮음",
      description: "코어 안정성과 지구력을 높이는 정적 운동",
      primaryMuscles: ["복직근", "횡복근", "복사근"],
      equipment_needed: ["매트"],
      difficulty: "초보자 추천",
      thumbnail: "https://images.unsplash.com/photo-1550259979-ed79b48d2a30?w=300&h=200&fit=crop"
    },
    {
      id: 5,
      name: "바이셉 컬",
      bodyPart: "팔",
      level: "초급",
      equipment: "덤벨",
      rating: 4.4,
      userTips: 78,
      videoCount: 14,
      injuryRisk: "낮음",
      description: "이두근 집중 발달을 위한 아이솔레이션 운동",
      primaryMuscles: ["이두근", "전완근"],
      equipment_needed: ["덤벨"],
      difficulty: "초보자 가능",
      thumbnail: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=300&h=200&fit=crop"
    },
    {
      id: 6,
      name: "풀업",
      bodyPart: "등",
      level: "고급",
      equipment: "철봉",
      rating: 4.8,
      userTips: 112,
      videoCount: 16,
      injuryRisk: "중",
      description: "상체 당기기 근력의 최고 지표 운동",
      primaryMuscles: ["광배근", "이두근", "후면삼각근"],
      equipment_needed: ["철봉"],
      difficulty: "고급자 권장",
      thumbnail: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=300&h=200&fit=crop"
    }
  ];

  // 필터링 로직
  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBodyPart = selectedBodyPart === "all" || exercise.bodyPart === selectedBodyPart;
    const matchesLevel = selectedLevel === "all" || exercise.level === selectedLevel;
    const matchesEquipment = selectedEquipment === "all" || exercise.equipment === selectedEquipment;
    
    return matchesSearch && matchesBodyPart && matchesLevel && matchesEquipment;
  });

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "낮음": return "text-green-600 bg-green-50";
      case "중": return "text-yellow-600 bg-yellow-50";
      case "높음": return "text-red-600 bg-red-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">운동 탐색하기</h1>
        <p className="text-muted-foreground">다양한 운동의 상세 정보와 팁을 확인해보세요</p>
      </div>

      {/* 검색 및 필터 */}
      <div className="bg-card rounded-lg border p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="운동 이름 또는 설명 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <Select value={selectedBodyPart} onValueChange={setSelectedBodyPart}>
            <SelectTrigger>
              <SelectValue placeholder="운동 부위" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">모든 부위</SelectItem>
              <SelectItem value="가슴">가슴</SelectItem>
              <SelectItem value="등">등</SelectItem>
              <SelectItem value="어깨">어깨</SelectItem>
              <SelectItem value="팔">팔</SelectItem>
              <SelectItem value="하체">하체</SelectItem>
              <SelectItem value="복부">복부</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedLevel} onValueChange={setSelectedLevel}>
            <SelectTrigger>
              <SelectValue placeholder="난이도" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">모든 레벨</SelectItem>
              <SelectItem value="초급">초급</SelectItem>
              <SelectItem value="중급">중급</SelectItem>
              <SelectItem value="고급">고급</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedEquipment} onValueChange={setSelectedEquipment}>
            <SelectTrigger>
              <SelectValue placeholder="장비" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">모든 장비</SelectItem>
              <SelectItem value="맨몸">맨몸</SelectItem>
              <SelectItem value="덤벨">덤벨</SelectItem>
              <SelectItem value="바벨">바벨</SelectItem>
              <SelectItem value="머신">머신</SelectItem>
              <SelectItem value="철봉">철봉</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 결과 표시 */}
      <div className="mb-4">
        <p className="text-muted-foreground">
          총 <span className="font-semibold text-primary">{filteredExercises.length}</span>개의 운동을 찾았습니다
        </p>
      </div>

      {/* 운동 목록 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExercises.map((exercise) => (
          <Card 
            key={exercise.id} 
            className="hover:shadow-lg transition-shadow cursor-pointer group"
            onClick={() => navigate(`/exercises/${exercise.id}`)}
          >
            <div className="relative">
              <img 
                src={exercise.thumbnail} 
                alt={exercise.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="absolute top-3 right-3">
                <Badge variant="secondary" className="bg-white/90 text-black">
                  {exercise.level}
                </Badge>
              </div>
              <div className="absolute top-3 left-3">
                <Badge className={`${getRiskColor(exercise.injuryRisk)} border-none`}>
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  {exercise.injuryRisk}
                </Badge>
              </div>
            </div>
            
            <CardHeader className="pb-3">
              <CardTitle className="text-lg group-hover:text-primary transition-colors">
                {exercise.name}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {exercise.bodyPart}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {exercise.equipment}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {exercise.description}
              </p>
              
              <div className="flex flex-wrap gap-1 mb-3">
                {exercise.primaryMuscles.slice(0, 3).map((muscle) => (
                  <Badge key={muscle} variant="secondary" className="text-xs">
                    {muscle}
                  </Badge>
                ))}
                {exercise.primaryMuscles.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{exercise.primaryMuscles.length - 3}개
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{exercise.rating}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Play className="h-4 w-4" />
                    <span>{exercise.videoCount}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    <span>{exercise.userTips}</span>
                  </div>
                </div>
              </div>
              
              <Button className="w-full" size="sm">
                <BookOpen className="h-4 w-4 mr-2" />
                상세 정보 보기
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredExercises.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">검색 조건에 맞는 운동이 없습니다.</p>
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchTerm("");
              setSelectedBodyPart("all");
              setSelectedLevel("all");
              setSelectedEquipment("all");
            }}
          >
            필터 초기화
          </Button>
        </div>
      )}
    </div>
  );
};

export default ExerciseExplore;