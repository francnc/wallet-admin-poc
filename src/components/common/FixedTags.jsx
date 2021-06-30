import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';

export const FixedTags = ({
  options = [],
  onChange,
  values = [],
  label = '',
  placeholder = '',
}) => {
  return (
    <Autocomplete
      multiple
      id="fixed-tags-demo"
      value={values}
      onChange={(event, newValue) => {
        onChange(newValue);
      }}
      options={options.filter(
        (option) => !values.find((it) => it.name === option.name),
      )}
      getOptionLabel={(option) => option.title}
      renderTags={(tagValue, getTagProps) => {
        return values.map((option, index) => (
          <Chip label={option.title} {...getTagProps({ index })} />
        ));
      }}
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label || 'Label'}
          variant="outlined"
          placeholder={placeholder || 'tags'}
          margin="normal"
          fullWidth
        />
      )}
    />
  );
};
