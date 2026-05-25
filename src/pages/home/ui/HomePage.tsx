import React from 'react';
import { Box, Typography } from '@mui/material';
import { ContinueButton } from '../../../shared';

export const HomePage: React.FC = () => {
  const handleContinue = () => {
    // TODO: навигация на следующую страницу
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#FF8C00',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '64px',
      }}
    >
      {/* Фотография */}
      <Box
        component="img"
        src={require('../../../../assets/icon.png')}
        alt="Фото"
        sx={{
          width: 120,
          height: 120,
          borderRadius: '50%',
          objectFit: 'cover',
        }}
      />

      {/* Логотип */}
      <Box
        component="img"
        src={require('../../../../assets/logotype.png')}
        alt="Логотип"
        sx={{
          marginTop: 2,
          width: 160,
          height: 'auto',
        }}
      />

      {/* Заголовок */}
      <Typography
        variant="h1"
        sx={{
          marginTop: '32px',
          color: '#FFFFFF',
          fontSize: 28,
          fontWeight: 700,
          textAlign: 'center',
        }}
      >
        Тестовое задание
      </Typography>

      {/* Кнопка Продолжить */}
      <Box sx={{ marginTop: '32px' }}>
        <ContinueButton onPress={handleContinue} />
      </Box>
    </Box>
  );
};
