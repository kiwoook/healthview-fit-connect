
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface RegisterFormProps {
  onSuccess: () => void;
  onSwitchToLogin: () => void;
}

export const RegisterForm = ({ onSuccess, onSwitchToLogin }: RegisterFormProps) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    exerciseLevel: '' as 'beginner' | 'intermediate' | 'advanced' | '',
    location: '',
  });
  const { register, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password || !formData.name || !formData.exerciseLevel || !formData.location) {
      toast.error('모든 필드를 입력해주세요.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('비밀번호는 6자리 이상이어야 합니다.');
      return;
    }

    const success = await register({
      email: formData.email,
      password: formData.password,
      name: formData.name,
      exerciseLevel: formData.exerciseLevel,
      location: formData.location,
    });

    if (success) {
      toast.success('회원가입이 완료되었습니다!');
      onSuccess();
    } else {
      toast.error('이미 존재하는 이메일입니다.');
    }
  };

  const exerciseLevelOptions = [
    { value: 'beginner', label: '초보자 (운동 경험 1년 미만)' },
    { value: 'intermediate', label: '중급자 (운동 경험 1-3년)' },
    { value: 'advanced', label: '고급자 (운동 경험 3년 이상)' },
  ];

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>회원가입</CardTitle>
        <CardDescription>
          HealthView에 가입하여 개인 맞춤 운동을 시작하세요
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">이름</Label>
            <Input
              id="name"
              type="text"
              placeholder="이름을 입력하세요"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              type="password"
              placeholder="6자리 이상 입력하세요"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">비밀번호 확인</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="비밀번호를 다시 입력하세요"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="exerciseLevel">운동 경력</Label>
            <Select 
              value={formData.exerciseLevel} 
              onValueChange={(value) => setFormData({ ...formData, exerciseLevel: value as any })}
            >
              <SelectTrigger>
                <SelectValue placeholder="운동 경력을 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                {exerciseLevelOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">거주 지역</Label>
            <Input
              id="location"
              type="text"
              placeholder="예: 서울시 강남구"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? '가입 중...' : '회원가입'}
          </Button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            이미 계정이 있으신가요?{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-blue-600 hover:underline"
            >
              로그인
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
