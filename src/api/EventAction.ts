import { FormDataEvent } from "@/models/Event";
import axios from "axios";

export const getEvent = async () => {
  try {
    const result = await axios.get(`https://alope.site/api/events`);

    if (result) {
      return result.data;
    }
  } catch (error) {
    return error;
  }
};

export const getEventById = async (slug: string) => {
  try {
    const result = await axios.get(`https://alope.site/api/events/${slug}`);

    if (result) {
      return result;
    }
  } catch (error) {
    return error;
  }
};

export const insertEvent = async (data: FormDataEvent, fileName: string) => {
  try {
    const result = await axios.post(`https://alope.site/api/events`, {
      title: data.title,
      description: data.description,
      banner: fileName,
      startedDate: data.startedDate,
      startedTime: data.startedTime,
      endedDate: data.endedDate,
      endedTime: data.endedTime,
      fee: data.fee,
      maximumVisitor: data.maximumVisitor,
      location: data.location,
      for: data.for,
      lat: data?.marker?.lat,
      lng: data?.marker?.lng,
    });
    if (result) {
      return result;
    }
  } catch (error) {
    return error;
  }
};

export const updateEvent = async (
  data: FormDataEvent,
  slug: string,
  fileName: string
) => {
  try {
    const result = await axios.patch(`https://alope.site/api/events/${slug}`, {
      title: data.title,
      description: data.description,
      banner: fileName,
      startedDate: data.startedDate,
      startedTime: data.startedTime,
      endedDate: data.endedDate,
      endedTime: data.endedTime,
      fee: data.fee,
      location: data.location,
      for: data.for,
    });

    if (result) {
      return result;
    }
  } catch (error) {
    return error;
  }
};

export const deleteEvent = async (slug: string) => {
  try {
    const result = await axios.delete(`https://alope.site/api/events/${slug}`);

    if (result) {
      return result;
    }
  } catch (error) {
    return error;
  }
};
