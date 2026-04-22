import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MessageSquare, User, X, Send } from 'lucide-react';
import { db, auth } from '../lib/firebase';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { Review } from '../types';
import { format } from 'date-fns';

export default function ReviewSection() {
  const [reviews, setReviews] = React.useState<Review[]>([]);
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [newReview, setNewReview] = React.useState({ rating: 5, content: '' });
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Review));
      setReviews(data);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) {
      alert('로그인이 필요한 서비스입니다.');
      return;
    }

    if (!newReview.content.trim()) {
      alert('후기 내용을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'reviews'), {
        userId: auth.currentUser.uid,
        userName: auth.currentUser.displayName || '익명 고객',
        userPhoto: auth.currentUser.photoURL || '',
        content: newReview.content,
        rating: newReview.rating,
        createdAt: serverTimestamp(),
      });
      setNewReview({ rating: 5, content: '' });
      setIsFormOpen(false);
    } catch (error) {
      console.error('Error adding review:', error);
      alert('후기 등록 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const mockReviews = [
    { id: '1', userName: '김지현', rating: 5, content: '아이 키우느라 청소할 시간이 부족했는데, 정말 꼼꼼하게 해주셔서 감동받았습니다. 특히 화장실 물때가 싹 사라졌어요!', createdAt: { seconds: 1710460800 } },
    { id: '2', userName: '이민호', rating: 5, content: '이사 청소 맡겼는데 창틀까지 깨끗하게 관리해주셨네요. 추천합니다.', createdAt: { seconds: 1710201600 } },
    { id: '3', userName: '박서준', rating: 4, content: '예약이 간편해서 좋았고 매니저님도 친절하셨어요.', createdAt: { seconds: 1710028800 } },
    { id: '4', userName: '최윤서', rating: 5, content: '부모님 댁 청소해드렸는데 너무 좋아하세요. 구석구석 쌓인 먼지까지 다 털어주시고 정리까지 완벽합니다!', createdAt: { seconds: 1709856000 } },
    { id: '5', userName: '정우진', rating: 5, content: '에코클린 덕분에 집이 새집이 된 것 같아요. 친환경 세제라 그런지 냄새도 자극적이지 않고 정말 상쾌합니다.', createdAt: { seconds: 1709683200 } },
  ];

  const allReviews = reviews.length > 0 ? reviews : mockReviews;

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">신뢰할 수 있는 고객 후기</h2>
          <p className="mt-4 text-lg text-gray-600">많은 가정이 에코클린과 함께 쾌적한 일상을 만들고 있습니다.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatePresence>
            {allReviews.map((review, i) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-50 p-8 rounded-3xl border border-gray-100 relative group hover:shadow-xl transition-all"
              >
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star 
                      key={j} 
                      className={`w-4 h-4 ${j < review.rating ? 'fill-current' : 'text-gray-200'}`} 
                    />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mb-6 italic">"{review.content}"</p>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden mr-3">
                      {(review as any).userPhoto ? (
                        <img src={(review as any).userPhoto} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      ) : (
                        <User className="w-6 h-6 text-gray-400 m-2" />
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900">{review.userName}</div>
                      <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Verified Customer</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">
                    {review.createdAt?.seconds 
                      ? format(new Date(review.createdAt.seconds * 1000), 'yyyy.MM.dd')
                      : '방금 전'}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-16 text-center space-y-6">
          {!isFormOpen ? (
            <button 
              onClick={() => setIsFormOpen(true)}
              className="inline-flex items-center px-8 py-4 bg-primary text-white rounded-full font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              나의 이용후기 작성하기
            </button>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto bg-white p-8 rounded-[2.5rem] shadow-2xl border border-gray-100 relative"
            >
              <button 
                onClick={() => setIsFormOpen(false)}
                className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-900 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <h3 className="text-2xl font-black mb-8 text-left">솔직한 이용후기를 남겨주세요</h3>
              
              <form onSubmit={handleSubmitReview} className="space-y-6">
                <div className="flex items-center justify-center space-x-2 py-4 bg-gray-50 rounded-2xl">
                  {[...Array(5)].map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setNewReview({ ...newReview, rating: i + 1 })}
                      className={`p-1 transform transition-all hover:scale-125 ${i < newReview.rating ? 'text-yellow-400' : 'text-gray-200'}`}
                    >
                      <Star className={`w-8 h-8 ${i < newReview.rating ? 'fill-current' : ''}`} />
                    </button>
                  ))}
                </div>

                <textarea
                  required
                  rows={4}
                  value={newReview.content}
                  onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                  placeholder="서비스에 대해 만족하셨나요? 상세한 후기는 다른 고객님들께 큰 도움이 됩니다."
                  className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none text-lg resize-none"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-lg flex items-center justify-center shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all disabled:opacity-50"
                >
                  <Send className="w-5 h-5 mr-2" />
                  {isSubmitting ? '등록 중...' : '후기 등록 및 공유하기'}
                </button>
              </form>
            </motion.div>
          )}
          
          <div className="pt-8">
            <button className="text-gray-400 text-sm font-medium hover:text-primary transition-colors">
              더 많은 후기 보러가기 (준비 중)
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
