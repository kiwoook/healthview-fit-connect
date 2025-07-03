
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Calendar, Target, Clock, Bookmark, Award, Flame, Star, Users, Search } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // 뱃지 더미 데이터
  const badges = [
    { id: 1, name: "첫 걸음", icon: <Award size={28} />, description: "첫 운동을 완료하여 획득", earned: true },
    { id: 2, name: "꾸준함의 상징", icon: <Flame size={28} />, description: "7일 연속 운동하여 획득", earned: true },
    { id: 3, name: "루틴 마스터", icon: <Star size={28} />, description: "나만의 루틴을 생성하여 획득", earned: false },
    { id: 4, name: "커뮤니티 스타", icon: <Users size={28} />, description: "커뮤니티에 첫 글 작성 시 획득", earned: false },
    { id: 5, name: "탐험가", icon: <Search size={28} />, description: "10개 이상의 운동을 탐색하여 획득", earned: true },
  ];

  // 더미 데이터
  const weeklyProgress = 75;
  const monthlyGoal = 20;
  const completedWorkouts = 15;

  const recentWorkouts = [
    { id: 1, name: "상체 집중 루틴", date: "2024-01-15", duration: "45분", trainer: "김준수 트레이너" },
    { id: 2, name: "하체 강화 운동", date: "2024-01-13", duration: "50분", trainer: "이미영 트레이너" },
    { id: 3, name: "전신 유산소", date: "2024-01-11", duration: "30분", trainer: "박성호 트레이너" },
  ];

  const recommendedRoutines = [
    { id: 1, name: "초보자를 위한 기본 루틴", trainer: "김준수", rating: 4.8, saves: 1240 },
    { id: 2, name: "체지방 감량 HIIT", trainer: "이미영", rating: 4.9, saves: 890 },
    { id: 3, name: "근력 증가 프로그램", trainer: "박성호", rating: 4.7, saves: 650 },
  ];

  const savedRoutines = [
    { id: 1, name: "전신 근력 강화", trainer: "박성호", duration: "60분", difficulty: "중급" },
    { id: 2, name: "아침 요가 스트레칭", trainer: "요가강사 제인", duration: "20분", difficulty: "초급" },
    { id: 3, name: "코어 집중 챌린지", trainer: "김준수", duration: "30분", difficulty: "고급" },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">안녕하세요, 김준희님! 👋</h1>
        <p className="text-gray-600">오늘도 건강한 하루 보내세요</p>
      </div>

      {/* 주요 통계 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">주간 목표</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{weeklyProgress}%</div>
            <Progress value={weeklyProgress} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              이번 주 목표까지 25% 남았어요!
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">이번 달 운동</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedWorkouts}회</div>
            <p className="text-xs text-muted-foreground">
              목표: {monthlyGoal}회
            </p>
            <div className="text-sm text-green-600 mt-1">
              +3회 지난 달 대비
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">평균 운동 시간</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42분</div>
            <p className="text-xs text-muted-foreground">
              지난 주 평균
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">운동 일수</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7일</div>
            <p className="text-xs text-muted-foreground">
              연속 운동 기록
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 뱃지 섹션 */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>나의 뱃지</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-x-8 gap-y-6">
            {badges.map((badge) => (
              <Tooltip key={badge.id}>
                <TooltipTrigger asChild>
                  <div className="flex flex-col items-center w-20 text-center cursor-pointer">
                    <div
                      className={`relative w-16 h-16 flex items-center justify-center rounded-full border-2 transition-all duration-300 ${
                        badge.earned
                          ? "border-yellow-400 bg-yellow-50 text-yellow-500"
                          : "border-gray-200 bg-gray-50 text-gray-400"
                      }`}>
                      {badge.icon}
                      {!badge.earned && (
                        <div className="absolute inset-0 bg-white/70 rounded-full" />
                      )}
                    </div>
                    <p className={`mt-2 text-sm font-semibold ${badge.earned ? 'text-gray-800' : 'text-gray-400'}`}>
                      {badge.name}
                    </p>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{badge.description}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* 최근 운동 기록 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              최근 운동 기록
              <Button variant="outline" size="sm" asChild>
                <Link to="/records#workout-records">전체 보기</Link>
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentWorkouts.map((workout) => (
                <div key={workout.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <h4 className="font-medium">{workout.name}</h4>
                    <p className="text-sm text-gray-600">{workout.trainer}</p>
                    <p className="text-xs text-gray-500">{workout.date}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{workout.duration}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 팔로우한 트레이너 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              팔로우한 트레이너
              <Button variant="outline" size="sm" asChild>
                <Link to="/trainers">전체 보기</Link>
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-medium">김</span>
                  </div>
                  <div>
                    <h4 className="font-medium">김준수 트레이너</h4>
                    <p className="text-sm text-gray-600">상체 전문</p>
                  </div>
                </div>
                <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                  새 글
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <span className="text-purple-600 font-medium">이</span>
                  </div>
                  <div>
                    <h4 className="font-medium">이미영 트레이너</h4>
                    <p className="text-sm text-gray-600">다이어트 전문</p>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  2일 전
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                    <span className="text-orange-600 font-medium">박</span>
                  </div>
                  <div>
                    <h4 className="font-medium">박성호 트레이너</h4>
                    <p className="text-sm text-gray-600">하체 전문</p>
                  </div>
                </div>
                <div className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                  새 루틴
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 저장한 루틴 */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bookmark className="h-5 w-5" />
              저장한 루틴
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to="/routines?tab=saved">전체 보기</Link>
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {savedRoutines.map((routine) => (
              <div key={routine.id} className="flex items-center justify-between p-3 rounded-lg border">
                <div>
                  <h4 className="font-medium">{routine.name}</h4>
                  <p className="text-sm text-gray-600">{routine.trainer}</p>
                  <p className="text-xs text-gray-500">{routine.duration} • {routine.difficulty}</p>
                </div>
                <Button size="sm" asChild>
                  <Link to={`/routines/${routine.id}`}>시작하기</Link>
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 추천 루틴 */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            추천 루틴
            <Button variant="outline" size="sm" asChild>
              <Link to="/routines">더 보기</Link>
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendedRoutines.map((routine) => (
              <div key={routine.id} className="p-4 rounded-lg border hover:bg-gray-50 transition-colors">
                <div>
                  <h4 className="font-medium">{routine.name}</h4>
                  <p className="text-sm text-gray-600">{routine.trainer}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                    <span>⭐ {routine.rating}</span>
                    <span>•</span>
                    <span>저장 {routine.saves}회</span>
                  </div>
                  <Button size="sm" variant="outline" className="w-full mt-3">
                    시작하기
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
