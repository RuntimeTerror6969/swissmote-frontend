import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvent } from "../Features/AllEventFeature";
import { deleteEvent } from "../Features/EventFeature";
import useSocket from "../Utils/Socket";
import { updateAttendees } from "../Redux/AllEventSlice";
import { toast, ToastContainer } from "react-toastify";
import FilterEvents from "./FilterEvents";

const ShowAllEvents = ({ userId }) => {
  const dispatch = useDispatch();
  const hasFetchedEvents = useRef(false);
  const { isConnectd, joinEvent, socket } = useSocket();
  const { allEvents, isLoading } = useSelector((state) => state.allEvent);
  const { filteredEvent, isError } = useSelector(
    (state) => state.filteredEvents
  );

  useEffect(() => {
    if (!hasFetchedEvents.current) {
      dispatch(getAllEvent());
      hasFetchedEvents.current = true;
    }
  }, [dispatch]);

  useEffect(() => {
    if (isConnectd) {
      toast.success("Socket Connected");
    }

    socket.on("event_joined", (data) => {
      dispatch(updateAttendees(data));
    });

    return () => {
      socket.off("reconnect");
    };
  }, [dispatch, isConnectd, socket]);

  // Define handleDelete so it can be used in the Delete button
  const handleDelete = (eventId) => {
    dispatch(deleteEvent(eventId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <ToastContainer />
      <FilterEvents />
      <div className="max-w-7xl mx-auto">
        {isError && (
          <div className="text-red-500 text-center bg-red-100 p-4 rounded-lg mb-6">
            {isError.error}
          </div>
        )}

        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          {isLoading ? (
            <span className="inline-flex items-center">
              <svg className="animate-spin h-6 w-6 mr-2" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Loading Events
            </span>
          ) : allEvents.length === 0 ? (
            "No Events Found"
          ) : (
            "Upcoming Events"
          )}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(filteredEvent.length > 0 ? filteredEvent : allEvents)?.map(
            (event) => (
              <div
                key={event._id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-800">
                      {event.title}
                    </h2>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {event.cetegory}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <div className="space-y-2">
                    <p className="flex items-center text-gray-500">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
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
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {event.location}
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-500">
                          Created by
                        </span>
                        <span className="ml-2 font-medium text-gray-700">
                          {event.createdBy?.name}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <svg
                          className="w-5 h-5 text-green-500 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                        </svg>
                        <span className="text-green-500 font-bold">
                          {event?.attendees?.length}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => joinEvent(event._id, userId)}
                        className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                      >
                        Join Event
                      </button>
                      <button
                        onClick={() => handleDelete(event._id)}
                        className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-4 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowAllEvents;
