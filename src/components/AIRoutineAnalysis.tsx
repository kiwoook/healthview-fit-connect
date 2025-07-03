import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  TrendingUp, 
  Target, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Zap,
  Award,
  BarChart3
} from 'lucide-react';

interface WorkoutData {
  date: string;
  exercises: {
    name: string;
    sets: { reps: number; weight: number; }[];
    targetMuscles: string[];
  }[];
  duration: number;
  difficulty: 'easy' | 'moderate' | 'hard';
  fatigue: number; // 1-10
}

interface AnalysisResult {
  overall_score: number;
  strengths: string[];
  weaknesses: string[];
  improvements: {
    category: string;
    suggestion: string;
    priority: 'high' | 'medium' | 'low';
  }[];
  progress_trend: 'improving' | 'stable' | 'declining';
  volume_analysis: {
    current_volume: number;
    optimal_volume: number;
    volume_status: 'too_low' | 'optimal' | 'too_high';
  };
  muscle_balance: {
    muscle_group: string;
    development_level: number;
  }[];
  recommendations: {
    title: string;
    description: string;
    expected_benefit: string;
  }[];
}

interface AIRoutineAnalysisProps {
  workoutHistory: WorkoutData[];
  currentRoutine?: any;
}

export const AIRoutineAnalysis: React.FC<AIRoutineAnalysisProps> = ({ 
  workoutHistory, 
  currentRoutine 
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

  // Mock analysis function - 실제로는 AI API 호출
  const performAnalysis = async (): Promise<AnalysisResult> => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return {
      overall_score: 78,
      strengths: [
        '꾸준한 운동 빈도 유지',
        '적절한 휴식 시간 준수',
        '다양한 운동 종목 수행'
      ],
      weaknesses: [
        '하체 운동 비중 부족',
        '점진적 과부하 원칙 미적용',
        '유산소 운동 부족'
      ],
      improvements: [
        {
          category: '운동 균형',
          suggestion: '하체 운동 비중을 전체의 40%로 늘리세요',
          priority: 'high'
        },
        {
          category: '강도 조절',
          suggestion: '주 1회 고강도 운동을 추가하세요',
          priority: 'medium'
        },
        {
          category: '회복',
          suggestion: '운동 후 스트레칭 시간을 늘리세요',
          priority: 'low'
        }
      ],
      progress_trend: 'improving',
      volume_analysis: {
        current_volume: 16,
        optimal_volume: 20,
        volume_status: 'too_low'
      },
      muscle_balance: [
        { muscle_group: '가슴', development_level: 85 },
        { muscle_group: '등', development_level: 82 },
        { muscle_group: '어깨', development_level: 78 },
        { muscle_group: '이두', development_level: 75 },
        { muscle_group: '삼두', development_level: 80 },
        { muscle_group: '하체', development_level: 65 },
        { muscle_group: '복부', development_level: 70 }
      ],
      recommendations: [
        {
          title: '하체 운동 강화',
          description: '스쿼트와 데드리프트의 빈도를 주 2회로 늘리고, 불가리안 스플릿 스쿼트를 추가하세요.',
          expected_benefit: '하체 근력 20% 향상, 전신 균형 개선'
        },
        {
          title: '점진적 과부하 적용',
          description: '매주 중량을 2.5kg씩 증가시키거나 반복 횟수를 1-2회 늘려보세요.',
          expected_benefit: '근력 지속적 향상, 정체기 극복'
        },
        {
          title: '유산소 운동 병행',
          description: '주 2회, 20-30분 중강도 유산소 운동을 추가하세요.',
          expected_benefit: '심폐지구력 향상, 체지방 감소'
        }
      ]
    };
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const result = await performAnalysis();
      setAnalysis(result);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          AI 루틴 분석 및 개선 제안
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          최근 운동 기록을 바탕으로 루틴의 효과성을 분석하고 개선 방안을 제안합니다
        </p>
      </CardHeader>

      <CardContent>
        {!analysis ? (
          <div className="text-center py-8">
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">운동 데이터 분석</h3>
                <p className="text-muted-foreground mb-4">
                  최근 {workoutHistory.length}회의 운동 기록을 분석하여 개선점을 찾아드립니다
                </p>
                <Button 
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {isAnalyzing ? (
                    <>
                      <Brain className="mr-2 h-4 w-4 animate-pulse" />
                      AI 분석 진행 중...
                    </>
                  ) : (
                    <>
                      <Brain className="mr-2 h-4 w-4" />
                      AI 분석 시작
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">종합 평가</TabsTrigger>
              <TabsTrigger value="balance">근육 균형</TabsTrigger>
              <TabsTrigger value="improvements">개선 제안</TabsTrigger>
              <TabsTrigger value="recommendations">추천사항</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* 종합 점수 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    종합 점수
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4">
                    <div className={`text-6xl font-bold ${getScoreColor(analysis.overall_score)}`}>
                      {analysis.overall_score}
                    </div>
                    <div className="text-lg text-muted-foreground">/ 100점</div>
                    <Progress value={analysis.overall_score} className="w-full" />
                  </div>
                </CardContent>
              </Card>

              {/* 강점 & 약점 */}
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="h-5 w-5" />
                      강점
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {analysis.strengths.map((strength, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{strength}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-orange-600">
                      <AlertTriangle className="h-5 w-5" />
                      개선 필요
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {analysis.weaknesses.map((weakness, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                        <span className="text-sm">{weakness}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* 운동량 분석 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    운동량 분석
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>현재 주간 운동량</span>
                      <span className="font-semibold">{analysis.volume_analysis.current_volume}세트</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>권장 운동량</span>
                      <span className="font-semibold text-green-600">{analysis.volume_analysis.optimal_volume}세트</span>
                    </div>
                    <Progress 
                      value={(analysis.volume_analysis.current_volume / analysis.volume_analysis.optimal_volume) * 100} 
                      className="w-full" 
                    />
                    <div className="text-sm text-muted-foreground">
                      {analysis.volume_analysis.volume_status === 'too_low' && '운동량을 늘려보세요'}
                      {analysis.volume_analysis.volume_status === 'optimal' && '적절한 운동량입니다'}
                      {analysis.volume_analysis.volume_status === 'too_high' && '운동량을 줄이는 것을 고려해보세요'}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="balance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>근육군별 발달 수준</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    각 근육군의 상대적 발달 수준을 보여줍니다
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {analysis.muscle_balance.map((muscle, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{muscle.muscle_group}</span>
                        <span className={`font-semibold ${getScoreColor(muscle.development_level)}`}>
                          {muscle.development_level}%
                        </span>
                      </div>
                      <Progress value={muscle.development_level} className="w-full" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="improvements" className="space-y-4">
              {analysis.improvements.map((improvement, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{improvement.category}</h4>
                        <p className="text-sm text-muted-foreground">{improvement.suggestion}</p>
                      </div>
                      <Badge variant={getPriorityColor(improvement.priority)}>
                        {improvement.priority === 'high' && '높음'}
                        {improvement.priority === 'medium' && '보통'}
                        {improvement.priority === 'low' && '낮음'}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-4">
              {analysis.recommendations.map((rec, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{rec.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-muted-foreground">{rec.description}</p>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="flex items-center gap-2 text-green-700">
                        <Target className="h-4 w-4" />
                        <span className="font-medium">예상 효과</span>
                      </div>
                      <p className="text-sm text-green-600 mt-1">{rec.expected_benefit}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
};