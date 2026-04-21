import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Users, Briefcase, Heart, CheckCircle2, X, Send } from 'lucide-react';

export default function Recruitment() {
  const [selectedJob, setSelectedJob] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const [formData, setFormData] = React.useState({
    name: '',
    phone: '',
    email: '',
    experience: '',
    message: ''
  });

  const jobRoles = [
    {
      title: '전문 클리닝 매니저',
      type: '신입/경력',
      description: '에코클린의 얼굴이 되어 고객님의 소중한 공간을 케어하는 전문가입니다.',
      benefits: ['업계 최고 수준 급여', '유연한 근무 시간', '전문 교육 프로그램 지원']
    },
    {
      title: '현장 교육 팀장',
      type: '경력 3년 이상',
      description: '신입 매니저 교육 및 현장 퀄리티 컨트롤을 담당하는 리더입니다.',
      benefits: ['관리자 인센티브', '차량 유류비 지원', '경조사 기금 운영']
    },
    {
      title: '고객 서비스(CS) 담당',
      type: '신입/경력',
      description: '고객님의 목소리에 귀 기울이고 예약 및 상담을 최우선으로 돕는 역할입니다.',
      benefits: ['쾌적한 근무 환경', '성과 달성 보너스', '자기계발비 지원']
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/mojynbrz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          type: '채용 지원',
          jobTitle: selectedJob,
          ...formData
        })
      });

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          setSelectedJob(null);
          setIsSuccess(false);
          setFormData({ name: '', phone: '', email: '', experience: '', message: '' });
        }, 3000);
      } else {
        alert('지원 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('지원 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white min-h-screen pt-24">
      {/* Hero Section */}
      <section className="py-20 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-black uppercase tracking-widest italic">Join Our Team</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight mb-6">
              에코클린과 함께 성장할<br />
              <span className="text-primary italic tracking-tighter">프로 인재</span>를 찾습니다.
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium mb-12">
              우리는 청소 그 이상의 가치를 만듭니다. <br className="hidden md:block" />
              당신의 성실함이 빛날 수 있도록 에코클린이 든든한 파트너가 되어드립니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Recruitment Image */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-[3rem] overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] border-8 border-white">
              <img 
                src="https://i.pinimg.com/736x/e5/8a/36/e58a365344294c1d668ae3000a245b8a.jpg" 
                alt="Recruitment Banner" 
                className="w-full h-auto object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Floating decorative elements */}
            <div className="absolute -top-10 -right-10 bg-primary w-24 h-24 rounded-full flex items-center justify-center -z-10 blur-2xl opacity-20" />
            <div className="absolute -bottom-10 -left-10 bg-accent w-32 h-32 rounded-full flex items-center justify-center -z-10 blur-3xl opacity-20" />
          </motion.div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-24 bg-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-6">
              <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto text-primary">
                <Users className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-black text-gray-900 tracking-tight">수평적인 소통 문화</h3>
              <p className="text-gray-500 font-medium leading-relaxed">현장의 목소리를 최우선으로 생각하며, 서로를 존중하며 함께 성장합니다.</p>
            </div>
            <div className="space-y-6">
              <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto text-primary">
                <Briefcase className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-black text-gray-900 tracking-tight">체계적인 교육 시스템</h3>
              <p className="text-gray-500 font-medium leading-relaxed">청소가 처음이신 분들도 전문가가 될 수 있도록 1:1 멘토링과 실무 교육을 지원합니다.</p>
            </div>
            <div className="space-y-6">
              <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto text-primary">
                <Heart className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-black text-gray-900 tracking-tight">확실한 복지와 보상</h3>
              <p className="text-gray-500 font-medium leading-relaxed">경쟁력 있는 급여와 각종 수당, 인센티브 제도를 통해 노력에 부응하는 보상을 제공합니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section className="py-24 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-black text-center text-gray-900 mb-16 tracking-tight">현재 모집 중인 포지션</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {jobRoles.map((role, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100 hover:border-primary/30 transition-all flex flex-col h-full"
              >
                <div className="mb-6">
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-black rounded-full mb-3 italic tracking-widest">{role.type}</span>
                  <h3 className="text-2xl font-black text-gray-900">{role.title}</h3>
                </div>
                <p className="text-gray-500 font-medium text-sm mb-8 flex-grow leading-relaxed">
                  {role.description}
                </p>
                <div className="space-y-3 mb-10">
                  {role.benefits.map((benefit, bIdx) => (
                    <div key={bIdx} className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-accent" />
                      <span className="text-xs font-bold text-gray-600">{benefit}</span>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => setSelectedJob(role.title)}
                  className="w-full py-4 bg-primary text-white rounded-2xl font-black hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
                >
                  지원하기
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Modal */}
      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedJob(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-black text-gray-900 italic tracking-tight uppercase">Apply Now</h2>
                  <button 
                    onClick={() => setSelectedJob(null)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-400" />
                  </button>
                </div>

                {isSuccess ? (
                  <div className="py-12 text-center space-y-6">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-12 h-12 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900">지원이 완료되었습니다!</h3>
                    <p className="text-gray-500 font-medium">검토 후 기재하신 연락처로 안내드리겠습니다.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="p-4 bg-primary/5 rounded-2xl mb-6">
                      <p className="text-xs font-black text-primary uppercase tracking-widest mb-1 italic">Selected Position</p>
                      <p className="text-lg font-black text-gray-900">{selectedJob}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 ml-2 uppercase tracking-wider">이름</label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-5 py-3.5 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-bold"
                          placeholder="홍길동"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 ml-2 uppercase tracking-wider">연락처</label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-5 py-3.5 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-bold"
                          placeholder="010-0000-0000"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 ml-2 uppercase tracking-wider">이메일</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-5 py-3.5 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-bold"
                        placeholder="you@example.com"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 ml-2 uppercase tracking-wider">경력 사항</label>
                      <select
                        name="experience"
                        required
                        value={formData.experience}
                        onChange={handleInputChange}
                        className="w-full px-5 py-3.5 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-bold appearance-none cursor-pointer"
                      >
                        <option value="">경력을 선택해주세요</option>
                        <option value="신입">신입</option>
                        <option value="1년 미만">1년 미만</option>
                        <option value="1~3년">1~3년</option>
                        <option value="3년 이상">3년 이상</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 ml-2 uppercase tracking-wider">자기소개 및 문의사항</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-5 py-3.5 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-medium resize-none"
                        placeholder="간단한 자기소개를 남겨주세요."
                      />
                    </div>

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-5 bg-primary text-white rounded-2xl font-black text-lg hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      {isSubmitting ? (
                        <span>제출 중...</span>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-1" />
                          <span>지원하기</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Final CTA */}
      <section className="py-24 bg-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight italic tracking-tighter">Ready to Make an Impact?</h2>
          <p className="text-lg text-gray-500 font-medium">당신의 새로운 시작을 에코클린이 응원합니다.<br />지금 지원서를 제출하고 공간의 변화를 주도하세요.</p>
          <div className="pt-4">
            <button 
              onClick={() => setSelectedJob('General Application')}
              className="px-12 py-5 bg-accent text-white rounded-full font-black text-xl shadow-2xl hover:bg-accent-dark transition-all hover:scale-105 active:scale-95"
            >
              지금 입사 지원하기
            </button>
          </div>
          <p className="text-xs text-gray-400 font-bold">궁금한 점이 있으신가요? recruit@ecoclean.kr 로 문의해 주세요.</p>
        </div>
      </section>
    </div>
  );
}
