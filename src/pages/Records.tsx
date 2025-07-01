
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, TrendingUp, Clock, Target } from "lucide-react";

const Records = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // 더미 데이터
  const weeklyStats = {
    totalWorkouts: 5,
    totalTime: 225, // 분
    avgDuration: 45,
    streak: 7
  };

  const monthlyProgress = [
    { week: "1주차", workouts: 3, time: 135 },
    { week: "2주차", workouts: 4, time: 180 },
    { week: "3주차", workouts: 5, time: 225 },
    { week: "4주차", workouts: 4, time: 200 },
  ];

  const workoutHistory = [
    {
      id: 1,
      date: "2024-01-15",
      routine: "상체 집중 루틴",
      trainer: "김준수",
      duration: 45,
      bodyParts: ["가슴", "어깨", "삼두"],
      exercises: [
        { name: "벤치프레스", sets: 3, reps: "12, 10, 8", weight: "60, 65, 70" },
        { name: "덤벨 플라이", sets: 3, reps: "15, 12, 10", weight: "15, 15, 15" },
        { name: "숄더 프레스", sets: 3, reps: "12, 10, 8", weight: "20, 22, 25" },
      ]
    },
    {
      id: 2,
      date: "2024-01-13",
      routine: "하체 강화 운동",
      trainer: "이미영",
      duration: 50,
      bodyParts: ["하체", "엉덩이"],
      exercises: [
        { name: "스쿼트", sets: 4, reps: "15, 12, 10, 8", weight: "70, 80, 90, 100" },
        { name: "런지", sets: 3, reps: "12, 12, 10", weight: "20, 20, 25" },
        { name: "레그 프레스", sets: 3, reps: "15, 12, 10", weight: "150, 160, 170" },
      ]
    },
    {
      id: 3,
      date: "2024-01-11",
      routine: "전신 유산소",
      trainer: "박성호",
      duration: 30,
      bodyParts: ["전신"],
      exercises: [
        { name: "버피", sets: 3, reps: "10, 8, 6", weight: "체중" },
        { name: "마운틴 클라이머", sets: 3, reps: "30, 25, 20", weight: "체중" },
        { name: "점핑잭", sets: 3, reps: "30, 30, 25", weight: "체중" },
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">운동 기록</h1>
        <p className="text-gray-600">나의 운동 성과와 기록을 확인해보세요</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="history">운동 기록</TabsTrigger>
          <TabsTrigger value="analytics">분석</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* 주요 통계 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">이번 주 운동</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{weeklyStats.totalWorkouts}회</div>
                <p className="text-xs text-muted-foreground">목표: 5회</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">총 운동 시간</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{Math.floor(weeklyStats.totalTime / 60)}시간 {weeklyStats.totalTime % 60}분</div>
                <p className="text-xs text-muted-foreground">이번 주</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">평균 운동 시간</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{weeklyStats.avgDuration}분</div>
                <p className="text-xs text-muted-foreground">1회 평균</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">연속 운동</CardTitle>
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{weeklyStats.streak}일</div>
                <p className="text-xs text-muted-foreground">연속 기록</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* 캘린더 */}
            <Card>
              <CardHeader>
                <CardTitle>운동 캘린더</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border w-full"
                />
              </CardContent>
            </Card>

            {/* 월별 진행률 */}
            <Card>
              <CardHeader>
                <CardTitle>월별 진행률</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyProgress.map((week, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">{week.week}</div>
                        <div className="text-sm text-gray-600">
                          {week.workouts}회 • {Math.floor(week.time / 60)}시간 {week.time % 60}분
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${(week.workouts / 7) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">운동 기록 목록</h2>
            <Button>새 운동 기록</Button>
          </div>

          <div className="space-y-4">
            {workoutHistory.map((workout) => (
              <Card key={workout.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{workout.routine}</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">
                        {workout.trainer} • {workout.date} • {workout.duration}분
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {workout.bodyParts.map((part) => (
                        <Badge key={part} variant="secondary">
                          {part}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {workout.exercises.map((exercise, index) => (
                      <div key={index} className="border rounded-lg p-3">
                        <div className="font-medium mb-2">{exercise.name}</div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">세트: </span>
                            <span>{exercise.sets}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">횟수: </span>
                            <span>{exercise.reps}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">중량: </span>
                            <span>{exercise.weight}kg</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>운동 분석</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-gray-500">운동 분석 차트가 여기에 표시됩니다.</p>
                <p className="text-sm text-gray-400 mt-2">더 많은 데이터가 쌓이면 상세한 분석을 제공합니다.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Records;
