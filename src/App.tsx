/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  ShoppingCart, 
  Truck, 
  Smartphone, 
  ArrowRight, 
  CheckCircle2, 
  Mail, 
  MapPin, 
  MessageSquare,
  ChevronRight,
  Menu,
  X,
  Plus
} from 'lucide-react';

// Types
type Language = 'en' | 'jp';
type Page = 'home' | 'ecommerce' | 'logistics' | 'smartphones';

interface Content {
  [key: string]: string | string[];
}

const translations: Record<Language, any> = {
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      news: 'News',
      company: 'Company Info',
      contact: 'Contact'
    },
    hero: {
      badge: 'Japan\'s Global Business Partner',
      title: 'Your Bridge Between Japan & The World',
      subtitle: 'Specializing in online sales of refurbished products, global procurement, and international smartphone distribution.',
      btnPrimary: 'Explore Divisions',
      btnSecondary: 'Get in Touch'
    },
    stats: [
      { label: 'Global Suppliers', value: '200+' },
      { label: 'Countries Reached', value: '30+' },
      { label: 'Products Sold', value: '50K+' },
      { label: 'Quality Rate', value: '99.9%' }
    ],
    services: {
      tag: 'OUR DIVISIONS',
      title: 'Specialized Global<br/>Commerce',
      subtitle: 'We operate three core divisions focused on quality products and efficient global supply chains.',
      ecommerce: {
        title: 'Online Refurbished Sales',
        description: 'Selling certified refurbished and used products online. Quality guaranteed sourcing and global fulfillment.',
        link: 'Learn more',
        offerings: [
          { title: 'Certified Refurbishment', desc: 'Rigorous 50-point inspection and restoration by expert technicians.' },
          { title: 'Multi-Platform Sales', desc: 'Strategic presence on Amazon, Rakuten, Back Market, and specialized marketplaces.' },
          { title: 'Quality Assurance', desc: 'Comprehensive grading system ensuring transparency for every used product.' },
          { title: 'Global Fulfillment', desc: 'Secure packaging and rapid delivery to customers across international borders.' },
          { title: 'Inventory Management', desc: 'Real-time stock tracking and optimization for high-demand consumer electronics.' },
          { title: 'Client Support', desc: 'Dedicated multilingual customer service for a seamless buying experience.' }
        ]
      },
      logistics: {
        title: 'Global Procurement',
        description: 'Procuring products globally from trusted suppliers. Expert sourcing, quality control, and supply chain management.',
        link: 'Learn more',
        offerings: [
          { title: 'Supplier Network', desc: 'Access to a vetted network of global suppliers for diverse product categories.' },
          { title: 'Strategic Sourcing', desc: 'Finding the best quality products at the most competitive global prices.' },
          { title: 'Quality Audits', desc: 'On-site inspections and quality control to ensure compliance with standards.' },
          { title: 'Supply Chain Optimization', desc: 'Streamlining procurement flows to reduce lead times and costs.' },
          { title: 'Customs Expertise', desc: 'Handling complex international import/export regulations and duty compliance.' },
          { title: 'Market Intelligence', desc: 'Data-driven insights to identify emerging trends and sourcing opportunities.' }
        ]
      },
      smartphones: {
        title: 'Global Smartphone Sales',
        description: 'Specializing in global smartphone distribution. New and certified pre-owned devices for international markets.',
        link: 'Learn more',
        offerings: [
          { title: 'International Brands', desc: 'Direct access to the latest models from major global smartphone manufacturers.' },
          { title: 'Certified Pre-owned', desc: 'High-quality used devices fully tested and backed by our warranty.' },
          { title: 'Bulk Distribution', desc: 'Scalable wholesale solutions for businesses and retail partners worldwide.' },
          { title: 'Device Grading', desc: 'Industry-standard grading (A/B/C) providing clear value for every device.' },
          { title: 'Secure Tech Logistics', desc: 'Specialized handling and insurance for high-value electronic shipments.' },
          { title: 'Price Analytics', desc: 'Real-time market price tracking to ensure competitive rates for our clients.' }
        ]
      }
    },
    features: {
      tag: 'WHY MOBIZ',
      title: 'Built for Global Commerce',
      items: [
        { title: 'Market Experts', description: 'Deep knowledge of global product trends, regulations, and consumer behavior.' },
        { title: 'Global Sourcing', description: 'Network of trusted suppliers worldwide ensuring the best quality and prices.' },
        { title: 'Quality Assurance', description: 'Rigorous inspection standards for every refurbished and used product we sell.' },
        { title: 'Efficient Distribution', description: 'Streamlined global logistics to deliver products quickly and securely.' }
      ]
    },
    contact: {
      tag: 'CONTACT',
      title: 'Let\'s Work Together',
      subtitle: 'Interested in our products or services? Reach out and we\'ll get back to you within 24 hours.',
      note: 'English & Japanese Support',
      labels: {
        name: 'FULL NAME',
        email: 'EMAIL',
        company: 'COMPANY NAME (OPTIONAL)',
        service: 'DIVISION INTEREST',
        message: 'MESSAGE',
        submit: 'Send Message'
      },
      options: ['Select a division...', 'Online Refurbished Sales', 'Global Procurement', 'Global Smartphone Sales', 'All Divisions']
    },
    companyProfile: {
      tag: 'COMPANY PROFILE',
      title: 'Corporate Overview',
      details: [
        { label: 'Company Name', value: 'MOBIZ LLC (MOBIZ合同会社)' },
        { label: 'Headquarters', value: '2-2-15 Hamamatsucho Dia Building 2F, Hamamatsucho, Minato-ku, Tokyo 105-0013' },
        { label: 'Email', value: 'mobiz.customer@gmail.com' },
        { label: 'Business Capacity', value: 'Mon-Fri: 10:00 - 17:00' },
        { label: 'License', value: 'Antique Dealer License: Chiba Prefectural Public Safety Commission No. 441060001263' }
      ]
    },
    latestNews: {
      tag: 'LATEST NEWS',
      title: 'Company Updates',
      items: [
        { date: '2024.05.10', title: 'New Strategic Sourcing Partnership in Southeast Asia', type: 'Partnership' },
        { date: '2024.04.22', title: 'MOBIZ LLC Expands Refurbished Electronics Inventory', type: 'Inventory' },
        { date: '2024.03.15', title: 'Official Launch of the Global Procurement Division', type: 'Division' }
      ]
    },
    footer: {
      description: 'Your trusted partner for global procurement and refurbished product sales.',
      columns: [
        { title: 'Quick Links', links: ['About', 'Services', 'News', 'Company Info', 'Contact'] },
        { title: 'Shop Online', links: ['Cellux.jp', 'Rakuten Store', 'Back Market', 'Amazon'] }
      ],
      rights: '© 2026 MOBIZ合同会社。All rights reserved.',
      regions: ['Japan', 'USA', 'EU', 'SEA', 'China', 'Korea', 'AU', 'ME']
    }
  },
  jp: {
    nav: {
      home: 'ホーム',
      services: 'サービス',
      news: 'ニュース',
      company: '会社情報',
      contact: 'お問い合わせ'
    },
    hero: {
      badge: 'グローバルビジネスパートナー',
      title: '日本と世界をつなぐ、<br>質の高いビジネスを。',
      subtitle: 'リユース・リフレッシュ品のオンライン販売、グローバルな製品調達、スマートフォンの国際流通を専門としています。',
      btnPrimary: '事業内容を見る',
      btnSecondary: 'お問い合わせ'
    },
    stats: [
      { label: 'グローバルサプライヤー', value: '200+' },
      { label: '対応国数', value: '30+' },
      { label: '累計販売数', value: '5万点+' },
      { label: '品質合格率', value: '99.9%' }
    ],
    services: {
      tag: '事業紹介',
      title: '質の高い製品を<br/>日本へ',
      subtitle: '高品質な製品の提供と効率的なグローバル・サプライチェーンを軸に、3つの事業を展開しています。',
      ecommerce: {
        title: 'リユース品オンライン販売',
        description: '高品質なリフレッシュ品・中古品のオンライン販売。確かな品質管理とグローバルな配送体制。',
        link: '詳細はこちら',
        offerings: [
          { title: '認定リフレッシュ', desc: '専門技術者による50項目の厳格な検査と整備を実施。' },
          { title: 'マルチチャネル販売', desc: 'Amazon、楽天、Back Market等の主要モールでの戦略的展開。' },
          { title: '品質保証体制', desc: '透明性の高い独自のグレーディングシステムによる品質管理。' },
          { title: 'グローバル配送', desc: '国際配送に対応した安全な梱包と迅速なデリバリーサービス。' },
          { title: '在庫最適化', desc: '需要動向に基づいたリアルタイムな在庫管理と供給体制。' },
          { title: 'カスタマーサポート', desc: '多言語対応による、安心・安全な購入体験の提供。' }
        ]
      },
      logistics: {
        title: 'グローバル調達サービス',
        description: '世界中から最適な製品を調達。サプライヤー選定から品質管理、管理体制の構築まで。',
        link: '詳細はこちら',
        offerings: [
          { title: 'サプライヤーネットワーク', desc: '世界各地の信頼できるサプライヤーとの広範な提携網。' },
          { title: '戦略的ソーシング', desc: '高品質な製品を世界市場から最適な価格で調達。' },
          { title: '品質監査', desc: '現地での検品と厳格なクオリティコントロールの実施。' },
          { title: 'サプライチェーン最適化', desc: 'リードタイム短縮とコスト削減を実現する物流構築。' },
          { title: '輸出入コンプライアンス', desc: '複雑な国際規制や関税手続きへの確実な対応。' },
          { title: 'マーケットインテリジェンス', desc: 'データに基づいた市場トレンドの把握と調達戦略の立案。' }
        ]
      },
      smartphones: {
        title: 'グローバルスマホ販売',
        description: '世界市場向けの端末販売と流通を専門。最新のスマホから高品質な中古端末まで。',
        link: '詳細はこちら',
        offerings: [
          { title: '主要ブランド取扱い', desc: '世界の主要メーカーの最新モデルを直接調達・流通。' },
          { title: '認定中古端末', desc: '動作確認済みの高品質な中古端末を保証付きで提供。' },
          { title: '法人向け卸売', desc: '世界中の小売店や企業向けの柔軟な大口販売ソリューション。' },
          { title: '端末グレーディング', desc: '業界標準の評価基準による、価値の明確な端末提供。' },
          { title: '高付加価値配送', desc: '電子機器に特化した安全な梱包と保険付き輸送サービス。' },
          { title: '価格動向分析', desc: 'リアルタイムな市場価格追跡による、競争力のある価格設定。' }
        ]
      }
    },
    features: {
      tag: '選ばれる理由',
      title: 'グローバルに強いモビズ',
      items: [
        { title: '市場の専門知識', description: 'グローバルな製品トレンド、規制、消費者行動に関する深い知見。' },
        { title: 'グローバル調達網', description: '世界中の信頼できるサプライヤーネットワークによる、高品質・低価格の実現。' },
        { title: '品質保証', description: '販売するすべてのリユース・リフレッシュ品に対する厳格な検査基準。' },
        { title: '効率的な流通', description: '迅速かつ安全に製品を届ける、最適化されたグローバル物流体制。' }
      ]
    },
    contact: {
      tag: 'お問い合わせ',
      title: '一緒に成長しましょう',
      subtitle: '製品やサービスにご興味がありますか？お気軽にご連絡ください。24時間以内にご返信いたします。',
      note: '日本語・英語対応',
      labels: {
        name: 'お名前',
        email: 'メールアドレス',
        company: '会社名（任意）',
        service: 'ご興味の事業',
        message: 'メッセージ',
        submit: '送信する'
      },
      options: ['事業を選択...', 'リユース品オンライン販売', 'グローバル調達サービス', 'グローバルスマホ販売', 'すべての事業']
    },
    companyProfile: {
      tag: '会社概要',
      title: '企業情報',
      details: [
        { label: '会社名', value: 'MOBIZ LLC (MOBIZ合同会社)' },
        { label: '所在地', value: '〒105-0013 東京都港区浜松町2-2-15 浜松町ダイヤビル2F' },
        { label: 'メールアドレス', value: 'mobiz.customer@gmail.com' },
        { label: '営業時間', value: '月-金: 10:00 - 17:00' },
        { label: '古物商許可', value: '千葉県公安委員会 第441060001263号' }
      ]
    },
    latestNews: {
      tag: '最新ニュース',
      title: 'お知らせ',
      items: [
        { date: '2024.05.10', title: '東南アジアにおける戦略的調達パートナーシップを締結', type: '提携' },
        { date: '2024.04.22', title: 'リユース電子機器の在庫ラインナップを大幅に拡充', type: '在庫' },
        { date: '2024.03.15', title: 'グローバル調達部門を正式に新設しました', type: '部門' }
      ]
    },
    footer: {
      description: 'グローバル調達とリユース品販売の信頼できるパートナー。',
      columns: [
        { title: 'クイックリンク', links: ['概要', 'サービス', 'ニュース', '企業情報', 'お問い合わせ'] },
        { title: 'オンラインショップ', links: ['Cellux.jp', '楽天市場', 'Back Market', 'Amazon'] }
      ],
      rights: '© 2026 MOBIZ合同会社。All rights reserved.',
      regions: ['日本', '米国', 'EU', '東南アジア', '中国', '韓国', '豪州', '中東']
    }
  }
};

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="font-sans min-h-screen overflow-x-hidden bg-navy text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[5%] h-[68px] transition-all duration-300 border-b border-white/10 ${isScrolled ? 'bg-navy/85 backdrop-blur-[18px]' : 'bg-transparent'}`}>
        <div className="flex items-center gap-2.5 text-[1.2rem] font-extrabold tracking-tight cursor-pointer" onClick={() => navigateTo('home')}>
          <div className="w-9 h-9 rounded-xl bg-linear-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white text-[1.1rem]">M</div>
          <span>Mobiz<span className="text-cyan-400">.</span></span>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-1.5 list-none">
          <li>
            <button 
              onClick={() => navigateTo('home')}
              className={`text-[0.82rem] font-medium px-3.5 py-1.5 rounded-lg transition-all duration-200 cursor-pointer ${currentPage === 'home' ? 'text-white bg-white/10' : 'text-white/70 hover:text-white hover:bg-white/10'}`}
            >
              {t.nav.home}
            </button>
          </li>
          <li>
            <button 
              onClick={() => {
                if (currentPage !== 'home') navigateTo('home');
                setTimeout(() => document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' }), 100);
              }}
              className="text-[0.82rem] font-medium px-3.5 py-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer"
            >
              {t.nav.services}
            </button>
          </li>
          <li>
            <button 
              onClick={() => {
                if (currentPage !== 'home') navigateTo('home');
                setTimeout(() => document.getElementById('news-section')?.scrollIntoView({ behavior: 'smooth' }), 100);
              }}
              className="text-[0.82rem] font-medium px-3.5 py-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer"
            >
              {t.nav.news}
            </button>
          </li>
          <li>
            <button 
              onClick={() => {
                if (currentPage !== 'home') navigateTo('home');
                setTimeout(() => document.getElementById('company-profile-section')?.scrollIntoView({ behavior: 'smooth' }), 100);
              }}
              className="text-[0.82rem] font-medium px-3.5 py-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer"
            >
              {t.nav.company}
            </button>
          </li>
        </ul>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-white/8 border border-white/10 rounded-full overflow-hidden">
            <button 
              onClick={() => setLang('en')}
              className={`px-3.5 py-1 text-[0.75rem] font-bold cursor-pointer transition-all duration-200 ${lang === 'en' ? 'bg-linear-to-br from-blue-600 to-cyan-500 text-white rounded-full' : 'text-white/50'}`}
            >
              EN
            </button>
            <button 
              onClick={() => setLang('jp')}
              className={`px-3.5 py-1 text-[0.75rem] font-bold cursor-pointer transition-all duration-200 ${lang === 'jp' ? 'bg-linear-to-br from-blue-600 to-cyan-500 text-white rounded-full' : 'text-white/50'}`}
            >
              日本語
            </button>
          </div>
          <button 
            onClick={() => {
              if (currentPage !== 'home') navigateTo('home');
              setTimeout(() => document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' }), 100);
            }}
            className="hidden md:block px-[18px] py-[8px] rounded-lg bg-linear-to-br from-blue-600 to-cyan-500 text-white text-[0.8rem] font-semibold transition-opacity hover:opacity-85 cursor-pointer"
          >
            {t.nav.contact}
          </button>
          
          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-navy pt-24 px-8"
          >
            <ul className="flex flex-col gap-6">
              <li>
                <button onClick={() => navigateTo('home')} className="text-xl font-semibold text-white/80">{t.nav.home}</button>
              </li>
              <li>
                <button onClick={() => { navigateTo('home'); setTimeout(() => document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="text-xl font-semibold text-white/80">{t.nav.services}</button>
              </li>
              <li>
                <button onClick={() => { navigateTo('home'); setTimeout(() => document.getElementById('news-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="text-xl font-semibold text-white/80">{t.nav.news}</button>
              </li>
              <li>
                <button onClick={() => { navigateTo('home'); setTimeout(() => document.getElementById('company-profile-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="text-xl font-semibold text-white/80">{t.nav.company}</button>
              </li>
              <li>
                <button onClick={() => { navigateTo('home'); setTimeout(() => document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="text-xl font-semibold text-white/80">{t.nav.contact}</button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Marquee */}
      <div className="overflow-hidden border-y border-white/10 py-4 bg-white/2 mt-[68px]">
        <div className="flex w-max animate-marquee whitespace-nowrap">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="flex">
              {['Online Refurbished Sales', 'Global Procurement', 'Global Smartphone Sales', 'Quality Sourcing', 'Global Distribution'].map(text => (
                <span key={text} className="px-8 text-[0.78rem] font-semibold tracking-[2px] uppercase text-white/30 flex items-center">
                  <span className="text-cyan-400 mr-8">✦</span> {text}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <main>
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Hero */}
              <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-[5%] py-[120px] pb-20 overflow-hidden">
                <div className="absolute inset-0 z-0 hero-gradient"></div>
                <div className="absolute inset-0 z-0 hero-grid"></div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-600/40 rounded-full px-4 py-1.5 mb-7 text-[0.75rem] font-semibold text-blue-300 relative z-10"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></div>
                  {t.hero.badge}
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-[clamp(2.4rem,5vw,4rem)] font-extrabold leading-[1.1] tracking-[-2px] mb-5 relative z-10"
                  dangerouslySetInnerHTML={{ __html: t.hero.title }}
                />
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-[1.05rem] text-white/65 max-w-[560px] leading-[1.7] mb-9 relative z-10"
                >
                  {t.hero.subtitle}
                </motion.p>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex gap-3 flex-wrap justify-center relative z-10"
                >
                  <button onClick={() => document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' })} className="px-7 py-3.5 rounded-xl bg-linear-to-br from-blue-600 to-cyan-500 text-white text-[0.9rem] font-semibold transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(26,86,219,0.5)] shadow-[0_4px_24px_rgba(26,86,219,0.4)] cursor-pointer">
                    {t.hero.btnPrimary}
                  </button>
                  <button onClick={() => document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' })} className="px-7 py-3.5 rounded-xl border border-white/20 text-white text-[0.9rem] font-semibold transition-all hover:bg-white/8 hover:border-white/40 cursor-pointer">
                    {t.hero.btnSecondary}
                  </button>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex justify-center flex-wrap gap-0.5 mt-[70px] relative z-10"
                >
                  {t.stats.map((stat: any, idx: number) => (
                    <div key={idx} className={`px-10 py-6 text-center border-white/10 ${idx !== t.stats.length - 1 ? 'md:border-r' : ''}`}>
                      <div className="text-[2rem] font-extrabold bg-linear-to-br from-white to-cyan-400 bg-clip-text text-transparent">
                        {stat.value}
                      </div>
                      <div className="text-[0.75rem] text-slate-400 mt-1">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>
              </section>

              {/* Services List */}
              <section id="services-section" className="max-w-[1200px] mx-auto px-[5%] py-[100px]">
                <div className="text-[0.72rem] font-bold tracking-[3px] uppercase text-cyan-400 mb-3">{t.services.tag}</div>
                <h2 className="text-[clamp(1.8rem,3vw,2.8rem)] font-extrabold tracking-tight leading-[1.15] mb-4" dangerouslySetInnerHTML={{ __html: t.services.title }} />
                <p className="text-base text-white/55 max-w-[520px] mb-14 leading-[1.7]">{t.services.subtitle}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <ServiceCard 
                    icon={<ShoppingCart className="text-blue-400" />} 
                    title={t.services.ecommerce.title} 
                    description={t.services.ecommerce.description} 
                    link={t.services.ecommerce.link}
                    onClick={() => navigateTo('ecommerce')}
                  />
                  <ServiceCard 
                    icon={<Truck className="text-cyan-400" />} 
                    title={t.services.logistics.title} 
                    description={t.services.logistics.description} 
                    link={t.services.logistics.link}
                    onClick={() => navigateTo('logistics')}
                  />
                  <ServiceCard 
                    icon={<Smartphone className="text-amber-400" />} 
                    title={t.services.smartphones.title} 
                    description={t.services.smartphones.description} 
                    link={t.services.smartphones.link}
                    onClick={() => navigateTo('smartphones')}
                  />
                </div>
              </section>

              {/* Features as Company Info */}
              <section id="features-section" className="bg-white/2 border-y border-white/10 px-[5%] py-20">
                <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                  <div>
                    <div className="text-[0.72rem] font-bold tracking-[3px] uppercase text-cyan-400 mb-3">{t.features.tag}</div>
                    <h2 className="text-[clamp(1.8rem,3vw,2.8rem)] font-extrabold tracking-tight leading-[1.15] mb-10">{t.features.title}</h2>
                    <div className="flex flex-col gap-6">
                      {t.features.items.map((item: any, idx: number) => (
                        <div key={idx} className="flex gap-4 items-start p-5 rounded-2xl transition-colors hover:bg-white/4 group">
                          <div className="w-10 h-10 rounded-xl bg-blue-600/15 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600/30 transition-colors">
                            {idx === 0 && <Globe className="text-blue-400" size={18} />}
                            {idx === 1 && <MessageSquare className="text-blue-400" size={18} />}
                            {idx === 2 && <CheckCircle2 className="text-blue-400" size={18} />}
                            {idx === 3 && <Plus className="text-blue-400" size={18} />}
                          </div>
                          <div>
                            <h4 className="text-[0.92rem] font-bold mb-1">{item.title}</h4>
                            <p className="text-[0.82rem] text-white/50 leading-[1.6]">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-white/4 border border-white/10 rounded-3xl p-8 relative overflow-hidden">
                    <div className="absolute inset-0 bg-radial-at-tl from-blue-600/15 to-transparent"></div>
                    <div className="relative z-10">
                      <div className="text-[0.75rem] font-bold tracking-[2px] text-cyan-400 mb-5 uppercase">Network Presence</div>
                      <div className="grid grid-cols-4 gap-2.5 mb-5">
                        {Array.from({ length: 16 }).map((_, i) => (
                          <div key={i} className={`aspect-square rounded-lg transition-colors ${i % 3 === 0 ? 'bg-blue-600/35' : (i % 5 === 0 ? 'bg-cyan-500/30' : 'bg-white/5')}`}></div>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2 mt-5">
                        {t.footer.regions.map((region: string, i: number) => (
                          <span key={i} className="px-3 py-1 rounded-full bg-white/6 border border-white/10 text-[0.72rem] text-slate-400">
                            {region}
                          </span>
                        ))}
                      </div>
                      <div className="mt-6 p-4 bg-blue-600/10 rounded-xl border border-blue-600/20">
                        <div className="text-[0.72rem] text-slate-400 mb-1.5">Active Shipments Today</div>
                        <div className="text-[1.8rem] font-extrabold text-cyan-400">247</div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* News Section */}
              <section id="news-section" className="max-w-[1200px] mx-auto px-[5%] py-[100px] border-t border-white/10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                  <div>
                    <div className="text-[0.72rem] font-bold tracking-[3px] uppercase text-cyan-400 mb-3">{t.latestNews.tag}</div>
                    <h2 className="text-[clamp(1.8rem,3vw,2.8rem)] font-extrabold tracking-tight leading-[1.15]">{t.latestNews.title}</h2>
                  </div>
                  <button className="text-[0.85rem] font-bold text-white/40 hover:text-cyan-400 transition-colors flex items-center gap-2 group cursor-pointer">
                    VIEW ALL NEWS <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
                
                <div className="flex flex-col gap-4">
                  {t.latestNews.items.map((item: any, idx: number) => (
                    <motion.div 
                      key={idx}
                      whileHover={{ x: 10 }}
                      className="group flex flex-col md:flex-row md:items-center gap-4 md:gap-10 p-6 rounded-2xl bg-white/3 border border-white/10 hover:bg-white/6 hover:border-white/20 transition-all cursor-pointer"
                    >
                      <div className="text-[0.85rem] font-mono text-white/30">{item.date}</div>
                      <div className="px-3 py-1 rounded-full bg-white/5 text-[0.65rem] font-bold text-cyan-400 border border-white/10 w-fit">
                        {item.type}
                      </div>
                      <div className="text-[1rem] font-bold text-white/80 group-hover:text-white transition-colors flex-1">
                        {item.title}
                      </div>
                      <ChevronRight size={18} className="hidden md:block text-white/20 group-hover:text-cyan-400 transition-colors" />
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Company Profile Section */}
              <section id="company-profile-section" className="max-w-[1200px] mx-auto px-[5%] py-[100px] border-t border-white/10">
                <div className="text-[0.72rem] font-bold tracking-[3px] uppercase text-cyan-400 mb-3">{t.companyProfile.tag}</div>
                <h2 className="text-[clamp(1.8rem,3vw,2.8rem)] font-extrabold tracking-tight leading-[1.15] mb-10">{t.companyProfile.title}</h2>
                <div className="bg-white/4 border border-white/10 rounded-2xl overflow-hidden">
                  {t.companyProfile.details.map((detail: any, idx: number) => (
                    <div key={idx} className={`grid grid-cols-1 md:grid-cols-[240px_1fr] border-b border-white/10 last:border-0`}>
                      <div className="bg-white/5 px-8 py-5 text-[0.85rem] font-bold text-slate-300 md:border-r border-white/10 flex items-center">
                        {detail.label}
                      </div>
                      <div className="px-8 py-5 text-[0.85rem] text-white/70 flex items-center leading-relaxed">
                        {detail.value}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Contact */}
              <section id="contact-section" className="bg-white/2 border-t border-white/10 px-[5%] py-[100px]">
                <div className="max-w-[900px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-15 items-start">
                  <div>
                    <div className="text-[0.72rem] font-bold tracking-[3px] uppercase text-cyan-400 mb-3">{t.contact.tag}</div>
                    <h3 className="text-3xl font-extrabold tracking-tight mb-3.5" dangerouslySetInnerHTML={{ __html: t.contact.title.replace('\n', '<br/>') }} />
                    <p className="text-[0.87rem] text-white/55 leading-[1.7] mb-8">{t.contact.subtitle}</p>
                    <div className="flex flex-col gap-3.5">
                      <div className="flex items-center gap-3 text-white/65 text-[0.85rem]">
                        <MapPin size={18} className="text-cyan-400" /> <span>Japan (HQ)</span>
                      </div>
                      <div className="flex items-center gap-3 text-white/65 text-[0.85rem]">
                        <Mail size={18} className="text-cyan-400" /> <span>hello@mobiz-solutions.com</span>
                      </div>
                      <div className="flex items-center gap-3 text-white/65 text-[0.85rem]">
                        <MessageSquare size={18} className="text-cyan-400" /> <span>{t.contact.note}</span>
                      </div>
                    </div>
                  </div>
                  
                  <form className="flex flex-col gap-4" onSubmit={handleContactSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[0.75rem] font-semibold text-white/60 tracking-wider uppercase">{t.contact.labels.name}</label>
                        <input required type="text" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-[0.87rem] outline-none transition-all focus:border-blue-600/60 focus:bg-blue-600/8" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[0.75rem] font-semibold text-white/60 tracking-wider uppercase">{t.contact.labels.company}</label>
                        <input type="text" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-[0.87rem] outline-none transition-all focus:border-blue-600/60 focus:bg-blue-600/8" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[0.75rem] font-semibold text-white/60 tracking-wider uppercase">{t.contact.labels.email}</label>
                        <input required type="email" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-[0.87rem] outline-none transition-all focus:border-blue-600/60 focus:bg-blue-600/8" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[0.75rem] font-semibold text-white/60 tracking-wider uppercase">{t.contact.labels.service}</label>
                        <select required className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-[0.87rem] outline-none transition-all focus:border-blue-600/60 focus:bg-blue-600/8 appearance-none cursor-pointer">
                          {t.contact.options.map((opt: string, idx: number) => (
                             <option key={idx} value={idx === 0 ? "" : idx} className="bg-navy-light">{opt}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[0.75rem] font-semibold text-white/60 tracking-wider uppercase">{t.contact.labels.message}</label>
                      <textarea required className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-[0.87rem] outline-none transition-all focus:border-blue-600/60 focus:bg-blue-600/8 min-h-[110px] resize-y"></textarea>
                    </div>
                    <button type="submit" className="w-full bg-linear-to-br from-blue-600 to-cyan-500 py-3.5 rounded-xl text-[0.9rem] font-bold text-white transition-opacity hover:opacity-90 shadow-lg shadow-blue-900/20 cursor-pointer">
                      {t.contact.labels.submit} →
                    </button>
                  </form>
                </div>
              </section>
            </motion.div>
          )}

          {/* Service Detail Pages */}
          {(['ecommerce', 'logistics', 'smartphones'] as Page[]).includes(currentPage) && (
            <motion.div
              key={currentPage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="pt-[68px]"
            >
              <div className="bg-radial-at-t from-blue-600/20 to-transparent text-center px-[5%] py-[80px] border-b border-white/10">
                <div className="text-[0.72rem] font-bold tracking-[3px] uppercase text-cyan-400 mb-3">SERVICES</div>
                <h1 className="text-[clamp(2rem,4vw,3.2rem)] font-extrabold tracking-tight mb-4">
                  {currentPage === 'ecommerce' && t.nav.ecommerce}
                  {currentPage === 'logistics' && t.nav.logistics}
                  {currentPage === 'smartphones' && t.nav.smartphones}
                </h1>
                <p className="text-base text-white/60 max-w-[560px] mx-auto leading-[1.7]">
                   {currentPage === 'ecommerce' && t.services.ecommerce.description}
                   {currentPage === 'logistics' && t.services.logistics.description}
                   {currentPage === 'smartphones' && t.services.smartphones.description}
                </p>
              </div>
              
              <div className="max-w-[1100px] mx-auto px-[5%] py-[80px]">
                <div className="text-[0.72rem] font-bold tracking-[3px] uppercase text-cyan-400 mb-3">{t.services.tag}</div>
                <h2 className="text-4xl font-extrabold tracking-tight mb-12">Expert Solutions For<br/>Your Growing Business</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {t.services[currentPage].offerings.map((offering: any, i: number) => (
                    <div key={i} className="bg-white/4 border border-white/10 rounded-2xl p-6 transition-all hover:bg-white/7 hover:border-blue-600/30 hover:-translate-y-0.5">
                       <div className="text-3xl mb-3.5">
                         {currentPage === 'ecommerce' && ['✨', '📦', '✔️', '🌍', '📊', '💬'][i]}
                         {currentPage === 'logistics' && ['🤝', '🎯', '🔍', '⚙️', '⚖️', '💡'][i]}
                         {currentPage === 'smartphones' && ['📱', '🏢', '🤝', '📋', '🚚', '📈'][i]}
                       </div>
                       <h4 className="text-[0.9rem] font-bold mb-2">{offering.title}</h4>
                       <p className="text-[0.8rem] text-white/50 leading-[1.6]">{offering.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-12 text-center">
                  <button onClick={() => navigateTo('home')} className="px-7 py-3 rounded-xl bg-linear-to-br from-blue-600 to-cyan-500 text-white font-bold transition-opacity hover:opacity-90 shadow-lg cursor-pointer">
                    Get Started →
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="px-[5%] pt-[60px] pb-[30px] border-t border-white/10">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2.5 text-[1.2rem] font-extrabold tracking-tight mb-3.5">
              <div className="w-9 h-9 rounded-xl bg-linear-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white text-[1.1rem]">M</div>
              <span>Mobiz<span className="text-cyan-400">.</span></span>
            </div>
            <div className="text-[0.82rem] text-slate-400 leading-[1.7] max-w-[320px]">
              <p className="font-bold text-white mb-2">MOBIZ LLC / MOBIZ合同会社</p>
              <p>〒105-0013</p>
              <p>{lang === 'en' ? '2-2-15 Hamamatsucho Dia Building 2F, Hamamatsucho, Minato-ku, Tokyo' : '東京都港区浜松町2-2-15'}</p>
              <p>{lang === 'en' ? '' : '浜松町ダイヤビル2F'}</p>
              <p className="mt-4 opacity-70">{t.footer.description}</p>
            </div>
          </div>
          {t.footer.columns.map((col: any, idx: number) => (
            <div key={idx}>
              <h5 className="text-[0.78rem] font-bold tracking-[2px] uppercase text-slate-400 mb-4">{col.title}</h5>
              <div className="flex flex-col gap-2.5">
                {col.links.map((link: string, lIdx: number) => {
                  const isQuickLink = col.title === 'Quick Links' || col.title === 'クイックリンク';
                  const isShopLink = col.title === 'Shop Online' || col.title === 'オンラインショップ';
                  
                  let onClick = undefined;
                  let href = "#";
                  
                  if (isQuickLink) {
                    if (lIdx === 0 || lIdx === 3) onClick = () => { navigateTo('home'); setTimeout(() => document.getElementById('company-profile-section')?.scrollIntoView({ behavior: 'smooth' }), 100); };
                    if (lIdx === 1) onClick = () => { navigateTo('home'); setTimeout(() => document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' }), 100); };
                    if (lIdx === 2) onClick = () => { navigateTo('home'); setTimeout(() => document.getElementById('news-section')?.scrollIntoView({ behavior: 'smooth' }), 100); };
                    if (lIdx === 4) onClick = () => { navigateTo('home'); setTimeout(() => document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' }), 100); };
                  } else if (isShopLink) {
                    if (link === 'Cellux.jp') href = 'https://cellux.jp';
                    if (link === 'Rakuten Store' || link === '楽天市場') href = 'https://www.rakuten.co.jp/cellux/';
                    if (link === 'Back Market') href = 'https://www.backmarket.co.jp/ja-jp/s/mobizu/c1bae959-084c-48fd-804f-c2b186f0eb7b';
                    if (link === 'Amazon') href = 'https://www.amazon.co.jp/b?node=26286483051&language=en&ie=UTF8&marketplaceID=A1VC38T7YXB528&me=A2KP75Y62GZLJY';
                  }

                  return (
                    <a 
                      key={lIdx} 
                      href={href}
                      target={href !== '#' ? "_blank" : undefined}
                      rel={href !== '#' ? "noopener noreferrer" : undefined}
                      onClick={(e) => { if (onClick) { e.preventDefault(); onClick(); } }} 
                      className="text-[0.82rem] text-white/55 hover:text-white cursor-pointer transition-colors"
                    >
                      {link}
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center pt-6 border-t border-white/10 text-[0.75rem] text-slate-400">
          <span>{t.footer.rights}</span>
        </div>
      </footer>

      {/* Toast */}
      {toastVisible && (
        <div className="fixed bottom-6 right-6 z-[100] bg-linear-to-br from-blue-600 to-cyan-500 text-white px-[22px] py-[14px] rounded-xl text-[0.85rem] font-semibold shadow-[0_8px_32px_rgba(26,86,219,0.5)] flex items-center gap-2">
           <CheckCircle2 size={18} /> {lang === 'en' ? 'Message sent! We\'ll reply soon.' : '送信完了！すぐにご連絡します。'}
        </div>
      )}

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-25%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}

function ServiceCard({ icon, title, description, link, onClick }: { icon: React.ReactNode, title: string, description: string, link: string, onClick: () => void }) {
  return (
    <div 
      onClick={onClick} 
      className="bg-white/4 border border-white/10 rounded-3xl p-8 cursor-pointer transition-all duration-300 relative overflow-hidden group hover:bg-white/7 hover:-translate-y-1 hover:border-blue-600/30"
    >
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="w-13 h-13 rounded-2xl bg-white/5 flex items-center justify-center mb-5 group-hover:bg-white/10 transition-colors">
        {icon}
      </div>
      <h3 className="text-[1.05rem] font-bold mb-2.5">{title}</h3>
      <p className="text-[0.85rem] text-white/55 leading-[1.65] mb-5">{description}</p>
      <div className="text-[0.8rem] font-semibold text-cyan-400 flex items-center gap-1.5 transition-all group-hover:gap-2.5">
        {link} <ArrowRight size={14} />
      </div>
    </div>
  );
}
