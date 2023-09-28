import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

export default function SwitchLabels(props) {
  const { switchDark } = props;
  return (
    <FormGroup>
      <FormControlLabel control={<Switch onClick={switchDark}/>} className='dark-switch'/>
    </FormGroup>
  );
}