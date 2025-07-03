import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Clock, Users, Target, Zap, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FitnessResultsProps {
  answers: Record<string, string>;
  onStartJourney: () => void;
}

interface PersonalityType {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  traits: string[];
}

interface Recommendation {
  id: string;
  name: string;
  trainer: string;
  duration: string;
  difficulty: string;
  rating: number;
  description: string;
  tags: string[];
  matchPercentage: number;
}

const fitnessPersonalities: Record<string, PersonalityType> = {
  'strength_builder': {
    title: '파워 빌더 (Power Builder)',
    description: '근력과 근육량 증가에 집중하는 체계적인 운동을 선호합니다.',
    icon: Zap,
    color: 'from-red-500 to-orange-500',
    traits: ['체계적', '목표지향적', '꾸준함', '도전적']
  },
  'cardio_enthusiast': {
    title: '카디오 매니아 (Cardio Enthusiast)',
    description: '유산소 운동과 체력 향상을 통한 건강한 라이프스타일을 추구합니다.',
    icon: Heart,
    color: 'from-blue-500 to-cyan-500',
    traits: ['활동적', '지구력', '건강지향', '에너지 넘침']
  },
  'balanced_achiever': {
    title: '밸런스 아처버 (Balanced Achiever)',
    description: '균형 잡힌 전신 운동으로 전반적인 체력 향상을 목표로 합니다.',
    icon: Target,
    color: 'from-green-500 to-teal-500',
    traits: ['균형감각', '안정적', '다재다능', '현실적']
  },
  'wellness_seeker': {
    title: '웰니스 시커 (Wellness Seeker)',
    description: '스트레스 해소와 정신적 건강을 중시하는 부드러운 운동을 선호합니다.',
    icon: Heart,
    color: 'from-purple-500 to-pink-500',
    traits: ['평온함', '마음챙김', '일관성', '자기관리']
  }
};

export const FitnessResults: React.FC<FitnessResultsProps> = ({ answers, onStartJourney }) => {
  const getPersonalityType = (answers: Record<string, string>): string => {
    // 간단한 로직으로 성향 분석
    const goal = answers.primary_goal;
    const intensity = answers.exercise_intensity;
    const preference = answers.preferred_body_parts;

    if (goal === 'muscle_gain' || goal === 'strength') {
      return 'strength_builder';
    } else if (preference === 'cardio' || goal === 'weight_loss') {
      return 'cardio_enthusiast';
    } else if (goal === 'stress' || goal === 'health') {
      return 'wellness_seeker';
    } else {
      return 'balanced_achiever';
    }
  };

  const getRecommendations = (answers: Record<string, string>): Recommendation[] => {
    const personalityType = getPersonalityType(answers);
    
    const baseRecommendations: Record<string, Recommendation[]> = {
      'strength_builder': [
        {
          id: '1',
          name: '초보자 근력 기초 프로그램',
          trainer: '김준수 트레이너',
          duration: '45분',
          difficulty: '초급',
          rating: 4.8,
          description: '체계적인 근력 운동의 기초를 다지는 프로그램입니다.',
          tags: ['근력', '기초', '체계적'],
          matchPercentage: 95
        },
        {
          id: '2',
          name: '상체 집중 강화 루틴',
          trainer: '이강민 트레이너',
          duration: '50분',
          difficulty: '중급',
          rating: 4.9,
          description: '가슴, 등, 어깨를 집중적으로 강화하는 루틴입니다.',
          tags: ['상체', '근력', '집중'],
          matchPercentage: 88
        }
      ],
      'cardio_enthusiast': [
        {
          id: '3',
          name: '체지방 감량 HIIT',
          trainer: '박소영 트레이너',
          duration: '30분',
          difficulty: '중급',
          rating: 4.9,
          description: '효과적인 체지방 감량을 위한 고강도 인터벌 트레이닝입니다.',
          tags: ['HIIT', '체지방감량', '유산소'],
          matchPercentage: 96
        },
        {
          id: '4',
          name: '아침 활력 유산소',
          trainer: '최민호 트레이너',
          duration: '25분',
          difficulty: '초급',
          rating: 4.7,
          description: '하루를 활기차게 시작하는 아침 유산소 루틴입니다.',
          tags: ['아침', '유산소', '활력'],
          matchPercentage: 91
        }
      ],
      'balanced_achiever': [
        {
          id: '5',
          name: '전신 균형 운동',
          trainer: '정수연 트레이너',
          duration: '40분',
          difficulty: '중급',
          rating: 4.8,
          description: '전신의 근력과 지구력을 균형있게 발달시키는 프로그램입니다.',
          tags: ['전신', '균형', '종합'],
          matchPercentage: 93
        },
        {
          id: '6',
          name: '기능성 트레이닝',
          trainer: '김태현 트레이너',
          duration: '35분',
          difficulty: '초급',
          rating: 4.6,
          description: '일상생활에 도움되는 기능적 움직임을 향상시킵니다.',
          tags: ['기능성', '실용적', '움직임'],
          matchPercentage: 87
        }
      ],
      'wellness_seeker': [
        {
          id: '7',
          name: '요가 & 스트레칭',
          trainer: '이지영 요가강사',
          duration: '30분',
          difficulty: '초급',
          rating: 4.9,
          description: '마음의 평온과 몸의 유연성을 키우는 요가 프로그램입니다.',
          tags: ['요가', '스트레칭', '마음챙김'],
          matchPercentage: 94
        },
        {
          id: '8',
          name: '저강도 컨디셔닝',
          trainer: '박준혁 트레이너',
          duration: '35분',
          difficulty: '초급',
          rating: 4.7,
          description: '부담없이 꾸준히 할 수 있는 저강도 컨디셔닝입니다.',
          tags: ['저강도', '컨디셔닝', '꾸준함'],
          matchPercentage: 89
        }
      ]
    };

    return baseRecommendations[personalityType] || baseRecommendations['balanced_achiever'];
  };

  const personalityType = getPersonalityType(answers);
  const personality = fitnessPersonalities[personalityType];
  const recommendations = getRecommendations(answers);
  const IconComponent = personality.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="container mx-auto max-w-4xl py-8">
        {/* 성향 분석 결과 */}
        <Card className="mb-8 overflow-hidden">
          <div className={`h-32 bg-gradient-to-r ${personality.color} flex items-center justify-center`}>
            <IconComponent className="h-16 w-16 text-white" />
          </div>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl mb-2">{personality.title}</CardTitle>
            <p className="text-muted-foreground text-lg">{personality.description}</p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 justify-center">
              {personality.traits.map((trait, index) => (
                <Badge key={index} variant="secondary" className="px-3 py-1">
                  {trait}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 개인 맞춤 분석 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              개인 맞춤 분석
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium">운동 목표</h4>
                  <p className="text-sm text-muted-foreground">
                    {answers.primary_goal === 'weight_loss' && '체중 감량 및 체지방 감소'}
                    {answers.primary_goal === 'muscle_gain' && '근력 향상 및 근육량 증가'}
                    {answers.primary_goal === 'strength' && '전반적인 체력 및 지구력 향상'}
                    {answers.primary_goal === 'health' && '건강 관리 및 생활 습관 개선'}
                    {answers.primary_goal === 'stress' && '스트레스 해소 및 정신 건강'}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">운동 강도</h4>
                  <p className="text-sm text-muted-foreground">
                    {answers.exercise_intensity === 'low' && '낮은 강도로 부담없이'}
                    {answers.exercise_intensity === 'moderate' && '중간 강도로 꾸준히'}
                    {answers.exercise_intensity === 'high' && '높은 강도로 집중적으로'}
                    {answers.exercise_intensity === 'interval' && '인터벌 트레이닝 선호'}
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium">운동 시간</h4>
                  <p className="text-sm text-muted-foreground">
                    주 {answers.weekly_frequency}회, {answers.available_time}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">선호 장소</h4>
                  <p className="text-sm text-muted-foreground">
                    {answers.exercise_location === 'home' && '집에서 편안하게'}
                    {answers.exercise_location === 'gym' && '헬스장에서 전문적으로'}
                    {answers.exercise_location === 'outdoor' && '야외에서 자연스럽게'}
                    {answers.exercise_location === 'mixed' && '상황에 따라 유연하게'}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 추천 루틴 */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center">
            당신을 위한 맞춤 운동 루틴
          </h2>
          <div className="grid gap-6">
            {recommendations.map((routine, index) => (
              <Card key={routine.id} className={`relative overflow-hidden ${index === 0 ? 'ring-2 ring-primary' : ''}`}>
                {index === 0 && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-primary">최고 추천</Badge>
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{routine.name}</h3>
                      <p className="text-muted-foreground mb-3">{routine.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {routine.trainer}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {routine.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          {routine.rating}
                        </span>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{routine.matchPercentage}%</div>
                      <div className="text-xs text-muted-foreground">일치도</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {routine.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button asChild className="flex-1">
                      <Link to="/routines">
                        루틴 상세보기
                      </Link>
                    </Button>
                    <Button variant="outline">
                      저장하기
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 시작하기 버튼 */}
        <div className="text-center">
          <Button 
            size="lg" 
            onClick={onStartJourney}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8"
          >
            나의 운동 여정 시작하기
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            언제든지 설정에서 운동 성향을 다시 분석할 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
};