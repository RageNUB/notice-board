// app/components/NoticeCard.tsx

import type { Notice } from "~/lib/types";

export default function NoticeCard({ notice }: { notice: Notice }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
      <h3 className="text-xl font-semibold">{notice.title}</h3>
      <p className="text-gray-600">{notice.description}</p>
      <p className="text-sm text-right text-gray-400">{notice.date}</p>
    </div>
  );
}
