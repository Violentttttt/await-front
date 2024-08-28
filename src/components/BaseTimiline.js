import React, { useEffect, useState } from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

export default function BaseTimeline() {
  const [activeStep, setActiveStep] = useState(1); // Активный шаг (по умолчанию второй шаг)
  const location = useLocation(); // Для получения информации о текущем пути
  const theme = useTheme(); // Использование темы

  useEffect(() => {
    const path = location.pathname;
    console.log('Current path:', path); // Вывод текущего пути

    if (path === '/match') {
      setActiveStep(0);
    } else if (path === '/params') {
      setActiveStep(1);
    } else if (path === '/world') {
      setActiveStep(2);
    } else {
      setActiveStep(-1); // Если путь не совпадает, сбросьте активный шаг
    }

    console.log('Active step:', activeStep); // Вывод активного шага
  }, [location]);

  return (
    <Timeline>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot sx={{ bgcolor: activeStep >= 2 ? theme.palette.primary.main : theme.palette.grey[500] }} />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Мэтч</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot sx={{ bgcolor: activeStep >= 1 ? theme.palette.primary.main : theme.palette.grey[500] }} />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Сбор информации</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot sx={{ bgcolor: activeStep >= 0 ? theme.palette.primary.main : theme.palette.grey[500] }} />
        </TimelineSeparator>
        <TimelineContent>Координаты</TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
