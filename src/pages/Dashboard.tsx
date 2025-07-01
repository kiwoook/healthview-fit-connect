
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Calendar, Target, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
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

      <div className="grid lg:grid-cols-2 gap-8">
        {/* 최근 운동 기록 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              최근 운동 기록
              <Button variant="outline" size="sm" asChild>
                <Link to="/records">전체 보기</Link>
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

        {/* 추천 루틴 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              추천 루틴
              <Button variant="outline" size="sm" asChild>
                <Link to="/routines">더 보기</Link>
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendedRoutines.map((routine) => (
                <div key={routine.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                  <div>
                    <h4 className="font-medium">{routine.name}</h4>
                    <p className="text-sm text-gray-600">{routine.trainer}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>⭐ {routine.rating}</span>
                      <span>•</span>
                      <span>저장 {routine.saves}회</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    시작하기
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
