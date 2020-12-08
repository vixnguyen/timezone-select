
// import React, { useMemo } from 'react';
// import Select from 'react-select';
import { getTz, myTz, findTzByName, tzRawData, findTzByKey } from './tz.helper';

// const TimezoneSelect = ({
//   value,
//   onBlur,
//   onChange,
//   labelStyle = 'original',
//   ...props
// }) => {

//   const getOptions = useMemo(() => {
//     return getTz();
//   }, [labelStyle]);

//   const handleChange = tz => {
//     onChange && onChange(tz);
//   };

//   const constructTz = (data) => {
//     const tz = typeof data === 'string' ? findTzByName(data, getOptions) : data;
//     return tz;
//   };

//   return (
//     <Select
//       value={constructTz(value)}
//       onChange={handleChange}
//       options={getOptions}
//       onBlur={onBlur}
//       {...props}
//     />
//   )
// }

// export default TimezoneSelect;
export { myTz, getTz, tzRawData, findTzByKey };
