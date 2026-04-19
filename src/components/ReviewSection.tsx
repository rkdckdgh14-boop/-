import React from 'react';
import { motion } from 'motion/react';
import { Star, MessageSquare, User } from 'lucide-react';

export default function ReviewSection() {
  const reviews = [
    { name: '김지현', rating: 5, content: '아이 키우느라 청소할 시간이 부족했는데, 정말 꼼꼼하게 해주셔서 감동받았습니다. 특히 화장실 물때가 싹 사라졌어요!', date: '2024.03.15' },
    { name: '이민호', rating: 5, content: '이사 청소 맡겼는데 창틀까지 깨끗하게 관리해주셨네요. 추천합니다.', date: '2024.03.12' },
    { name: '박서준', rating: 4, content: '예약이 간편해서 좋았고 매니저님도 친절하셨어요.', date: '2024.03.10' },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">신뢰할 수 있는 고객 후기</h2>
          <p className="mt-4 text-lg text-gray-600">많은 가정이 에코 청소업체와 함께 쾌적한 일상을 만들고 있습니다.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-50 p-8 rounded-3xl border border-gray-100 relative"
            >
              <div className="flex text-yellow-400 mb-4">
                {[...Array(review.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed mb-6 italic">"{review.content}"</p>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                    <User className="w-6 h-6 text-gray-400" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">{review.name}</div>
                    <div className="text-xs text-gray-500">정기 청소 고객</div>
                  </div>
                </div>
                <div className="text-xs text-gray-400">{review.date}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="inline-flex items-center text-primary font-bold hover:underline space-x-2">
            <MessageSquare className="w-5 h-5" />
            <span>더 많은 후기 보러가기</span>
          </button>
        </div>
      </div>
    </section>
  );
}
