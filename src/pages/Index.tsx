
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Play, Users, TrendingUp } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* 히어로 섹션 */}
      <section className="relative px-4 py-24 text-center">
        <div className="container mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              당신만의 완벽한
              <br />
              헬스 루틴을 찾아보세요
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              전문 트레이너들의 검증된 운동 루틴과 개인 맞춤형 운동 기록 시스템으로
              <br />
              더 스마트하고 효율적인 운동을 경험해보세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Link to="/fitness-assessment">
                  시작하기 <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/routines">
                  <Play className="mr-2 h-4 w-4" />
                  루틴 둘러보기
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 특징 소개 */}
      <section className="px-4 py-16 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              왜 HealthView인가요?
            </h2>
            <p className="text-lg text-gray-600">
              운동 초보자부터 전문가까지, 모두를 위한 완벽한 헬스 솔루션
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">전문 트레이너</h3>
                <p className="text-gray-600">
                  인증된 전문 트레이너들이 직접 제작한 검증된 운동 루틴을 만나보세요
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">스마트 기록</h3>
                <p className="text-gray-600">
                  운동 기록을 자동으로 분석하여 개인 맞춤형 피드백과 목표를 제공합니다
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <Play className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">실시간 가이드</h3>
                <p className="text-gray-600">
                  운동 자세부터 호흡법까지, 실시간 영상 가이드로 정확한 운동을 도와드립니다
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="px-4 py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            지금 바로 시작해보세요
          </h2>
          <p className="text-lg mb-8 opacity-90">
            수천 명의 사용자들이 이미 HealthView와 함께 건강한 변화를 만들고 있습니다
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/fitness-assessment">
              무료로 시작하기 <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
