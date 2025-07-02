
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Clock, Users, Star } from "lucide-react";

const Routines = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBodyPart, setSelectedBodyPart] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedDuration, setSelectedDuration] = useState("all");

  // 더미 데이터
  const routines = [
    {
      id: 1,
      name: "초보자를 위한 상체 기본 루틴",
      trainer: "김준수 트레이너",
      trainerVerified: true,
      bodyParts: ["가슴", "어깨", "삼두"],
      level: "초급",
      duration: "30-45분",
      weeklyFrequency: 3,
      rating: 4.8,
      saves: 1240,
      views: 15680,
      description: "운동을 처음 시작하는 분들을 위한 상체 기본 루틴입니다. 정확한 자세와 호흡법을 중점적으로 다룹니다.",
      thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      name: "체지방 감량 HIIT 프로그램",
      trainer: "이미영 트레이너",
      trainerVerified: true,
      bodyParts: ["전신"],
      level: "중급",
      duration: "20-30분",
      weeklyFrequency: 4,
      rating: 4.9,
      saves: 890,
      views: 12340,
      description: "짧은 시간에 최대 효과를 낼 수 있는 고강도 인터벌 트레이닝 프로그램입니다.",
      thumbnail: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      name: "하체 근력 강화 운동",
      trainer: "박성호 트레이너",
      trainerVerified: true,
      bodyParts: ["하체", "엉덩이"],
      level: "중급",
      duration: "45-60분",
      weeklyFrequency: 2,
      rating: 4.7,
      saves: 650,
      views: 8920,
      description: "스쿼트, 런지 등 하체 주요 근육을 강화하는 체계적인 운동 프로그램입니다.",
      thumbnail: "https://images.unsplash.com/photo-1434596922112-19c563067271?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      name: "코어 집중 15분 루틴",
      trainer: "정수현 트레이너",
      trainerVerified: false,
      bodyParts: ["복부", "코어"],
      level: "초급",
      duration: "15-20분",
      weeklyFrequency: 5,
      rating: 4.6,
      saves: 420,
      views: 5670,
      description: "바쁜 일상 속에서도 쉽게 따라할 수 있는 짧고 효과적인 코어 운동입니다.",
      thumbnail: "https://images.unsplash.com/photo-1550259979-ed79b48d2a30?w=400&h=300&fit=crop"
    },
    {
      id: 5,
      name: "등 근육 강화 프로그램",
      trainer: "한민수 트레이너",
      trainerVerified: true,
      bodyParts: ["등", "이두"],
      level: "고급",
      duration: "60분+",
      weeklyFrequency: 2,
      rating: 4.8,
      saves: 780,
      views: 9450,
      description: "넓고 탄탄한 등 근육을 만들기 위한 전문적인 운동 프로그램입니다.",
      thumbnail: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=400&h=300&fit=crop"
    },
    {
      id: 6,
      name: "홈트레이닝 전신 운동",
      trainer: "최유진 트레이너",
      trainerVerified: true,
      bodyParts: ["전신"],
      level: "초급",
      duration: "30-45분",
      weeklyFrequency: 4,
      rating: 4.5,
      saves: 950,
      views: 11230,
      description: "집에서 기구 없이도 할 수 있는 효과적인 전신 운동 루틴입니다.",
      thumbnail: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop"
    }
  ];

  // 필터링 로직
  const filteredRoutines = routines.filter(routine => {
    const matchesSearch = routine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         routine.trainer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBodyPart = selectedBodyPart === "all" || 
                           routine.bodyParts.some(part => part.includes(selectedBodyPart));
    const matchesLevel = selectedLevel === "all" || routine.level === selectedLevel;
    const matchesDuration = selectedDuration === "all" || routine.duration.includes(selectedDuration);
    
    return matchesSearch && matchesBodyPart && matchesLevel && matchesDuration;
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">운동 루틴 찾기</h1>
            <p className="text-gray-600">당신에게 맞는 완벽한 운동 루틴을 찾아보세요</p>
          </div>
          <Button asChild>
            <a href="/routines/create">나만의 루틴 만들기</a>
          </Button>
        </div>
      </div>

      {/* 검색 및 필터 */}
      <div className="bg-white rounded-lg border p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="루틴이나 트레이너 검색..."
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
              <SelectItem value="상체">상체</SelectItem>
              <SelectItem value="하체">하체</SelectItem>
              <SelectItem value="전신">전신</SelectItem>
              <SelectItem value="복부">복부</SelectItem>
              <SelectItem value="등">등</SelectItem>
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

          <Select value={selectedDuration} onValueChange={setSelectedDuration}>
            <SelectTrigger>
              <SelectValue placeholder="소요 시간" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">모든 시간</SelectItem>
              <SelectItem value="15">15분 이하</SelectItem>
              <SelectItem value="30">30분 이하</SelectItem>
              <SelectItem value="45">45분 이하</SelectItem>
              <SelectItem value="60">60분 이상</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 결과 표시 */}
      <div className="mb-4">
        <p className="text-gray-600">
          총 <span className="font-semibold text-blue-600">{filteredRoutines.length}</span>개의 루틴을 찾았습니다
        </p>
      </div>

      {/* 루틴 목록 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRoutines.map((routine) => (
          <Card key={routine.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
            <div className="relative">
              <img 
                src={routine.thumbnail} 
                alt={routine.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="absolute top-3 right-3">
                <Badge variant="secondary" className="bg-white/90 text-black">
                  {routine.level}
                </Badge>
              </div>
            </div>
            
            <CardHeader className="pb-3">
              <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                {routine.name}
              </CardTitle>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">{routine.trainer}</span>
                {routine.trainerVerified && (
                  <Badge variant="outline" className="text-xs px-1 py-0">
                    인증
                  </Badge>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {routine.description}
              </p>
              
              <div className="flex flex-wrap gap-1 mb-3">
                {routine.bodyParts.map((part) => (
                  <Badge key={part} variant="secondary" className="text-xs">
                    {part}
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{routine.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-blue-600 font-medium">주 {routine.weeklyFrequency}회</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{routine.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{routine.saves}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button className="flex-1" size="sm">
                  시작하기
                </Button>
                <Button variant="outline" size="sm">
                  저장
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRoutines.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">검색 조건에 맞는 루틴이 없습니다.</p>
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchTerm("");
              setSelectedBodyPart("all");
              setSelectedLevel("all");
              setSelectedDuration("all");
            }}
          >
            필터 초기화
          </Button>
        </div>
      )}
    </div>
  );
};

export default Routines;
