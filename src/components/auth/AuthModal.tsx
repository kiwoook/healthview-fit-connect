
import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [exerciseLevel, setExerciseLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [location, setLocation] = useState('');
  const { login, register, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    if (mode === 'login') {
      const success = await login(email, password);
      if (success) {
        toast.success('로그인되었습니다!');
        onClose();
      } else {
        toast.error('이메일 또는 비밀번호가 올바르지 않습니다.');
      }
    } else {
      if (!name || !location) {
        toast.error('모든 필드를 입력해주세요.');
        return;
      }

      const success = await register({
        email,
        password,
        name,
        exerciseLevel,
        location,
      });

      if (success) {
        toast.success('회원가입이 완료되었습니다!');
        onClose();
      } else {
        toast.error('이미 존재하는 이메일입니다.');
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 border-0">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>{mode === 'login' ? '로그인' : '회원가입'}</CardTitle>
            <CardDescription>
              {mode === 'login' 
                ? 'HealthView 계정으로 로그인하세요' 
                : 'HealthView에 가입하여 더 많은 기능을 이용하세요'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">비밀번호</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {mode === 'register' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="name">이름</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="이름을 입력하세요"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="exerciseLevel">운동 경력</Label>
                    <Select value={exerciseLevel} onValueChange={(value: 'beginner' | 'intermediate' | 'advanced') => setExerciseLevel(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="운동 경력을 선택하세요" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">초급 (운동 경험 1년 미만)</SelectItem>
                        <SelectItem value="intermediate">중급 (운동 경험 1-3년)</SelectItem>
                        <SelectItem value="advanced">고급 (운동 경험 3년 이상)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">거주 지역</Label>
                    <Input
                      id="location"
                      type="text"
                      placeholder="예: 서울시 강남구"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                    />
                  </div>
                </>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? '처리 중...' : (mode === 'login' ? '로그인' : '회원가입')}
              </Button>
            </form>
            
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                {mode === 'login' ? '계정이 없으신가요?' : '이미 계정이 있으신가요?'}{' '}
                <button
                  onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                  className="text-blue-600 hover:underline"
                >
                  {mode === 'login' ? '회원가입' : '로그인'}
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};
