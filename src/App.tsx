import { useState, useMemo } from 'react';
import type { FormEvent } from 'react';
import {
  Search,
  Sparkles,
  Award,
  Users,
  MessageSquare,
  Heart,
  Filter,
  ArrowRight,
  Star,
  FileText,
  Send,
  Briefcase,
  Plus,
  X,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Layers
} from 'lucide-react';

// === ข้อมูลจำลองสำหรับเว็บไซต์พาสเทลสุดมุ้งมิ้ง ===

const CATEGORIES = [
  { id: 'all', name: 'ทั้งหมด', icon: Layers, color: 'bg-purple-100 text-purple-600 border-purple-200' },
  { id: 'home', name: 'หาบ้านและคอนโด', icon: Heart, color: 'bg-pink-100 text-pink-600 border-pink-200' },
  { id: 'education', name: 'ติวเตอร์และโรงเรียน', icon: Award, color: 'bg-amber-100 text-amber-600 border-amber-200' },
  { id: 'lifestyle', name: 'ไลฟ์สไตล์และอีเวนต์', icon: Sparkles, color: 'bg-sky-100 text-sky-600 border-sky-200' },
  { id: 'business', name: 'ที่ปรึกษาธุรกิจ', icon: Briefcase, color: 'bg-emerald-100 text-emerald-600 border-emerald-200' }
];

const CERTIFICATES = [
  { id: 1, title: 'ใบอนุญาตนายหน้าอสังหาริมทรัพย์ระดับยอดเยี่ยม', authority: 'สมาคมอสังหาฯ แห่งประเทศไทย', year: '2025', idNo: 'RE-99201-AX', icon: ShieldCheck, color: 'pink' },
  { id: 2, title: 'ใบรับรองมาตรฐานการแมตช์งานระดับสากล', authority: 'Global Matching Standards Organization', year: '2026', idNo: 'GMSO-883-M', icon: Award, color: 'sky' },
  { id: 3, title: 'ผู้เชี่ยวชาญการให้คำปรึกษาไลฟ์สไตล์ที่ได้รับการรับรอง', authority: 'สถาบันพัฒนาที่ปรึกษาเอเชีย', year: '2024', idNo: 'LCA-441-PT', icon: CheckCircle2, color: 'purple' },
  { id: 4, title: 'ประกาศนียบัตรติวเตอร์และตัวแทนแนะแนวการศึกษายอดเยี่ยม', authority: 'กระทรวงการเรียนรู้สร้างสรรค์', year: '2025', idNo: 'EDU-7729-ED', icon: FileText, color: 'amber' }
];

const INITIAL_STAFF = [
  {
    id: 1,
    name: 'น้องแป้งหอม (Panghom)',
    role: 'หัวหน้าทีมผู้เชี่ยวชาญด้านอสังหาฯ พาสเทล',
    category: 'home',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    rating: 4.9,
    reviews: 128,
    tags: ['ใจดีมาก', 'ตอบไวสุดๆ', 'ปรึกษาฟรี'],
    bio: 'พร้อมช่วยคุณหาบ้านในฝันที่อบอุ่นและมีมุมถ่ายรูปสวยๆ ตกแต่งสไตล์มินิมอลพาสเทลละมุนใจ',
    phone: '081-234-5678',
    email: 'panghom.magic@fairyagent.com'
  },
  {
    id: 2,
    name: 'โค้ชมินต์ (Coach Mint)',
    role: 'ตัวแทนแนะแนวการศึกษาและไลฟ์สไตล์',
    category: 'education',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400',
    rating: 5.0,
    reviews: 95,
    tags: ['เรียนต่อต่างประเทศ', 'ติวเตอร์เด็ด', 'เป็นกันเอง'],
    bio: 'ยินดีพาเด็กๆ และผู้ที่สนใจไปเปิดประสบการณ์การเรียนรู้ใหม่ๆ วางแผนการเรียนอย่างมีความสุขไร้ความเครียด',
    phone: '082-345-6789',
    email: 'mint.edu@fairyagent.com'
  },
  {
    id: 3,
    name: 'พี่ซันนี่ (P\'Sunny)',
    role: 'ผู้จัดการฝ่ายบริการจัดหางานและที่ปรึกษาธุรกิจ',
    category: 'business',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400',
    rating: 4.8,
    reviews: 110,
    tags: ['มืออาชีพ', 'ไอเดียเจ๋ง', 'นักเจรจา'],
    bio: 'ช่วยแมตช์ธุรกิจของคุณกับพาร์ทเนอร์ที่เหมาะสมที่สุด พร้อมวิเคราะห์การตลาดด้วยวิธีสนุกๆ เข้าใจง่าย',
    phone: '083-456-7890',
    email: 'sunny.biz@fairyagent.com'
  },
  {
    id: 4,
    name: 'น้องเยลลี่ (Jelly)',
    role: 'ที่ปรึกษางานแต่งงานและอีเวนต์สุดคิ้วท์',
    category: 'lifestyle',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    rating: 4.9,
    reviews: 84,
    tags: ['จัดงานสวย', 'ตามใจลูกค้า', 'ใส่ใจทุกดีเทล'],
    bio: 'รังสรรค์งานอีเวนต์และปาร์ตี้วันเกิดในฝันให้เป็นจริงด้วยโทนสีพาสเทลน่ารักๆ และกิมมิกที่ทุกคนต้องประทับใจ',
    phone: '084-567-8901',
    email: 'jelly.event@fairyagent.com'
  }
];

const INITIAL_MATCHMAKING_REQUESTS = [
  {
    id: 1,
    title: 'ต้องการหาบ้านเดี่ยว 2 ชั้น ใกล้รถไฟฟ้า มีสวนกว้างๆ สไตล์มินิมอล',
    budget: '5.5 ล้าน - 8 ล้านบาท',
    client: 'คุณพัชราภรณ์ (ออมมี่)',
    status: 'กำลังจับคู่',
    date: 'วันนี้',
    category: 'home',
    categoryName: 'หาบ้านและคอนโด',
    icon: Heart,
    color: 'pink'
  },
  {
    id: 2,
    title: 'หาติวเตอร์สอนเปียโนเด็กเล็ก วัย 5 ขวบ สุภาพ ใจเย็นและตลก',
    budget: '600 - 800 บาท/ชม.',
    client: 'คุณแม่น้องสายฟ้า',
    status: 'จับคู่สำเร็จแล้ว',
    date: '1 วันที่แล้ว',
    category: 'education',
    categoryName: 'ติวเตอร์และโรงเรียน',
    icon: Award,
    color: 'amber'
  },
  {
    id: 3,
    title: 'ต้องการออแกไนเซอร์จัดงานแต่งงานริมหาด ธีมฟองสบู่พาสเทล',
    budget: '150,000 - 250,000 บาท',
    client: 'คุณริน & คุณวิน',
    status: 'กำลังจับคู่',
    date: '2 วันที่แล้ว',
    category: 'lifestyle',
    categoryName: 'ไลฟ์สไตล์และอีเวนต์',
    icon: Sparkles,
    color: 'sky'
  }
];

type Staff = {
  id: number;
  name: string;
  role: string;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  tags: string[];
  bio: string;
  phone: string;
  email: string;
};

type CustomNotification = { message: string; type: 'success' | 'error' } | null;

export default function App() {
  // --- สถานะการควบคุมระบบ (State Management) ---
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [matchmakingRequests, setMatchmakingRequests] = useState(INITIAL_MATCHMAKING_REQUESTS);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  
  // สถานะฟอร์มลงประกาศจับคู่
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [matchTitle, setMatchTitle] = useState('');
  const [matchBudget, setMatchBudget] = useState('');
  const [matchClient, setMatchClient] = useState('');
  const [matchCat, setMatchCat] = useState('home');

  // สถานะฟอร์มติดต่องานหลัก
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactService, setContactService] = useState('home');
  const [customNotification, setCustomNotification] = useState<CustomNotification>(null);

  // กรองผู้เชี่ยวชาญ (Staff Filtering)
  const filteredStaff = useMemo(() => {
    return INITIAL_STAFF.filter(staff => {
      const matchCat = selectedCategory === 'all' || staff.category === selectedCategory;
      const matchSearch = staff.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          staff.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          staff.bio.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  // ฟังก์ชันเพิ่มประกาศจับคู่ความต้องการ
  const handleCreateMatchRequest = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!matchTitle || !matchBudget || !matchClient) {
      showToast('กรุณากรอกข้อมูลให้ครบถ้วนก่อนส่งนะคะ 💖', 'error');
      return;
    }

    const matchedCategoryObj = CATEGORIES.find(c => c.id === matchCat);
    const newRequest = {
      id: Date.now(),
      title: matchTitle,
      budget: matchBudget,
      client: matchClient,
      status: 'กำลังจับคู่',
      date: 'เมื่อสักครู่',
      category: matchCat,
      categoryName: matchedCategoryObj ? matchedCategoryObj.name : 'บริการทั่วไป',
      icon: matchedCategoryObj ? matchedCategoryObj.icon : Sparkles,
      color: matchCat === 'home' ? 'pink' : matchCat === 'education' ? 'amber' : matchCat === 'lifestyle' ? 'sky' : 'emerald'
    };

    setMatchmakingRequests([newRequest, ...matchmakingRequests]);
    setShowMatchModal(false);
    
    // Reset Form
    setMatchTitle('');
    setMatchBudget('');
    setMatchClient('');
    
    showToast('เย้! ลงประกาศความต้องการเรียบร้อยแล้ว ทีมงานสุดน่ารักกำลังดำเนินการจับคู่ให้ค่ะ ✨', 'success');
  };

  // ฟังก์ชันส่งฟอร์มติดต่องานหลัก
  const handleContactSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) {
      showToast('อย่าลืมใส่ข้อมูลช่องที่เหลือด้วยน้าคนดี 🌸', 'error');
      return;
    }

    showToast(`ได้รับข้อมูลติดต่อของ คุณ${contactName} แล้วนะคะ! ทีมงานเจ้าหญิงพาสเทลจะตอบกลับทางอีเมล ${contactEmail} ภายใน 24 ชม. ค่ะ 💕`, 'success');
    
    // Reset Form
    setContactName('');
    setContactEmail('');
    setContactMessage('');
  };

  // ฟังค์ชันแสดง Toast แจ้งเตือนแบบ Custom น่ารักๆ
  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setCustomNotification({ message, type });
    setTimeout(() => {
      setCustomNotification(null);
    }, 5000);
  };

  return (
    <>
      {/* Container หลักที่มีลวดลายและพื้นหลังพาสเทลหวานฟุ้ง */}
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-sky-50 text-gray-700 font-sans relative overflow-x-hidden pb-16 selection:bg-pink-200 selection:text-pink-800">
        
        {/* ของตกแต่งพื้นหลังลอยละล่องเพิ่มความพาสเทลมุ้งมิ้ง */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-pulse"></div>
        <div className="absolute top-96 right-16 w-48 h-48 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-blue-100 rounded-full mix-blend-multiply filter blur-2xl opacity-40"></div>
        <div className="absolute top-1/2 left-5 w-8 h-8 text-pink-300 animate-bounce"><Sparkles size={32} /></div>
        <div className="absolute top-32 right-12 w-6 h-6 text-yellow-300 animate-spin"><Heart size={24} /></div>

        {/* --- CUSTOM TOAST NOTIFICATION --- */}
        {customNotification && (
          <div className="fixed top-5 right-5 z-50 max-w-md w-11/12 animate-bounce">
            <div className={`p-4 rounded-2xl shadow-xl border-2 flex items-start gap-3 transition-all duration-300 ${
              customNotification.type === 'success' 
                ? 'bg-white/90 border-pink-200 text-pink-600' 
                : 'bg-white/90 border-amber-200 text-amber-600'
            }`}>
              <div className="p-2 rounded-xl bg-pink-50 text-pink-500">
                <Sparkles size={20} />
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm">การแจ้งเตือนจาก FairyMatch</p>
                <p className="text-xs text-gray-600 mt-1">{customNotification.message}</p>
              </div>
              <button 
                onClick={() => setCustomNotification(null)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        )}

        {/* --- HEADER & NAVIGATION --- */}
        <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-md border-b-2 border-pink-100/40 px-4 py-3 sm:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* โลโก้เว็บบริการสุดคิ้วท์ */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-tr from-pink-300 via-purple-300 to-sky-300 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-pink-100 animate-wiggle">
                <Sparkles size={20} />
              </div>
              <div>
                <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-sky-500 text-xl tracking-tight">FairyMatch</span>
                <span className="block text-[10px] text-pink-400 font-semibold tracking-widest uppercase">Cute Agency Hub</span>
              </div>
            </div>

            {/* เมนูเชื่อมโยง (Desktop) */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-gray-600">
              <a href="#services" className="hover:text-pink-500 transition-colors">ค้นหาบริการ</a>
              <a href="#matchmaking" className="hover:text-pink-500 transition-colors flex items-center gap-1">
                กระดานจับคู่ <span className="bg-pink-100 text-pink-600 text-[10px] px-1.5 py-0.5 rounded-full">Live</span>
              </a>
              <a href="#certificates" className="hover:text-pink-500 transition-colors">ใบรับรองความเชื่อถือ</a>
              <a href="#staff" className="hover:text-pink-500 transition-colors">สตาฟแสนดี</a>
              <a href="#contact" className="hover:text-pink-500 transition-colors">ติดต่องาน</a>
            </nav>

            {/* ปุ่มเรียกร้องความสนใจ */}
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowMatchModal(true)}
                className="bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-2xl shadow-md shadow-pink-100 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-1.5"
              >
                <Plus size={16} />
                <span>ลงประกาศจับคู่ฟรี</span>
              </button>
            </div>
          </div>
        </header>

        {/* --- HERO SECTION --- */}
        <section className="relative px-4 pt-10 pb-16 sm:px-8 text-center max-w-4xl mx-auto">
          {/* ป้ายต้อนรับด้านบนสุดน่ารัก */}
          <div className="inline-flex items-center gap-1.5 bg-pink-100/80 border border-pink-200 text-pink-600 font-bold text-xs px-4 py-1.5 rounded-full mb-6 shadow-sm">
            <Heart size={12} className="fill-current" />
            <span>เพื่อนแท้และนายหน้าแสนดีสำหรับคุณ</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-800 tracking-tight leading-none mb-6">
            จับคู่บริการที่ใช่ <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-sky-400">
              กับตัวแทนที่คุณตกหลุมรัก 💖
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-gray-500 max-w-2xl mx-auto mb-8">
            เราคือศูนย์รวมสตาฟและนายหน้าผู้เชี่ยวชาญระดับห้าดาวที่จะช่วยจัดหาสิ่งที่คุณมองหา 
            ไม่ว่าจะเป็นบ้านสุดอบอุ่น ติวเตอร์แสนเก่ง หรือแผนแต่งงานสุดอลังการ ในราคาที่เป็นกันเองสุดๆ
          </p>

          {/* กล่องค้นหาอย่างอลังการ (Interactive Search Bar) */}
          <div className="bg-white/90 p-3 rounded-3xl shadow-xl border-2 border-pink-100 max-w-2xl mx-auto flex flex-col sm:flex-row gap-2">
            <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-pink-50/50 rounded-2xl">
              <Search className="text-pink-400" size={20} />
              <input 
                type="text" 
                placeholder="พิมพ์สิ่งที่ต้องการ เช่น หาบ้านเดี่ยว, ติวเตอร์ภาษาจีน..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent w-full border-none focus:outline-none text-sm text-gray-700 placeholder-pink-300"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="text-gray-400 hover:text-gray-600">
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="sm:w-44 flex items-center bg-purple-50/50 rounded-2xl px-3 py-2">
              <Filter className="text-purple-400 mr-2" size={16} />
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-transparent w-full border-none focus:outline-none text-xs text-purple-700 font-semibold cursor-pointer"
              >
                <option value="all">ทุกหมวดหมู่</option>
                <option value="home">หาบ้านและคอนโด</option>
                <option value="education">ติวเตอร์และโรงเรียน</option>
                <option value="lifestyle">ไลฟ์สไตล์และอีเวนต์</option>
                <option value="business">ที่ปรึกษาธุรกิจ</option>
              </select>
            </div>

            <button className="bg-gradient-to-r from-pink-400 via-purple-400 to-sky-400 text-white font-bold text-sm px-6 py-3 rounded-2xl hover:brightness-105 active:scale-95 transition-all">
              ค้นหาเลย
            </button>
          </div>

          {/* สถิติแสดงความน่ารักและน่าเชื่อถือ */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mt-12 pt-8 border-t border-pink-100/50">
            <div className="bg-white/50 p-3 rounded-2xl border border-pink-100/30">
              <span className="block text-2xl font-black text-pink-500">1,200+</span>
              <span className="text-xs text-gray-400">จับคู่ความสำเร็จ</span>
            </div>
            <div className="bg-white/50 p-3 rounded-2xl border border-purple-100/30">
              <span className="block text-2xl font-black text-purple-500">50+</span>
              <span className="text-xs text-gray-400">สตาฟมืออาชีพใจดี</span>
            </div>
            <div className="bg-white/50 p-3 rounded-2xl border border-sky-100/30">
              <span className="block text-2xl font-black text-sky-500">100%</span>
              <span className="text-xs text-gray-400">พึงพอใจการบริการ</span>
            </div>
            <div className="bg-white/50 p-3 rounded-2xl border border-emerald-100/30">
              <span className="block text-2xl font-black text-emerald-500">24 ชม.</span>
              <span className="text-xs text-gray-400">ดูแลตลอดวัน</span>
            </div>
          </div>
        </section>

        {/* --- CATEGORY SELECTOR & SEARCH --- */}
        <section id="services" className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800">
              เลือกประเภทผู้ช่วยตามสไตล์คุณ 🦄
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-2">
              คลิกเลือกหมวดหมู่ที่เหมาะสมด้านล่าง เพื่อค้นหาและคัดกรองสตาฟผู้ดูแลที่ตรงใจคุณที่สุด
            </p>
          </div>

          {/* ปุ่มหมวดหมู่แบบพาสเทลสวยงาม */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {CATEGORIES.map((cat) => {
              const IconComponent = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full border-2 text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                    isActive 
                      ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white border-transparent shadow-md scale-105' 
                      : `${cat.color} bg-white hover:scale-102`
                  }`}
                >
                  <IconComponent size={16} />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* --- MATCHMAKING BOARD (แผงจับคู่ความต้องการ) --- */}
        <section id="matchmaking" className="max-w-7xl mx-auto px-4 py-12 bg-white/40 rounded-[3rem] border border-pink-100/50 backdrop-blur-sm mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between px-6 mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-purple-100 text-purple-600 font-bold text-[10px] px-3 py-1 rounded-full mb-3">
                <Calendar size={12} />
                <span>อัปเดตแบบเรียลไทม์ 30 วินาทีล่าสุด</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800">
                กระดานจับคู่ความต้องการล่าสุด 💌
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                ประกาศความฝันความต้องการ แล้วให้เหล่านายหน้าวิเศษสตาฟเสนอตัวช่วยคุณทันที!
              </p>
            </div>

            <button
              onClick={() => setShowMatchModal(true)}
              className="bg-gradient-to-r from-purple-400 to-sky-400 text-white font-extrabold text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-lg hover:shadow-purple-200 hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 self-start md:self-auto"
            >
              <Plus size={18} />
              <span>ต้องการลงประกาศงานของคุณ</span>
            </button>
          </div>

          {/* รายการแสดงความต้องการจับคู่แบบคิวท์การ์ด */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
            {matchmakingRequests.map((req) => {
              const IconComponent = req.icon || Sparkles;
              return (
                <div 
                  key={req.id} 
                  className="bg-white rounded-3xl border-2 border-pink-50 shadow-md p-6 relative hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  {/* หัวการ์ดแสดงหมวดหมู่และสถานะ */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full ${
                      req.category === 'home' ? 'bg-pink-100 text-pink-600' :
                      req.category === 'education' ? 'bg-amber-100 text-amber-600' :
                      req.category === 'lifestyle' ? 'bg-sky-100 text-sky-600' : 'bg-emerald-100 text-emerald-600'
                    }`}>
                      <IconComponent size={12} />
                      {req.categoryName}
                    </span>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      req.status === 'จับคู่สำเร็จแล้ว' 
                        ? 'bg-emerald-100 text-emerald-600' 
                        : 'bg-indigo-100 text-indigo-600 animate-pulse'
                    }`}>
                      {req.status}
                    </span>
                  </div>

                  {/* รายละเอียดความต้องการ */}
                  <div className="mb-6 flex-1">
                    <h3 className="font-extrabold text-gray-800 text-sm sm:text-base leading-snug line-clamp-2 hover:text-pink-500 transition-colors">
                      "{req.title}"
                    </h3>
                    
                    <div className="mt-4 space-y-1 bg-gray-50/50 p-3 rounded-2xl border border-gray-100">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">งบประมาณ:</span>
                        <span className="font-bold text-pink-500">{req.budget}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">ผู้ส่งคำขอ:</span>
                        <span className="font-semibold text-gray-700">{req.client}</span>
                      </div>
                    </div>
                  </div>

                  {/* ท้ายการ์ดสำหรับกดปุ่มตอบรับจับคู่ */}
                  <div className="flex items-center justify-between pt-4 border-t border-pink-50/30">
                    <span className="text-[10px] text-gray-400">โพสต์: {req.date}</span>
                    <button 
                      onClick={() => {
                        showToast(`ส่งคำขอเสนอบริการให้คุณ ${req.client} แล้วค่ะ! ทีมงานจะติดต่อไปทางคุณด่วนที่สุด 🌸`, 'success');
                      }}
                      className="bg-pink-50 hover:bg-pink-100 text-pink-600 font-bold text-xs px-3 py-1.5 rounded-xl transition-all flex items-center gap-1"
                    >
                      <span>เสนอตัวช่วย</span>
                      <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* --- STAFF SHOWCASE (หน้าแนะนำสตาฟผู้เชี่ยวชาญ) --- */}
        <section id="staff" className="max-w-7xl mx-auto px-4 py-8 mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 font-bold text-[10px] px-3 py-1 rounded-full mb-3">
              <Users size={12} />
              <span>ผู้เชี่ยวชาญผ่านการอบรมใจดี 100%</span>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-800">
              พบกับสตาฟผู้ใจดีของเรา 🧸
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-2 max-w-xl mx-auto">
              พร้อมดูแลและให้คำปรึกษาด้วยใจรักและใบหน้าที่ยิ้มแย้มตลอดเวลา ลองเลือกประเภทเพื่อติดต่อคนโปรดได้เลยน้า
            </p>
          </div>

          {/* รายการสตาฟคิ้วท์ๆ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredStaff.length > 0 ? (
              filteredStaff.map((staff) => (
                <div 
                  key={staff.id}
                  className="bg-white rounded-3xl border-2 border-pink-100/50 overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* ภาพโปรไฟล์และเรตติ้ง */}
                    <div className="relative h-64 overflow-hidden bg-pink-100">
                      <img 
                        src={staff.image} 
                        alt={staff.name} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-bold text-yellow-500 flex items-center gap-0.5 shadow-md">
                        <Star size={12} className="fill-current" />
                        <span>{staff.rating}</span>
                        <span className="text-gray-300 font-normal">({staff.reviews})</span>
                      </div>
                      
                      {/* แท็กตกแต่งประเภท */}
                      <span className="absolute bottom-3 left-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold text-[10px] px-3 py-1 rounded-full">
                        {CATEGORIES.find(c => c.id === staff.category)?.name || 'บริการ'}
                      </span>
                    </div>

                    {/* รายละเอียดสตาฟ */}
                    <div className="p-5">
                      <h3 className="font-extrabold text-gray-800 text-lg hover:text-pink-500 transition-colors cursor-pointer" onClick={() => setSelectedStaff(staff)}>
                        {staff.name}
                      </h3>
                      <p className="text-xs text-pink-500 font-semibold mt-1">{staff.role}</p>
                      
                      <p className="text-xs text-gray-400 mt-3 line-clamp-3 leading-relaxed">
                        {staff.bio}
                      </p>

                      {/* ป้ายแท็กคุณสมบัติ */}
                      <div className="flex flex-wrap gap-1 mt-4">
                        {staff.tags.map((tag, idx) => (
                          <span key={idx} className="bg-pink-50 text-pink-600 text-[10px] font-bold px-2 py-0.5 rounded-full border border-pink-100/30">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* ปุ่มแอ็กชันด้านล่างการ์ดสตาฟ */}
                  <div className="p-5 pt-0">
                    <button 
                      onClick={() => setSelectedStaff(staff)}
                      className="w-full bg-gradient-to-r from-pink-100 via-purple-100 to-sky-100 hover:from-pink-200 hover:to-sky-200 text-pink-700 font-bold text-xs py-2.5 rounded-2xl transition-all duration-300 flex items-center justify-center gap-1"
                    >
                      <span>ดูประวัติและเบอร์โทร 🌸</span>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center bg-white/60 rounded-3xl border-2 border-dashed border-pink-100">
                <span className="block text-4xl mb-3">🥺</span>
                <p className="font-extrabold text-gray-600">ขออภัยด้วยน้า ไม่พบสตาฟที่ตรงกับการค้นหานี้เลย</p>
                <p className="text-xs text-gray-400 mt-1">ลองเปลี่ยนการพิมพ์หรือเลือกเป็น "ทั้งหมด" ดูนะจ๊ะ</p>
                <button 
                  onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                  className="mt-4 bg-pink-400 text-white font-bold text-xs px-4 py-2 rounded-xl hover:bg-pink-500"
                >
                  ล้างตัวกรองทั้งหมด
                </button>
              </div>
            )}
          </div>
        </section>

        {/* --- CREDENTIALS LIBRARY (คลังใบรับรอง / Certificates) --- */}
        <section id="certificates" className="max-w-7xl mx-auto px-4 py-12 bg-gradient-to-r from-amber-50/70 via-pink-50/70 to-purple-50/70 rounded-[3rem] border border-pink-100/40 backdrop-blur-sm mb-16">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 font-bold text-[10px] px-3 py-1 rounded-full mb-3">
              <ShieldCheck size={12} />
              <span>ความน่าเชื่อถือระดับทองคำสีกุหลาบ</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800">
              คลังใบอนุญาตและความน่าเชื่อถือ 🛡️
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-2">
              นายหน้าและตัวแทนของ FairyMatch ทุกคนถือใบประกาศนียบัตรวิชาชีพ ถูกกฎหมาย มั่นใจได้ 100%
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
            {CERTIFICATES.map((cert) => {
              const IconComp = cert.icon;
              return (
                <div 
                  key={cert.id} 
                  className="bg-white/90 p-5 rounded-3xl border-2 border-white/50 shadow-md hover:shadow-lg hover:scale-103 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* ไอคอนสีพาสเทลน่ารัก */}
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${
                      cert.color === 'pink' ? 'bg-pink-100 text-pink-500' :
                      cert.color === 'sky' ? 'bg-sky-100 text-sky-500' :
                      cert.color === 'purple' ? 'bg-purple-100 text-purple-500' : 'bg-amber-100 text-amber-500'
                    }`}>
                      <IconComp size={24} />
                    </div>

                    <h3 className="font-extrabold text-gray-800 text-sm leading-snug mb-2">
                      {cert.title}
                    </h3>

                    <p className="text-[11px] text-gray-400">
                      ผู้ออก: {cert.authority}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100/50 flex justify-between items-center text-[10px] font-semibold text-gray-400">
                    <span>รหัส: {cert.idNo}</span>
                    <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full">ใช้งานอยู่</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* --- CONTACT / WORK FORM (แบบฟอร์มติดต่องานแบบสวยงาม) --- */}
        <section id="contact" className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-[3rem] border-2 border-pink-100 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-5">
            
            {/* ฝั่งซ้าย: ข้อมูลเก๋ๆ สีพาสเทลสดใส */}
            <div className="md:col-span-2 bg-gradient-to-b from-pink-200 via-purple-100 to-sky-100 p-8 flex flex-col justify-between text-pink-700 relative">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 rounded-full blur-xl"></div>
              
              <div className="relative z-10">
                <span className="bg-white/80 backdrop-blur-sm text-pink-600 text-[10px] font-bold px-3 py-1 rounded-full mb-6 inline-block shadow-sm">
                  พูดคุยกับเราได้ฟรี!
                </span>
                
                <h3 className="text-2xl font-black leading-tight text-pink-600 mb-4">
                  ส่งคำขอ <br />
                  ให้สตาฟจัดการ <br />
                  ให้คุณด่วนที่สุด! ✨
                </h3>
                
                <p className="text-xs text-pink-600/80 leading-relaxed mb-6">
                  ไม่ว่าความฝันของคุณจะเล็กหรือใหญ่ ให้ FairyMatch คอยเคียงข้างและสรรหาสิ่งที่ใช่ในราคาโดนใจนะคะ 💖
                </p>
              </div>

              <div className="space-y-3 relative z-10">
                <div className="flex items-center gap-2 text-xs">
                  <div className="p-1.5 bg-white/75 rounded-lg text-pink-500">
                    <Phone size={14} />
                  </div>
                  <span className="font-semibold text-gray-700">02-123-4567</span>
                </div>
                
                <div className="flex items-center gap-2 text-xs">
                  <div className="p-1.5 bg-white/75 rounded-lg text-pink-500">
                    <Mail size={14} />
                  </div>
                  <span className="font-semibold text-gray-700">hello@fairymatch.com</span>
                </div>
                
                <div className="flex items-center gap-2 text-xs">
                  <div className="p-1.5 bg-white/75 rounded-lg text-pink-500">
                    <MapPin size={14} />
                  </div>
                  <span className="font-semibold text-gray-700">ตึกสีชมพู ชั้น 10, กรุงเทพฯ</span>
                </div>
              </div>
            </div>

            {/* ฝั่งขวา: ฟอร์มติดต่องานแบบกรอกง่ายๆ */}
            <form onSubmit={handleContactSubmit} className="md:col-span-3 p-8 sm:p-10 space-y-5 bg-white">
              <h4 className="font-extrabold text-gray-800 text-lg">
                ระบุรายละเอียดของคุณได้เลยค่ะ 🎀
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 block">ชื่อ-นามสกุลของคุณ</label>
                  <input 
                    type="text"
                    required
                    placeholder="เช่น คุณหนูดี"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full text-xs sm:text-sm px-4 py-3 rounded-2xl bg-pink-50/50 border border-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-300 placeholder-pink-300 text-gray-700"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 block">อีเมลสำหรับติดต่อกลับ</label>
                  <input 
                    type="email"
                    required
                    placeholder="example@fairy.com"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full text-xs sm:text-sm px-4 py-3 rounded-2xl bg-pink-50/50 border border-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-300 placeholder-pink-300 text-gray-700"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 block">คุณกำลังมองหาผู้ช่วยในหมวดหมู่ใด</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {CATEGORIES.filter(c => c.id !== 'all').map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setContactService(cat.id)}
                      className={`py-2 px-3 rounded-xl border-2 text-[10px] font-bold text-center transition-all ${
                        contactService === cat.id 
                          ? 'bg-pink-100 text-pink-600 border-pink-300 scale-102' 
                          : 'bg-white border-gray-100 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 block">รายละเอียดความต้องการเพิ่มเติม</label>
                <textarea 
                  rows={3}
                  required
                  placeholder="เช่น ต้องการบ้านแสนน่ารักสำหรับเลี้ยงแมว มีต้นส้มหน้าบ้าน ตกแต่งโทนสว่าง..."
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  className="w-full text-xs sm:text-sm px-4 py-3 rounded-2xl bg-pink-50/50 border border-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-300 placeholder-pink-300 text-gray-700 resize-none"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-pink-400 via-purple-400 to-sky-400 text-white font-bold text-sm py-3.5 rounded-2xl shadow-lg hover:shadow-pink-100 hover:brightness-105 active:scale-98 transition-all flex items-center justify-center gap-1.5"
              >
                <Send size={16} />
                <span>ส่งคำขอรับแมตช์วิเศษ 🚀</span>
              </button>
            </form>

          </div>
        </section>

        {/* --- FOOTER --- */}
        <footer className="text-center mt-20 pt-10 border-t border-pink-100/60 max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            {/* โลโก้ฟุตเตอร์ */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-tr from-pink-300 to-purple-300 rounded-xl flex items-center justify-center text-white shadow-md">
                <Sparkles size={16} />
              </div>
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 text-base">FairyMatch</span>
            </div>

            <p className="text-xs text-gray-400">
              © 2026 FairyMatch. พัฒนาด้วยความรักและความหวานพาสเทลละมุนใจ สงวนลิขสิทธิ์ทุกประการ
            </p>

            <div className="flex gap-4 text-xs text-gray-400">
              <span className="hover:text-pink-500 cursor-pointer">นโยบายความเป็นส่วนตัว</span>
              <span className="hover:text-pink-500 cursor-pointer">เงื่อนไขการใช้งาน</span>
            </div>
          </div>
        </footer>

        {/* --- MODAL DETAILED STAFF INFO (โมดอลรายละเอียดสตาฟ) --- */}
        {selectedStaff && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-[2.5rem] border-2 border-pink-100 shadow-2xl max-w-md w-full overflow-hidden animate-zoom-in">
              
              {/* ปกด้านบนแบบพาสเทลไล่เฉด */}
              <div className="h-28 bg-gradient-to-r from-pink-200 via-purple-200 to-sky-200 relative">
                <button 
                  onClick={() => setSelectedStaff(null)}
                  className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-500 p-2 rounded-full shadow-md transition-all"
                >
                  <X size={16} />
                </button>
              </div>

              {/* รูปประจำตัวซ้อนอยู่ตรงกลาง */}
              <div className="px-6 pb-6 relative">
                <div className="w-24 h-24 rounded-3xl border-4 border-white overflow-hidden absolute -top-12 left-6 shadow-md bg-white">
                  <img src={selectedStaff.image} alt={selectedStaff.name} className="w-full h-full object-cover" />
                </div>

                <div className="pt-16">
                  <div className="flex items-center gap-1.5 justify-between">
                    <h3 className="text-xl font-extrabold text-gray-800">{selectedStaff.name}</h3>
                    <span className="bg-pink-100 text-pink-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {CATEGORIES.find(c => c.id === selectedStaff.category)?.name}
                    </span>
                  </div>
                  <p className="text-xs text-pink-500 font-bold mt-1">{selectedStaff.role}</p>

                  <div className="flex items-center gap-1 mt-3 text-xs text-yellow-500 font-bold bg-yellow-50/50 p-2 rounded-xl border border-yellow-100/30">
                    <Star size={14} className="fill-current" />
                    <span>คะแนนเฉลี่ย {selectedStaff.rating} / 5.0</span>
                    <span className="text-gray-400 font-normal">({selectedStaff.reviews} ความคิดเห็นจากผู้ใช้งานจริง)</span>
                  </div>

                  <p className="text-xs text-gray-500 mt-4 leading-relaxed">
                    "{selectedStaff.bio}"
                  </p>

                  {/* ช่องทางติดต่อเพิ่มเติม */}
                  <div className="mt-6 space-y-2 bg-pink-50/30 p-4 rounded-2xl border border-pink-100/30">
                    <h4 className="text-xs font-bold text-pink-600 flex items-center gap-1 mb-2">
                      <Sparkles size={12} />
                      <span>ช่องทางติดต่อตัวแทนโดยตรง</span>
                    </h4>
                    
                    <div className="flex items-center gap-2 text-xs">
                      <Phone size={12} className="text-pink-400" />
                      <span className="text-gray-600">เบอร์โทร:</span>
                      <span className="font-semibold text-gray-800">{selectedStaff.phone}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <Mail size={12} className="text-pink-400" />
                      <span className="text-gray-600">อีเมล:</span>
                      <span className="font-semibold text-gray-800">{selectedStaff.email}</span>
                    </div>
                  </div>

                  {/* ปุ่มโทรทันที */}
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <a 
                      href={`tel:${selectedStaff.phone}`}
                      className="bg-pink-400 hover:bg-pink-500 text-white font-bold text-xs py-3 rounded-2xl text-center shadow-md transition-all flex items-center justify-center gap-1"
                    >
                      <Phone size={14} />
                      <span>โทรคุยสายทันที</span>
                    </a>
                    
                    <button 
                      onClick={() => {
                        setContactName('');
                        setContactService(selectedStaff.category);
                        setSelectedStaff(null);
                        const contactSec = document.getElementById('contact');
                        if (contactSec) contactSec.scrollIntoView({ behavior: 'smooth' });
                        showToast(`เตรียมส่งรายละเอียดของเล่นใหม่กับ คุณ${selectedStaff.name} ในแบบฟอร์มแล้วค่ะ`, 'success');
                      }}
                      className="bg-purple-100 hover:bg-purple-200 text-purple-700 font-bold text-xs py-3 rounded-2xl text-center transition-all flex items-center justify-center gap-1"
                    >
                      <MessageSquare size={14} />
                      <span>ส่งเมลข้อเสนอ</span>
                    </button>
                  </div>

                </div>
              </div>

            </div>
          </div>
        )}

        {/* --- MODAL CREATE MATCHMAKING REQUEST (โมดอลสร้างคำขอจับคู่ความต้องการ) --- */}
        {showMatchModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm animate-fade-in">
            <form 
              onSubmit={handleCreateMatchRequest}
              className="bg-white rounded-[2.5rem] border-2 border-pink-100 shadow-2xl max-w-lg w-full p-6 sm:p-8 relative animate-zoom-in"
            >
              <button 
                type="button"
                onClick={() => setShowMatchModal(false)}
                className="absolute top-4 right-4 bg-pink-50 hover:bg-pink-100 text-pink-500 p-2 rounded-full transition-all"
              >
                <X size={16} />
              </button>

              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-pink-100 text-pink-500 rounded-2xl flex items-center justify-center">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-gray-800">ลงประกาศจับคู่ความต้องการฟรี 🦄</h3>
                  <p className="text-xs text-gray-400 mt-0.5">ประกาศสิ่งที่คุณตามหา แล้วให้พวกเราคัดเลือกตัวเลือกดีที่สุดให้ค่ะ</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 block">คุณชื่ออะไรเอ่ย?</label>
                  <input 
                    type="text"
                    required
                    placeholder="เช่น คุณกิ๊ฟซี่ สุดคิ้วท์"
                    value={matchClient}
                    onChange={(e) => setMatchClient(e.target.value)}
                    className="w-full text-xs sm:text-sm px-4 py-3 rounded-2xl bg-pink-50/50 border border-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-300 text-gray-700"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 block">เลือกประเภทบริการที่ต้องการ</label>
                  <select 
                    value={matchCat}
                    onChange={(e) => setMatchCat(e.target.value)}
                    className="w-full text-xs sm:text-sm px-4 py-3 rounded-2xl bg-pink-50/50 border border-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-300 text-gray-700"
                  >
                    <option value="home">หาบ้านและคอนโด 🏠</option>
                    <option value="education">ติวเตอร์และโรงเรียน 📖</option>
                    <option value="lifestyle">ไลฟ์สไตล์และอีเวนต์ 🎉</option>
                    <option value="business">ที่ปรึกษาธุรกิจ 💼</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 block">หัวข้อความต้องการสั้นๆ</label>
                  <input 
                    type="text"
                    required
                    placeholder="เช่น หาคอนโดเลี้ยงสัตว์ได้ ใกล้ BTS มีสระว่ายน้ำใหญ่ๆ"
                    value={matchTitle}
                    onChange={(e) => setMatchTitle(e.target.value)}
                    className="w-full text-xs sm:text-sm px-4 py-3 rounded-2xl bg-pink-50/50 border border-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-300 text-gray-700"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 block">ช่วงงบประมาณที่พร้อมลงทุน</label>
                  <input 
                    type="text"
                    required
                    placeholder="เช่น 15,000 - 20,000 บาท/เดือน หรือ 3-5 ล้านบาท"
                    value={matchBudget}
                    onChange={(e) => setMatchBudget(e.target.value)}
                    className="w-full text-xs sm:text-sm px-4 py-3 rounded-2xl bg-pink-50/50 border border-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-300 text-gray-700"
                  />
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setShowMatchModal(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-500 font-bold text-xs py-3.5 rounded-2xl text-center transition-all"
                >
                  ยกเลิก
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-pink-400 to-purple-400 hover:brightness-105 text-white font-bold text-xs py-3.5 rounded-2xl text-center shadow-md transition-all"
                >
                  ลงประกาศด่วน 🚀
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </>
  );
}