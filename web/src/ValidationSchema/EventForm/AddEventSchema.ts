import * as yup from "yup";

export default yup.object({
  title: yup.string().required("Event title is required"),
  description: yup.string().optional(),
  startTime: yup.string().required("Start time is required"),
  endTime: yup.string().required("End time is required"),
  date: yup.date().required("Date is required"),
});
