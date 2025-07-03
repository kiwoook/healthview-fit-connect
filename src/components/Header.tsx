
import React, { useState, Fragment } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Search, User, Menu, X, LogOut, ChevronDown, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "./auth/AuthModal";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navigation = [
  {
    name: "루틴",
    sub: [
      { name: "루틴 찾기", href: "/routines" },
      { name: "나의 루틴 만들기", href: "/routines/create" },
    ],
  },
  {
    name: "기록",
    sub: [
      { name: "운동 기록", href: "/records" },
      { name: "운동 탐색", href: "/exercises" },
    ],
  },
  { name: "트레이너", href: "/trainers" },
  { name: "커뮤니티", href: "/community" },
  { name: "숏츠", href: "/shorts" },
];

const ListItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link> & { title: string }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [notifications, setNotifications] = useState([
    { id: 1, type: 'comment', text: '홍길동님이 회원님의 게시글에 댓글을 남겼습니다.', time: '5분 전', read: false },
    { id: 2, type: 'follow', text: '운동매니아님이 회원님을 팔로우하기 시작했습니다.', time: '1시간 전', read: false },
    { id: 3, type: 'routine', text: "관심 등록한 '3대 500챌린지' 루틴이 업데이트되었습니다.", time: '3시간 전', read: false },
    { id: 4, type: 'reminder', text: '오늘은 가슴 운동하는 날입니다! 잊지 마세요.', time: '1일 전', read: true },
    { id: 5, type: 'trainer', text: "팔로우 중인 '김코치' 트레이너가 새 글을 작성했습니다.", time: '2일 전', read: true },
    { id: 6, type: 'warning', text: '최근 2주간 운동 기록이 없네요. 다시 시작해볼까요?', time: '3일 전', read: true },
  ]);

  const handleNotificationClick = (id: number) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleAuthClick = () => {
    setAuthModalOpen(true);
  };

  const handleLogout = () => {
    logout();
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const hasUnread = notifications.some(n => !n.read);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* 로고 */}
            <Link to={user ? (user.fitnessAssessment?.completed ? "/dashboard" : "/fitness-assessment") : "/"} className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">HV</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                HealthView
              </span>
            </Link>

            {/* 데스크톱 네비게이션 */}
            <nav className="hidden md:flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {navigation.map((item) => (
                    <NavigationMenuItem key={item.name}>
                      {item.sub ? (
                        <>
                          <NavigationMenuTrigger
                            onClick={() => navigate(item.sub[0].href)}
                            className={cn(navigationMenuTriggerStyle(), "hover:bg-transparent hover:text-current", {
                              'bg-primary text-primary-foreground': item.sub.some(sub => location.pathname.startsWith(sub.href))
                            })}
                          >
                            {item.name}
                          </NavigationMenuTrigger>
                          <NavigationMenuContent className="bg-popover">
                            <ul className="grid w-[400px] gap-3 p-4 md:w-[200px] lg:w-[300px]">
                              {item.sub.map((subItem) => (
                                <ListItem
                                  key={subItem.name}
                                  to={subItem.href}
                                  title={subItem.name}
                                />
                              ))}
                            </ul>
                          </NavigationMenuContent>
                        </>
                      ) : (
                        <NavigationMenuLink asChild>
                          <Link
                            to={item.href!}
                            className={cn(navigationMenuTriggerStyle(), "hover:bg-transparent hover:text-current", {
                              'bg-primary text-primary-foreground': location.pathname === item.href
                            })}
                          >
                            {item.name}
                          </Link>
                        </NavigationMenuLink>
                      )}
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </nav>

            {/* 검색 및 프로필 */}
            <div className="flex items-center space-x-2 md:space-x-4">
              {/* 검색바 */}
              <form onSubmit={handleSearch} className="hidden sm:flex items-center">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="검색..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
              </form>
              
              {/* 모바일 검색 버튼 */}
              <Button 
                variant="ghost" 
                size="sm" 
                className="sm:hidden"
                onClick={() => navigate('/search')}
              >
                <Search className="h-4 w-4" />
              </Button>
              
              {user ? (
                <div className="flex items-center space-x-2">
                  {/* 알림 드롭다운 */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="relative h-9 w-9 rounded-full p-0">
                        <Bell className="h-5 w-5" />
                        {hasUnread && (
                          <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                          </span>
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80 md:w-96">
                      <div className="p-2 font-semibold">알림</div>
                      <DropdownMenuSeparator />
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.map((notification) => (
                          <DropdownMenuItem
                            key={notification.id}
                            className={cn(
                              "flex flex-col items-start gap-1 p-2 cursor-pointer",
                              !notification.read && "bg-blue-50/50"
                            )}
                            onClick={() => handleNotificationClick(notification.id)}
                          >
                            <p className="text-sm whitespace-normal">{notification.text}</p>
                            <p className="text-xs text-muted-foreground">{notification.time}</p>
                          </DropdownMenuItem>
                        ))}
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="justify-center cursor-pointer focus:bg-accent">
                        <span>모든 알림 보기</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* 프로필 드롭다운 */}
                  <div className="flex items-center">
                    <Link to="/dashboard">
                      <Avatar className="h-9 w-9 cursor-pointer">
                        <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                    </Link>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-9 w-9 rounded-full p-0">
                          <ChevronDown className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <div className="px-2 py-1.5">
                          <p className="font-semibold">{user.name}</p>
                          {user.email && <p className="text-xs text-muted-foreground">{user.email}</p>}
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link to="/profile">
                            <User className="mr-2 h-4 w-4" />
                            <span>내 프로필</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLogout} className="text-red-500 cursor-pointer focus:bg-red-50 focus:text-red-600">
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>로그아웃</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ) : (
                <Button size="sm" onClick={handleAuthClick}>
                  로그인
                </Button>
              )}
              
              {/* 모바일 메뉴 버튼 */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* 모바일 네비게이션 */}
          {isMenuOpen && (
            <div className="md:hidden border-t py-4">
              {/* 모바일 검색 */}
              <div className="px-3 pb-4">
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="검색..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </form>
              </div>
              
              <nav className="flex flex-col space-y-1">
                {user && (
                  <Link
                    to="/dashboard"
                    className={cn(
                      "text-base font-medium px-3 py-2 rounded-md transition-colors",
                      location.pathname === '/dashboard'
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:text-primary hover:bg-primary/5"
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    대시보드
                  </Link>
                )}
                {navigation.map((item) => (
                  <Fragment key={item.name}>
                    {item.sub ? (
                      <div className="px-3 py-2">
                        <Link to={item.sub[0].href} onClick={() => setIsMenuOpen(false)}>
                          <h3 className="text-sm font-semibold text-gray-500 hover:text-primary">{item.name}</h3>
                        </Link>
                        <div className="mt-2 space-y-1">
                          {item.sub.map((subItem) => (
                            <Link
                              key={subItem.name}
                              to={subItem.href}
                              className={cn(
                                "block pl-4 text-sm font-medium px-3 py-2 rounded-md transition-colors",
                                location.pathname === subItem.href
                                  ? "bg-blue-50 text-blue-600"
                                  : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                              )}
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                    <Link
                      key={item.name}
                      to={item.href!}
                      className={cn(
                        "text-sm font-medium px-3 py-2 rounded-md transition-colors",
                        location.pathname === item.href
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                      )}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </Fragment>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>

    <AuthModal
      isOpen={authModalOpen}
      onClose={() => setAuthModalOpen(false)}
    />
  </>
);
};
