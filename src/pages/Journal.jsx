import { useState } from "react";

const Journal = () => {
  const [notes, setNotes] = useState([]);
  const [entry, setEntry] = useState({
    title: "",
    content: "",
    date: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e) => {
    setEntry({ ...entry, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNotes([...notes, entry]);
    setEntry({
      title: "",
      content: "",
      date: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <div className="max-w-5xl mx-auto mt-20 p-4">
      <h2 className="text-2xl font-bold text-center mb-6">
        📝 Trading Journal
      </h2>

      {/* Form to add journal entry */}
      <form onSubmit={handleSubmit} className="grid gap-4 mb-8">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="p-3 border rounded"
          value={entry.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          placeholder="Write your thoughts..."
          rows={6}
          className="p-3 border rounded resize-none"
          value={entry.content}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          className="p-2 border rounded w-48"
          value={entry.date}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Save Entry
        </button>
      </form>

      {/* Journal Entries List */}
      <div className="space-y-4">
        {notes.length === 0 ? (
          <p className="text-center text-gray-500">No journal entries yet.</p>
        ) : (
          notes.map((note, idx) => (
            <div key={idx} className="border rounded p-4 shadow-sm bg-gray-50">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>{note.date}</span>
              </div>
              <h3 className="text-lg font-semibold">{note.title}</h3>
              <p className="mt-1 text-gray-700 whitespace-pre-line">
                {note.content}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Journal;
