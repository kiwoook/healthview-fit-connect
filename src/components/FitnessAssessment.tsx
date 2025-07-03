import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: { value: string; label: string; description?: string }[];
  category: 'goal' | 'preference' | 'intensity' | 'level' | 'lifestyle';
}

const questions: Question[] = [
  {
    id: 'primary_goal',
    question: '운동을 하는 주된 목표는 무엇인가요?',
    category: 'goal',
    options: [
      { value: 'weight_loss', label: '체중 감량', description: '건강한 체중 감량과 체지방 감소가 목표' },
      { value: 'muscle_gain', label: '근육 증가', description: '근력 향상과 근육량 증가가 목표' },
      { value: 'strength', label: '체력 향상', description: '전반적인 체력과 지구력 향상이 목표' },
      { value: 'health', label: '건강 관리', description: '건강 유지와 생활 습관 개선이 목표' },
      { value: 'stress', label: '스트레스 해소', description: '정신적 건강과 스트레스 관리가 목표' }
    ]
  },
  {
    id: 'preferred_body_parts',
    question: '어떤 부위 운동을 가장 선호하시나요?',
    category: 'preference',
    options: [
      { value: 'upper_body', label: '상체 집중', description: '가슴, 등, 어깨, 팔 운동을 선호' },
      { value: 'lower_body', label: '하체 집중', description: '다리, 엉덩이, 코어 운동을 선호' },
      { value: 'full_body', label: '전신 운동', description: '균형 잡힌 전신 운동을 선호' },
      { value: 'core', label: '코어 집중', description: '복부와 코어 강화에 집중' },
      { value: 'cardio', label: '유산소 운동', description: '달리기, 자전거 등 유산소 운동 선호' }
    ]
  },
  {
    id: 'exercise_intensity',
    question: '선호하는 운동 강도는?',
    category: 'intensity',
    options: [
      { value: 'low', label: '낮은 강도', description: '천천히 꾸준히, 부담없이 진행' },
      { value: 'moderate', label: '중간 강도', description: '적당한 강도로 꾸준히 진행' },
      { value: 'high', label: '높은 강도', description: '강도 높게 집중적으로 진행' },
      { value: 'interval', label: '인터벌 트레이닝', description: '고강도와 저강도를 반복' }
    ]
  },
  {
    id: 'current_level',
    question: '현재 운동 수준은 어느 정도인가요?',
    category: 'level',
    options: [
      { value: 'complete_beginner', label: '완전 초보', description: '운동을 거의 해본 적이 없음' },
      { value: 'beginner', label: '초보자', description: '가끔 운동하지만 체계적이지 않음' },
      { value: 'intermediate', label: '중급자', description: '꾸준히 운동하고 기본기가 있음' },
      { value: 'advanced', label: '고급자', description: '오랫동안 운동해왔고 전문 지식이 있음' }
    ]
  },
  {
    id: 'available_time',
    question: '운동에 할애할 수 있는 시간은?',
    category: 'lifestyle',
    options: [
      { value: '15-30min', label: '15-30분', description: '짧지만 집중적으로' },
      { value: '30-45min', label: '30-45분', description: '적당한 시간으로 꾸준히' },
      { value: '45-60min', label: '45-60분', description: '충분한 시간으로 체계적으로' },
      { value: '60min+', label: '60분 이상', description: '시간에 구애받지 않고 충분히' }
    ]
  },
  {
    id: 'weekly_frequency',
    question: '일주일에 몇 번 운동하고 싶으신가요?',
    category: 'lifestyle',
    options: [
      { value: '1-2', label: '1-2회', description: '가볍게 시작하고 싶어요' },
      { value: '3-4', label: '3-4회', description: '꾸준히 규칙적으로 하고 싶어요' },
      { value: '5-6', label: '5-6회', description: '적극적으로 운동하고 싶어요' },
      { value: '7', label: '매일', description: '운동이 일상이 되길 원해요' }
    ]
  },
  {
    id: 'preferred_time',
    question: '언제 운동하는 것을 선호하시나요?',
    category: 'lifestyle',
    options: [
      { value: 'morning', label: '아침 (6-9시)', description: '하루를 활기차게 시작' },
      { value: 'lunch', label: '점심 (12-14시)', description: '업무 중간 리프레시' },
      { value: 'evening', label: '저녁 (18-21시)', description: '하루 일과 후 운동' },
      { value: 'night', label: '밤 (21시 이후)', description: '하루를 마무리하며 운동' }
    ]
  },
  {
    id: 'exercise_location',
    question: '주로 어디서 운동하고 싶으신가요?',
    category: 'lifestyle',
    options: [
      { value: 'home', label: '집에서', description: '편안한 공간에서 자유롭게' },
      { value: 'gym', label: '헬스장', description: '전문 장비와 시설 이용' },
      { value: 'outdoor', label: '야외', description: '자연 속에서 운동' },
      { value: 'mixed', label: '상황에 따라', description: '유연하게 장소 변경' }
    ]
  }
];

interface FitnessAssessmentProps {
  onComplete: (results: Record<string, string>) => void;
  onBack: () => void;
}

export const FitnessAssessment: React.FC<FitnessAssessmentProps> = ({ onComplete, onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      onComplete(answers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    } else {
      onBack();
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentAnswer = answers[questions[currentQuestion].id];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="shadow-xl">
          <CardHeader className="text-center pb-4">
            <div className="flex items-center justify-between mb-4">
              <Button variant="ghost" onClick={handlePrevious} className="p-2">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="flex-1 mx-4">
                <Progress value={progress} className="h-2" />
                <p className="text-sm text-muted-foreground mt-2">
                  {currentQuestion + 1} / {questions.length}
                </p>
              </div>
              <div className="w-10" /> {/* 공간 균형을 위한 빈 div */}
            </div>
            <CardTitle className="text-2xl font-bold">
              {questions[currentQuestion].question}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <RadioGroup
              value={currentAnswer || ''}
              onValueChange={handleAnswer}
              className="space-y-3"
            >
              {questions[currentQuestion].options.map((option) => (
                <div key={option.value} className="flex items-start space-x-3 p-4 rounded-lg border hover:bg-accent/50 transition-colors">
                  <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                  <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                    <div className="font-medium">{option.label}</div>
                    {option.description && (
                      <div className="text-sm text-muted-foreground mt-1">
                        {option.description}
                      </div>
                    )}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex justify-between pt-6">
              <Button variant="outline" onClick={handlePrevious}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                이전
              </Button>
              
              <Button 
                onClick={handleNext}
                disabled={!currentAnswer}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {currentQuestion === questions.length - 1 ? (
                  <>
                    완료 <CheckCircle className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  <>
                    다음 <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};