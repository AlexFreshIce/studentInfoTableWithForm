import { useField, useFormikContext } from "formik";
import { useEffect } from "react";


export const CustomField = ({ keys = [], ...props }) => {
  const { values, setFieldValue } = useFormikContext();
  const [field, meta] = useField(props);
  const summ = keys.reduce((acc, el) => acc + +values[el], 0);

  useEffect(() => {
    if (keys.length) {
      setFieldValue(props.name, parseInt(summ));
    }
  }, [setFieldValue, props.name, summ]);

  return (
    <>
      <input {...props} {...field}  />
      {!!meta.touched && !!meta.error && <div>{meta.error}</div>}
    </>
  );
};
