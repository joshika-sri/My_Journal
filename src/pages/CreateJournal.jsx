import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaGrinStars, FaSmile, FaMeh, FaFrown, FaAngry } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const moodOptions = [
  { icon: <FaGrinStars className="text-yellow-400" />, value: "excited", label: "Excited" },
  { icon: <FaSmile className="text-green-500" />, value: "happy", label: "Happy" },
  { icon: <FaMeh className="text-yellow-500" />, value: "neutral", label: "Neutral" },
  { icon: <FaFrown className="text-red-500" />, value: "sad", label: "Sad" },
  { icon: <FaAngry className="text-red-800" />, value: "angry", label: "Angry" },
];

function getDayOfWeek(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { weekday: "long" });
}

function getYear(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.getFullYear();
}

const CreateJournal = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bgClass = location.state?.bgClass || "bg-pink-pattern";
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [mood, setMood] = useState("");

  const handleSave = () => {
    if (!date || !story || !mood) {
      toast.error("Please fill all fields and select a mood!");
      return;
    }
    const journals = JSON.parse(localStorage.getItem("journals") || "[]");
    journals.push({
      date,
      day: getDayOfWeek(date),
      year: getYear(date),
      title,
      story,
      mood,
      background: bgClass,
    });
    localStorage.setItem("journals", JSON.stringify(journals));
    toast.success("Journal saved!");
    navigate("/journals");
  };

  return (
    <div className={`min-h-screen ${bgClass} flex flex-col`}>
      <div className="flex justify-end p-6">
        <div className="bg-white bg-opacity-80 rounded-lg px-6 py-2 shadow text-right">
          <label className="font-semibold mr-2">Date:</label>
          <input
            type="date"
            className="border rounded px-2 py-1 mr-4"
            value={date}
            onChange={e => setDate(e.target.value)}
            required
          />
          <span className="font-semibold mr-2">Day:</span>
          <span className="mr-4">{getDayOfWeek(date)}</span>
          <span className="font-semibold mr-2">Year:</span>
          <span>{getYear(date)}</span>
        </div>
      </div>
      <div className="flex-1 flex justify-center items-start">
        <form
          className="bg-white bg-opacity-80 rounded-lg shadow-lg p-8 w-full max-w-2xl mt-8"
          onSubmit={e => {
            e.preventDefault();
            handleSave();
          }}
        >
          <input
            type="text"
            className="border-b-2 border-orange-400 w-full mb-6 text-xl font-bold bg-transparent outline-none"
            placeholder="Journal Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          {/* Mood selection */}
          <div className="mb-6">
            <span className="font-semibold mr-4">Select your mood:</span>
            <div className="flex gap-3 items-center mt-2">
              {moodOptions.map((m) => (
                <button
                  key={m.value}
                  type="button"
                  className={`p-2 rounded-full border-2 ${
                    mood === m.value
                      ? "border-orange-600 bg-orange-100"
                      : "border-transparent"
                  }`}
                  onClick={() => setMood(m.value)}
                  title={m.label}
                >
                  {m.icon}
                </button>
              ))}
              {/* Mood legend */}
              
            </div>
          </div>
          <textarea
            className="w-full min-h-[300px] bg-transparent outline-none text-lg font-medium leading-relaxed"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, transparent, transparent 23px, #e5e7eb 24px)",
              backgroundSize: "100% 24px",
            }}
            placeholder="Write your journal here..."
            value={story}
            onChange={e => setStory(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-8 rounded transition mt-6"
          >
            Save Journal
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateJournal;