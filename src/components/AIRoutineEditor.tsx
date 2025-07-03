import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Edit3, 
  Plus, 
  Trash2, 
  Brain, 
  AlertTriangle, 
  CheckCircle,
  TrendingUp,
  Clock,
  Zap,
  Target
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  weight: string;
  restTime: string;
  targetMuscles: string[];
  notes: string;
}

interface WorkoutDay {
  id: string;
  name: string;
  exercises: Exercise[];
  focus: string;
}

interface Routine {
  id: string;
  name: string;
  description: string;
  workouts: WorkoutDay[];
  difficulty: string;
  daysPerWeek: number;
}

interface AIEditingSuggestion {
  type: 'warning' | 'improvement' | 'optimization';
  title: string;
  description: string;
  action?: {
    type: 'add_exercise' | 'modify_exercise' | 'remove_exercise' | 'reorder';
    details: any;
  };
  impact: {
    effectiveness: number; // -100 to +100
    difficulty: number; // -100 to +100
    time: number; // minutes change
  };
}

interface AIRoutineEditorProps {
  routine: Routine;
  onSave: (routine: Routine) => void;
}

export const AIRoutineEditor: React.FC<AIRoutineEditorProps> = ({ routine, onSave }) => {
  const [editedRoutine, setEditedRoutine] = useState<Routine>(routine);
  const [suggestions, setSuggestions] = useState<AIEditingSuggestion[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeDay, setActiveDay] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    analyzeRoutine();
  }, [editedRoutine]);

  const analyzeRoutine = async () => {
    setIsAnalyzing(true);
    
    // Mock AI analysis - 실제로는 AI API 호출
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockSuggestions: AIEditingSuggestion[] = [
      {
        type: 'warning',
        title: '근육 불균형 위험',
        description: '당기기 운동 대비 밀기 운동이 부족합니다. 어깨 부상 위험이 있습니다.',
        action: {
          type: 'add_exercise',
          details: { exerciseName: '페이스 풀', targetMuscles: ['등', '후면삼각근'] }
        },
        impact: {
          effectiveness: +25,
          difficulty: 0,
          time: +10
        }
      },
      {
        type: 'improvement',
        title: '운동 순서 최적화',
        description: '복합 운동을 먼저 배치하면 더 효과적입니다.',
        action: {
          type: 'reorder',
          details: { moveExercise: '스쿼트', toPosition: 0 }
        },
        impact: {
          effectiveness: +15,
          difficulty: -5,
          time: 0
        }
      },
      {
        type: 'optimization',
        title: '휴식 시간 조정',
        description: '복합 운동의 휴식 시간을 늘리면 성능이 향상됩니다.',
        action: {
          type: 'modify_exercise',
          details: { exerciseId: 'squat', restTime: '3분' }
        },
        impact: {
          effectiveness: +10,
          difficulty: 0,
          time: +5
        }
      }
    ];

    setSuggestions(mockSuggestions);
    setIsAnalyzing(false);
  };

  const applySuggestion = (suggestion: AIEditingSuggestion) => {
    if (!suggestion.action) return;

    const { action } = suggestion;
    const updatedRoutine = { ...editedRoutine };

    switch (action.type) {
      case 'add_exercise':
        const newExercise: Exercise = {
          id: Date.now().toString(),
          name: action.details.exerciseName,
          sets: 3,
          reps: '8-12',
          weight: '중간 중량',
          restTime: '90초',
          targetMuscles: action.details.targetMuscles,
          notes: 'AI 추천으로 추가된 운동'
        };
        updatedRoutine.workouts[activeDay].exercises.push(newExercise);
        break;
      
      case 'modify_exercise':
        const exerciseIndex = updatedRoutine.workouts[activeDay].exercises.findIndex(
          ex => ex.id === action.details.exerciseId
        );
        if (exerciseIndex !== -1) {
          updatedRoutine.workouts[activeDay].exercises[exerciseIndex] = {
            ...updatedRoutine.workouts[activeDay].exercises[exerciseIndex],
            ...action.details
          };
        }
        break;
    }

    setEditedRoutine(updatedRoutine);
    
    toast({
      title: "AI 제안 적용됨",
      description: suggestion.title,
    });
  };

  const addExercise = () => {
    const newExercise: Exercise = {
      id: Date.now().toString(),
      name: '',
      sets: 3,
      reps: '8-12',
      weight: '',
      restTime: '90초',
      targetMuscles: [],
      notes: ''
    };
    
    const updatedRoutine = { ...editedRoutine };
    updatedRoutine.workouts[activeDay].exercises.push(newExercise);
    setEditedRoutine(updatedRoutine);
  };

  const removeExercise = (exerciseId: string) => {
    const updatedRoutine = { ...editedRoutine };
    updatedRoutine.workouts[activeDay].exercises = 
      updatedRoutine.workouts[activeDay].exercises.filter(ex => ex.id !== exerciseId);
    setEditedRoutine(updatedRoutine);
  };

  const updateExercise = (exerciseId: string, field: keyof Exercise, value: any) => {
    const updatedRoutine = { ...editedRoutine };
    const exerciseIndex = updatedRoutine.workouts[activeDay].exercises.findIndex(
      ex => ex.id === exerciseId
    );
    
    if (exerciseIndex !== -1) {
      updatedRoutine.workouts[activeDay].exercises[exerciseIndex] = {
        ...updatedRoutine.workouts[activeDay].exercises[exerciseIndex],
        [field]: value
      };
      setEditedRoutine(updatedRoutine);
    }
  };

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'warning': return AlertTriangle;
      case 'improvement': return TrendingUp;
      case 'optimization': return Zap;
      default: return CheckCircle;
    }
  };

  const getSuggestionColor = (type: string) => {
    switch (type) {
      case 'warning': return 'text-red-600 bg-red-50 border-red-200';
      case 'improvement': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'optimization': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* 루틴 기본 정보 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Edit3 className="h-5 w-5" />
            루틴 편집
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="routineName">루틴 이름</Label>
              <Input
                id="routineName"
                value={editedRoutine.name}
                onChange={(e) => setEditedRoutine(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="difficulty">난이도</Label>
              <Input
                id="difficulty"
                value={editedRoutine.difficulty}
                onChange={(e) => setEditedRoutine(prev => ({ ...prev, difficulty: e.target.value }))}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">설명</Label>
            <Input
              id="description"
              value={editedRoutine.description}
              onChange={(e) => setEditedRoutine(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* 운동 편집 */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>운동 구성</CardTitle>
              <div className="flex gap-2">
                {editedRoutine.workouts.map((workout, index) => (
                  <Button
                    key={workout.id}
                    variant={activeDay === index ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveDay(index)}
                  >
                    Day {index + 1}
                  </Button>
                ))}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>운동일 이름</Label>
                <Input
                  value={editedRoutine.workouts[activeDay]?.name || ''}
                  onChange={(e) => {
                    const updatedRoutine = { ...editedRoutine };
                    updatedRoutine.workouts[activeDay].name = e.target.value;
                    setEditedRoutine(updatedRoutine);
                  }}
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label>운동 목록</Label>
                  <Button onClick={addExercise} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    운동 추가
                  </Button>
                </div>

                {editedRoutine.workouts[activeDay]?.exercises.map((exercise, index) => (
                  <div key={exercise.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="font-medium">운동 {index + 1}</div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeExercise(exercise.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs">운동명</Label>
                        <Input
                          placeholder="운동명"
                          value={exercise.name}
                          onChange={(e) => updateExercise(exercise.id, 'name', e.target.value)}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">세트</Label>
                        <Input
                          type="number"
                          value={exercise.sets}
                          onChange={(e) => updateExercise(exercise.id, 'sets', parseInt(e.target.value))}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">반복 횟수</Label>
                        <Input
                          placeholder="8-12"
                          value={exercise.reps}
                          onChange={(e) => updateExercise(exercise.id, 'reps', e.target.value)}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">휴식 시간</Label>
                        <Input
                          placeholder="90초"
                          value={exercise.restTime}
                          onChange={(e) => updateExercise(exercise.id, 'restTime', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI 제안 */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                AI 편집 제안
                {isAnalyzing && <div className="h-2 w-2 bg-primary rounded-full animate-pulse" />}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                실시간으로 루틴을 분석하여 개선 제안을 제공합니다
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {suggestions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Brain className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">분석 중...</p>
                </div>
              ) : (
                suggestions.map((suggestion, index) => {
                  const Icon = getSuggestionIcon(suggestion.type);
                  
                  return (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border ${getSuggestionColor(suggestion.type)}`}
                    >
                      <div className="flex items-start gap-3">
                        <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
                        <div className="flex-1 space-y-2">
                          <h4 className="font-medium text-sm">{suggestion.title}</h4>
                          <p className="text-xs opacity-90">{suggestion.description}</p>
                          
                          {/* 영향도 표시 */}
                          <div className="flex gap-2 text-xs">
                            {suggestion.impact.effectiveness > 0 && (
                              <Badge variant="outline" className="h-5">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                +{suggestion.impact.effectiveness}% 효과
                              </Badge>
                            )}
                            {suggestion.impact.time !== 0 && (
                              <Badge variant="outline" className="h-5">
                                <Clock className="h-3 w-3 mr-1" />
                                {suggestion.impact.time > 0 ? '+' : ''}{suggestion.impact.time}분
                              </Badge>
                            )}
                          </div>
                          
                          {suggestion.action && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="w-full mt-2"
                              onClick={() => applySuggestion(suggestion)}
                            >
                              적용하기
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </CardContent>
          </Card>

          <Button
            className="w-full mt-4"
            onClick={() => onSave(editedRoutine)}
            size="lg"
          >
            루틴 저장
          </Button>
        </div>
      </div>
    </div>
  );
};