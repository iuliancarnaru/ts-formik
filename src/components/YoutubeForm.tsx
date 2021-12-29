import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

interface YoutubeFormValues {
  name: string;
  email: string;
  channel: string;
}

const initialValues: YoutubeFormValues = {
  name: "",
  email: "",
  channel: "",
};

const onSubmit = (values: YoutubeFormValues) => {
  console.log(values);
};

const validationSchema = yup.object({
  name: yup.string().required("Required"),
  email: yup.string().email("Invalid email format").required("Required"),
  channel: yup.string().required("Required"),
});

export const YoutubeForm = () => {
  return (
    // Formik behave as a context provider component for the components that it wraps
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <div>
        {/* Form automatically hooks `handleSubmit` */}
        <Form>
          <div className="form-control">
            <label htmlFor="name">Name</label>
            <Field type="text" id="name" name="name" />
            <ErrorMessage name="name" />
          </div>
          <div className="form-control">
            <label htmlFor="name">Email</label>
            <Field type="email" id="email" name="email" />
            <ErrorMessage name="email" />
          </div>
          <div className="form-control">
            <label htmlFor="channel">Channel</label>
            <Field type="text" id="channel" name="channel" />
            <ErrorMessage name="channel" />
          </div>
          <button type="submit">Submit</button>
        </Form>
      </div>
    </Formik>
  );
};
