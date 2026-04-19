import React from 'react';
import { auth, db } from '../lib/firebase';
import { collection, query, where, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { Booking } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, MapPin, XCircle, LogOut } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function MyPage() {
  const [bookings, setBookings] = React.useState<Booking[]>([]);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!auth.currentUser) {
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'bookings'),
      where('userId', '==', auth.currentUser.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const bks = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Booking));
      setBookings(bks);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleCancel = async (id: string, currentStatus: string) => {
    if (currentStatus === '완료') return;
    if (!window.confirm('정말 예약취소를 하시겠습니까?')) return;

    try {
      await updateDoc(doc(db, 'bookings', id), {
        status: '취소',
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error cancelling booking:', error);
      alert('예약 취소 중 오류가 발생했습니다.');
    }
  };

  if (loading) return <div className="p-24 text-center">불러오는 중...</div>;

  if (!auth.currentUser) {
    return (
      <div className="max-w-md mx-auto py-32 px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">로그인이 필요합니다</h2>
        <p className="text-gray-600 mb-8">예약 내역을 확인하시려면 먼저 로그인해주세요.</p>
        <button
          onClick={() => navigate('/')}
          className="w-full py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20"
        >
          홈으로 가기
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-4 md:space-y-0">
        <div>
          <div className="flex items-center space-x-4 mb-4">
            <img 
              src={auth.currentUser.photoURL || ''} 
              alt="" 
              className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
              referrerPolicy="no-referrer"
            />
            <div>
              <h1 className="text-3xl font-black text-gray-900 tracking-tight">{auth.currentUser.displayName}님</h1>
              <p className="text-gray-500 font-medium">{auth.currentUser.email}</p>
            </div>
          </div>
          <p className="text-gray-500">지금까지 에코 청소업체와 함께한 기록입니다.</p>
        </div>
        
        <button 
          onClick={() => signOut(auth)}
          className="flex items-center text-red-500 font-bold text-sm hover:bg-red-50 px-4 py-2 rounded-xl transition-colors"
        >
          <LogOut className="w-4 h-4 mr-2" />
          로그아웃
        </button>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-primary" />
          예약 내역 ({bookings.length})
        </h2>

        {bookings.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-dashed border-gray-200 text-center">
            <p className="text-gray-400 font-medium mb-6">아직 예약 내역이 없습니다.</p>
            <button 
              onClick={() => navigate('/booking')}
              className="px-8 py-3 bg-primary text-white rounded-xl font-bold"
            >
              첫 예약하러 가기
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            <AnimatePresence>
              {bookings.map((bk) => (
                <motion.div
                  key={bk.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center group"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:space-x-8 space-y-4 md:space-y-0 w-full mb-4 md:mb-0">
                    <div className="flex items-center space-x-4">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                        bk.status === '완료' ? 'bg-gray-100 text-gray-400' : 'bg-primary/10 text-primary'
                      }`}>
                        <Calendar className="w-7 h-7" />
                      </div>
                      <div>
                        <div className="text-lg font-black text-gray-900">{bk.serviceType}</div>
                        <div className="text-sm font-bold text-primary">{bk.status}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-2" />
                        {bk.date}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-2" />
                        {bk.time}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="truncate">{bk.address}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-400 font-bold">
                        <span className="mr-3">예약자: {bk.userName}</span>
                        <span>연락처: {bk.userPhone}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 w-full md:w-auto">
                    <div className="text-right mr-4 hidden md:block">
                      <div className="text-xs text-gray-400 font-bold uppercase tracking-widest">결제 금액</div>
                      <div className="text-lg font-black text-gray-900">{(bk.price || 0).toLocaleString()}원</div>
                    </div>

                    {bk.status !== '취소' && bk.status !== '완료' && (
                      <button
                        onClick={() => handleCancel(bk.id, bk.status)}
                        className="flex-1 md:flex-none py-3 px-6 bg-red-50 text-red-500 rounded-xl font-bold hover:bg-red-500 hover:text-white transition-all text-sm"
                      >
                        예약취소
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
