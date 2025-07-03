import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { FitnessAssessment } from '@/components/FitnessAssessment';
import { FitnessResults } from '@/components/FitnessResults';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, CheckCircle, Target, TrendingUp } from 'lucide-react';

const FitnessOnboarding = () => {
  const { user, updateFitnessAssessment } = useAuth();
  const [currentStep, setCurrentStep] = useState<'intro' | 'assessment' | 'results'>('intro');
  const [assessmentResults, setAssessmentResults] = useState<Record<string, string>>({});

  // 로그인하지 않은 사용자는 메인 페이지로 리다이렉트
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // 이미 평가를 완료한 사용자는 대시보드로 리다이렉트
  if (user.fitnessAssessment?.completed) {
    return <Navigate to="/dashboard" replace />;
  }

  const getPersonalityType = (answers: Record<string, string>): string => {
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

  const handleAssessmentComplete = (results: Record<string, string>) => {
    setAssessmentResults(results);
    setCurrentStep('results');
  };

  const handleStartJourney = () => {
    const personalityType = getPersonalityType(assessmentResults);
    updateFitnessAssessment(assessmentResults, personalityType);
    // AuthContext가 업데이트되면 자동으로 대시보드로 리다이렉트됩니다
  };

  const handleStartAssessment = () => {
    setCurrentStep('assessment');
  };

  const handleBackToIntro = () => {
    setCurrentStep('intro');
  };

  if (currentStep === 'assessment') {
    return (
      <FitnessAssessment 
        onComplete={handleAssessmentComplete}
        onBack={handleBackToIntro}
      />
    );
  }

  if (currentStep === 'results') {
    return (
      <FitnessResults
        answers={assessmentResults}
        onStartJourney={handleStartJourney}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <Card className="shadow-xl">
          <CardHeader className="text-center pb-8">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <Target className="h-10 w-10 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold mb-4">
              운동 성향 분석을 시작해보세요
            </CardTitle>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              당신의 운동 목표, 선호도, 라이프스타일을 분석하여 
              가장 적합한 맞춤형 운동 루틴을 추천해드립니다.
            </p>
          </CardHeader>
          
          <CardContent className="space-y-8">
            {/* 특징 소개 */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold">정확한 분석</h3>
                <p className="text-sm text-muted-foreground">
                  8가지 핵심 질문으로 당신의 운동 성향을 정확히 파악합니다
                </p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                  <Target className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold">맞춤형 추천</h3>
                <p className="text-sm text-muted-foreground">
                  분석 결과를 바탕으로 최적의 운동 루틴을 즉시 추천받습니다
                </p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold">지속적 개선</h3>
                <p className="text-sm text-muted-foreground">
                  운동 기록을 통해 지속적으로 개선된 추천을 받을 수 있습니다
                </p>
              </div>
            </div>

            {/* 예상 소요 시간 */}
            <div className="bg-accent/50 rounded-lg p-6 text-center">
              <h4 className="font-semibold mb-2">📝 예상 소요 시간: 3-5분</h4>
              <p className="text-sm text-muted-foreground">
                간단한 질문들로 구성되어 있어 부담없이 완료할 수 있습니다
              </p>
            </div>

            {/* 시작 버튼 */}
            <div className="text-center space-y-4">
              <Button 
                size="lg" 
                onClick={handleStartAssessment}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8"
              >
                운동 성향 분석 시작하기
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <p className="text-xs text-muted-foreground">
                * 분석 결과는 언제든지 설정에서 다시 진행할 수 있습니다
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FitnessOnboarding;