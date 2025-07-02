import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Search, Plus, GripVertical, Trash2, Edit, Save } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Exercise {
  id: string;
  name: string;
  bodyPart: string;
  sets: number;
  reps: string;
  weight: string;
  memo: string;
}

const CreateRoutine = () => {
  const [routineName, setRoutineName] = useState("");
  const [routineDescription, setRoutineDescription] = useState("");
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isAddExerciseOpen, setIsAddExerciseOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  // 새 운동 추가 상태
  const [newExercise, setNewExercise] = useState({
    name: "",
    bodyPart: "",
    sets: 3,
    reps: "12",
    weight: "",
    memo: ""
  });

  // 운동 데이터베이스 (더미 데이터)
  const exerciseDatabase = [
    { name: "벤치프레스", bodyPart: "가슴" },
    { name: "스쿼트", bodyPart: "하체" },
    { name: "데드리프트", bodyPart: "등" },
    { name: "오버헤드 프레스", bodyPart: "어깨" },
    { name: "바벨 로우", bodyPart: "등" },
    { name: "인클라인 벤치프레스", bodyPart: "가슴" },
    { name: "레그 프레스", bodyPart: "하체" },
    { name: "레그 컬", bodyPart: "하체" },
    { name: "레그 익스텐션", bodyPart: "하체" },
    { name: "바이셉 컬", bodyPart: "이두" },
    { name: "트라이셉 익스텐션", bodyPart: "삼두" },
    { name: "래터럴 레이즈", bodyPart: "어깨" },
    { name: "플랭크", bodyPart: "복부" },
    { name: "크런치", bodyPart: "복부" },
  ];

  // 검색된 운동 필터링
  const filteredExercises = exerciseDatabase.filter(exercise =>
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 운동 추가
  const addExercise = (exerciseData: typeof newExercise) => {
    const exercise: Exercise = {
      id: Date.now().toString(),
      ...exerciseData
    };
    setExercises([...exercises, exercise]);
    setNewExercise({
      name: "",
      bodyPart: "",
      sets: 3,
      reps: "12",
      weight: "",
      memo: ""
    });
    setIsAddExerciseOpen(false);
    toast({
      title: "운동이 추가되었습니다",
      description: `${exercise.name}이(가) 루틴에 추가되었습니다.`
    });
  };

  // 기존 운동에서 추가
  const addExistingExercise = (exerciseName: string, bodyPart: string) => {
    const exercise: Exercise = {
      id: Date.now().toString(),
      name: exerciseName,
      bodyPart,
      sets: 3,
      reps: "12",
      weight: "",
      memo: ""
    };
    setExercises([...exercises, exercise]);
    setIsAddExerciseOpen(false);
    toast({
      title: "운동이 추가되었습니다",
      description: `${exerciseName}이(가) 루틴에 추가되었습니다.`
    });
  };

  // 운동 삭제
  const removeExercise = (id: string) => {
    setExercises(exercises.filter(ex => ex.id !== id));
    toast({
      title: "운동이 삭제되었습니다",
      description: "루틴에서 운동이 제거되었습니다."
    });
  };

  // 운동 순서 변경 (드래그 앤 드롭 시뮬레이션)
  const moveExercise = (id: string, direction: 'up' | 'down') => {
    const currentIndex = exercises.findIndex(ex => ex.id === id);
    if (
      (direction === 'up' && currentIndex === 0) ||
      (direction === 'down' && currentIndex === exercises.length - 1)
    ) return;

    const newExercises = [...exercises];
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    [newExercises[currentIndex], newExercises[targetIndex]] = 
    [newExercises[targetIndex], newExercises[currentIndex]];
    
    setExercises(newExercises);
  };

  // 운동 정보 업데이트
  const updateExercise = (id: string, field: keyof Exercise, value: any) => {
    setExercises(exercises.map(ex => 
      ex.id === id ? { ...ex, [field]: value } : ex
    ));
  };

  // 루틴 저장
  const saveRoutine = () => {
    if (!routineName.trim()) {
      toast({
        title: "루틴 이름을 입력해주세요",
        description: "루틴 이름은 필수 입력 항목입니다.",
        variant: "destructive"
      });
      return;
    }

    if (exercises.length === 0) {
      toast({
        title: "운동을 추가해주세요",
        description: "최소 1개 이상의 운동이 필요합니다.",
        variant: "destructive"
      });
      return;
    }

    // 실제로는 API 호출
    toast({
      title: "루틴이 저장되었습니다!",
      description: `"${routineName}" 루틴이 성공적으로 생성되었습니다.`
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">나만의 루틴 만들기</h1>
        <p className="text-gray-600">원하는 운동을 조합하여 나만의 운동 루틴을 만들어보세요</p>
      </div>

      {/* 루틴 기본 정보 */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>루틴 기본 정보</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="routineName">루틴 이름 *</Label>
            <Input
              id="routineName"
              placeholder="예: 상체 집중 루틴"
              value={routineName}
              onChange={(e) => setRoutineName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="routineDescription">루틴 설명</Label>
            <Textarea
              id="routineDescription"
              placeholder="루틴에 대한 설명을 입력하세요..."
              value={routineDescription}
              onChange={(e) => setRoutineDescription(e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* 운동 목록 */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>운동 목록 ({exercises.length}개)</CardTitle>
            <Dialog open={isAddExerciseOpen} onOpenChange={setIsAddExerciseOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  운동 추가
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>운동 추가</DialogTitle>
                </DialogHeader>
                
                <div className="space-y-6">
                  {/* 기존 운동 검색 */}
                  <div>
                    <Label>기존 운동에서 선택</Label>
                    <div className="relative mt-2">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="운동 이름을 검색하세요..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    {searchTerm && (
                      <div className="mt-2 max-h-32 overflow-y-auto border rounded-md">
                        {filteredExercises.map((exercise, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-2 hover:bg-gray-50 cursor-pointer"
                            onClick={() => addExistingExercise(exercise.name, exercise.bodyPart)}
                          >
                            <span>{exercise.name}</span>
                            <Badge variant="secondary" className="text-xs">
                              {exercise.bodyPart}
                            </Badge>
                          </div>
                        ))}
                        {filteredExercises.length === 0 && (
                          <div className="p-2 text-center text-gray-500">검색 결과가 없습니다</div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="border-t pt-4">
                    <Label>또는 새로운 운동 만들기</Label>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div>
                        <Label htmlFor="exerciseName">운동 이름</Label>
                        <Input
                          id="exerciseName"
                          placeholder="운동 이름 입력"
                          value={newExercise.name}
                          onChange={(e) => setNewExercise({...newExercise, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label>운동 부위</Label>
                        <Select value={newExercise.bodyPart} onValueChange={(value) => setNewExercise({...newExercise, bodyPart: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="부위 선택" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="가슴">가슴</SelectItem>
                            <SelectItem value="등">등</SelectItem>
                            <SelectItem value="어깨">어깨</SelectItem>
                            <SelectItem value="이두">이두</SelectItem>
                            <SelectItem value="삼두">삼두</SelectItem>
                            <SelectItem value="하체">하체</SelectItem>
                            <SelectItem value="복부">복부</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="sets">세트</Label>
                        <Input
                          id="sets"
                          type="number"
                          value={newExercise.sets}
                          onChange={(e) => setNewExercise({...newExercise, sets: parseInt(e.target.value)})}
                          min="1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="reps">횟수</Label>
                        <Input
                          id="reps"
                          placeholder="예: 12"
                          value={newExercise.reps}
                          onChange={(e) => setNewExercise({...newExercise, reps: e.target.value})}
                        />
                      </div>
                      <div className="col-span-2">
                        <Label htmlFor="memo">메모 (선택사항)</Label>
                        <Textarea
                          id="memo"
                          placeholder="운동 관련 메모를 입력하세요..."
                          value={newExercise.memo}
                          onChange={(e) => setNewExercise({...newExercise, memo: e.target.value})}
                          rows={2}
                        />
                      </div>
                    </div>
                    <Button 
                      className="w-full mt-4" 
                      onClick={() => addExercise(newExercise)}
                      disabled={!newExercise.name || !newExercise.bodyPart}
                    >
                      운동 추가하기
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {exercises.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>아직 추가된 운동이 없습니다.</p>
              <p className="text-sm">위의 "운동 추가" 버튼을 클릭하여 운동을 추가해보세요.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {exercises.map((exercise, index) => (
                <Card key={exercise.id} className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => moveExercise(exercise.id, 'up')}
                        disabled={index === 0}
                        className="h-6 w-6 p-0"
                      >
                        ↑
                      </Button>
                      <GripVertical className="h-4 w-4 text-gray-400" />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => moveExercise(exercise.id, 'down')}
                        disabled={index === exercises.length - 1}
                        className="h-6 w-6 p-0"
                      >
                        ↓
                      </Button>
                    </div>
                    
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                      <div>
                        <div className="font-medium">{exercise.name}</div>
                        <Badge variant="secondary" className="text-xs mt-1">
                          {exercise.bodyPart}
                        </Badge>
                      </div>
                      
                      <div>
                        <Label className="text-xs">세트</Label>
                        <Input
                          type="number"
                          value={exercise.sets}
                          onChange={(e) => updateExercise(exercise.id, 'sets', parseInt(e.target.value))}
                          className="h-8"
                          min="1"
                        />
                      </div>
                      
                      <div>
                        <Label className="text-xs">횟수</Label>
                        <Input
                          value={exercise.reps}
                          onChange={(e) => updateExercise(exercise.id, 'reps', e.target.value)}
                          className="h-8"
                          placeholder="12"
                        />
                      </div>
                      
                      <div>
                        <Label className="text-xs">중량 (kg)</Label>
                        <Input
                          value={exercise.weight}
                          onChange={(e) => updateExercise(exercise.id, 'weight', e.target.value)}
                          className="h-8"
                          placeholder="선택사항"
                        />
                      </div>
                      
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>{exercise.name} 메모</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <Textarea
                                value={exercise.memo}
                                onChange={(e) => updateExercise(exercise.id, 'memo', e.target.value)}
                                placeholder="운동 관련 메모를 입력하세요..."
                                rows={4}
                              />
                            </div>
                          </DialogContent>
                        </Dialog>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeExercise(exercise.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {exercise.memo && (
                    <div className="ml-12 mt-2 p-2 bg-gray-50 rounded text-sm">
                      <strong>메모:</strong> {exercise.memo}
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* 저장 버튼 */}
      <div className="flex gap-4">
        <Button onClick={saveRoutine} className="flex-1">
          <Save className="h-4 w-4 mr-2" />
          루틴 저장하기
        </Button>
        <Button variant="outline" className="flex-1">
          미리보기
        </Button>
      </div>
    </div>
  );
};

export default CreateRoutine;