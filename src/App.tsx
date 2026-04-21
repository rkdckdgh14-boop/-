import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PromotionBanner from './components/PromotionBanner';
import BookingForm from './components/BookingForm';
import ReviewSection from './components/ReviewSection';
import CleaningCases from './components/CleaningCases';
import AboutUs from './components/AboutUs';
import Recruitment from './components/Recruitment';
import AdminDashboard from './components/AdminDashboard';
import MyPage from './components/MyPage';
import { Sparkles, ArrowRight, ShieldCheck, Clock, Zap } from 'lucide-react';
import { motion } from 'motion/react';

function LandingPage() {
  return (
    <div className="space-y-0">
      <Hero />
      <PromotionBanner />
      
      {/* Services Detail Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-gray-900 sm:text-5xl tracking-tight">에코클린 청소서비스 자세히보기</h2>
            <p className="mt-6 text-lg text-gray-500 font-bold">
              매주, 집으로 찾아가는 에코클린 평소 정기구독 서비스! 청소방법과 청소 방법을 알아보세요.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: '욕실청소', desc: '세면대, 욕조, 욕실 용품 살균 및 세척 서비스', img: 'https://i.pinimg.com/236x/93/92/bc/9392bc41325465d0132084084943a891.jpg' },
              { title: '거실청소', desc: '소파 표면 살균 처리 및 세척 서비스', img: 'https://i.pinimg.com/736x/df/3e/53/df3e53fa250f7f340bb56e277e58beb2.jpg' },
              { title: '아이방 청소', desc: '아이 장난감 살균 처리 및 정리 서비스', img: 'https://i.pinimg.com/1200x/9e/7b/9b/9e7b9b6fa474451cb35575628dee2647.jpg' },
            ].map((service, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white rounded-[2rem] overflow-hidden group shadow-sm hover:shadow-xl transition-all border border-gray-100"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img src={service.img} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                  
                  {/* Plus Icon decorations */}
                  <div className="absolute top-4 left-4 bg-primary text-white p-1 rounded-full shadow-lg">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="absolute bottom-4 right-4 bg-primary text-white p-1 rounded-full shadow-lg">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-500 font-medium leading-relaxed">{service.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-gray-900 sm:text-5xl tracking-tight">에코클린 서비스요금 알아보기</h2>
            <p className="mt-6 text-lg text-gray-500 font-bold">
              평소의 질을 바꿔주는 에코클린 평소 정기구독 서비스! 에코클린의 서비스 요금을 알려드립니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: '주 1회 1개월 이용권', price: '8', border: 'border-primary' },
              { title: '주 1회 6개월 이용권', price: '7.5', border: 'border-accent' },
              { title: '주 2회 1개월 이용권', price: '15', border: 'border-primary' },
              { title: '주 2회 6개월 이용권', price: '12', border: 'border-accent' },
            ].map((plan, i) => (
              <div key={i} className={`bg-white p-8 rounded-3xl shadow-sm border-2 ${plan.border} flex flex-col items-center text-center transition-transform hover:scale-105`}>
                <h4 className="text-xl font-bold mb-4">{plan.title}</h4>
                <div className="flex items-baseline space-x-1 mb-6">
                  <span className="text-gray-400 font-bold">월</span>
                  <span className="text-4xl font-black text-gray-900">{plan.price}</span>
                  <span className="text-gray-900 font-bold text-lg">만원</span>
                </div>
                <button 
                  onClick={() => Link}
                  className={`w-full py-3 rounded-xl font-bold border-2 transition-colors ${
                    plan.border.includes('primary') 
                    ? 'border-primary text-primary hover:bg-primary hover:text-white' 
                    : 'border-accent text-accent hover:bg-accent hover:text-white'
                  }`}
                >
                  신청하기
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust/Banner Section at the bottom */}
      <section className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="max-w-md">
                <Sparkles className="w-12 h-12 text-white/50 mb-6" />
                <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6">
                  당신과의 첫날을 기념하며,<br />
                  특별한 할인쿠폰
                </h2>
                <p className="text-white/80 text-lg mb-8 font-medium">
                   에코클린에 오신 것을 환영합니다! 고객님과의 첫만남을 기념하여 특별한 할인쿠폰을 증정합니다.
                </p>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl flex items-center justify-between">
                   <div>
                      <div className="text-white/60 text-xs font-black uppercase tracking-widest">Discount Code</div>
                      <div className="text-white text-2xl font-black">WELCOME25</div>
                   </div>
                   <div className="text-4xl font-black text-accent outline-white">25%</div>
                </div>
              </div>
              
              <div className="relative w-full md:w-1/2 h-64 bg-gray-200 rounded-3xl overflow-hidden shadow-2xl">
                 <img 
                    src="https://picsum.photos/seed/cleaner-smile/800/400" 
                    alt="Happy Cleaner" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                 />
                 <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-transparent" />
                 <div className="absolute bottom-6 left-6 text-white">
                    <div className="text-2xl font-black">에코클린과 함께할 멤버를 찾습니다!</div>
                    <div className="text-sm font-bold opacity-80 mt-1">함께 최고 대우, 에코클린과 함께할 특별한 멤버를 찾고 있습니다.</div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ReviewSection />
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <Sparkles className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold tracking-tight">에코클린</span>
            </div>
            <p className="text-gray-500 max-w-sm leading-relaxed font-medium">
              에코클린은 친환경 가치와 꼼꼼한 전문 서비스를 통해 고객님의 생활 공간을 더욱 건강하고 쾌적하게 변화시킵니다.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-6 uppercase tracking-wider">주요 서비스</h4>
            <ul className="space-y-4 text-sm font-medium text-gray-500">
              <li>일반 가사 청소</li>
              <li>입주 / 이사 청소</li>
              <li>정기 관리 서비스</li>
              <li>사무실 클리닝</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-6 uppercase tracking-wider">고객 지원</h4>
            <ul className="space-y-4 text-sm font-medium text-gray-500">
              <li>자주 묻는 질문</li>
              <li>상담 문의 (카카오톡)</li>
              <li>이용 약관</li>
              <li>개인정보처리방침</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs font-bold text-gray-400 uppercase tracking-widest">
           <div>© 2024 ECO CLEANING. ALL RIGHTS RESERVED.</div>
           <div className="flex space-x-6">
              <a href="#" className="hover:text-primary transition-colors">Instagram</a>
              <a href="#" className="hover:text-primary transition-colors">Blog</a>
              <a href="#" className="hover:text-primary transition-colors">Kakao</a>
           </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/booking" element={<BookingForm />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/reviews" element={<ReviewSection />} />
            <Route path="/cases" element={<CleaningCases />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/recruitment" element={<Recruitment />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
