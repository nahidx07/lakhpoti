"use client";
import { useContext, useEffect, useState } from "react";
import { TgContext } from "@/components/TelegramProvider";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Wallet, Users, ListChecks, ChevronRight, Share2 } from "lucide-react";

export default function Home() {
  const user = useContext(TgContext);
  const [dbUser, setDbUser] = useState<any>(null);

  useEffect(() => {
    if (user?.id) {
      const syncUser = async () => {
        const userRef = doc(db, "users", user.id.toString());
        const snap = await getDoc(userRef);
        if (!snap.exists()) {
          const newUser = { uid: user.id, name: user.first_name, balance: 0, referrals: 0 };
          await setDoc(userRef, newUser);
          setDbUser(newUser);
        } else {
          setDbUser(snap.data());
        }
      };
      syncUser();
    }
  }, [user]);

  if (!user) return (
    <div className="h-screen bg-black flex items-center justify-center text-blue-500 font-bold animate-pulse">
      LAKHPOTI LOADING...
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050810] text-white font-sans">
      {/* Top Profile Section */}
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xl font-black shadow-lg shadow-blue-500/20">
            {user.first_name[0]}
          </div>
          <div>
            <h2 className="font-bold text-lg leading-tight">{user.first_name}</h2>
            <p className="text-xs text-gray-500 tracking-wider">PREMIUM MEMBER</p>
          </div>
        </div>
        <div className="bg-slate-900/50 border border-slate-800 p-2 rounded-xl">
           <Share2 size={18} className="text-blue-400" />
        </div>
      </div>

      {/* Main Balance Card */}
      <div className="mx-6 p-8 rounded-[2.5rem] bg-gradient-to-br from-[#1e40af] to-[#7e22ce] relative overflow-hidden shadow-2xl">
        <div className="relative z-10 text-center">
          <p className="text-blue-200/60 text-xs font-bold uppercase tracking-[0.2em] mb-2">Available Balance</p>
          <h1 className="text-5xl font-black tracking-tighter">৳ {dbUser?.balance || "0.00"}</h1>
          <div className="mt-8 flex gap-3">
            <button className="flex-1 bg-white text-blue-800 py-3 rounded-2xl font-bold shadow-xl active:scale-95 transition">Withdraw</button>
            <button className="flex-1 bg-black/20 backdrop-blur-md border border-white/10 py-3 rounded-2xl font-bold active:scale-95 transition">History</button>
          </div>
        </div>
        {/* Background Decorative Circles */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 gap-4 px-6 mt-8">
        <div className="bg-[#0f172a] border border-slate-800/50 p-5 rounded-3xl">
          <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 mb-3">
            <ListChecks size={20} />
          </div>
          <p className="text-gray-400 text-xs font-medium">Completed Tasks</p>
          <p className="text-xl font-bold">14</p>
        </div>
        <div className="bg-[#0f172a] border border-slate-800/50 p-5 rounded-3xl">
          <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-500 mb-3">
            <Users size={20} />
          </div>
          <p className="text-gray-400 text-xs font-medium">Refers</p>
          <p className="text-xl font-bold">{dbUser?.referrals || 0}</p>
        </div>
      </div>

      {/* Task List Header */}
      <div className="px-6 mt-10 flex items-center justify-between mb-4">
        <h3 className="text-xl font-black tracking-tight">Main Tasks</h3>
        <p className="text-blue-500 text-xs font-bold">View All</p>
      </div>

      {/* Task List */}
      <div className="px-6 space-y-4 pb-10">
        <TaskCard title="Join Official Channel" reward="৳ 5.00" icon="📢" />
        <TaskCard title="Follow on Twitter" reward="৳ 3.50" icon="🐦" />
        <TaskCard title="Watch Video Ad" reward="৳ 2.00" icon="📺" />
      </div>
    </div>
  );
}

function TaskCard({ title, reward, icon }: any) {
  return (
    <div className="flex items-center justify-between bg-[#0f172a] p-5 rounded-[1.5rem] border border-slate-800/40 hover:border-blue-500/50 transition">
      <div className="flex items-center gap-4">
        <div className="text-2xl">{icon}</div>
        <div>
          <p className="font-bold text-sm">{title}</p>
          <p className="text-green-500 font-bold text-xs uppercase tracking-tighter">+{reward}</p>
        </div>
      </div>
      <ChevronRight size={18} className="text-gray-600" />
    </div>
  );
}
