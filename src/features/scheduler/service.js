const Scheduler = require('./schedulerModel');

async function createScheduler(request){
    try {
        const { title, description, dateTime } = request;
        const scheduler = new Scheduler({ title, description, dateTime });

        const savedScheduler = await scheduler.save();

        return{
            message: 'Schedule Created Successfully',
            data: savedScheduler,
        }

    } catch (error) {
        return{
            message: 'Schedule Failed To Create',
            data: error,
        }
    }
}

async function getAllScheduler(){
    const scheduler = await Scheduler.find();

    return{
        message: 'Retrieve all schedules successfully',
        data: scheduler,
    }
}

async function getScheduleByDataTime(request){
    const { dateTime } = request
    const scheduler = await Scheduler.find({ dateTime });
    
    return {
        message: 'Retrieve Successfully',
        data: scheduler,
    }
}

async function getScheduleByTitle(request){
    const { title } = request
    const scheduler = await Scheduler.find({ title });
    
    return {
        message: 'Retrieve Successfully',
        data: scheduler,
    }
}

module.exports = { createScheduler, getAllScheduler, getScheduleByDataTime, getScheduleByTitle }

/*

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Scheduler() {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dateTime, setDateTime] = useState('');

  useEffect(() => {
    axios.get('/api/events')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/events', { title, description, dateTime })
      .then(response => {
        setEvents(prevEvents => [...prevEvents, response.data]);
        setTitle('');
        setDescription('');
        setDateTime('');
      })
      .catch(error => {
        console.error(error);
      });
  };

    const handleGetAllEvents = () => {
    axios.get('/api/events')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleGetEventsByDateTime = (dateTime) => {
    axios.get(`/api/events/${dateTime}`)
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Event Scheduler</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <input type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        <input type="datetime-local" value={dateTime} onChange={e => setDateTime(e.target.value)} />
        <button type="submit">Add Event</button>
      </form>
      <ul>
        {events.map(event => (
          <li key={event._id}>
            <strong>{event.title}</strong> - {event.description} ({event.dateTime})
          </li>
        ))}
      </ul>
    </div>
    
      <button onClick={handleGetAllEvents}>Get All Events</button>
      <button onClick={() => handleGetEventsByDateTime('2022-01-01T12:00:00')}>Get Events by DateTime</button>
  );
}

export default Scheduler;


*/