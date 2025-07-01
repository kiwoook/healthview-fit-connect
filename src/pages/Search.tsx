
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search as SearchIcon, Clock, Users, Star, Filter } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Search = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBodyPart, setSelectedBodyPart] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedDuration, setSelectedDuration] = useState("all");

  // 통합 검색 결과 (루틴, 트레이너, 커뮤니티 등)
  const searchResults = {
    routines: [
      {
        id: 1,
        type: 'routine',
        name: "초보자를 위한 상체 기본 루틴",
        trainer: "김준수 트레이너",
        trainerVerified: true,
        bodyParts: ["가슴", "어깨", "삼두"],
        level: "초급",
        duration: "30-45분",
        rating: 4.8,
        saves: 1240,
        description: "운동을 처음 시작하는 분들을 위한 상체 기본 루틴입니다."
      },
      {
        id: 2,
        type: 'routine',
        name: "체지방 감량 HIIT 프로그램",
        trainer: "이미영 트레이너",
        trainerVerified: true,
        bodyParts: ["전신"],
        level: "중급",
        duration: "20-30분",
        rating: 4.9,
        saves: 890,
        description: "짧은 시간에 최대 효과를 낼 수 있는 고강도 인터벌 트레이닝입니다."
      }
    ],
    trainers: [
      {
        id: 1,
        type: 'trainer',
        name: "김준수 트레이너",
        verified: true,
        specialties: ["초보자 지도", "상체 운동", "자세교정"],
        location: "서울시 강남구",
        rating: 4.9,
        reviews: 156,
        description: "10년 경력의 전문 트레이너입니다."
      }
    ],
    posts: [
      {
        id: 1,
        type: 'post',
        title: "헬스 초보자를 위한 기본 가이드",
        author: "헬스마니아",
        category: "정보공유",
        likes: 45,
        comments: 12,
        description: "헬스를 처음 시작하는 분들을 위한 기본적인 가이드입니다."
      }
    ]
  };

  // 필터링 로직
  const filteredResults = {
    routines: searchResults.routines.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.trainer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBodyPart = selectedBodyPart === "all" || 
                             item.bodyParts.some(part => part.includes(selectedBodyPart));
      const matchesLevel = selectedLevel === "all" || item.level === selectedLevel;
      const matchesDuration = selectedDuration === "all" || item.duration.includes(selectedDuration);
      
      return matchesSearch && matchesBodyPart && matchesLevel && matchesDuration;
    }),
    trainers: searchResults.trainers.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.specialties.some(specialty => specialty.toLowerCase().includes(searchTerm.toLowerCase()))
    ),
    posts: searchResults.posts.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  };

  const totalResults = filteredResults.routines.length + filteredResults.trainers.length + filteredResults.posts.length;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">통합 검색</h1>
        <p className="text-gray-600">원하는 운동 루틴, 트레이너, 정보를 찾아보세요</p>
      </div>

      {/* 검색 및 필터 */}
      <div className="bg-white rounded-lg border p-6 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
          <div className="lg:col-span-2">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="루틴, 트레이너, 게시글 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="카테고리" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체</SelectItem>
              <SelectItem value="routines">운동 루틴</SelectItem>
              <SelectItem value="trainers">트레이너</SelectItem>
              <SelectItem value="posts">커뮤니티</SelectItem>
            </SelectContent>
          </Select>
          
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
              <SelectItem value="60">60분 이상</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 검색 결과 요약 */}
      <div className="mb-6">
        <p className="text-gray-600">
          총 <span className="font-semibold text-blue-600">{totalResults}</span>개의 검색 결과
        </p>
      </div>

      {/* 운동 루틴 결과 */}
      {(selectedCategory === "all" || selectedCategory === "routines") && filteredResults.routines.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xl font-semibold">운동 루틴</h2>
            <Badge variant="secondary">{filteredResults.routines.length}</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResults.routines.map((routine) => (
              <Card key={routine.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{routine.name}</CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">{routine.trainer}</span>
                    {routine.trainerVerified && (
                      <Badge variant="outline" className="text-xs px-1 py-0">인증</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">{routine.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {routine.bodyParts.map((part) => (
                      <Badge key={part} variant="secondary" className="text-xs">{part}</Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{routine.duration}</span>
                    </div>
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
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* 트레이너 결과 */}
      {(selectedCategory === "all" || selectedCategory === "trainers") && filteredResults.trainers.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xl font-semibold">트레이너</h2>
            <Badge variant="secondary">{filteredResults.trainers.length}</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResults.trainers.map((trainer) => (
              <Card key={trainer.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{trainer.name}</CardTitle>
                    {trainer.verified && (
                      <Badge variant="outline" className="text-xs px-1 py-0">인증</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{trainer.location}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">{trainer.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {trainer.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="text-xs">{specialty}</Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{trainer.rating}</span>
                    </div>
                    <span>리뷰 {trainer.reviews}개</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* 커뮤니티 게시글 결과 */}
      {(selectedCategory === "all" || selectedCategory === "posts") && filteredResults.posts.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xl font-semibold">커뮤니티</h2>
            <Badge variant="secondary">{filteredResults.posts.length}</Badge>
          </div>
          <div className="space-y-4">
            {filteredResults.posts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{post.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>작성자: {post.author}</span>
                        <Badge variant="outline" className="text-xs">{post.category}</Badge>
                        <span>좋아요 {post.likes}</span>
                        <span>댓글 {post.comments}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {totalResults === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">검색 결과가 없습니다.</p>
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
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

export default Search;
