import React, { useCallback, useRef, useState, useEffect } from "react";
import { supabase } from "@/config/supBaseclient";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import { useInterval } from "@/hooks/useInterval";
import useIsInView from "@/hooks/useIsInView";
import Title from "./Title";
import Spacing from "../Spacing";
import SlideUp from "../SlideUp";
import Text from "../Text";
import { BonVivantFont, Lora } from "@/style/fonts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserClock } from "@fortawesome/free-solid-svg-icons";

const TITLE = ["Wishes"];
const TITLE_2 = ["Ucapan Selamat & Do'a"];
const COMMENTS_ON_PAGE = 5;

interface Comment {
  name: string;
  comment: string;
  timestamp: string;
}

const Whises: React.FC = () => {
  const [transitionIds, setTransitionIds] = useState<number[]>([]);
  const [startTransition, setStartTransition] = useState(false);
  const intervalId = useRef<NodeJS.Timeout | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useInterval(() => {
    if (!startTransition || transitionIds.length >= TITLE.length) return;
    setTransitionIds((prev) => [...prev, prev.length]);
  }, 200);

  const handleTransition = useCallback(() => {
    setTimeout(() => {
      setTransitionIds((prev) => (prev.length === 0 ? [0, 1, 2, 3] : prev));
    }, 0);

    setTimeout(() => {
      intervalId.current = setInterval(() => {
        setTransitionIds((prev) => {
          if (prev.length === TITLE.length + 3) {
            clearInterval(intervalId.current!);
            return prev;
          }
          return prev.concat(prev.length);
        });
      }, 200);
    }, 1000);

    setTimeout(() => {
      setTransitionIds((prev) => prev.concat(prev.length));
    }, 1000);

    setTimeout(() => {
      setTransitionIds((prev) =>
        prev.concat([prev.length, prev.length + 1, prev.length + 2])
      );
    }, 1100);
  }, []);

  useIsInView(ref, handleTransition);

  useEffect(() => {
    if (transitionIds.length > TITLE.length + 6) {
      clearInterval(intervalId.current!);
      intervalId.current = null;
    }
  }, [transitionIds]);

  const [comments, setComments] = useState<Comment[]>([]);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchComments();
  }, []);

  const getTimeAgo = (timestamp: string): string => {
    return formatDistanceToNow(new Date(timestamp), {
      addSuffix: true, // Menambahkan "yang lalu"
      locale: id, // Opsional: menggunakan bahasa Indonesia
    });
  };

  const fetchComments = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .order("timestamp", { ascending: false });

      if (error) {
        throw error;
      }
      console.log("Data fetched successfully:", data[0].timestamp);

      setComments(data || []);
    } catch (error) {
      console.error("Error fetching comments:", error.message);
    } finally {
      setLoading(false);
    }
  });

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const trimmedName = name.trim();
      const trimmedComment = comment.trim();

      if (!trimmedName || !trimmedComment) {
        setError("Nama dan komentar tidak boleh kosong.");
        return;
      }

      setError("");

      const timestamp = new Date().toISOString();

      const { data, error: supabaseError } = await supabase
        .from("comments")
        .insert([{ name: trimmedName, comment: trimmedComment, timestamp }]);

      if (supabaseError) {
        console.error("Error inserting data:", supabaseError);
        setError("Gagal mengirim komentar. Silakan coba lagi.");
      } else {
        console.log("Data inserted successfully:", data);
        fetchComments();
      }

      setName("");
      setComment("");
    },
    [name, comment, fetchComments]
  );

  const totalPages = Math.ceil(comments.length / COMMENTS_ON_PAGE);
  const displayedComments = comments.slice(
    (currentPage - 1) * COMMENTS_ON_PAGE,
    currentPage * COMMENTS_ON_PAGE
  );

  return (
    <section
      ref={ref}
      id="account-section"
      className="w-full bg-[#e5e7eb] px-6 pb-8 rounded-[1.25rem]"
    >
      <div className="text-center">
        {TITLE.map((title, i) => (
          <SlideUp key={title} show={transitionIds.includes(i)}>
            <Text
              display="block"
              className={`mt-10pxr font-bold text-50pxr ${BonVivantFont.className}`}
            >
              {title}
            </Text>
          </SlideUp>
        ))}
        {TITLE_2.map((title, i) => (
          <SlideUp key={title} show={transitionIds.includes(i)}>
            <Text display="block" className={`text-12pxr ${Lora.className}`}>
              {title}
            </Text>
          </SlideUp>
        ))}
      </div>

      <Spacing size={16} />

      <SlideUp show={transitionIds.includes(TITLE.length)}>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-start w-full max-w-md"
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama"
            required
            className="w-full max-w-md p-3 mb-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Ucapkan sesuatu..."
            required
            className="w-full max-w-md p-3 mb-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="px-4 py-1 bg-blue-400 text-white rounded-lg hover:bg-blue-600"
          >
            Kirim
          </button>
        </form>
      </SlideUp>

      <Spacing size={16} />

      <SlideUp show={transitionIds.includes(TITLE.length)}>
        <div className="cursor-pointer w-full py-8pxr border-t border-black" />

        <div className="mt-6 w-full max-w-md mx-auto slide">
          <h3 className="text-lg font-semibold mb-2">Komentar:</h3>
          {loading ? (
            <p className="text-gray-500">Memuat komentar...</p>
          ) : comments.length === 0 ? (
            <p className="text-gray-500">Belum ada komentar.</p>
          ) : (
            <ul className="space-y-3">
              {displayedComments.map((c, index) => (
                <li
                  key={index}
                  className="p-3 bg-white border rounded-lg shadow-sm"
                >
                  <strong className="text-20pxr text-black-600">
                    {c.name}
                  </strong>
                  <div className="text-7pxr text-sm text-gray-500">
                    <FontAwesomeIcon icon={faUserClock} className=" mr-1" />
                    {getTimeAgo(c.timestamp)}
                  </div>
                  <p className="text-gray-500">{c.comment}</p>
                  {/* Tombol Reply
                <button
                  onClick={() => handleReply(c.id)} // Fungsi untuk menangani balasan
                  className="text-7pxr mt-2 px-4 py-1 text-sm text-gray-700"
                >
                  Reply
                </button> */}
                </li>
              ))}
            </ul>
          )}

          {totalPages > 1 && (
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === 1
                    ? "bg-gray-300"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                Previous
              </button>
              <span className="text-gray-700">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === totalPages
                    ? "bg-gray-300"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </SlideUp>
    </section>
  );
};

export default Whises;
