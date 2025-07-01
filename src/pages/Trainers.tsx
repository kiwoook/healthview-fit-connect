
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Users, MessageCircle, Award } from "lucide-react";

const Trainers = () => {
  const trainers = [
    {
      id: 1,
      name: "김준수",
      title: "퍼스널 트레이너",
      specialties: ["근력 증가", "초보자 지도", "자세 교정"],
      experience: "5년",
      rating: 4.9,
      followers: 2840,
      routines: 15,
      certified: true,
      location: "강남구",
      description: "운동 초보자분들도 안전하고 효과적으로 운동할 수 있도록 도와드립니다. 정확한 자세와 체계적인 프로그램으로 목표 달성을 지원합니다.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "이미영",
      title: "피트니스 인스트럭터",
      specialties: ["체지방 감량", "HIIT", "여성 전용"],
      experience: "7년",
      rating: 4.8,
      followers: 3650,
      routines: 22,
      certified: true,
      location: "서초구",
      description: "건강한 다이어트와 체형 관리 전문가입니다. 여성분들의 특성을 고려한 맞춤형 운동 프로그램을 제공합니다.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c5f0?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "박성호",
      title: "크로스핏 코치",
      specialties: ["전신 운동", "기능성 운동", "컨디셔닝"],
      experience: "8년",
      rating: 4.7,
      followers: 1920,
      routines: 18,
      certified: true,
      location: "마포구",
      description: "크로스핏과 기능성 운동을 통해 실생활에 도움이 되는 체력과 근력을 기를 수 있도록 지도합니다.",
      avatar: "https://images.unsplash.com/photo-1472076638602-b1d57f0dbc28?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "정수현",
      title: "요가 & 필라테스",
      specialties: ["코어 강화", "유연성", "자세 교정"],
      experience: "6년",
      rating: 4.6,
      followers: 2150,
      routines: 25,
      certified: false,
      location: "홍대",
      description: "요가와 필라테스를 통해 몸과 마음의 균형을 찾을 수 있도록 도와드립니다. 바른 자세와 코어 강화에 중점을 둡니다.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 5,
      name: "한민수",
      title: "보디빌딩 코치",
      specialties: ["근육량 증가", "대회 준비", "고강도"],
      experience: "10년",
      rating: 4.8,
      followers: 4200,
      routines: 30,
      certified: true,
      location: "잠실",
      description: "보디빌딩 대회 경험을 바탕으로 근육량 증가와 체형 개선을 위한 전문적인 지도를 제공합니다.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 6,
      name: "최유진",
      title: "홈트레이닝 전문가",
      specialties: ["홈트레이닝", "기구 없는 운동", "바쁜 직장인"],
      experience: "4년",
      rating: 4.5,
      followers: 1680,
      routines: 20,
      certified: true,
      location: "온라인",
      description: "바쁜 일상 속에서도 집에서 쉽게 할 수 있는 효과적인 운동법을 알려드립니다. 기구 없이도 충분한 운동 효과를 얻을 수 있습니다.",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">전문 트레이너</h1>
        <p className="text-gray-600">인증받은 전문가들과 함께 효과적인 운동을 시작해보세요</p>
      </div>

      {/* 트레이너 통계 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="text-center p-4">
          <CardContent className="p-0">
            <div className="text-2xl font-bold text-blue-600">{trainers.length}</div>
            <p className="text-sm text-gray-600">전문 트레이너</p>
          </CardContent>
        </Card>
        <Card className="text-center p-4">
          <CardContent className="p-0">
            <div className="text-2xl font-bold text-green-600">
              {trainers.filter(t => t.certified).length}
            </div>
            <p className="text-sm text-gray-600">인증 트레이너</p>
          </CardContent>
        </Card>
        <Card className="text-center p-4">
          <CardContent className="p-0">
            <div className="text-2xl font-bold text-purple-600">
              {trainers.reduce((sum, t) => sum + t.routines, 0)}
            </div>
            <p className="text-sm text-gray-600">총 루틴 수</p>
          </CardContent>
        </Card>
        <Card className="text-center p-4">
          <CardContent className="p-0">
            <div className="text-2xl font-bold text-orange-600">4.7</div>
            <p className="text-sm text-gray-600">평균 평점</p>
          </CardContent>
        </Card>
      </div>

      {/* 트레이너 목록 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainers.map((trainer) => (
          <Card key={trainer.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="relative inline-block">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarImage src={trainer.avatar} alt={trainer.name} />
                  <AvatarFallback>{trainer.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                {trainer.certified && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <Award className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
              <CardTitle className="text-xl">{trainer.name}</CardTitle>
              <p className="text-gray-600">{trainer.title}</p>
              <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                <span>경력 {trainer.experience}</span>
                <span>•</span>
                <span>{trainer.location}</span>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                {/* 전문 분야 */}
                <div>
                  <h4 className="font-medium mb-2">전문 분야</h4>
                  <div className="flex flex-wrap gap-1">
                    {trainer.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* 소개 */}
                <div>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {trainer.description}
                  </p>
                </div>

                {/* 통계 */}
                <div className="grid grid-cols-3 gap-4 text-center py-3 border-t border-b">
                  <div>
                    <div className="flex items-center justify-center gap-1 text-sm">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{trainer.rating}</span>
                    </div>
                    <p className="text-xs text-gray-500">평점</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1 text-sm">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{trainer.followers.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-gray-500">팔로워</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1 text-sm">
                      <MessageCircle className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{trainer.routines}</span>
                    </div>
                    <p className="text-xs text-gray-500">루틴</p>
                  </div>
                </div>

                {/* 액션 버튼 */}
                <div className="flex gap-2">
                  <Button className="flex-1" size="sm">
                    프로필 보기
                  </Button>
                  <Button variant="outline" size="sm">
                    팔로우
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 트레이너 되기 CTA */}
      <Card className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">트레이너로 활동하고 싶으신가요?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            HealthView에서 여러분의 전문성을 공유하고 더 많은 사람들의 건강한 삶을 도와주세요. 
            트레이너 인증을 받고 다양한 혜택을 누려보세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600">
              트레이너 지원하기
            </Button>
            <Button variant="outline" size="lg">
              자세히 알아보기
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Trainers;
