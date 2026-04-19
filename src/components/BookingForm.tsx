import React from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { auth, db, signInWithGoogle } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { SERVICE_TYPES, TIME_SLOTS, SERVICE_PRICES } from '../constants';
import { ServiceType, BookingStatus } from '../types';
import { Calendar as CalendarIcon, Clock, MapPin, User, Phone, CheckCircle } from 'lucide-react';

export default function BookingForm() {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = React.useState<string | undefined>();
  const [serviceType, setServiceType] = React.useState<ServiceType>('일반 청소');
  const [address, setAddress] = React.useState('');
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [notes, setNotes] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  
  const navigate = useNavigate();

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) {
      alert('로그인이 필요한 서비스입니다.');
      return;
    }

    if (!selectedDate || !selectedTime || !address || !name || !phone) {
      alert('모든 필수 정보를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    try {
      await addDoc(collection(db, 'bookings'), {
        userId: auth.currentUser.uid,
        userName: name,
        userPhone: phone,
        address,
        serviceType,
        date: format(selectedDate, 'yyyy-MM-dd'),
        time: selectedTime,
        status: '예약완료' as BookingStatus,
        notes,
        price: SERVICE_PRICES[serviceType],
        paymentStatus: '현장결제',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      setIsSuccess(true);
      setTimeout(() => navigate('/mypage'), 2000);
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('예약 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-20">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">예약이 완료되었습니다!</h2>
          <p className="text-gray-600 mb-8">마이페이지로 이동하여 예약 내역을 확인하실 수 있습니다.</p>
        </motion.div>
      </div>
    );
  }

  if (!auth.currentUser) {
    return (
      <div className="max-w-md mx-auto py-32 px-4 text-center">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <User className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-3xl font-bold mb-4">로그인이 필요합니다</h2>
        <p className="text-gray-600 mb-8">간편 로그인을 통해 단 1초 만에 예약을 시작할 수 있습니다.</p>
        <button
          onClick={async () => {
            await signInWithGoogle();
          }}
          className="w-full py-4 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all"
        >
          구글로 로그인하고 바로 예약하기
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">서비스 예약하기</h2>
        <p className="mt-4 text-lg text-gray-600">원하시는 날짜와 시간을 선택하고 간편하게 예약하세요.</p>
      </div>

      <form onSubmit={handleBooking} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: Info */}
        <div className="space-y-8 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
              <User className="w-4 h-4 mr-2 text-primary" />
              예약자 성함
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="홍길동"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-base"
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
              <Phone className="w-4 h-4 mr-2 text-primary" />
              연락처
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="010-0000-0000"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-base"
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
              <MapPin className="w-4 h-4 mr-2 text-primary" />
              방문 주소
            </label>
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="상세 주소를 입력하세요"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-base"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">서비스 종류</label>
            <div className="grid grid-cols-2 gap-3">
              {SERVICE_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setServiceType(type)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium border transition-all ${
                    serviceType === type
                      ? 'bg-primary/5 border-primary text-primary shadow-sm'
                      : 'bg-gray-50 border-gray-100 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Date & Time */}
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-4">
              <CalendarIcon className="w-4 h-4 mr-2 text-primary" />
              방문 날짜 선택
            </label>
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              locale={ko}
              disabled={{ before: new Date() }}
              className="rdp-custom"
              modifiersStyles={{
                selected: { backgroundColor: '#3CB371', color: 'white' }
              }}
            />
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-4">
              <Clock className="w-4 h-4 mr-2 text-primary" />
              방문 시간 선택
            </label>
            <div className="grid grid-cols-3 gap-2">
              {TIME_SLOTS.map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setSelectedTime(time)}
                  className={`py-2 rounded-lg border text-sm font-medium transition-all ${
                    selectedTime === time
                      ? 'bg-primary border-primary text-white'
                      : 'bg-gray-50 border-gray-100 text-gray-600 hover:border-gray-200'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="md:col-span-2 flex flex-col items-center pt-8 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <div className="w-full max-w-lg space-y-4 mb-8">
            <div className="flex justify-between items-center py-4 border-b border-gray-100">
              <span className="text-gray-600 font-medium">선택한 서비스</span>
              <span className="text-gray-900 font-bold">{serviceType}</span>
            </div>
            <div className="flex justify-between items-center py-4 border-b border-gray-100">
              <span className="text-gray-600 font-medium">예상 가격</span>
              <span className="text-2xl font-black text-primary">
                {SERVICE_PRICES[serviceType].toLocaleString()}원
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full max-w-sm py-4 bg-primary text-white rounded-2xl font-bold text-lg hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? '예약 처리 중...' : '예약 신청하기'}
          </button>
          <p className="mt-4 text-xs text-gray-400">
            예약금 없이 현장에서 만족도 확인 후 결제 가능합니다.
          </p>
        </div>
      </form>
    </div>
  );
}
