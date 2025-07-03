
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dumbbell } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, TrendingUp, Clock, Target } from "lucide-react";
import { AIRoutineAnalysis } from "@/components/AIRoutineAnalysis";

const Records = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // 더미 데이터
  const weeklyStats = {
    totalWorkouts: 5,
    totalTime: 225, // 분
    avgDuration: 45,
    streak: 7
  };

  // 운동 기록이 있는 날짜들
  const workoutDates = [
    { date: "2024-01-15", bodyParts: ["가슴", "어깨", "삼두"], duration: 45 },
    { date: "2024-01-13", bodyParts: ["하체", "엉덩이"], duration: 50 },
    { date: "2024-01-11", bodyParts: ["전신"], duration: 30 },
    { date: "2024-01-09", bodyParts: ["등", "이두"], duration:40 },
    { date: "2024-01-07", bodyParts: ["가슴", "삼두"], duration: 35 },
    { date: "2024-01-05", bodyParts: ["하체"], duration: 55 },
    { date: "2024-01-03", bodyParts: ["어깨", "복부"], duration: 30 },
    { date: "2024-01-17", bodyParts: ["등"], duration: 45 },
    { date: "2024-01-19", bodyParts: ["하체"], duration: 60 },
    { date: "2024-01-21", bodyParts: ["가슴", "어깨"], duration: 50 },
    { date: "2024-01-22", bodyParts: ["팔"], duration: 35 },
    { date: "2024-01-24", bodyParts: ["어깨"], duration: 40 },
    { date: "2024-01-26", bodyParts: ["전신"], duration: 55 },
    { date: "2024-01-28", bodyParts: ["하체"], duration: 65 },
    { date: "2024-01-30", bodyParts: ["등", "이두"], duration: 50 },
  ];

  // 운동 부위 및 색상 설정
  const bodyPartConfig: Record<string, { key: string; name: string; style: React.CSSProperties }> = {
    "가슴": { key: "chest", name: "가슴", style: { backgroundColor: 'hsl(var(--workout-chest))', color: 'hsl(var(--workout-chest-foreground))' } },
    "등": { key: "back", name: "등", style: { backgroundColor: 'hsl(var(--workout-back))', color: 'hsl(var(--workout-back-foreground))' } },
    "하체": { key: "legs", name: "하체", style: { backgroundColor: 'hsl(var(--workout-legs))', color: 'hsl(var(--workout-legs-foreground))' } },
    "어깨": { key: "shoulders", name: "어깨", style: { backgroundColor: 'hsl(var(--workout-shoulders))', color: 'hsl(var(--workout-shoulders-foreground))' } },
    "팔": { key: "arms", name: "팔", style: { backgroundColor: 'hsl(var(--workout-arms))', color: 'hsl(var(--workout-arms-foreground))' } },
    "전신": { key: "fullbody", name: "전신", style: { backgroundColor: 'hsl(var(--workout-fullbody))', color: 'hsl(var(--workout-fullbody-foreground))' } },
  };

  // 데이터에 있는 다른 부위 이름들을 대표 부위로 매핑
  const bodyPartAliases: Record<string, keyof typeof bodyPartConfig> = {
    "이두": "팔",
    "삼두": "팔",
    "엉덩이": "하체",
    "복부": "전신",
    "코어": "전신",
  };

  // 캘린더에 표시할 날짜별 운동 부위 데이터 가공
  const workoutByDate = workoutDates.reduce((acc, workout) => {
    if (workout.bodyParts.length > 0) {
      const primaryPart = workout.bodyParts[0];
      const mappedPart = bodyPartAliases[primaryPart] || primaryPart;
      if (bodyPartConfig[mappedPart]) {
        acc[workout.date] = bodyPartConfig[mappedPart].key;
      }
    }
    return acc;
  }, {} as Record<string, string>);

  // 캘린더에 적용할 동적 modifiers와 styles 생성
  const modifiers = Object.values(bodyPartConfig).reduce((acc, { key }) => {
    acc[key] = (date: Date) => {
      const dateString = date.toISOString().split('T')[0];
      return workoutByDate[dateString] === key;
    };
    return acc;
  }, {} as Record<string, (date: Date) => boolean>);

  const modifiersStyles = Object.values(bodyPartConfig).reduce((acc, { key, style }) => {
    acc[key] = { ...style, fontWeight: 'bold' };
    return acc;
  }, {} as Record<string, React.CSSProperties>);

  // 특정 날짜에 운동 기록이 있는지 확인
  const getWorkoutForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return workoutDates.find(workout => workout.date === dateString);
  };

  // 선택된 날짜의 운동 상세 정보
  const selectedDateWorkout = selectedDate ? getWorkoutForDate(selectedDate) : null;

  const monthlyProgress = [
    { week: "1주차", workouts: 3, time: 135 },
    { week: "2주차", workouts: 4, time: 180 },
    { week: "3주차", workouts: 5, time: 225 },
    { week: "4주차", workouts: 4, time: 200 },
  ];

  // AI 분석을 위한 운동 데이터 변환
  const workoutDataForAnalysis = [
    {
      date: "2024-01-15",
      exercises: [
        {
          name: "벤치프레스",
          sets: [
            { reps: 12, weight: 60 }, { reps: 10, weight: 65 }, { reps: 8, weight: 70 }, { reps: 8, weight: 70 },
            { reps: 6, weight: 75 }, { reps: 6, weight: 75 }, { reps: 5, weight: 80 }, { reps: 5, weight: 80 }
          ],
          targetMuscles: ["가슴", "어깨", "삼두"]
        },
        {
          name: "덤벨 플라이",
          sets: [
            { reps: 15, weight: 15 }, { reps: 12, weight: 15 }, { reps: 10, weight: 15 }
          ],
          targetMuscles: ["가슴"]
        },
        {
          name: "숄더 프레스",
          sets: [
            { reps: 12, weight: 20 }, { reps: 10, weight: 22 }, { reps: 8, weight: 25 }
          ],
          targetMuscles: ["어깨"]
        }
      ],
      duration: 45,
      difficulty: 'moderate' as const,
      fatigue: 6
    },
    {
      date: "2024-01-13",
      exercises: [
        {
          name: "스쿼트",
          sets: [
            { reps: 15, weight: 70 }, { reps: 12, weight: 80 }, { reps: 10, weight: 90 }, { reps: 8, weight: 100 }
          ],
          targetMuscles: ["하체", "엉덩이"]
        },
        {
          name: "런지",
          sets: [
            { reps: 12, weight: 20 }, { reps: 12, weight: 20 }, { reps: 10, weight: 25 }
          ],
          targetMuscles: ["하체", "엉덩이"]
        },
        {
          name: "레그 프레스",
          sets: [
            { reps: 15, weight: 150 }, { reps: 12, weight: 160 }, { reps: 10, weight: 170 }
          ],
          targetMuscles: ["하체"]
        }
      ],
      duration: 50,
      difficulty: 'hard' as const,
      fatigue: 8
    },
    {
      date: "2024-01-11",
      exercises: [
        {
          name: "버피",
          sets: [
            { reps: 10, weight: 0 }, { reps: 8, weight: 0 }, { reps: 6, weight: 0 }
          ],
          targetMuscles: ["전신"]
        },
        {
          name: "마운틴 클라이머",
          sets: [
            { reps: 30, weight: 0 }, { reps: 25, weight: 0 }, { reps: 20, weight: 0 }
          ],
          targetMuscles: ["전신"]
        },
        {
          name: "점핑잭",
          sets: [
            { reps: 30, weight: 0 }, { reps: 30, weight: 0 }, { reps: 25, weight: 0 }
          ],
          targetMuscles: ["전신"]
        }
      ],
      duration: 30,
      difficulty: 'moderate' as const,
      fatigue: 5
    },
    {
      date: "2024-01-09",
      exercises: [
        {
          name: "풀업",
          sets: [
            { reps: 8, weight: 0 }, { reps: 6, weight: 0 }, { reps: 4, weight: 0 }
          ],
          targetMuscles: ["등", "이두"]
        },
        {
          name: "바벨 로우",
          sets: [
            { reps: 12, weight: 50 }, { reps: 10, weight: 55 }, { reps: 8, weight: 60 }
          ],
          targetMuscles: ["등"]
        },
        {
          name: "바이셉 컬",
          sets: [
            { reps: 15, weight: 12 }, { reps: 12, weight: 15 }, { reps: 10, weight: 15 }
          ],
          targetMuscles: ["이두"]
        }
      ],
      duration: 40,
      difficulty: 'moderate' as const,
      fatigue: 6
    },
    {
      date: "2024-01-07",
      exercises: [
        {
          name: "인클라인 벤치프레스",
          sets: [
            { reps: 10, weight: 45 }, { reps: 8, weight: 50 }, { reps: 6, weight: 55 }
          ],
          targetMuscles: ["가슴", "어깨"]
        },
        {
          name: "딥스",
          sets: [
            { reps: 12, weight: 0 }, { reps: 10, weight: 0 }, { reps: 8, weight: 0 }
          ],
          targetMuscles: ["가슴", "삼두"]
        },
        {
          name: "오버헤드 프레스",
          sets: [
            { reps: 10, weight: 30 }, { reps: 8, weight: 32 }, { reps: 6, weight: 35 }
          ],
          targetMuscles: ["어깨", "삼두"]
        }
      ],
      duration: 35,
      difficulty: 'easy' as const,
      fatigue: 4
    }
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
        { 
          name: "벤치프레스",
          sets: 8,
          reps: "12, 10, 8, 8, 6, 6, 5, 5",
          weight: "60, 65, 70, 70, 75, 75, 80, 80", 
        },
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
    },
    {
      id: 4,
      date: "2024-01-09",
      routine: "등과 이두 운동",
      trainer: "박성호",
      duration: 40,
      bodyParts: ["등", "이두"],
      exercises: [
        { name: "풀업", sets: 3, reps: "8, 6, 4", weight: "체중" },
        { name: "바벨 로우", sets: 3, reps: "12, 10, 8", weight: "50, 55, 60" },
        { name: "바이셉 컬", sets: 3, reps: "15, 12, 10", weight: "12, 15, 15" },
      ]
    },
    {
      id: 5,
      date: "2024-01-07",
      routine: "상체 보조 운동",
      trainer: "김준수",
      duration: 35,
      bodyParts: ["가슴", "삼두"],
      exercises: [
        { name: "인클라인 벤치프레스", sets: 3, reps: "10, 8, 6", weight: "45, 50, 55" },
        { name: "딥스", sets: 3, reps: "12, 10, 8", weight: "체중" },
        { name: "오버헤드 프레스", sets: 3, reps: "10, 8, 6", weight: "30, 32, 35" },
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

          <div className="grid lg:grid-cols-3 gap-6">
            {/* 캘린더 */}
            <Card>
              <CardHeader>
                <CardTitle>운동 캘린더</CardTitle>
                <p className="text-sm text-muted-foreground">운동한 날을 클릭하여 상세 정보를 확인하세요</p>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border w-full"
                  modifiers={modifiers}
                  modifiersStyles={modifiersStyles}
                />
                
                {/* 범례 */}
                <div className="mt-4 space-y-2 text-sm">
                  <p className="font-semibold">운동 부위 범례</p>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {Object.values(bodyPartConfig).map(({ key, name, style }) => (
                      <div key={key} className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: style.backgroundColor as string }}></span>
                        <span>{name}</span>
                      </div>
                    ))}

                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 선택된 날짜 상세 정보 */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {selectedDate ? selectedDate.toLocaleDateString('ko-KR') : '날짜를 선택하세요'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedDateWorkout ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{selectedDateWorkout.duration}분</span>
                      </div>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        운동 완료
                      </Badge>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">운동 부위</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedDateWorkout.bodyParts.map((part) => (
                          <div key={part} className="flex items-center gap-2">
                            <div 
                              className="w-3 h-3 rounded-full"
                              style={{
                                backgroundColor: bodyPartConfig[bodyPartAliases[part] || part]?.style.backgroundColor || 'hsl(var(--muted))'
                              }}
                            ></div>
                            <Badge variant="secondary" className="text-xs">
                              {part}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t">
                      <p className="text-sm text-muted-foreground">
                        총 {selectedDateWorkout.bodyParts.length}개 부위를 {selectedDateWorkout.duration}분간 운동했습니다.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      {selectedDate ? '이 날은 운동하지 않았습니다.' : '캘린더에서 날짜를 선택해주세요.'}
                    </p>
                  </div>
                )}
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
                  <div className="flex flex-wrap justify-center gap-3">
                     {workout.exercises.map((exercise, index) => (
                       <div key={index} className="bg-gray-50 rounded-lg p-3">
                        <div className="flex flex-col items-center gap-3 text-sm">
                           <div className="flex items-center gap-2 shrink-0">
                             <div className="bg-blue-100 p-2 rounded-full">
                               <Dumbbell className="w-5 h-5 text-blue-600" />
                             </div>
                             <div className="font-semibold text-gray-800 text-base">{exercise.name}</div>
                           </div>
                           <div className="flex flex-col flex-wrap content-start items-start gap-x-4 gap-y-1 max-h-[10rem]">
                            {(() => {
                              const repsArray = String(exercise.reps).split(', ');
                              if (exercise.weight === '체중') {
                                return repsArray.map((rep, setIndex) => (
                                  <span key={setIndex} className="font-mono bg-gray-200 text-gray-800 px-2 py-1 rounded-md whitespace-nowrap">
                                    {rep} x {exercise.weight}
                                  </span>
                                ));
                              }
                              const weightArray = String(exercise.weight).split(', ');
                              return repsArray.map((rep, setIndex) => (
                                <span key={setIndex} className="font-mono bg-gray-200 text-gray-800 px-2 py-1 rounded-md whitespace-nowrap">
                                  {rep} x {weightArray[setIndex] || '0'}kg
                                </span>
                              ));
                            })()}
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
          <AIRoutineAnalysis workoutHistory={workoutDataForAnalysis} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Records;
