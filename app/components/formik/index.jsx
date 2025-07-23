// components/FormikWrapper.js
import React from "react";
import { Formik } from "formik";

const FormikWrapper = ({
  initialValues,
  validationSchema,
  onSubmit,
  children,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {() => children}
    </Formik>
  );
};

export default FormikWrapper;
