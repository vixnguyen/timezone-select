
import React, { useState, useMemo } from 'react';
import Select from 'react-select';
import { getTz, myTz } from './tz.helper';

const TimezoneSelect = ({
  value,
  onBlur,
  onChange,
  labelStyle = 'original',
  ...props
}) => {
  const [selectedTimezone, setSelectedTimezone] = useState(myTz())

  const getOptions = useMemo(() => {
    return getTz();
  }, [labelStyle])

  const handleChange = tz => {
    setSelectedTimezone(tz)
    onChange && onChange(tz)
  }

  return (
    <Select
      value={
        typeof value === 'object'
          ? value
          : { value: value, label: 'jhdajhdgasjd' }
      }
      onChange={handleChange}
      options={getOptions}
      onBlur={onBlur}
      {...props}
    />
  )
}

export default TimezoneSelect
