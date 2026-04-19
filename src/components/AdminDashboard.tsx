import React from 'react';
import { db, auth } from '../lib/firebase';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, getDoc } from 'firebase/firestore';
import { Booking, BookingStatus } from '../types';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Calendar as CalendarIcon, 
  Phone, 
  MapPin, 
  Filter,
  BarChart3,
  Users,
  Search
} from 'lucide-react';

export default function AdminDashboard() {
  const [bookings, setBookings] = React.useState<Booking[]>([]);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [filter, setFilter] = React.useState<BookingStatus | 'All'>('All');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [activeTab, setActiveTab] = React.useState<'bookings' | 'customers'>('bookings');

  React.useEffect(() => {
    const checkAdmin = async () => {
      if (auth.currentUser) {
        const adminDoc = await getDoc(doc(db, 'admins', auth.currentUser.uid));
        setIsAdmin(adminDoc.exists());
      }
      setIsLoading(false);
    };

    checkAdmin();
  }, []);

  React.useEffect(() => {
    if (!isAdmin) return;

    const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const bks = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Booking));
      setBookings(bks);
    });

    return () => unsubscribe();
  }, [isAdmin]);

  const updateStatus = async (id: string, newStatus: BookingStatus) => {
    try {
      await updateDoc(doc(db, 'bookings', id), { 
        status: newStatus,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error updating status:', error);
      alert('상태 업데이트에 실패했습니다.');
    }
  };

  const filteredBookings = bookings.filter(b => {
    const matchesFilter = filter === 'All' || b.status === filter;
    const matchesSearch = (b.userName || '').includes(searchTerm) || (b.address || '').includes(searchTerm);
    return matchesFilter && matchesSearch;
  });

  // Calculate stats
  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === '예약완료').length,
    completed: bookings.filter(b => b.status === '완료').length,
    revenue: bookings.reduce((acc, b) => acc + (b.price || 0), 0)
  };

  // Get unique customers
  const customers = Array.from(new Set(bookings.map(b => b.userId))).map(uid => {
    const userBookings = bookings.filter(b => b.userId === uid);
    return {
      uid,
      name: userBookings[0]?.userName || '알 수 없음',
      phone: userBookings[0]?.userPhone || '-',
      totalBookings: userBookings.length,
      lastBooking: userBookings[0]?.date || '-'
    };
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-gray-500 font-bold">시스템 권한 확인 중...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto py-32 px-4 text-center">
        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">접근 권한이 없습니다</h2>
        <p className="text-gray-500 font-medium mb-8">관리자 계정으로 로그인되어 있지 않습니다. 권한이 필요하시면 시스템 관리자에게 문의하세요.</p>
        <button
          onClick={() => window.location.href = '/'}
          className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold shadow-xl active:scale-95 transition-transform"
        >
          메인으로 이동
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 pb-24">
      <div className="bg-white border-b border-gray-100 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-white shadow-lg shadow-accent/20">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-black text-gray-900 tracking-tight">관리 데스크</h1>
                <p className="text-[10px] font-black text-accent uppercase tracking-widest leading-none mt-0.5">Admin Management System</p>
              </div>
            </div>

            <div className="hidden md:flex items-center bg-gray-100 p-1 rounded-xl">
              <button 
                onClick={() => setActiveTab('bookings')}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                  activeTab === 'bookings' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                예약 현황
              </button>
              <button 
                onClick={() => setActiveTab('customers')}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                  activeTab === 'customers' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                고객 관리
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: '전체 예약', value: stats.total, icon: CalendarIcon, color: 'text-blue-500', bg: 'bg-blue-50' },
            { label: '처리 대기', value: stats.pending, icon: Clock, color: 'text-orange-500', bg: 'bg-orange-50' },
            { label: '완료 건수', value: stats.completed, icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-50' },
            { label: '누적 매출', value: stats.revenue.toLocaleString(), unit: '원', icon: BarChart3, color: 'text-accent', bg: 'bg-accent/10' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-3 text-gray-400">
                <span className="text-[10px] font-black uppercase tracking-widest">{stat.label}</span>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl font-black text-gray-900">{stat.value}</span>
                {stat.unit && <span className="text-sm font-bold text-gray-400">{stat.unit}</span>}
              </div>
            </div>
          ))}
        </div>

        {activeTab === 'bookings' ? (
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="고객명, 주소 검색..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border border-gray-100 outline-none focus:ring-2 focus:ring-accent/20 transition-all font-medium"
                />
              </div>

              <div className="flex items-center space-x-2 bg-white p-1.5 rounded-2xl border border-gray-100 overflow-x-auto whitespace-nowrap scrollbar-hide">
                {(['All', '예약완료', '방문예정', '완료', '취소'] as const).map(f => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                      filter === f ? 'bg-gray-900 text-white shadow-lg' : 'text-gray-400 hover:bg-gray-50'
                    }`}
                  >
                    {f === 'All' ? '전체' : f}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-100">
                      <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest italic">Booking Status</th>
                      <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest italic">Schedule</th>
                      <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest italic">Customer</th>
                      <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest italic">Service Info</th>
                      <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest italic text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    <AnimatePresence initial={false}>
                      {filteredBookings.map((bk) => (
                        <motion.tr 
                          key={bk.id}
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="hover:bg-gray-50/50 transition-colors group"
                        >
                          <td className="px-6 py-6 whitespace-nowrap">
                            <span className={`inline-flex px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                              bk.status === '예약완료' ? 'bg-blue-100 text-blue-600' :
                              bk.status === '방문예정' ? 'bg-orange-100 text-orange-600' :
                              bk.status === '완료' ? 'bg-green-100 text-green-600' :
                              'bg-gray-100 text-gray-400'
                            }`}>
                              {bk.status}
                            </span>
                          </td>
                          <td className="px-6 py-6 whitespace-nowrap">
                            <div className="font-mono text-sm text-gray-900 font-bold">{bk.date}</div>
                            <div className="flex items-center text-[10px] text-gray-400 font-black mt-1">
                              <Clock className="w-3 h-3 mr-1" />
                              {bk.time}
                            </div>
                          </td>
                          <td className="px-6 py-6 whitespace-nowrap text-sm">
                            <div className="font-bold text-gray-900">{bk.userName}</div>
                            <div className="text-[10px] text-gray-400 font-bold flex items-center mt-1">
                              <Phone className="w-3 h-3 mr-1" />
                              {bk.userPhone}
                            </div>
                          </td>
                          <td className="px-6 py-6">
                            <div className="text-sm font-medium text-gray-600 truncate max-w-[200px]">{bk.address}</div>
                            <div className="text-[10px] font-black text-accent mt-1">{bk.serviceType}</div>
                          </td>
                          <td className="px-6 py-6 whitespace-nowrap text-right">
                            <div className="flex justify-end space-x-2">
                              {bk.status === '예약완료' && (
                                <button 
                                  onClick={() => updateStatus(bk.id, '방문예정')} 
                                  className="w-8 h-8 flex items-center justify-center bg-gray-900 text-white rounded-lg hover:scale-105 transition-all shadow-md"
                                  title="방문예정으로"
                                >
                                  <Clock className="w-4 h-4" />
                                </button>
                              )}
                              {bk.status === '방문예정' && (
                                <button 
                                  onClick={() => updateStatus(bk.id, '완료')} 
                                  className="w-8 h-8 flex items-center justify-center bg-green-500 text-white rounded-lg hover:scale-105 transition-all shadow-md"
                                  title="완료처리"
                                >
                                  <CheckCircle2 className="w-4 h-4" />
                                </button>
                              )}
                              {bk.status !== '취소' && bk.status !== '완료' && (
                                <button 
                                   onClick={() => updateStatus(bk.id, '취소')} 
                                   className="w-8 h-8 flex items-center justify-center bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                                   title="취소"
                                >
                                   <XCircle className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
              {filteredBookings.length === 0 && (
                <div className="p-20 text-center">
                  <div className="w-16 h-16 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8" />
                  </div>
                  <p className="text-gray-400 font-bold">검색된 예약 내역이 없습니다</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-100">
                      <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest italic">Customer Name</th>
                      <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest italic">Contact</th>
                      <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest italic">Booking History</th>
                      <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest italic text-right">Latest Visit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {customers.map((c) => (
                      <tr key={c.uid} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-6 whitespace-nowrap">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 font-bold">
                              {c.name[0]}
                            </div>
                            <div className="font-bold text-gray-900">{c.name}</div>
                          </div>
                        </td>
                        <td className="px-6 py-6 whitespace-nowrap font-mono text-sm text-gray-600">
                          {c.phone}
                        </td>
                        <td className="px-6 py-6 whitespace-nowrap">
                           <span className="text-sm font-black text-accent">{c.totalBookings}</span>
                           <span className="text-xs font-bold text-gray-400 ml-1">회 이용</span>
                        </td>
                        <td className="px-6 py-6 whitespace-nowrap text-right text-xs font-bold text-gray-400">
                          {c.lastBooking}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
