import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";
import React, { ReactElement } from "react";
import * as yup from "yup";
import { TextError } from "./TextError";

interface FormValues {
  name: string;
  email: string;
  channel: string;
  comments: string;
  address: string;
  social: {
    facebook: string;
    twitter: string;
  };
  phoneNumbers: string[];
}

const initialValues: FormValues = {
  name: "",
  email: "",
  channel: "",
  comments: "",
  address: "",
  social: {
    facebook: "",
    twitter: "",
  },
  phoneNumbers: ["", ""],
};

const onSubmit = (values: FormValues) => {
  console.log(values);
};

const validationSchema = yup.object({
  name: yup.string().required("Required"),
  email: yup.string().email("Invalid email format").required("Required"),
  channel: yup.string().required("Required"),
  // skipping validation for some fields (to be added)
});

export const YoutubeForm = (): ReactElement => {
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
            <ErrorMessage name="name">
              {(errMsg) => <TextError>{errMsg}</TextError>}
            </ErrorMessage>
          </div>
          <div className="form-control">
            <label htmlFor="name">Email</label>
            <Field type="email" id="email" name="email" />
            <ErrorMessage
              name="email"
              component={TextError as React.ComponentType<{}>}
            />
          </div>
          <div className="form-control">
            <label htmlFor="channel">Channel</label>
            <Field
              type="text"
              id="channel"
              name="channel"
              placeholder="Youtube channel name"
            />
            <ErrorMessage
              name="channel"
              component={TextError as React.ComponentType<{}>}
            />
          </div>
          <div className="form-control">
            <label htmlFor="comments">Comments</label>
            <Field as="textarea" id="comments" name="comments" />
            <ErrorMessage
              name="comments"
              component={TextError as React.ComponentType<{}>}
            />
          </div>
          <div className="form-control">
            <label htmlFor="address">Address</label>
            <Field name="address">
              {({ field, form, meta }: FieldProps) => {
                return (
                  <div>
                    <input type="text" id="address" {...field} />
                    {meta.touched && meta.error ? (
                      <div>{meta.error}</div>
                    ) : null}
                  </div>
                );
              }}
            </Field>
            <ErrorMessage
              name="address"
              component={TextError as React.ComponentType<{}>}
            />
          </div>
          <div className="form-control">
            <label htmlFor="facebook">Facebook profile</label>
            <Field type="text" id="facebook" name="social.facebook" />
            <ErrorMessage
              name="facebook"
              component={TextError as React.ComponentType<{}>}
            />
          </div>
          <div className="form-control">
            <label htmlFor="twitter">Twitter profile</label>
            <Field type="text" id="twitter" name="social.twitter" />
            <ErrorMessage
              name="twitter"
              component={TextError as React.ComponentType<{}>}
            />
          </div>
          <div className="form-control">
            <label htmlFor="primaryPh">Primary phone number</label>
            <Field type="text" id="primaryPh" name="phoneNumbers[0]" />
            <ErrorMessage
              name="primaryPh"
              component={TextError as React.ComponentType<{}>}
            />
          </div>
          <div className="form-control">
            <label htmlFor="secondaryPh">Secondary phone number</label>
            <Field type="text" id="secondaryPh" name="phoneNumbers[1]" />
            <ErrorMessage
              name="secondaryPh"
              component={TextError as React.ComponentType<{}>}
            />
          </div>
          <button type="submit">Submit</button>
        </Form>
      </div>
    </Formik>
  );
};
