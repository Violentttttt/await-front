import * as React from 'react';
import Button from '@mui/material/Button';

export default function ButtonUsage({type , content}) {
  return <Button variant="contained" sx={{m:4, ":hover":{bgcolor:'#7a9cd6'}}}  type={type}>{content}</Button>;
}
