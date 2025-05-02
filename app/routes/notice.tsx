// app/routes/notice.tsx (or add inside `home.tsx` if preferred)
import { useEffect, useState } from "react";
import NoticeCard from "../components/NoticeCard";
import { collection, getDocs } from "firebase/firestore";
import type { Notice } from "~/lib/types";
import { motion } from "framer-motion";

export default function NoticeBoard() {
  const [notices, setNotices] = useState<Notice[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/notices")
        .then(res => res.json())
        .then(data => setNotices(data))
        .catch(err => console.log(err));


    // const fetchNotices = async () => {
    //   const res = await fetch("http://localhost:5000/api/notices");
    //   const data = await res.json();
    //   setNotices(data);
    //   console.log(notices.length)
    //   console.log(notices)
    // };
    // // console.log(process.env.APP_apiKey);

    // fetchNotices();
  }, []);

  return (
    // Replace div in NoticeBoard
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5 }}
    >
      {
        <div className="p-6 space-y-4">
          <h1 className="text-3xl font-bold mb-4">🗒️ Notice Board</h1>
          {Array.isArray(notices) && notices.length > 0 ? (
            notices.map((notice) => (
                <NoticeCard key={notice._id} notice={notice} />
              ))
          ) : (
            <p>No notices yet.</p>
          )}
          </div>
      }
    </motion.div>
  );
}
