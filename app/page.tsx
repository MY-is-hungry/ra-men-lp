'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    // ローディング完了
    setTimeout(() => setIsLoading(false), 2000);

    // パーティクル生成
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: #8b4513;
        pointer-events: none;
        left: ${Math.random() * window.innerWidth}px;
        top: ${window.innerHeight}px;
        opacity: ${Math.random()};
        box-shadow: 0 2px 8px rgba(139,69,19,0.4);
      `;
      document.body.appendChild(particle);

      gsap.to(particle, {
        y: -window.innerHeight - 100,
        x: `+=${(Math.random() - 0.5) * 200}`,
        opacity: 0,
        duration: Math.random() * 5 + 5,
        ease: 'power2.out',
        onComplete: () => particle.remove()
      });
    };

    const particleInterval = setInterval(createParticle, 100);

    // GSAP スクロールアニメーション
    gsap.utils.toArray('.scroll-reveal').forEach((element) => {
      gsap.fromTo(element, 
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(particleInterval);
    };
  }, []);

  const menuItems = [
    { name: '特製醤油ラーメン', price: '¥980', description: '創業以来の伝統の味', emoji: '🍜', color: 'from-red-500 to-orange-500' },
    { name: '濃厚味噌ラーメン', price: '¥1,080', description: '北海道産味噌の深いコク', emoji: '🍜', color: 'from-orange-500 to-yellow-500' },
    { name: '塩ラーメン', price: '¥950', description: 'あっさり透明スープ', emoji: '🍜', color: 'from-blue-500 to-cyan-500' },
    { name: 'つけ麺', price: '¥1,180', description: '極太麺×濃厚スープ', emoji: '🍜', color: 'from-purple-500 to-pink-500' },
    { name: '餃子（6個）', price: '¥380', description: '自家製ジューシー餃子', emoji: '🥟', color: 'from-green-500 to-lime-500' },
    { name: 'チャーシュー丼', price: '¥480', description: '特製タレの極上丼', emoji: '🍚', color: 'from-gray-500 to-gray-700' }
  ];

  return (
    <>

      {/* ローディング画面 */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          >
            <motion.h1
              className="text-8xl font-bold japanese-text font-brush lantern-glow"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              麺道 極
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ヘッダー */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay: 2 }}
        className="fixed top-0 left-0 right-0 bg-black/60 backdrop-blur-md z-40 border-b border-yellow-600/40"
      >
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.h1
            className="text-3xl font-bold japanese-text font-brush tracking-wider"
            whileHover={{ scale: 1.05 }}
          >
            麺道 極
          </motion.h1>
          <ul className="hidden md:flex gap-8">
            {['CONCEPT', 'MENU', 'ACCESS'].map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.5 + i * 0.1 }}
              >
                <a
                  href={`#${item.toLowerCase()}`}
                  className="relative text-lg hover:text-yellow-500 transition-colors group"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 group-hover:w-full transition-all duration-300" />
                </a>
              </motion.li>
            ))}
          </ul>
        </nav>
      </motion.header>

      {/* ヒーローセクション */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* 和風背景 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-amber-900/20 to-black" />
        
        {/* 和風装飾背景 */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{ opacity }}
        >
          <div className="absolute inset-0 japanese-gradient opacity-30" />
          <div className="absolute inset-0 japanese-pattern" />
        </motion.div>

        {/* メインコンテンツ */}
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 2.5 }}
            className="mb-8"
          >
            <h2 className="font-display mb-8">
              <span className="block text-2xl md:text-4xl gold-text font-handwritten mb-2 tracking-wide">極限の</span>
              <span className="block text-7xl md:text-8xl lg:text-9xl japanese-text lantern-glow font-brush leading-none mb-2">ラーメン</span>
              <span className="block text-2xl md:text-4xl gold-text font-handwritten tracking-wide">体験</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 3 }}
            className="text-lg md:text-xl text-gray-200 mb-16 max-w-xl mx-auto leading-relaxed font-light"
          >
            限界を超えた一杯が、あなたの味覚を革命する
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 3.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <a
              href="#menu"
              className="inline-block px-10 py-4 bg-gradient-to-r from-amber-800 to-amber-600 rounded-md text-lg font-handwritten font-semibold tracking-wide hover:shadow-xl hover:shadow-amber-900/40 transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1"
            >
              味わいの世界へ
            </a>
          </motion.div>
        </div>

        {/* スクロールインジケーター */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-yellow-600 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-yellow-600 rounded-full mt-2 animate-bounce" />
          </div>
        </motion.div>
      </section>

      {/* コンセプトセクション */}
      <section id="concept" className="py-20 md:py-32 pt-32 md:pt-40 relative">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl md:text-6xl font-brush text-center mb-24 japanese-text scroll-reveal tracking-wider"
          >
            <span className="block text-lg md:text-xl font-handwritten text-amber-400 mb-2">伝統と革新</span>
            我らの哲学
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {[
              { title: 'TRADITION', subtitle: '伝統', icon: '⛩️', description: '100年受け継がれる秘伝のタレと、48時間煮込む究極のスープ' },
              { title: 'INNOVATION', subtitle: '革新', icon: '🚀', description: '最新の調理技術と伝統の融合が生み出す、未体験の味覚' },
              { title: 'PASSION', subtitle: '情熱', icon: '🔥', description: '一杯に込められた職人の魂が、あなたの心を震わせる' }
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className="scroll-reveal"
              >
                <Tilt
                  tiltMaxAngleX={10}
                  tiltMaxAngleY={10}
                  perspective={1000}
                  className="bg-gradient-to-br from-amber-900/20 to-black border border-yellow-600/30 rounded-lg p-8 hover:border-yellow-600 transition-all duration-300 backdrop-blur-sm"
                >
                  <div className="text-6xl mb-4">{item.icon}</div>
                  <h3 className="text-3xl font-handwritten mb-2 gold-text">{item.title}</h3>
                  <p className="text-xl text-yellow-600 mb-4">{item.subtitle}</p>
                  <p className="text-gray-400">{item.description}</p>
                </Tilt>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* メニューセクション */}
      <section id="menu" className="py-20 md:py-32 pt-32 md:pt-40 relative bg-gradient-to-b from-black via-amber-900/10 to-black">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl md:text-6xl font-brush text-center mb-24 japanese-text scroll-reveal tracking-wider"
          >
            <span className="block text-lg md:text-xl font-handwritten text-amber-400 mb-2">職人の逸品</span>
            品書
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {menuItems.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="scroll-reveal"
              >
                <Tilt
                  tiltMaxAngleX={20}
                  tiltMaxAngleY={20}
                  perspective={1000}
                  glareEnable={true}
                  glareMaxOpacity={0.3}
                  className="relative h-full"
                >
                  <div className={`bg-gradient-to-br ${item.color} p-0.5 rounded-2xl h-full`}>
                    <div className="bg-black rounded-2xl p-8 h-full hover:bg-gray-950 transition-all duration-300">
                      <div className="text-6xl mb-4 float-animation">{item.emoji}</div>
                      <h3 className="text-2xl font-bold mb-2">{item.name}</h3>
                      <p className="text-gray-400 mb-4">{item.description}</p>
                      <p className="text-3xl font-display gold-neon">{item.price}</p>
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </div>

          {/* 特別メニュー */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mt-20 text-center scroll-reveal"
          >
            <div className="inline-block relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 blur-3xl opacity-50 animate-pulse-slow" />
              <div className="relative bg-black border-2 border-yellow-500 rounded-2xl p-8">
                <h3 className="text-4xl font-display mb-4 gold-neon">限定メニュー</h3>
                <p className="text-2xl mb-2">究極の地獄ラーメン</p>
                <p className="text-gray-400 mb-4">※激辛注意！完食者には認定証を贈呈</p>
                <p className="text-4xl font-display neon-text">¥1,500</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* アクセスセクション */}
      <section id="access" className="py-20 md:py-32 pt-32 md:pt-40 relative">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl md:text-6xl font-brush text-center mb-24 japanese-text scroll-reveal tracking-wider"
          >
            <span className="block text-lg md:text-xl font-handwritten text-amber-400 mb-2">場所と時間</span>
            場所
          </motion.h2>

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="scroll-reveal"
            >
              <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} perspective={1000}>
                <div className="bg-gradient-to-br from-amber-900/10 to-black/90 border border-amber-600/20 rounded-xl p-8 hover:border-amber-500/40 hover:shadow-xl hover:shadow-amber-900/20 transition-all duration-400 backdrop-blur-sm">
                  <h3 className="text-2xl font-handwritten mb-8 gold-text tracking-wide">店舗情報</h3>
                  <table className="w-full text-lg">
                    <tbody>
                      {[
                        ['住所', '愛知県名古屋市中区栄3-4-5'],
                        ['電話', '052-1234-5678'],
                        ['営業時間', '24時間営業'],
                        ['定休日', '年中無休'],
                        ['席数', 'カウンター12席 / テーブル20席']
                      ].map(([label, value]) => (
                        <tr key={label} className="border-b border-amber-900/30">
                          <td className="py-4 font-medium text-amber-400 w-24">{label}</td>
                          <td className="py-4 text-gray-200 text-sm md:text-base">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Tilt>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="scroll-reveal"
            >
              <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} perspective={1000}>
                <div className="bg-gradient-to-br from-amber-900/10 to-black/90 border border-amber-600/20 rounded-xl h-full min-h-[400px] flex items-center justify-center hover:border-amber-500/40 hover:shadow-xl transition-all duration-400 backdrop-blur-sm">
                  <p className="text-xl text-amber-400 font-handwritten">地図エリア</p>
                </div>
              </Tilt>
            </motion.div>
          </div>
        </div>
      </section>

      {/* フッター */}
      <footer className="py-16 border-t border-red-500/30">
        <div className="container mx-auto px-4 text-center">
          <motion.h3
            className="text-4xl font-display mb-8 neon-text"
            whileHover={{ scale: 1.1 }}
          >
            麺道 極
          </motion.h3>
          <div className="flex justify-center gap-8 mb-8">
            {['facebook', 'twitter', 'instagram'].map((social) => (
              <motion.a
                key={social}
                href="#"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.3 }}
                className="w-12 h-12 border-2 border-red-500 rounded-full flex items-center justify-center hover:bg-red-500 hover:border-red-500 transition-all duration-300"
              >
                <span className="text-xl">{social[0].toUpperCase()}</span>
              </motion.a>
            ))}
          </div>
          <p className="text-gray-500">© 2024 麺道 極. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}