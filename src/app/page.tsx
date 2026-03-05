"use client";
import { useContext, useEffect, useState } from "react";
import { TgContext } from "@/components/TelegramProvider";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { Wallet, Trophy, ListChecks, Users } from "lucide-react";

export default function Home() {
  const user = useContext(TgContext);
  const [dbUser, setDbUser] = useState<any>(null);

  useEffect(() => {
    if (user?.id) {
      const syncUser = async () => {
        const userRef = doc(db, "users", user.id.toString());
        const snap = await getDoc(userRef);

        if (!snap.exists()) {
          const newUser = {
            uid: user.id,
            name: user.first_name,
            username: user.username || "no_user",
            balance: 0,
            referrals: 0,
            createdAt: serverTimestamp(),
          };
          await setDoc(userRef, newUser);
          setDbUser(newUser);
        } else {
          setDbUser(snap.data());
        }
      };
      syncUser();
    }
  }, [user]);

  if (!user) return <div className="text-white flex justify-center mt-20">Loading Lakhpoti...</div>;

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-20">
      {/* Header */}
      <div className="p-6 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">L</div>
          <div>
            <p className="text-xs text-gray-400">Welcome,</p>
            <h2 className="font-bold">{user.first_name}</h2>
          </div>
        </div>
        <div className="bg-slate-800 px-3 py-1 rounded-full text-xs text-blue-400">ID: {user.id}</div>
      </div>

      {/* Balance Card */}
      <div className="m-6 p-8 rounded-[2rem] bg-gradient-to-br from-indigo-600 via-blue-700 to-purple-800 shadow-2xl shadow-blue-900/20 text-center">
        <p className="text-blue-100/70 text-sm font-medium uppercase tracking-widest">Main Balance</p>
        <h1 className="text-5xl font-black mt-2 tracking-tighter">৳ {dbUser?.balance || 0}</h1>
        <button className="mt-6 bg-white text-blue-700 px-8 py-2 rounded-full font-bold active:scale-95 transition">Withdraw</button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 px-6">
        <StatCard icon={<ListChecks size={20}/>} label="Tasks" value="12 Done" color="bg-orange-500" />
        <StatCard icon={<Users size={20}/>} label="Refer" value={dbUser?.referrals || 0} color="bg-green-500" />
      </div>

      {/* Task List (Sample) */}
      <div className="px-6 mt-8">
        <h3 className="text-lg font-bold mb-4">Available Tasks</h3>
        <div className="space-y-3">
          <TaskItem title="Join Lakhpoti Official" reward="৳ 5.00" />
          <TaskItem title="Watch 30s Ad" reward="৳ 2.00" />
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }: any) {
  return (
    <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
      <div className={`${color} w-8 h-8 rounded-lg flex items-center justify-center mb-2`}>{icon}</div>
      <p className="text-xs text-gray-400">{label}</p>
      <p className="font-bold text-lg">{value}</p>
    </div>
  );
}

function TaskItem({ title, reward }: any) {
  return (
    <div className="flex items-center justify-between bg-slate-900 p-4 rounded-xl border border-slate-800">
      <p className="text-sm font-medium">{title}</p>
      <div className="text-blue-400 font-bold">{reward}</div>
    </div>
  );
}
