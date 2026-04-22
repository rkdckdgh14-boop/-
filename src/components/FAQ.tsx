import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

const faqData = [
  {
    id: 6,
    question: '어떤 서비스를 전문적으로 제공하나요?',
    answer: '입주 청소, 이사 청소, 리모델링 후 청소, 거주 청소, 사무실/상가 청소 등 고객님 상황에 맞춰 청소 견적을 내어드린 후 맞춤형 서비스를 제공합니다.'
  },
  {
    id: 5,
    question: '환불 규정은 어떻게 되나요?',
    answer: `01. 현장에 다른 작업이 진행 중인 경우
       └전체 금액의 30%의 위약금이 발생하며 현장에서 철수합니다. 

02. 전기,조명, 수도 등의 문제가 있어 진행이 불가능한 경우
       └ 전체 금액의 30%의 위약금이 발생하며 현장에서 철수합니다.

03. 현장을 방문하였으나 고객님과 연락이 1시간 이상 닿지 않는 경우
       └전체 금액의 30%의 위약금이 발생하며 현장에서 철수합니다.

04. 예약 날짜 2일 전 취소 및 변경 시
       └ 별도의 위약금이 발생하지 않습니다.

05. 예약 날짜 1일 전 취소 및 변경 시
       └ 전체 금액의 30%의 위약금이 발생합니다.

06. 당일 취소 및 변경 시
       └ 전체 금액의 50%의 위약금이 발생합니다.`
  },
  {
    id: 4,
    question: '서비스 소요 시간은 얼마나 걸리나요?',
    answer: '오염도, 컨디션에 따라 소요 시간이 다를 수 있습니다. 평균적으로 3~5시간 정도 소요되고 있습니다.'
  },
  {
    id: 3,
    question: '서비스 견적 비용은 어떻게 산정되나요?',
    answer: '청소의 경우, 방 개수 화장실 개수에 따른 최저 작업 비용이 있고, 집 내부 상태나 타입에 따라 상이하기에 자세한 견적은 상담 과정에서 정확하게 안내해 드리고 있습니다.'
  },
  {
    id: 2,
    question: '서비스 진행 절차가 어떻게 될까요?',
    answer: '유선상 상담 과정을 통해 고객님 댁에 맞는 맞춤 견적 상담이 진행되고 예약제로 이루어집니다. 청소 진행 전 고객님과의 해피콜을 통해 방문 시간을 재확인한 뒤, 청소가 진행되게 됩니다 :)'
  },
  {
    id: 1,
    question: '대표적인 서비스는 무엇이 있나요?',
    answer: '기본적인 서비스로는 입주청소, 거주청소, 특수청소, 상가청소 등이 있으며 프미리엄 서비스로 코팅시공, 줄눈시공, 탄성코트, 곰팡이 제거 및 인테리어 필름 등이 있습니다.'
  }
];

export default function FAQ() {
  const [openId, setOpenId] = React.useState<number | null>(null);

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="bg-white min-h-screen pt-24">
      {/* Hero Section */}
      <section className="py-20 bg-gray-50 overflow-hidden text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-black uppercase tracking-widest italic">Common Questions</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight mb-6">
              자주 묻는 <span className="text-primary italic tracking-tighter">질문</span>
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium">
              에코클린 서비스 이용 전 궁금하신 점들을 정리해 드립니다.<br className="hidden md:block" />
              추가 문의사항은 고객센터를 이용해 주세요.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {faqData.map((item) => (
              <motion.div
                key={item.id}
                initial={false}
                className="border border-gray-100 rounded-3xl bg-white shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(item.id)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-colors ${openId === item.id ? 'bg-primary text-white' : 'bg-primary/10 text-primary'}`}>
                      <HelpCircle className="w-5 h-5" />
                    </div>
                    <span className="text-lg font-bold text-gray-900">{item.question}</span>
                  </div>
                  <motion.div
                    animate={{ rotate: openId === item.id ? 180 : 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <ChevronDown className={`w-6 h-6 ${openId === item.id ? 'text-primary' : 'text-gray-300'}`} />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {openId === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="px-6 pb-8 pt-2">
                        <div className="h-px bg-gray-50 mb-6" />
                        <div className="text-gray-600 font-medium leading-relaxed whitespace-pre-wrap pl-14">
                          {item.answer}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Contact CTA */}
      <section className="py-24 bg-primary text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight italic tracking-tighter">더 궁금한 점이 있으신가요?</h2>
          <p className="text-lg text-white/80 font-medium italic opacity-80">카카오톡 채널 '에코클린'으로 문의해 주시면<br />친절하고 정직하게 상담해 드리겠습니다.</p>
          <div className="pt-4">
            <button className="px-12 py-5 bg-white text-primary rounded-full font-black text-xl shadow-2xl hover:bg-gray-50 transition-all hover:scale-105 active:scale-95">
              카카오톡 실시간 상담하기
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
