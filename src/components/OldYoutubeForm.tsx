import { useFormik } from "formik";
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

// const validate = (values: YoutubeFormValues) => {
//   // values.name | values.email | values.channel
//   // errors.name | errors.email | errors.channel (needs to be a string)

//   let errors: FormikErrors<YoutubeFormValues> = {};

//   if (!values.name) {
//     errors.name = "Required";
//   }

//   if (!values.email) {
//     errors.email = "Required";
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//     errors.email = "Invalid email";
//   }

//   if (!values.channel) {
//     errors.channel = "Required";
//   }

//   return errors;
// };

const validationSchema = yup.object({
  name: yup.string().required("Required"),
  email: yup.string().email("Invalid email format").required("Required"),
  channel: yup.string().required("Required"),
});

export const OldYoutubeForm = () => {
  const formik = useFormik<YoutubeFormValues>({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-control">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              // name="name"
              {...formik.getFieldProps("name")}
              // onChange={formik.handleChange}
              // onBlur={formik.handleBlur}
              // value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="error">{formik.errors.name}</div>
            ) : null}
          </div>
          <div className="form-control">
            <label htmlFor="name">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="form-control">
            <label htmlFor="channel">Channel</label>
            <input
              type="text"
              id="channel"
              name="channel"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.channel}
            />
            {formik.touched.channel && formik.errors.channel ? (
              <div className="error">{formik.errors.channel}</div>
            ) : null}
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};
