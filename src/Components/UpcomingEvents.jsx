import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editEvent, deleteEvent } from "../Features/EventFeature";

const UpcomingEvents = () => {
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.event);
  const [editingEvent, setEditingEvent] = useState(null);
  const [updatedData, setUpdatedData] = useState({});

  const handleEditClick = (event) => {
    setEditingEvent(event._id);
    setUpdatedData({
      title: event.title,
      description: event.description,
      dateTime: event.dateTime,
      location: event.location,
      category: event.category,
    });
  };

  const handleUpdateChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = (id) => {
    dispatch(editEvent({ id, updatedEventData: updatedData }));
    setEditingEvent(null);
  };

  const handleDelete = (eventId) => {
    dispatch(deleteEvent(eventId));
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-6">
      {events.length === 0 ? (
        <h3 className="text-lg text-gray-600 text-center">
          No upcoming events.
        </h3>
      ) : (
        events.map((event) => (
          <div
            key={event._id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            {editingEvent === event._id ? (
              // Editing form JSX
              <div className="p-6 space-y-4">
                <input
                  type="text"
                  name="title"
                  value={updatedData.title}
                  onChange={handleUpdateChange}
                  placeholder="Event Title"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  name="description"
                  value={updatedData.description}
                  onChange={handleUpdateChange}
                  placeholder="Event Description"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="datetime-local"
                  name="dateTime"
                  value={updatedData.dateTime}
                  onChange={handleUpdateChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="location"
                  value={updatedData.location}
                  onChange={handleUpdateChange}
                  placeholder="Location"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  name="category"
                  value={updatedData.category}
                  onChange={handleUpdateChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="sports">Sports</option>
                  <option value="music">Music</option>
                  <option value="arts">Arts</option>
                  <option value="technology">Technology</option>
                  <option value="food">Food</option>
                  <option value="other">Other</option>
                </select>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleSaveEdit(event._id)}
                    className="flex-1 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-all duration-200"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingEvent(null)}
                    className="flex-1 bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400 transition-all duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              // Display event details JSX
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-800">
                    {event.title}
                  </h3>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {event.category}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{event.description}</p>
                <div className="space-y-2 mb-6">
                  <p className="flex items-center text-gray-500">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {new Date(event.dateTime).toLocaleString()}
                  </p>
                  <p className="flex items-center text-gray-500">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {event.location}
                  </p>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleEditClick(event)}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
                  >
                    Edit Event
                  </button>
                  <button
                    onClick={() => handleDelete(event._id)}
                    className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-4 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200"
                  >
                    Delete Event
                  </button>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default UpcomingEvents;
