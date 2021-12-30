import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldProps,
  FieldArray,
  FastField,
  FormikHelpers,
} from "formik";
import React, { ReactElement, useState } from "react";
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
  phNumbers: string[];
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
  phNumbers: [""],
};

const savedValues: FormValues = {
  name: "John Doe",
  email: "test@test.com",
  channel: "codevolution",
  comments: "Welcome to formik",
  address: "221b Baker Street",
  social: {
    facebook: "",
    twitter: "",
  },
  phoneNumbers: ["", ""],
  phNumbers: [""],
};

const onSubmit = (
  values: FormValues,
  onSubmitProps: FormikHelpers<FormValues>
) => {
  console.log(values);
  onSubmitProps.setSubmitting(false);
  onSubmitProps.resetForm();
};

const validationSchema = yup.object({
  name: yup.string().required("Required"),
  email: yup.string().email("Invalid email format").required("Required"),
  channel: yup.string().required("Required"),
  // comments: yup.string().required("Required"),
  // skipping validation for some fields (to be added)
});

const validateComments = (value: string) => {
  let error;

  if (!value) {
    error = "Required";
  }

  return error;
};

export const YoutubeForm = (): ReactElement => {
  const [formValues, setFromValues] = useState<FormValues | null>(null);
  return (
    // Formik behave as a context provider component for the components that it wraps
    <Formik
      initialValues={formValues || initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
      // validateOnChange={false}
      // validateOnBlur={false}
      // validateOnMount // (suitable for form with few fields)
    >
      {({
        validateField,
        validateForm,
        setFieldTouched,
        setTouched,
        isValid,
        isSubmitting,
      }) => (
        <Form>
          {/* Form automatically hooks `handleSubmit` */}
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
              component={TextError as React.FunctionComponent}
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
              component={TextError as React.FunctionComponent}
            />
          </div>
          <div className="form-control">
            <label htmlFor="comments">Comments</label>
            <Field
              as="textarea"
              id="comments"
              name="comments"
              validate={validateComments}
            />
            <ErrorMessage
              name="comments"
              component={TextError as React.FunctionComponent}
            />
          </div>
          <div className="form-control">
            <label htmlFor="address">Address</label>
            <FastField name="address">
              {({ field, form, meta }: FieldProps) => {
                /* 
              Fast field is an optimised version of the Field component
              which internally implements `shouldComponentUpdate` lifecycle
              method to block all aditional re-renders unless there are direct
              updates on the FastField itself (use with caution)
              */
                return (
                  <div>
                    <input type="text" id="address" {...field} />
                    {meta.touched && meta.error ? (
                      <div>{meta.error}</div>
                    ) : null}
                  </div>
                );
              }}
            </FastField>
            <ErrorMessage
              name="address"
              component={TextError as React.FunctionComponent}
            />
          </div>
          <div className="form-control">
            <label htmlFor="facebook">Facebook profile</label>
            <Field type="text" id="facebook" name="social.facebook" />
            <ErrorMessage
              name="facebook"
              component={TextError as React.FunctionComponent}
            />
          </div>
          <div className="form-control">
            <label htmlFor="twitter">Twitter profile</label>
            <Field type="text" id="twitter" name="social.twitter" />
            <ErrorMessage
              name="twitter"
              component={TextError as React.FunctionComponent}
            />
          </div>
          <div className="form-control">
            <label htmlFor="primaryPh">Primary phone number</label>
            <Field type="text" id="primaryPh" name="phoneNumbers[0]" />
            <ErrorMessage
              name="primaryPh"
              component={TextError as React.FunctionComponent}
            />
          </div>
          <div className="form-control">
            <label htmlFor="secondaryPh">Secondary phone number</label>
            <Field type="text" id="secondaryPh" name="phoneNumbers[1]" />
            <ErrorMessage
              name="secondaryPh"
              component={TextError as React.FunctionComponent}
            />
          </div>
          <div className="form-control">
            <label htmlFor="phNumbers">List of phone numbers</label>
            <FieldArray name="phNumbers">
              {(fieldArrayProps) => {
                const { push, remove, form } = fieldArrayProps;
                const { values } = form;
                const { phNumbers } = values as FormValues;
                /* 
              Validation runs in the following cases:
                1. When a change event has occurred
                2. When a blur out event occurred (click outside field)
                3. Wen form submission is attempted
              */
                return (
                  <div>
                    {phNumbers.map((_, idx) => (
                      <div key={idx} style={{ display: "flex" }}>
                        <Field name={`phNumbers[${idx}]`} />
                        {idx > 0 && (
                          <button type="button" onClick={() => remove(idx)}>
                            Remove
                          </button>
                        )}

                        <button type="button" onClick={() => push("")}>
                          Add
                        </button>
                      </div>
                    ))}
                  </div>
                );
              }}
            </FieldArray>
          </div>
          {/* <button type="button" onClick={() => validateField("comments")}>
            Validate comments
          </button>
          <button type="button" onClick={() => validateForm()}>
            Validate all
          </button>
          <button type="button" onClick={() => setFieldTouched("comments")}>
            Visit comments
          </button>
          <button
            type="button"
            onClick={() =>
              setTouched({
                name: true,
                email: true,
                channel: true,
                comments: true,
              })
            }
          >
            Visit all
          </button> */}
          <button type="button" onClick={() => setFromValues(savedValues)}>
            Load saved data
          </button>
          {/* <button type="reset">Clear form fields</button> --> doesn't work with saved data */}
          <button type="submit" disabled={isSubmitting || !isValid}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};
