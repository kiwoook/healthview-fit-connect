import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Loader2, Sparkles, Target, TrendingUp, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface AIRoutineRequest {
  goal: string;
  targetBodyParts: string[];
  workoutDays: number;
  sessionDuration: string;
  fitnessLevel: string;
  preferences: string;
  specificRequests: string;
}

interface GeneratedRoutine {
  id: string;
  name: string;
  description: string;
  duration: string;
  difficulty: string;
  daysPerWeek: number;
  estimatedCalories: number;
  focus: string[];
  workouts: WorkoutDay[];
  aiAnalysis: {
    rationale: string;
    expectedResults: string;
    progressTimeline: string;
    recommendations: string[];
  };
}

interface WorkoutDay {
  day: number;
  name: string;
  focus: string;
  exercises: Exercise[];
  estimatedDuration: number;
}

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  weight: string;
  restTime: string;
  notes: string;
  targetMuscles: string[];
}

interface AIRoutineGeneratorProps {
  onRoutineGenerated: (routine: GeneratedRoutine) => void;
}

export const AIRoutineGenerator: React.FC<AIRoutineGeneratorProps> = ({ onRoutineGenerated }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [request, setRequest] = useState<AIRoutineRequest>({
    goal: '',
    targetBodyParts: [],
    workoutDays: 3,
    sessionDuration: '45분',
    fitnessLevel: 'intermediate',
    preferences: '',
    specificRequests: ''
  });
  const { toast } = useToast();
  const { user } = useAuth();

  const bodyParts = [
    '가슴', '등', '어깨', '이두', '삼두', '복부', '하체', '둔근', '종아리'
  ];

  const goals = [
    { value: 'weight_loss', label: '체중 감량' },
    { value: 'muscle_gain', label: '근육 증가' },
    { value: 'strength', label: '근력 향상' },
    { value: 'endurance', label: '지구력 향상' },
    { value: 'toning', label: '근육 톤업' },
    { value: 'general_fitness', label: '전반적 체력' }
  ];

  const handleBodyPartToggle = (bodyPart: string) => {
    setRequest(prev => ({
      ...prev,
      targetBodyParts: prev.targetBodyParts.includes(bodyPart)
        ? prev.targetBodyParts.filter(bp => bp !== bodyPart)
        : [...prev.targetBodyParts, bodyPart]
    }));
  };

  const simulateAIGeneration = async (): Promise<GeneratedRoutine> => {
    // 실제 구현에서는 AI API 호출
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockRoutine: GeneratedRoutine = {
      id: Date.now().toString(),
      name: `AI 맞춤형 ${request.goal === 'weight_loss' ? '체지방 감량' : '근력 증가'} 루틴`,
      description: '당신의 목표와 현재 체력 수준을 바탕으로 AI가 설계한 맞춤형 운동 루틴입니다.',
      duration: request.sessionDuration,
      difficulty: request.fitnessLevel === 'beginner' ? '초급' : request.fitnessLevel === 'intermediate' ? '중급' : '고급',
      daysPerWeek: request.workoutDays,
      estimatedCalories: 300,
      focus: request.targetBodyParts.length > 0 ? request.targetBodyParts : ['전신'],
      workouts: [
        {
          day: 1,
          name: '상체 집중 운동',
          focus: '가슴, 등, 어깨',
          estimatedDuration: 45,
          exercises: [
            {
              name: '벤치프레스',
              sets: 3,
              reps: '8-12',
              weight: '본인 체중의 70%',
              restTime: '2분',
              notes: '가슴 중앙 부위 집중, 천천히 내리고 빠르게 올리기',
              targetMuscles: ['가슴', '삼두', '어깨']
            },
            {
              name: '풀업',
              sets: 3,
              reps: '5-10',
              weight: '체중',
              restTime: '2분 30초',
              notes: '등 너비 발달에 효과적, 가능하면 보조기구 사용',
              targetMuscles: ['등', '이두']
            },
            {
              name: '숄더프레스',
              sets: 3,
              reps: '10-15',
              weight: '중간 중량',
              restTime: '1분 30초',
              notes: '어깨 전면과 측면 동시 발달',
              targetMuscles: ['어깨', '삼두']
            }
          ]
        },
        {
          day: 2,
          name: '하체 강화 운동',
          focus: '하체, 둔근',
          estimatedDuration: 50,
          exercises: [
            {
              name: '스쿼트',
              sets: 4,
              reps: '12-15',
              weight: '본인 체중의 80%',
              restTime: '2분',
              notes: '무릎이 발끝을 넘지 않도록 주의, 둔근 수축 의식',
              targetMuscles: ['하체', '둔근']
            },
            {
              name: '데드리프트',
              sets: 3,
              reps: '6-10',
              weight: '중간-고중량',
              restTime: '3분',
              notes: '허리를 곧게 유지, 엉덩이부터 올리기',
              targetMuscles: ['하체', '등', '둔근']
            },
            {
              name: '불가리안 스플릿 스쿼트',
              sets: 3,
              reps: '각 다리 10-12회',
              weight: '덤벨 또는 체중',
              restTime: '1분 30초',
              notes: '단일 다리 강화, 균형감각 향상',
              targetMuscles: ['하체', '둔근']
            }
          ]
        }
      ],
      aiAnalysis: {
        rationale: `${user?.name}님의 운동 목표(${request.goal})와 현재 체력 수준(${request.fitnessLevel})을 고려하여 설계되었습니다. 선택하신 신체 부위를 집중적으로 발달시키면서도 전체적인 균형을 유지하도록 구성했습니다.`,
        expectedResults: '4-6주 후 근력 10-15% 향상, 근지구력 20% 증가가 예상됩니다. 꾸준히 수행하시면 원하시는 신체 변화를 경험하실 수 있습니다.',
        progressTimeline: '1-2주차: 움직임 패턴 학습, 3-4주차: 근력 향상 체감, 5-8주차: 눈에 띄는 신체 변화',
        recommendations: [
          '운동 전후 10분씩 스트레칭 필수',
          '중량은 점진적으로 증가시키기',
          '충분한 수면과 단백질 섭취',
          '주 1-2회 유산소 운동 병행 권장'
        ]
      }
    };

    return mockRoutine;
  };

  const handleGenerate = async () => {
    if (!request.goal || request.targetBodyParts.length === 0) {
      toast({
        title: "입력 정보 부족",
        description: "운동 목표와 목표 부위를 선택해주세요.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    setProgress(0);

    try {
      // Progress simulation
      const progressSteps = [
        { step: 20, message: '사용자 데이터 분석 중...' },
        { step: 40, message: '최적 운동 조합 계산 중...' },
        { step: 60, message: '운동 강도 조절 중...' },
        { step: 80, message: '루틴 구성 완료 중...' },
        { step: 100, message: '최종 검토 중...' }
      ];

      for (const { step, message } of progressSteps) {
        setProgress(step);
        await new Promise(resolve => setTimeout(resolve, 800));
      }

      const generatedRoutine = await simulateAIGeneration();
      
      onRoutineGenerated(generatedRoutine);
      
      toast({
        title: "AI 루틴 생성 완료!",
        description: "당신만의 맞춤형 운동 루틴이 생성되었습니다.",
      });

    } catch (error) {
      toast({
        title: "생성 실패",
        description: "루틴 생성 중 오류가 발생했습니다.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
      setProgress(0);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          AI 맞춤형 루틴 생성기
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          당신의 목표와 현재 상태를 분석하여 최적의 운동 루틴을 생성합니다
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {isGenerating ? (
          <div className="space-y-4 text-center py-8">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">AI가 당신만의 루틴을 생성하고 있습니다...</p>
              <Progress value={progress} className="w-full" />
              <p className="text-xs text-muted-foreground">{progress}%</p>
            </div>
          </div>
        ) : (
          <>
            {/* 운동 목표 */}
            <div className="space-y-2">
              <Label htmlFor="goal">운동 목표</Label>
              <Select value={request.goal} onValueChange={(value) => setRequest(prev => ({ ...prev, goal: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="주요 운동 목표를 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  {goals.map(goal => (
                    <SelectItem key={goal.value} value={goal.value}>
                      {goal.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 목표 부위 */}
            <div className="space-y-2">
              <Label>집중하고 싶은 신체 부위</Label>
              <div className="flex flex-wrap gap-2">
                {bodyParts.map(bodyPart => (
                  <Badge
                    key={bodyPart}
                    variant={request.targetBodyParts.includes(bodyPart) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleBodyPartToggle(bodyPart)}
                  >
                    {bodyPart}
                  </Badge>
                ))}
              </div>
            </div>

            {/* 운동 빈도 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="workoutDays">주당 운동 일수</Label>
                <Select value={request.workoutDays.toString()} onValueChange={(value) => setRequest(prev => ({ ...prev, workoutDays: parseInt(value) }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">주 2회</SelectItem>
                    <SelectItem value="3">주 3회</SelectItem>
                    <SelectItem value="4">주 4회</SelectItem>
                    <SelectItem value="5">주 5회</SelectItem>
                    <SelectItem value="6">주 6회</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sessionDuration">회당 운동 시간</Label>
                <Select value={request.sessionDuration} onValueChange={(value) => setRequest(prev => ({ ...prev, sessionDuration: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30분">30분</SelectItem>
                    <SelectItem value="45분">45분</SelectItem>
                    <SelectItem value="60분">60분</SelectItem>
                    <SelectItem value="75분">75분</SelectItem>
                    <SelectItem value="90분">90분</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* 체력 수준 */}
            <div className="space-y-2">
              <Label htmlFor="fitnessLevel">현재 체력 수준</Label>
              <Select value={request.fitnessLevel} onValueChange={(value) => setRequest(prev => ({ ...prev, fitnessLevel: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">초급 (운동 경험 3개월 미만)</SelectItem>
                  <SelectItem value="intermediate">중급 (운동 경험 3개월~2년)</SelectItem>
                  <SelectItem value="advanced">고급 (운동 경험 2년 이상)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 운동 선호도 */}
            <div className="space-y-2">
              <Label htmlFor="preferences">운동 선호도 (선택사항)</Label>
              <Input
                id="preferences"
                placeholder="예: 웨이트 위주, 유산소 포함, 집에서 가능한 운동 등"
                value={request.preferences}
                onChange={(e) => setRequest(prev => ({ ...prev, preferences: e.target.value }))}
              />
            </div>

            {/* 특별 요청사항 */}
            <div className="space-y-2">
              <Label htmlFor="specificRequests">특별 요청사항 (선택사항)</Label>
              <Textarea
                id="specificRequests"
                placeholder="예: 무릎 부상 있음, 특정 운동 제외, 강도 조절 등"
                value={request.specificRequests}
                onChange={(e) => setRequest(prev => ({ ...prev, specificRequests: e.target.value }))}
                rows={3}
              />
            </div>

            <Button 
              onClick={handleGenerate}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              size="lg"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              AI 루틴 생성하기
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};