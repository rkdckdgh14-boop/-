import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, User, LogOut, Menu, X } from 'lucide-react';
import { auth, db, signInWithGoogle } from '../lib/firebase';
import { onAuthStateChanged, signOut, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutDashboard } from 'lucide-react';

export default function Navbar() {
  const [user, setUser] = React.useState<FirebaseUser | null>(null);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        // Check if user is admin
        try {
          const adminDoc = await getDoc(doc(db, 'admins', u.uid));
          setIsAdmin(adminDoc.exists());
        } catch (error) {
          console.error("Error checking admin status:", error);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Leaf className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold tracking-tight text-gray-900">에코클린</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">홈</Link>
            <Link to="/about" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">회사소개</Link>
            <Link to="/cases" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">청소사례</Link>
            <Link to="/booking" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">예약하기</Link>
            <Link to="/reviews" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">이용후기</Link>
            <Link to="/recruitment" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">채용공고</Link>
            {isAdmin && (
              <Link to="/admin" className="inline-flex items-center space-x-1 text-sm font-bold text-accent hover:text-accent-dark transition-colors bg-accent/10 px-3 py-1 rounded-full">
                <LayoutDashboard className="w-4 h-4" />
                <span>관리자</span>
              </Link>
            )}
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/mypage" className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-primary">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="" className="w-8 h-8 rounded-full border border-gray-200" referrerPolicy="no-referrer" />
                  ) : (
                    <User className="w-5 h-5" />
                  )}
                  <span>마이페이지</span>
                </Link>
                <button onClick={handleSignOut} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={signInWithGoogle}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-primary hover:bg-primary-dark transition-all"
              >
                로그인 / 시작하기
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-gray-600">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary">홈</Link>
              <Link to="/about" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary">회사소개</Link>
              <Link to="/cases" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary">청소사례</Link>
              <Link to="/booking" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary">예약하기</Link>
              <Link to="/reviews" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary">이용후기</Link>
              <Link to="/recruitment" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary">채용공고</Link>
              {isAdmin && (
                <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-black text-accent">관리자 페이지</Link>
              )}
              {user ? (
                <>
                  <Link to="/mypage" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700">마이페이지</Link>
                  <button onClick={handleSignOut} className="block w-full text-left px-3 py-2 text-base font-medium text-red-500">로그아웃</button>
                </>
              ) : (
                <button onClick={signInWithGoogle} className="block w-full text-left px-3 py-2 text-base font-medium text-primary">로그인</button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
